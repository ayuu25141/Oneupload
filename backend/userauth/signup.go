package userauth

import(

	"github.com/gofiber/fiber/v2"
	"Oneupload/dbconnection"
	"context"
	"Oneupload/modals"
	"strings"
		"regexp"
		"time"
		"fmt"

)
func UserRegister(c*fiber.Ctx) error {
	var userinfo modals.User
	// Parse JSON body
	if err := c.BodyParser(&userinfo); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request data. Please check your input and try again.",
		})
	}
	// Trim whitespace from inputs
	userinfo.Username = strings.TrimSpace(	userinfo.Username)
	userinfo.Email = strings.TrimSpace(userinfo.Email)
	userinfo.Password = strings.TrimSpace(userinfo.Password)

	// Validation
	if userinfo.Username== "" || userinfo.Email== "" || userinfo.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "All fields are required: fullName, email, and password",
		})
	}

	// Validate email format
	if !isValidEmail(userinfo.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Please provide a valid email address",
		})
	}

	// Validate password strength
	if len(userinfo.Password) < 8 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Password must be at least 8 characters long",
		})
	}
		// Hash password
	hashedPassword, err := HashPassword(userinfo.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to process password. Please try again.",
		})
	}
	// Insert query
	query := `
		INSERT INTO users (username, email, password_hash, created_at)
		VALUES ($1, $2, $3, $4)
	`

	_, err = dbconnection.Pool.Exec(
		context.Background(),
		query,
		userinfo.Username,
		userinfo.Email,
		hashedPassword,
		time.Now(),
	)
	if err != nil {
		// Check for duplicate key error (email already exists)
		if strings.Contains(err.Error(), "duplicate key value violates unique constraint") {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"error": "This email is already registered. Please use a different email or log in.",
			})
		}
		
		// Log the error for debugging
		fmt.Printf("Database error: %v\n", err)
		
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to register user. Please try again later.",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Registration successful! You can now log in.",
	})

}
// isValidEmail checks if the email has a valid format
func isValidEmail(email string) bool {
	// This is a basic email validation regex
	re := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return re.MatchString(email)
}
