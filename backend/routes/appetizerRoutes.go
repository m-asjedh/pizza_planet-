package routes

import (
	"pizza_planet_backend/controllers"

	"github.com/gin-gonic/gin"
)

func AppetizerRoutes(router *gin.Engine) {
	appetizer := router.Group("/appetizers")
	{
		appetizer.GET("/", controllers.GetAppetizers)        
		appetizer.GET("/:id", controllers.GetAppetizer)    
		appetizer.POST("/", controllers.CreateAppetizer)   
		appetizer.PUT("/:id", controllers.UpdateAppetizer)  
		appetizer.DELETE("/:id", controllers.DeleteAppetizer) 
	}
}
