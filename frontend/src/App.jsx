import AppetizerSection from "./components/AppetizerSection";
import BeverageSection from "./components/BeverageSection";
import Navbar from "./components/Navbar";
import PizzaSection from "./components/PizzaSection";

const App = () => {
  return (
    <div>
      <Navbar />
      <PizzaSection />
      <AppetizerSection />
      <BeverageSection />
    </div>
  );
};

export default App;
