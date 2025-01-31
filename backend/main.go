package main

import (
	"log"

	"pizza_planet_backend/database"
	"pizza_planet_backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	r.OPTIONS("/*path", func(c *gin.Context) {
		c.Status(204)
	})

	routes.PizzaRoutes(r)
	routes.ToppingRoutes(r)
	routes.BeverageRoutes(r)
	routes.AppetizerRoutes(r)
	routes.OrderRoutes(r)

	port := ":8080" 
	log.Printf("Server running on http://localhost%s", port)
	err := r.Run(port)
	if err != nil {
		log.Fatalf("Failed to start the server: %v", err)
	}
}
