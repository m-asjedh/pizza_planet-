package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func ToppingRoutes(router *gin.Engine) {
	topping := router.Group("/toppings")
	{
		topping.GET("/", controllers.GetToppings)       
		topping.GET("/:id", controllers.GetTopping)
		topping.POST("/", controllers.CreateTopping)   
		topping.PUT("/:id", controllers.UpdateTopping) 
		topping.DELETE("/:id", controllers.DeleteTopping) 
	}
}
