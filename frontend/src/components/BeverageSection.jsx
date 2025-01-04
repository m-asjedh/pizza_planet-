import Card from "./Card";
import BeverageImg from "../assets/beverage.svg";

const BeverageSection = () => {
  return (
    <>
      <div className="text-xl font-semibold mt-10 text-center">
        Select Beverage
      </div>
      <div className="my-4 mx-5 md:mx-20 h-auto border rounded-md p-4">
        <div className="text-xl font-semibold m-4 text-center">Beverage</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card image={BeverageImg} name="Chocalate MilkShake" price="12.99" />
          <Card image={BeverageImg} name="Vanilla MilkShake" price="14.99" />
          <Card image={BeverageImg} name="Moijito" price="11.99" />
          <Card image={BeverageImg} name="Cocktail" price="13.99" />
        </div>
      </div>
    </>
  );
};

export default BeverageSection;
