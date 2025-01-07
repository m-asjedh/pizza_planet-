import { FaRegTrashCan } from "react-icons/fa6";
import { useTotalPrice } from "../context/TotalPriceContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { totalPrice, calculateTotalPrice, setTotalPrice, removeItem } =
    useTotalPrice();
  const [customerName, setCusomterName] = useState("");
  const [customerEmail, setCusomterEmail] = useState("");
  const [cusomterPhoneNo, setCusomterPhoneNo] = useState("");

  const handlOrderCreate = async () => {
    if (totalPrice.length == 0) {
      alert("No items in the order");
      return;
    }
    const total = calculateTotalPrice();

    const orderPayload = {
      customer_name: customerName,
      email: customerEmail,
      phone: cusomterPhoneNo,
      items: totalPrice.map((item) => ({
        pizza_id: item.pizzaTypeId || null,
        topping_id: item.toppingId || null,
        appetizer_id: item.appetizerId || null,
        beverage_id: item.beverageId || null,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total_price: total,
      order_date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/orders",
        orderPayload
      );
      if (response.status === 201) {
        toast.success("Order Created Succesfully");
        console.log("Order Payload:", orderPayload);
        setTotalPrice([]);
        setCusomterName("");
        setCusomterEmail("");
        setCusomterPhoneNo("");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.warn("Failed to create order. Please try again.");
    }
  };

  const handleCustomerName = (e) => {
    setCusomterName(e.target.value);
  };

  const handleCustomerEmail = (e) => {
    setCusomterEmail(e.target.value);
  };

  const handleCustomerPhoneNo = (e) => {
    setCusomterPhoneNo(e.target.value);
  };

  return (
    <div className="p-5 md:p-10">
      <div className="text-2xl font-semibold text-center mb-8">
        Order Summary
      </div>
      <div className="bg-white rounded-lg shadow-md p-5 md:p-8 mx-auto max-w-4xl">
        <div className="space-y-4">
          {totalPrice.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-sm md:text-base font-medium w-8 text-center">
                  {item.quantity}
                </div>
                <div className="text-sm md:text-base font-semibold">
                  {item.name}
                </div>
              </div>

              <div className="text-sm md:text-base flex justify-between items-center gap-4 md:justify-center">
                <div className="text-gray-700">
                  Rs. {item.price / item.quantity}
                </div>
                <div className="font-semibold text-gray-800">
                  Rs. {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-lg md:text-xl font-bold">
          <div>Total</div>
          <div>Rs. {calculateTotalPrice()}</div>
        </div>
      </div>

      <div className="text-2xl font-semibold text-center mt-14 mb-8">
        Customer Details
      </div>
      <div className="bg-white rounded-lg shadow-md p-5 md:p-8 mx-auto max-w-4xl">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <label
              htmlFor="customerName"
              className="w-full sm:w-1/3 text-md font-medium "
            >
              Name
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={handleCustomerName}
              placeholder="Enter customer name"
              className="w-full sm:w-2/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <label
              htmlFor="customerEmail"
              className="w-full sm:w-1/3 text-md font-medium "
            >
              Email
            </label>
            <input
              type="email"
              id="customerEmail"
              value={customerEmail}
              onChange={handleCustomerEmail}
              placeholder="Enter customer email"
              className="w-full sm:w-2/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <label
              htmlFor="customerPhoneNo"
              className="w-full sm:w-1/3 text-md font-medium "
            >
              Phone Number
            </label>
            <input
              type="text"
              id="customerPhoneNo"
              value={cusomterPhoneNo}
              onChange={handleCustomerPhoneNo}
              placeholder="Enter customer phone number"
              className="w-full sm:w-2/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handlOrderCreate}
              className="py-3 px-8 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
