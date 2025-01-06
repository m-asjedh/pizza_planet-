package models

import "time"

type Order struct {
    ID          uint      `json:"id" gorm:"primaryKey"`
    CustomerName string   `json:"customer_name"`
    Email        string   `json:"email"`
    Phone        string   `json:"phone"`
    Items        string   `json:"items" gorm:"type:json"` 
    TotalPrice   float64  `json:"total_price"`
    OrderDate    time.Time `json:"order_date"`
    OrderStatus  string   `json:"order_status" gorm:"default:'unpaid'"`
}
