package filehandling

import (
    "crypto/sha1"
    "encoding/hex"
    "fmt"
    "os"
   
    "time"

    "github.com/gofiber/fiber/v2"
)

func GetUploadSignature(c *fiber.Ctx) error {
    timestamp := time.Now().Unix()

    apiSecret := os.Getenv("CLOUDINARY_API_SECRET")

    // params to sign
    payload := fmt.Sprintf("timestamp=%d%s", timestamp, apiSecret)

    hash := sha1.Sum([]byte(payload))
    signature := hex.EncodeToString(hash[:])

    return c.JSON(fiber.Map{
        "signature":  signature,
        "timestamp":  timestamp,
        "apiKey":     os.Getenv("CLOUDINARY_API_KEY"),
        "cloudName":  os.Getenv("CLOUDINARY_CLOUD_NAME"),
    })
}
