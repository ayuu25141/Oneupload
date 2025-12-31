package apihandling

import (
	"context"

	"net/http"

	"github.com/gofiber/fiber/v2"
	"Oneupload/dbconnection"
)

// ShowUsername queries all users from DB and returns JSON
func ShowUsername(c *fiber.Ctx) error {
	rows, err := dbconnection.Pool.Query(context.Background(), "SELECT id, username FROM users")
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	defer rows.Close()

	var users []map[string]interface{}

	for rows.Next() {
		var id int
		var username string 
		err := rows.Scan(&id, &username)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		users = append(users, map[string]interface{}{
			"id":       id,
			"username": username,
			
		})
	}

	return c.JSON(users)
}


