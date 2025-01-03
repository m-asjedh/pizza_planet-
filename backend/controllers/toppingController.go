package controllers

import (
	"net/http"
	"pizza_planet_backend/database"
	"pizza_planet_backend/models"

	"github.com/gin-gonic/gin"
)

// GetToppings fetches all toppings from the database
func GetToppings(c *gin.Context) {
	var toppings []models.Topping
	if err := database.DB.Find(&toppings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch toppings"})
		return
	}
	c.JSON(http.StatusOK, toppings)
}

// GetTopping fetches a single topping by ID
func GetTopping(c *gin.Context) {
	id := c.Param("id")
	var topping models.Topping
	if err := database.DB.First(&topping, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Topping not found"})
		return
	}
	c.JSON(http.StatusOK, topping)
}

// CreateTopping creates a new topping in the database
func CreateTopping(c *gin.Context) {
	var topping models.Topping
	if err := c.ShouldBindJSON(&topping); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Create(&topping).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create topping"})
		return
	}
	c.JSON(http.StatusCreated, topping)
}

// UpdateTopping updates an existing topping
func UpdateTopping(c *gin.Context) {
	id := c.Param("id")
	var topping models.Topping
	if err := database.DB.First(&topping, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Topping not found"})
		return
	}

	if err := c.ShouldBindJSON(&topping); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&topping).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update topping"})
		return
	}
	c.JSON(http.StatusOK, topping)
}

// DeleteTopping deletes a topping from the database
func DeleteTopping(c *gin.Context) {
	id := c.Param("id")
	var topping models.Topping
	if err := database.DB.First(&topping, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Topping not found"})
		return
	}

	if err := database.DB.Delete(&topping).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to delete topping"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Topping deleted successfully"})
}
