import Card from "./Card";
import AppetizerImg from "../assets/appetizer.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTotalPrice } from "../context/TotalPriceContext";
import { toast } from "react-toastify";

const AppetizerSection = () => {
  const { addItem, removeItem } = useTotalPrice();
  const [appetizers, setAppetizers] = useState([]);
  const [selectedAppetizer, setSelectedAppetizer] = useState(null);
  const [quantity, setQuantity] = useState();
  const [createdCards, setCreatedCards] = useState([]);

  useEffect(() => {
    const fetchAppetizer = async () => {
      try {
        const response = await axios.get("http://localhost:8080/appetizers");
        setAppetizers(response.data);
      } catch (error) {
        console.error("Error fetching appetizers:", error);
      }
    };
    fetchAppetizer();
  }, []);

  const handleAppetizerChange = (e) => {
    const selectedAppetizer = appetizers.find(
      (appetizer) => appetizer.name === e.target.value
    );
    setSelectedAppetizer(selectedAppetizer);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleCreateCard = () => {
    if (selectedAppetizer && quantity > 0) {
      const totalPrice = selectedAppetizer.price * quantity;

      const newCard = {
        id: Date.now() + Math.random(),
        appteizerId: selectedAppetizer.id,
        name: selectedAppetizer.name,
        price: totalPrice,
        quantity,
      };

      setCreatedCards((prevCards) => [...prevCards, newCard]);
      addItem(newCard);
      setSelectedAppetizer(null);
      setQuantity(1);
      toast.success(`${selectedAppetizer.name} created`);
    } else {
      toast.warn("Please select appetizer and qaunttity");
    }
  };

  const handleRemoveCard = (id) => {
    setCreatedCards((prevCards) => prevCards.filter((card) => card.id !== id));
    removeItem(id);
    toast.success("Appetizer removed successfully!");
  };

  return (
    <div className="p-4">
      <div className="my-4 h-auto border rounded-md p-4 bg-white">
        <div className="text-xl font-semibold mb-10  text-center">
          Select Appetizer
        </div>

        <div className="flex flex-col md:flex-row md:justify-between">
          <select
            value={selectedAppetizer?.name || ""}
            onChange={handleAppetizerChange}
            className="mb-4 p-2 border rounded-md"
          >
            <option value="" disabled>
              Select Appetizers
            </option>
            {appetizers.map((appetizer) => (
              <option key={appetizer.id} value={appetizer.name}>
                {appetizer.name} (Rs. {appetizer.price})
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
            Create the Appetizer
          </button>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {createdCards.map((card) => (
              <Card
                key={card.id}
                image={AppetizerImg}
                name={card.name}
                price={card.price}
                quantity={card.quantity}
                onRemove={() => handleRemoveCard(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppetizerSection;
