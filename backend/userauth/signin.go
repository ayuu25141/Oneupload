package userauth

import (
    "context"
    "time"
"os"
    "Oneupload/dbconnection"

    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
    "golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    Token string `json:"token"`
    User  struct {
        ID       string `json:"id"`
        Username string `json:"username"`
        Email    string `json:"email"`
    } `json:"user"`
}

func UserLogin(c *fiber.Ctx) error {
    secret := os.Getenv("Jwt_Secret")
    var req LoginRequest

    // Parse JSON body
    if err := c.BodyParser(&req); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid request data",
        })
    }

    // DB user struct
    var user struct {
        ID           string
        Username     string
        Email        string
        PasswordHash string
    }

    // Query user
    err := dbconnection.Pool.QueryRow(
        context.Background(),
        `SELECT id, username, email, password_hash
         FROM users
         WHERE email = $1`,
        req.Email,
    ).Scan(&user.ID, &user.Username, &user.Email, &user.PasswordHash)

    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid email or password",
        })
    }

    // Verify password
    if err := bcrypt.CompareHashAndPassword(
        []byte(user.PasswordHash),
        []byte(req.Password),
    ); err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid email or password",
        })
    }

    // Create JWT token
    claims := jwt.MapClaims{
        "user_id": user.ID,
        "exp":     time.Now().Add(72 * time.Hour).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    tokenString, err := token.SignedString([]byte(secret))
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Could not generate token",
        })
    }

    // Response
    var response LoginResponse
    response.Token = tokenString
    response.User.ID = user.ID
    response.User.Username = user.Username
    response.User.Email = user.Email

    return c.Status(fiber.StatusOK).JSON(response)
}
