import { FaRegTrashCan } from "react-icons/fa6";
import { useTotalPrice } from "../context/TotalPriceContext";

const OrderSummary = () => {
  const { totalPrice, calculateTotalPrice } = useTotalPrice();
  return (
    <div className="p-5 md:p-10">
      <div className="text-2xl font-semibold text-center mb-8">
        Order Summary
      </div>
      <div className="bg-gray-100 rounded-lg shadow-md p-5 md:p-8 mx-auto max-w-4xl">
        <div className="space-y-4">
          {totalPrice.map((item) => (
            <div
              key={item.id}
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

              <div className="text-sm md:text-base flex justify-between items-center gap-4 flex-1 md:justify-center">
                <div className="text-gray-700">
                  Rs. {item.price / item.quantity}
                </div>
                <div className="font-semibold text-gray-800">
                  Rs. {item.price}
                </div>
              </div>

              <div>
                <FaRegTrashCan
                  color="red"
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-lg md:text-xl font-bold">
          <div>Total</div>
          <div>Rs. {calculateTotalPrice()}</div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="py-3 px-8 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200">
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
