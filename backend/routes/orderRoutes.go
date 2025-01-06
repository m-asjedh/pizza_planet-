package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func OrderRoutes(router *gin.Engine) {
	order := router.Group("/orders")
	{
		order.GET("/", controllers.GetOrders)       // Get all orders
		order.GET("/:id", controllers.GetOrder)    // Get a single order by ID
		order.POST("/", controllers.CreateOrder)   // Create a new order
		order.PATCH("/:id/status", controllers.UpdateOrderStatus)
		order.DELETE("/:id", controllers.DeleteOrder) // Delete an order
	}
}
