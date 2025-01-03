package controllers

import (
	"net/http"
	"pizza_planet_backend/database"
	"pizza_planet_backend/models"

	"github.com/gin-gonic/gin"
)

// GetBeverages fetches all beverages from the database
func GetBeverages(c *gin.Context) {
	var beverages []models.Beverage
	if err := database.DB.Find(&beverages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch beverages"})
		return
	}
	c.JSON(http.StatusOK, beverages)
}

// GetBeverage fetches a single beverage by ID
func GetBeverage(c *gin.Context) {
	id := c.Param("id")
	var beverage models.Beverage
	if err := database.DB.First(&beverage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Beverage not found"})
		return
	}
	c.JSON(http.StatusOK, beverage)
}

// CreateBeverage creates a new beverage in the database
func CreateBeverage(c *gin.Context) {
	var beverage models.Beverage
	if err := c.ShouldBindJSON(&beverage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Create(&beverage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create beverage"})
		return
	}
	c.JSON(http.StatusCreated, beverage)
}

// UpdateBeverage updates an existing beverage
func UpdateBeverage(c *gin.Context) {
	id := c.Param("id")
	var beverage models.Beverage
	if err := database.DB.First(&beverage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Beverage not found"})
		return
	}

	if err := c.ShouldBindJSON(&beverage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&beverage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update beverage"})
		return
	}
	c.JSON(http.StatusOK, beverage)
}

// DeleteBeverage deletes a beverage from the database
func DeleteBeverage(c *gin.Context) {
	id := c.Param("id")
	var beverage models.Beverage
	if err := database.DB.First(&beverage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Beverage not found"})
		return
	}

	if err := database.DB.Delete(&beverage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to delete beverage"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Beverage deleted successfully"})
}
