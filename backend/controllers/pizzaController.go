package controllers

import (
	"net/http"
	"pizza_planet_backend/database"
	"pizza_planet_backend/models"

	"github.com/gin-gonic/gin"
)

// GetPizzas fetches all pizzas from the database
func GetPizzas(c *gin.Context) {
	var pizzas []models.Pizza
	if err := database.DB.Find(&pizzas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch pizzas"})
		return
	}
	c.JSON(http.StatusOK, pizzas)
}

// GetPizza fetches a single pizza by ID
func GetPizza(c *gin.Context) {
	id := c.Param("id")
	var pizza models.Pizza
	if err := database.DB.First(&pizza, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}
	c.JSON(http.StatusOK, pizza)
}

// CreatePizza creates a new pizza with an optional topping
func CreatePizza(c *gin.Context) {
	var pizza models.Pizza
	if err := c.ShouldBindJSON(&pizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := database.DB.Create(&pizza).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create pizza"})
		return
	}
	c.JSON(http.StatusCreated, pizza)
}

// UpdatePizza updates an existing pizza in the database
func UpdatePizza(c *gin.Context) {
	id := c.Param("id")
	var pizza models.Pizza
	if err := database.DB.First(&pizza, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}

	if err := c.ShouldBindJSON(&pizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&pizza).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update pizza"})
		return
	}
	c.JSON(http.StatusOK, pizza)
}

// DeletePizza deletes a pizza from the database
func DeletePizza(c *gin.Context) {
	id := c.Param("id")
	var pizza models.Pizza
	if err := database.DB.First(&pizza, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}

	if err := database.DB.Delete(&pizza).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to delete pizza"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Pizza deleted successfully"})
}
