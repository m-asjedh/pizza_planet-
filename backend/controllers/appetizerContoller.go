package controllers

import (
	"net/http"
	"pizza_planet_backend/database"
	"pizza_planet_backend/models"

	"github.com/gin-gonic/gin"
)

// GetAppetizers fetches all appetizers from the database
func GetAppetizers(c *gin.Context) {
	var appetizers []models.Appetizer
	if err := database.DB.Find(&appetizers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch appetizers"})
		return
	}
	c.JSON(http.StatusOK, appetizers)
}

// GetAppetizer fetches a single appetizer by ID
func GetAppetizer(c *gin.Context) {
	id := c.Param("id")
	var appetizer models.Appetizer
	if err := database.DB.First(&appetizer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Appetizer not found"})
		return
	}
	c.JSON(http.StatusOK, appetizer)
}

// CreateAppetizer creates a new appetizer in the database
func CreateAppetizer(c *gin.Context) {
	var appetizer models.Appetizer
	if err := c.ShouldBindJSON(&appetizer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Create(&appetizer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create appetizer"})
		return
	}
	c.JSON(http.StatusCreated, appetizer)
}

// UpdateAppetizer updates an existing appetizer
func UpdateAppetizer(c *gin.Context) {
	id := c.Param("id")
	var appetizer models.Appetizer
	if err := database.DB.First(&appetizer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Appetizer not found"})
		return
	}

	if err := c.ShouldBindJSON(&appetizer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&appetizer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update appetizer"})
		return
	}
	c.JSON(http.StatusOK, appetizer)
}

// DeleteAppetizer deletes an appetizer from the database
func DeleteAppetizer(c *gin.Context) {
	id := c.Param("id")
	var appetizer models.Appetizer
	if err := database.DB.First(&appetizer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Appetizer not found"})
		return
	}

	if err := database.DB.Delete(&appetizer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to delete appetizer"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Appetizer deleted successfully"})
}
