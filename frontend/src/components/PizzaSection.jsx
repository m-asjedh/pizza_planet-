import Card from "./Card";
import PizzaImg from "../assets/pizza.svg";
import ToppingsImg from "../assets/toppings.svg";

const PizzaSection = () => {
  return (
    <>
      <div className="text-xl font-semibold mb-4 text-center">
        Select Pizza & Toppings
      </div>
      <div className="my-4 mx-5 md:mx-20 h-auto border rounded-md p-4">
        <div className="text-xl font-semibold m-4 text-center">Pizza</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card image={PizzaImg} name="Delicious Pizza" price="12.99" />
          <Card image={PizzaImg} name="Pepperoni Pizza" price="14.99" />
          <Card image={PizzaImg} name="Cheese Pizza" price="11.99" />
          <Card image={PizzaImg} name="Veggie Pizza" price="13.99" />
        </div>

        <div className="text-xl font-semibold m-4 text-center">Toppings</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card image={ToppingsImg} name="Spicy Red Sauce" price="12.99" />
          <Card image={ToppingsImg} name="BBQ Sauce." price="14.99" />
          <Card image={ToppingsImg} name="Tomato sauce" price="11.99" />
          <Card image={ToppingsImg} name="Marinara sauce" price="13.99" />
        </div>
      </div>
    </>
  );
};

export default PizzaSection;
