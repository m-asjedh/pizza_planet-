package controllers

import (
	"net/http"
	"pizza_planet_backend/database"
	"pizza_planet_backend/models"

	"github.com/gin-gonic/gin"
)

// GetPizzas retrieves all pizzas from the database
func GetPizzas(c *gin.Context) {
    var pizzas []models.Pizza
    database.DB.Find(&pizzas)
    c.JSON(http.StatusOK, pizzas)
}

// GetPizza retrieves a single pizza by its ID
func GetPizza(c *gin.Context) {
    id := c.Param("id")
    var pizza models.Pizza
    if err := database.DB.First(&pizza, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
        return
    }
    c.JSON(http.StatusOK, pizza)
}

// CreatePizza adds a new pizza to the database
func CreatePizza(c *gin.Context) {
    var pizza models.Pizza
    if err := c.ShouldBindJSON(&pizza); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    database.DB.Create(&pizza)
    c.JSON(http.StatusCreated, pizza)
}

// UpdatePizza updates an existing pizza's details
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

    database.DB.Save(&pizza)
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

    database.DB.Delete(&pizza)
    c.JSON(http.StatusOK, gin.H{"message": "Pizza deleted successfully"})
}
