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
        <PizzaSection />
        <AppetizerSection />
        <BeverageSection />
        <OrderSummary />
      </TotalPriceProvider>
    </div>
  );
};

export default Home;
