import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

const ManageAppetizers = () => {
  const [appetizers, setAppetizers] = useState([]);
  const [editingAppetizer, setEditingAppetizer] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppetizerName, setNewAppetizerName] = useState("");
  const [newAppetizerPrice, setNewAppetizerPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/appetizers");
        setAppetizers(response.data);
      } catch (error) {
        console.error("Error fetching appetizers:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (appetizer) => {
    setEditingAppetizer(appetizer);
    setUpdatedName(appetizer.name);
    setUpdatedPrice(appetizer.price);
  };

  const handleUpdate = async () => {
    const price = parseFloat(updatedPrice);
    if (!editingAppetizer) return;
    try {
      await axios.put(
        `http://localhost:8080/appetizers/${editingAppetizer.id}`,
        {
          name: updatedName,
          price: price,
        }
      );
      setAppetizers((prev) =>
        prev.map((item) =>
          item.id === editingAppetizer.id
            ? { ...item, name: updatedName, price: updatedPrice }
            : item
        )
      );
      setEditingAppetizer(null);
    } catch (error) {
      console.error("Error updating appetizer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/appetizers/${id}`);
      setAppetizers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting appetizer:", error);
    }
  };

  const handleAddAppetizer = async () => {
    const price = parseFloat(newAppetizerPrice);
    try {
      const response = await axios.post("http://localhost:8080/appetizers", {
        name: newAppetizerName,
        price: price,
      });
      setAppetizers((prev) => [...prev, response.data]);
      setShowAddModal(false);
      setNewAppetizerName("");
      setNewAppetizerPrice("");
    } catch (error) {
      console.error("Error adding appetizer:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-lg font-semibold mb-4">Appetizers</h2>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
      >
        <FaPlus className="mr-2" /> Add New Appetizer
      </button>
      {appetizers.length === 0 ? (
        <p>No appetizers available</p>
      ) : (
        appetizers.map((appetizer) => (
          <div
            key={appetizer.id}
            className="flex justify-between items-center border-b pb-2 mb-2"
          >
            <div>
              {appetizer.name} - Rs. {appetizer.price}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(appetizer)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(appetizer.id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}

      {editingAppetizer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Appetizer</h3>
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
                onClick={() => setEditingAppetizer(null)}
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
            <h3 className="text-lg font-bold mb-4">Add New Appetizer</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={newAppetizerName}
                onChange={(e) => setNewAppetizerName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                value={newAppetizerPrice}
                onChange={(e) => setNewAppetizerPrice(e.target.value)}
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
                onClick={handleAddAppetizer}
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

export default ManageAppetizers;
