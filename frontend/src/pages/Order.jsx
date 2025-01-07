import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";

const Order = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold text-center ">View Invoices</h1>
      <ToastContainer />
      <OrderCard />
    </div>
  );
};

export default Order;
