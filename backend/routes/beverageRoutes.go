package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func BeverageRoutes(router *gin.Engine) {
	beverage := router.Group("/beverages")
	{
		beverage.GET("/", controllers.GetBeverages)        
		beverage.GET("/:id", controllers.GetBeverage)     
		beverage.POST("/", controllers.CreateBeverage)    
		beverage.PUT("/:id", controllers.UpdateBeverage) 
		beverage.DELETE("/:id", controllers.DeleteBeverage) 
	}
}
