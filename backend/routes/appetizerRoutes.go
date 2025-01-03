package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func AppetizerRoutes(router *gin.Engine) {
	appetizer := router.Group("/appetizers")
	{
		appetizer.GET("/", controllers.GetAppetizers)        // Get all appetizers
		appetizer.GET("/:id", controllers.GetAppetizer)     // Get a single appetizer
		appetizer.POST("/", controllers.CreateAppetizer)    // Create a new appetizer
		appetizer.PUT("/:id", controllers.UpdateAppetizer)  // Update an existing appetizer
		appetizer.DELETE("/:id", controllers.DeleteAppetizer) // Delete an appetizer
	}
}
