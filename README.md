# 🍕 Pizza Planet

A web application to manage pizza billing efficiently. This project allows the pizza shop owner to handle orders, manage products (like toppings, beverages, and appetizers), and generate detailed invoices.

---

## 🌟 Features

- 🛒 **Create Orders**: 
  - Select pizza options, toppings, beverages, and appetizers.
  - Add customer details name, email and phone number.
  - Create the order

- 📄 **Order Management**:
  - Can view all the orders created.
  - Can delete orders
  - Can update the order status from UNPAID to PAID

- 🍕 **Product Management**:
  - Manage toppings, beverages, and appetizers via an intuitive UI.
  - API-driven CRUD operations for products like add new products, edit the exsiting products and delete existing products.

---

## 🛠️ Tech Stack

- **Frontend**: React/Next.js
- **Backend**: Go
- **Database**: PostgreSQL
- **Architecture**: MVC Pattern

---

## 🚀 How to Run the Project

## 1️⃣ Clone the Repository
### git clone https://github.com/your-username/pizza-billing-app.git
### cd pizza-billing-app

---

## 2️⃣ Backend Setup
- cd backend
- go mod tidy
- Create a database "pizza_planet".
- Update the database/config.go file with your PostgreSQL credentials.
- go run main.go

## 3️⃣ Frontend Setup
- cd frontend
- npm install
- npm run dev

---

## 🔧 API Endpoints
🍕 Pizza Management
GET /pizzas/ - Get all pizzas.
GET /pizzas/:id - Get a specific pizza by ID.
POST /pizzas/ - Add a new pizza.
PUT /pizzas/:id - Update a pizza.
DELETE /pizzas/:id - Delete a pizza.

🌶️ Topping Management
GET /toppings/ - Get all toppings.
GET /toppings/:id - Get a specific topping by ID.
POST /toppings/ - Add a new topping.
PUT /toppings/:id - Update a topping.
DELETE /toppings/:id - Delete a topping.

🥤 Beverage Management
GET /beverages/ - Get all beverages.
GET /beverages/:id - Get a specific beverage by ID.
POST /beverages/ - Add a new beverage.
PUT /beverages/:id - Update a beverage.
DELETE /beverages/:id - Delete a beverage.

🍟 Appetizer Management
GET /appetizers/ - Get all appetizers.
GET /appetizers/:id - Get a specific appetizer by ID.
POST /appetizers/ - Add a new appetizer.
PUT /appetizers/:id - Update an appetizer.
DELETE /appetizers/:id - Delete an appetizer.

🛒 Order Management
GET /orders/ - Get all orders.
GET /orders/:id - Get a specific order by ID.
POST /orders/ - Create a new order.
PATCH /orders/:id/status - Update the order status.
DELETE /orders/:id - Delete an order.

