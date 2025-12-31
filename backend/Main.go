package main

import (
	"fmt"
	"log"
	"os"

	filehandling "Oneupload/Filehandling"
	"Oneupload/apicalling"
	connect "Oneupload/dbconnection" // alias import as "connect"
	"Oneupload/middleware"
	userauth "Oneupload/userauth"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
if err := godotenv.Load(); err != nil {
    log.Println("⚠️ .env not found, using system environment variables")
}


	// Get port from env
	port := os.Getenv("PORT")
if port == "" {
    port = "8080" // default
}

	

	// Connect to PostgreSQL
	if err := connect.Connect(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("db connected successfully")
	defer connect.Pool.Close() // close pool on exit

	// Fiber app
	app := fiber.New()
app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:5173,http://localhost:3000",
    AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
    AllowHeaders: "Origin, Content-Type, Accept, Authorization",
    AllowCredentials: true,
}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend running!")
	})
app.Post("/register",userauth.UserRegister)
app.Post("/login",userauth.UserLogin)
app.Get("/cloudinary-signature", filehandling.GetUploadSignature)
app.Post("/uploadimage",middleware.Protected(),filehandling.UploadImage)
app.Get("/getimage",middleware.Protected(),apicalling.GetMyGallery)
// in main.go or your routes file
app.Get("/view/:public_id", apicalling.GetImageByPublicID)

app.Post("/view/:public_id/verify", apicalling.VerifyImagePassword)

	fmt.Println("Server started on port " + port)
	log.Fatal(app.Listen(":" + port))
}
