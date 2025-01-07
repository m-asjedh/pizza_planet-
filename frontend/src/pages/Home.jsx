import { ToastContainer } from "react-toastify";
import AppetizerSection from "../components/AppetizerSection";
import BeverageSection from "../components/BeverageSection";
import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";
import PizzaSection from "../components/PizzaSection";
import { TotalPriceProvider } from "../context/TotalPriceContext";

const Home = () => {
  return (
    <div>
      <TotalPriceProvider>
        <Navbar />
        <h1 className="text-2xl font-bold text-center ">Create Order</h1>
        <div className="p-6 bg-gray-100 min-h-screen m-2 lg:m-10 rounded-lg">
          <ToastContainer />
          <PizzaSection />
          <AppetizerSection />
          <BeverageSection />
          <OrderSummary />
        </div>
      </TotalPriceProvider>
    </div>
  );
};

export default Home;
