import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ManagePizzaTypes = () => {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [editingPizza, setEditingPizza] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pizzas");
        setPizzaTypes(response.data);
      } catch (error) {
        console.error("Error fetching pizza types:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (pizza) => {
    setEditingPizza(pizza);
    setUpdatedName(pizza.name);
    setUpdatedPrice(pizza.price);
  };

  const handleUpdate = async () => {
    const price = parseFloat(updatedPrice);
    if (!editingPizza) return;
    try {
      await axios.put(`http://localhost:8080/pizzas/${editingPizza.id}`, {
        name: updatedName,
        price: price,
      });
      setPizzaTypes((prev) =>
        prev.map((item) =>
          item.id === editingPizza.id
            ? { ...item, name: updatedName, price: updatedPrice }
            : item
        )
      );
      setEditingPizza(null);
      toast.success(`${editingPizza.name} updated`);
    } catch (error) {
      console.error("Error updating pizza type:", error);
      toast.warn(`Error updating ${editingPizza.name}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pizzas/${id}`);
      setPizzaTypes((prev) => prev.filter((item) => item.id !== id));
      toast.success(`Deleted Successfully`);
    } catch (error) {
      console.error("Error deleting pizza type:", error);
      toast.warn("Error deleting");
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-lg font-semibold mb-4"> Pizza Types</h2>
      {pizzaTypes.length === 0 ? (
        <p>No pizza types available</p>
      ) : (
        pizzaTypes.map((pizza) => (
          <div
            key={pizza.id}
            className="flex justify-between items-center border-b pb-2 mb-2"
          >
            <div>
              {pizza.name} - Rs. {pizza.price}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(pizza)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(pizza.id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}

      {editingPizza && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Pizza</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingPizza(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePizzaTypes;
