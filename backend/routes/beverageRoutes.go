package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func BeverageRoutes(router *gin.Engine) {
	beverage := router.Group("/beverages")
	{
		beverage.GET("/", controllers.GetBeverages)        // Get all beverages
		beverage.GET("/:id", controllers.GetBeverage)     // Get a single beverage
		beverage.POST("/", controllers.CreateBeverage)    // Create a new beverage
		beverage.PUT("/:id", controllers.UpdateBeverage)  // Update an existing beverage
		beverage.DELETE("/:id", controllers.DeleteBeverage) // Delete a beverage
	}
}
