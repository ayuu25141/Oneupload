package middleware

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Protected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		auth := c.Get("Authorization")
		if auth == "" {
			return c.Status(401).JSON(fiber.Map{"error": "user not authenticated"})
		}

		parts := strings.Split(auth, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(401).JSON(fiber.Map{"error": "invalid auth format"})
		}

		tokenString := parts[1]
		secret := os.Getenv("Jwt_Secret")
		if secret == "" {
			return c.Status(500).JSON(fiber.Map{"error": "jwt secret missing"})
		}

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(401).JSON(fiber.Map{"error": "invalid or expired token"})
		}

		// ✅ Extract user_id safely
		claims := token.Claims.(jwt.MapClaims)
		var userID int
		switch v := claims["user_id"].(type) {
		case float64:
			userID = int(v)
		case string:
			tmp, err := strconv.Atoi(v)
			if err != nil {
				return c.Status(500).JSON(fiber.Map{"error": "invalid user id in token"})
			}
			userID = tmp
		default:
			return c.Status(500).JSON(fiber.Map{"error": "invalid user id type"})
		}

		c.Locals("user_id", userID)
		return c.Next()
	}
}
