package apicalling

import (
	"Oneupload/dbconnection"
	"context"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"strconv"
)

// type Image struct {
// 	ID        int       `json:"id"`
// 	ImageURL  string    `json:"image_url"`
// 	FileName  string    `json:"file_name"`
// 	SizeMB    float64   `json:"size_mb"`
// 	CreatedAt time.Time `json:"created_at"`
// 	ShareURL  string    `json:"share_url"`
// }

// func GetMyGallery(c *fiber.Ctx) error {
// 	// 🔐 user id from JWT middleware
// 	userID := c.Locals("user_id").(int)

// 	page, _ := strconv.Atoi(c.Query("page", "1"))
// 	limit, _ := strconv.Atoi(c.Query("limit", "12"))

// 	if page < 1 {
// 		page = 1
// 	}
// 	if limit > 50 {
// 		limit = 50
// 	}

// 	offset := (page - 1) * limit

// 	query := `
// 		SELECT 
// 			id,
// 			image_url,
// 			file_name,
// 			file_size_mb,
// 			uploaded_at,
// 			public_id
// 		FROM user_images
// 		WHERE user_id = $1
// 		  AND expires_at > NOW()
// 		ORDER BY uploaded_at DESC
// 		LIMIT $2 OFFSET $3
// 	`

// 	rows, err := dbconnection.Pool.Query(context.Background(), query, userID, limit, offset)
// 	if err != nil {
// 		log.Println("DB QUERY ERROR:", err)
// 		return fiber.NewError(500, "DB error")
// 	}
// 	defer rows.Close()

// 	images := []Image{}

// 	for rows.Next() {
// 		var img Image
// 		var publicID string
// 		if err := rows.Scan(
// 			&img.ID,
// 			&img.ImageURL,
// 			&img.FileName,
// 			&img.SizeMB,
// 			&img.CreatedAt,
// 			&publicID,
// 		); err != nil {
// 			log.Println("ROW SCAN ERROR:", err)
// 			return fiber.NewError(500, "Scan error")
// 		}

// 		// Optional: generate share URL dynamically
// 		img.ShareURL = "/view/" + publicID

// 		images = append(images, img)
// 	}

// 	return c.JSON(images)
// }
type Image struct {
	ID        int       `json:"id"`
	ImageURL  string    `json:"image_url"`
	FileName  string    `json:"file_name"`
	SizeMB    float64   `json:"size_mb"`
	CreatedAt time.Time `json:"uploaded_at"` // keep naming consistent
	PublicID  string    `json:"public_id"`   // <-- add this
	ShareURL  string    `json:"share_url"`   // full /view link
}

func GetMyGallery(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(int)

	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit, _ := strconv.Atoi(c.Query("limit", "12"))

	if page < 1 {
		page = 1
	}
	if limit > 50 {
		limit = 50
	}

	offset := (page - 1) * limit

	query := `
		SELECT 
			id,
			image_url,
			file_name,
			file_size_mb,
			uploaded_at,
			public_id
		FROM user_images
		WHERE user_id = $1
		  AND expires_at > NOW()
		ORDER BY uploaded_at DESC
		LIMIT $2 OFFSET $3
	`

	rows, err := dbconnection.Pool.Query(context.Background(), query, userID, limit, offset)
	if err != nil {
		log.Println("DB QUERY ERROR:", err)
		return fiber.NewError(500, "DB error")
	}
	defer rows.Close()

	images := []Image{}

	for rows.Next() {
		var img Image
		var publicID string
		if err := rows.Scan(
			&img.ID,
			&img.ImageURL,
			&img.FileName,
			&img.SizeMB,
			&img.CreatedAt,
			&publicID,
		); err != nil {
			log.Println("ROW SCAN ERROR:", err)
			return fiber.NewError(500, "Scan error")
		}

		img.PublicID = publicID
		img.ShareURL = "/view/" + publicID // this is the path part

		images = append(images, img)
	}

	return c.JSON(images)
}
