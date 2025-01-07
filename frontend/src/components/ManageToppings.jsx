import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ManageToppings = () => {
  const [toppings, setToppings] = useState([]);
  const [editingTopping, setEditingTopping] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newToppingName, setNewToppingName] = useState("");
  const [newToppingPrice, setNewToppingPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/toppings");
        setToppings(response.data);
      } catch (error) {
        console.error("Error fetching toppings:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (topping) => {
    setEditingTopping(topping);
    setUpdatedName(topping.name);
    setUpdatedPrice(topping.price);
  };

  const handleUpdate = async () => {
    const price = parseFloat(updatedPrice);
    if (!editingTopping) return;
    try {
      await axios.put(`http://localhost:8080/toppings/${editingTopping.id}`, {
        name: updatedName,
        price: price,
      });
      setToppings((prev) =>
        prev.map((item) =>
          item.id === editingTopping.id
            ? { ...item, name: updatedName, price: updatedPrice }
            : item
        )
      );
      setEditingTopping(null);
      toast.success(`${editingTopping.name} updated`);
    } catch (error) {
      console.error("Error updating topping:", error);
      toast.warn(`Error updating ${editingTopping.name}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/toppings/${id}`);
      setToppings((prev) => prev.filter((item) => item.id !== id));
      toast.success(`Deleted Successfully`);
    } catch (error) {
      console.error("Error deleting topping:", error);
      toast.warn("Error deleting");
    }
  };

  const handleAddTopping = async () => {
    const price = parseFloat(newToppingPrice);
    try {
      const response = await axios.post(
        "http://localhost:8080/toppings",
        {
          name: newToppingName,
          price: price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToppings((prev) => [...prev, response.data]);
      setShowAddModal(false);
      setNewToppingName("");
      setNewToppingPrice("");
      toast.success(`Added ${newToppingName} `);
    } catch (error) {
      console.error("Error adding topping:", error);
      toast.warn(`Error adding ${newToppingName}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-lg font-semibold mb-4">Toppings</h2>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <FaPlus className="inline mr-2" /> Add New Topping
      </button>
      {toppings.length === 0 ? (
        <p>No toppings available</p>
      ) : (
        toppings.map((topping) => (
          <div
            key={topping.id}
            className="flex justify-between items-center border-b pb-2 mb-2"
          >
            <div>
              {topping.name} - Rs. {topping.price}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(topping)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(topping.id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}

      {editingTopping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Topping</h3>
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
                onClick={() => setEditingTopping(null)}
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

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add New Topping</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={newToppingName}
                onChange={(e) => setNewToppingName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                value={newToppingPrice}
                onChange={(e) => setNewToppingPrice(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTopping}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageToppings;
