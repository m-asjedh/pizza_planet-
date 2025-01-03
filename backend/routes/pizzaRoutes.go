package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func PizzaRoutes(router *gin.Engine) {
	pizzaRoutes := router.Group("/pizzas")
	{
		pizzaRoutes.GET("/", controllers.GetPizzas)
		pizzaRoutes.GET("/:id", controllers.GetPizza)
		pizzaRoutes.POST("/", controllers.CreatePizza)
		pizzaRoutes.PUT("/:id", controllers.UpdatePizza)
		pizzaRoutes.DELETE("/:id", controllers.DeletePizza)
	}
}
