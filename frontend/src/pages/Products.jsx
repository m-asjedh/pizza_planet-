import { ToastContainer } from "react-toastify";
import ManageAppetizers from "../components/ManageAppetizer";
import ManageBeverages from "../components/ManageBeverage";
import ManagePizzaTypes from "../components/ManagePizzaType";
import ManageToppings from "../components/ManageToppings";
import Navbar from "../components/Navbar";

const Products = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 m-2 lg:m-10 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Manage Products in the Store
        </h1>
        <div className="space-y-8">
          <ToastContainer />
          <ManagePizzaTypes />
          <ManageToppings />
          <ManageAppetizers />
          <ManageBeverages />
        </div>
      </div>
    </div>
  );
};

export default Products;
