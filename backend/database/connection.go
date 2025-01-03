package database

import (
	"log"
	"pizza_planet_backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
    dsn := "host=localhost user=postgres password=asjedh02 dbname=pizza_planet port=5432 sslmode=disable TimeZone=Asia/Shanghai"
    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

	err = DB.AutoMigrate(
		&models.Pizza{},
		&models.Beverage{},
		&models.Appetizer{},
		&models.Topping{},
		&models.Order{},
	)
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

    log.Println("Database connected successfully")
}
