import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

const ManageBeverages = () => {
  const [beverages, setBeverages] = useState([]);
  const [editingBeverage, setEditingBeverage] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBeverageName, setNewBeverageName] = useState("");
  const [newBeveragePrice, setNewBeveragePrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/beverages");
        setBeverages(response.data);
      } catch (error) {
        console.error("Error fetching beverages:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (beverage) => {
    setEditingBeverage(beverage);
    setUpdatedName(beverage.name);
    setUpdatedPrice(beverage.price);
  };

  const handleUpdate = async () => {
    const price = parseFloat(updatedPrice);
    if (!editingBeverage) return;
    try {
      await axios.put(`http://localhost:8080/beverages/${editingBeverage.id}`, {
        name: updatedName,
        price: price,
      });
      setBeverages((prev) =>
        prev.map((item) =>
          item.id === editingBeverage.id
            ? { ...item, name: updatedName, price: updatedPrice }
            : item
        )
      );
      setEditingBeverage(null);
    } catch (error) {
      console.error("Error updating beverage:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/beverages/${id}`);
      setBeverages((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting beverage:", error);
    }
  };

  const handleAddBeverage = async () => {
    const price = parseFloat(newBeveragePrice);
    try {
      const response = await axios.post("http://localhost:8080/beverages", {
        name: newBeverageName,
        price: price,
      });
      setBeverages((prev) => [...prev, response.data]);
      setShowAddModal(false);
      setNewBeverageName("");
      setNewBeveragePrice("");
    } catch (error) {
      console.error("Error adding beverage:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-lg font-semibold mb-4">Beverages</h2>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
      >
        <FaPlus className="mr-2" /> Add New Beverage
      </button>
      {beverages.length === 0 ? (
        <p>No beverages available</p>
      ) : (
        beverages.map((beverage) => (
          <div
            key={beverage.id}
            className="flex justify-between items-center border-b pb-2 mb-2"
          >
            <div>
              {beverage.name} - Rs. {beverage.price}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(beverage)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(beverage.id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}

      {editingBeverage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Beverage</h3>
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
                onClick={() => setEditingBeverage(null)}
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
            <h3 className="text-lg font-bold mb-4">Add New Beverage</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={newBeverageName}
                onChange={(e) => setNewBeverageName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                value={newBeveragePrice}
                onChange={(e) => setNewBeveragePrice(e.target.value)}
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
                onClick={handleAddBeverage}
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

export default ManageBeverages;
