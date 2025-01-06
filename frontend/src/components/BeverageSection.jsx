import Card from "./Card";
import BeverageImg from "../assets/beverage.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTotalPrice } from "../context/TotalPriceContext";

const BeverageSection = () => {
  const { addItem } = useTotalPrice();
  const [beverages, setBeverages] = useState([]);
  const [selectedBeverage, setSelectedBeverage] = useState(null);
  const [quantity, setQuantity] = useState();
  const [createdCards, setCreatedCards] = useState([]);

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/beverages");
        setBeverages(response.data);
      } catch (error) {
        console.error("Error fetching beverages:", error);
      }
    };
    fetchBeverages();
  }, []);

  const handleBeverageChange = (e) => {
    const selectedBeverage = beverages.find(
      (beverage) => beverage.name === e.target.value
    );
    setSelectedBeverage(selectedBeverage);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleCreateCard = () => {
    if (selectedBeverage && quantity > 0) {
      const totalPrice = selectedBeverage.price * quantity;

      const newCard = {
        beverageId: selectedBeverage.id,
        name: selectedBeverage.name,
        price: totalPrice,
        quantity,
      };

      setCreatedCards((prevCards) => [...prevCards, newCard]);
      addItem(newCard);
      setSelectedBeverage(null);
      setQuantity(1);
    } else {
      alert("Please select beverage and qaunttity");
    }
  };

  return (
    <div className="p-4">
      <div className="my-4 h-auto border rounded-md p-4 bg-white">
        <div className="text-xl font-semibold mb-10  text-center">
          Select Beverages
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <select
            value={selectedBeverage?.name || ""}
            onChange={handleBeverageChange}
            className="mb-4 p-2 border rounded-md"
          >
            <option value="" disabled>
              Select Beverages
            </option>
            {beverages.map((beverage) => (
              <option key={beverage.id} value={beverage.name}>
                {beverage.name} (Rs. {beverage.price})
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
            Create the Beverage
          </button>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {createdCards.map((card) => (
              <Card
                key={card.id}
                image={BeverageImg}
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

export default BeverageSection;
