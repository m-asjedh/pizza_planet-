package main

import (
	"pizza_planet_backend/database" // Import the database package
)

func main() {
	// Call the Connect function from the database package to establish the connection
	database.Connect()
}
