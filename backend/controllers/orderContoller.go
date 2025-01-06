package controllers

import (
	"encoding/json"
	"net/http"
	"pizza_planet_backend/database"
	"pizza_planet_backend/models"
	"time"

	"github.com/gin-gonic/gin"
)

// GetOrders fetches all orders from the database
func GetOrders(c *gin.Context) {
	var orders []models.Order
	if err := database.DB.Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch orders"})
		return
	}
	c.JSON(http.StatusOK, orders)
}

// GetOrder fetches a single order by ID
func GetOrder(c *gin.Context) {
	id := c.Param("id")
	var order models.Order
	if err := database.DB.First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}
	c.JSON(http.StatusOK, order)
}

// CreateOrder creates a new order in the database
func CreateOrder(c *gin.Context) {
	var orderPayload struct {
		CustomerName string `json:"customer_name"`
		Email        string `json:"email"`
		Phone        string `json:"phone"`
		Items        []struct {
			PizzaID     *uint   `json:"pizza_id,omitempty"`
			ToppingID   *uint   `json:"topping_id,omitempty"`
			AppetizerID *uint   `json:"appetizer_id,omitempty"`
			Name        string  `json:"name"`
			Price       float64 `json:"price"`
			Quantity    int     `json:"quantity"`
		} `json:"items"`
		TotalPrice float64 `json:"total_price"` 
	}

	// Bind the JSON payload
	if err := c.ShouldBindJSON(&orderPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Serialize the items into JSON
	itemsJSON, err := json.Marshal(orderPayload.Items)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to serialize items"})
		return
	}

	// Create the order object
	order := models.Order{
		CustomerName: orderPayload.CustomerName,
		Email:        orderPayload.Email,
		Phone:        orderPayload.Phone,
		Items:        string(itemsJSON),
		TotalPrice:   orderPayload.TotalPrice,
		OrderDate:    time.Now(),
	}

	// Save the order in the database
	if err := database.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	c.JSON(http.StatusCreated, order)
}

// UpdateOrderStatus updates the order status to 'paid'
func UpdateOrderStatus(c *gin.Context) {
    orderID := c.Param("id")  // Get order ID from URL

    // Find the order by ID
    var order models.Order
    if err := database.DB.First(&order, orderID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
        return
    }

    // Update the order status to 'paid'
    order.OrderStatus = "paid"

    // Save the updated order in the database
    if err := database.DB.Save(&order).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update order status"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Order status updated to 'paid'", "order": order})
}


// DeleteOrder deletes an order from the database
func DeleteOrder(c *gin.Context) {
	id := c.Param("id")
	var order models.Order
	if err := database.DB.First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	if err := database.DB.Delete(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to delete order"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Order deleted successfully"})
}
