import axios from "axios";
import { useEffect, useState } from "react";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleMarkAsPaid = async (orderId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/orders/${orderId}/status`,
        {
          orderStatus: "paid",
        }
      );
      if (response.status === 200) {
        alert("Order marked as paid!");
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, order_status: "paid" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error marking order as paid:", error);
      alert("Failed to mark order as paid. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen m-2 lg:m-10 rounded-lg">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 space-y-6 mb-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1 space-y-4">
                <div className="text-xl font-semibold ">
                  Order ID: {order.id}
                </div>
                <div className="text-md ">
                  <span>Customer Name: </span>
                  {order.customer_name}
                </div>
                <div className="text-md ">
                  <span>Order Date: </span>
                  <span>{new Date(order.order_date).toLocaleDateString()}</span>
                  <span className="ml-2">
                    {new Date(order.order_date).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="text-lg font-semibold text-gray-800">
                  Items:
                </div>
                {JSON.parse(order.items).map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between gap-6">
                      <div>{item.quantity}</div>
                      <div>{item.name}</div>
                      <div>Rs. {item.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-4 font-semibold text-gray-800">
                  <div>Total</div>
                  <div>Rs. {order.total_price.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="text-center text-lg font-semibold text-gray-800">
                  Order Status
                </div>
                <div
                  className={`text-center font-semibold ${
                    order.order_status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.order_status === "paid" ? "PAID" : "UNPAID"}
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center md:items-start">
                <button
                  onClick={() => handleMarkAsPaid(order.id)}
                  className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 w-full md:w-auto"
                >
                  Mark As Paid
                </button>
                <button className="py-2 px-12 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 w-full md:w-auto">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderCard;
