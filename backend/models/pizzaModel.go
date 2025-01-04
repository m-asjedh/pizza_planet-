package models

type Pizza struct {
	ID        uint    `json:"id" gorm:"primaryKey"`
	Name      string  `json:"name"`
	Price     float64 `json:"price"`
	ToppingID uint    `json:"topping_id"`
}
