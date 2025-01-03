package main

import (
	"log"

	"pizza_planet_backend/database"
	"pizza_planet_backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	database.Connect()

	// Initialize the Gin router
	r := gin.Default()

	// Setup routes
	routes.PizzaRoutes(r)
	routes.ToppingRoutes(r)
	routes.BeverageRoutes(r)
	routes.AppetizerRoutes(r)
	routes.OrderRoutes(r)

	// Start the server
	port := ":8080" 
	log.Printf("Server running on http://localhost%s", port)
	err := r.Run(port)
	if err != nil {
		log.Fatalf("Failed to start the server: %v", err)
	}
}
