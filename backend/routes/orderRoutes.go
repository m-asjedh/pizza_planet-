package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func OrderRoutes(router *gin.Engine) {
	order := router.Group("/orders")
	{
		order.GET("/", controllers.GetOrders)       
		order.GET("/:id", controllers.GetOrder)   
		order.POST("/", controllers.CreateOrder)   
		order.PATCH("/:id/status", controllers.UpdateOrderStatus)
		order.DELETE("/:id", controllers.DeleteOrder) 
	}
}
