import Card from "./Card";
import PizzaImg from "../assets/pizza.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTotalPrice } from "../context/TotalPriceContext";

const PizzaSection = () => {
  const { addItem } = useTotalPrice();
  const [pizzaType, setPizzaType] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedPizzaType, setSelectedPizzaType] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [quantity, setQuantity] = useState();
  const [createdCards, setCreatedCards] = useState([]);

  useEffect(() => {
    const fetchPizzaAndToppings = async () => {
      try {
        const pizzaTypeResponse = await axios.get(
          "http://localhost:8080/pizzas"
        );
        const topppingsResponse = await axios.get(
          "http://localhost:8080/toppings"
        );
        setPizzaType(pizzaTypeResponse.data);
        setToppings(topppingsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPizzaAndToppings();
  }, []);

  const handlePizzaTypeChange = (e) => {
    const selectedType = pizzaType.find((type) => type.name === e.target.value);
    setSelectedPizzaType(selectedType);
  };

  const handleToppingChange = (e) => {
    const selectedTopping = toppings.find(
      (topping) => topping.name === e.target.value
    );
    setSelectedTopping(selectedTopping);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleCreateCard = () => {
    if (selectedPizzaType && selectedTopping && quantity > 0) {
      const totalPrice =
        (selectedPizzaType.price + selectedTopping.price) * quantity;

      const newCard = {
        pizzaTypeId: selectedPizzaType.id,
        toppingId: selectedTopping.id,
        name: `${selectedPizzaType.name} with ${selectedTopping.name}`,
        price: totalPrice,
        quantity,
      };

      setCreatedCards((prevCards) => [...prevCards, newCard]);
      addItem(newCard);
      setSelectedPizzaType(null);
      setSelectedTopping(null);
      setQuantity(1);
    } else {
      alert("Please select pizza type, topping, and enter a valid quantity.");
    }
  };

  return (
    <div className="p-4">
      <div className="my-4 h-auto border rounded-md p-4 bg-white ">
        <div className="text-xl font-semibold mb-10 text-center ">
          Select Pizza, Toppings, and Quantity
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <select
            value={selectedPizzaType?.name || ""}
            onChange={handlePizzaTypeChange}
            className="mb-4 p-2 border rounded-md"
          >
            <option value="" disabled>
              Select Pizza Type
            </option>
            {pizzaType.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name} (Rs. {type.price})
              </option>
            ))}
          </select>

          <select
            value={selectedTopping?.name || ""}
            onChange={handleToppingChange}
            className="mb-4 p-2 border rounded-md"
          >
            <option value="" disabled>
              Select Topping
            </option>
            {toppings.map((topping) => (
              <option key={topping.id} value={topping.name}>
                {topping.name} (Rs. {topping.price})
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="mb-4 p-2 border rounded-md"
            placeholder="Select the Qauntity"
          />

          <button
            onClick={handleCreateCard}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create the PIZZA
          </button>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {createdCards.map((card, index) => (
              <Card
                key={index}
                image={PizzaImg}
                name={card.name}
                price={card.price}
                quantity={card.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaSection;
