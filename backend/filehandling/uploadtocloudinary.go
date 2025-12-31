package filehandling

import (
	"context"
	"time"
	
"fmt"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"

	"Oneupload/dbconnection"
)

// Request payload from frontend
type UploadRequest struct {
	ImageURL   string  `json:"image_url"`
	PublicID   string  `json:"public_id"`
	FileName   string  `json:"file_name"`
	FileSizeMB float64 `json:"file_size_mb"`
	ExpireDays int     `json:"expire_days"` // optional, 0 = no expiry
	Password   string  `json:"password"`    // optional
}

func UploadImage(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(int)

	var body UploadRequest
	fmt.Println("Raw Body:", string(c.Body()))

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid request"})
	}

	if body.ImageURL == "" || body.PublicID == "" {
		return c.Status(400).JSON(fiber.Map{"error": "image_url and public_id required"})
	}

	var expiresAt *time.Time
	if body.ExpireDays > 0 {
		t := time.Now().Add(time.Duration(body.ExpireDays) * 24 * time.Hour)
		expiresAt = &t
	}

	var passwordHash *string
	if body.Password != "" {
		hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "failed to hash password"})
		}
		strHash := string(hash)
		passwordHash = &strHash
	}

	query := `
INSERT INTO user_images 
(user_id, image_url, public_id, file_name, file_size_mb, expires_at, password_hash, is_active, uploaded_at)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
RETURNING id
`

	var imageID int
	err := dbconnection.Pool.QueryRow(
		context.Background(),
		query,
		userID,
		body.ImageURL,
		body.PublicID,
		body.FileName,
		body.FileSizeMB,
		expiresAt,
		passwordHash,
		true,
		time.Now(),
	).Scan(&imageID)

	if err != nil {
		fmt.Println("DB INSERT ERROR:", err) // ✅ log full error
		return c.Status(500).JSON(fiber.Map{"error": "failed to save image"})
	}

	return c.Status(200).JSON(fiber.Map{
		"message":    "image uploaded successfully",
		"id":         imageID,
		"image_url":  body.ImageURL,
		"public_id":  body.PublicID,
		"file_name":  body.FileName,
		"file_size":  body.FileSizeMB,
		"expires_at": expiresAt,
		"is_active":  true,
	})
}
