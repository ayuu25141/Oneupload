package apicalling

import (
	"Oneupload/dbconnection"
	"context"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type VerifyRequest struct {
	Password string `json:"password"`
}

func VerifyImagePassword(c *fiber.Ctx) error {
	publicID := c.Params("public_id")
	if publicID == "" {
		return fiber.NewError(http.StatusBadRequest, "Invalid image ID")
	}

	req := new(VerifyRequest)
	if err := c.BodyParser(req); err != nil {
		return fiber.NewError(http.StatusBadRequest, "Invalid request body")
	}

	var passwordHash *string
	query := `SELECT password_hash FROM user_images WHERE public_id = $1 LIMIT 1`
	err := dbconnection.Pool.QueryRow(context.Background(), query, publicID).Scan(&passwordHash)
	if err != nil {
		log.Println("DB QUERY ERROR:", err)
		return fiber.NewError(http.StatusNotFound, "Image not found")
	}

	if passwordHash == nil {
		// No password set for this image
		return c.JSON(fiber.Map{"access_granted": true})
	}

	// Compare password with hash
	if err := bcrypt.CompareHashAndPassword([]byte(*passwordHash), []byte(req.Password)); err != nil {
		return c.JSON(fiber.Map{"access_granted": false})
	}

	return c.JSON(fiber.Map{"access_granted": true})
}
