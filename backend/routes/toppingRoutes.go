package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func ToppingRoutes(router *gin.Engine) {
	topping := router.Group("/toppings")
	{
		topping.GET("/", controllers.GetToppings)        // Get all toppings
		topping.GET("/:id", controllers.GetTopping)     // Get a single topping
		topping.POST("/", controllers.CreateTopping)    // Create a new topping
		topping.PUT("/:id", controllers.UpdateTopping)  // Update an existing topping
		topping.DELETE("/:id", controllers.DeleteTopping) // Delete a topping
	}
}
