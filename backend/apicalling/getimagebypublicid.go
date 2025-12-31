package apicalling
import(
	"Oneupload/dbconnection"
	"context"
"log"
	"time"

	"github.com/gofiber/fiber/v2"
)
func GetImageByPublicID(c *fiber.Ctx) error {
    publicID := c.Params("public_id")
    if publicID == "" {
        return fiber.NewError(400, "Invalid image ID")
    }

    log.Println("Looking for public_id:", publicID)

    query := `
        SELECT
            image_url,
            file_name,
            file_size_mb,
            password_hash,
            expires_at,
            uploaded_at
        FROM user_images
        WHERE public_id = $1
        LIMIT 1
    `

    var imgURL, fileName string
    var sizeMB float64
    var passwordHash *string
    var expiresAt, uploadedAt *time.Time

    err := dbconnection.Pool.QueryRow(context.Background(), query, publicID).Scan(
        &imgURL,
        &fileName,
        &sizeMB,
        &passwordHash,
        &expiresAt,
        &uploadedAt,
    )
    if err != nil {
        log.Printf("DB QUERY ERROR for public_id %s: %v\n", publicID, err)
        return fiber.NewError(404, "Image not found")
    }

    if expiresAt != nil && expiresAt.Before(time.Now()) {
        return fiber.NewError(410, "Image expired")
    }

    resp := fiber.Map{
        "image_url":        imgURL,
        "file_name":        fileName,
        "size_mb":          sizeMB,
        "public_id":        publicID,
        "password_required": passwordHash != nil,
        "uploaded_at":      uploadedAt,
    }

    return c.JSON(resp)
}
