package models

import "time" 

type Order struct {
    ID           uint       `json:"id" gorm:"primaryKey"`
    CustomerName string     `json:"customer_name"`
    Email        string     `json:"email"`
    Phone        string     `json:"phone"`
    PizzaID      uint       `json:"pizza_id"`
    ToppingID    uint       `json:"topping_id"`  
    BeverageID   uint       `json:"beverage_id"`
    AppetizerID  uint       `json:"appetizer_id"`
    TotalPrice   float64    `json:"total_price"`
    OrderDate    time.Time  `json:"order_date"`
}
