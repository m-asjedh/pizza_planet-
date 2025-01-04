import Card from "./Card";
import AppetizerImg from "../assets/appetizer.svg";

const AppetizerSection = () => {
  return (
    <>
      <div className="text-xl font-semibold mt-10 text-center">
        Select Appetizer
      </div>
      <div className="my-4 mx-5 md:mx-20 h-auto border rounded-md p-4">
        <div className="text-xl font-semibold m-4 text-center">Appetizer</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card image={AppetizerImg} name="Mozzarella sticks" price="12.99" />
          <Card image={AppetizerImg} name="Garlic knots" price="14.99" />
          <Card image={AppetizerImg} name="Fried calamari" price="11.99" />
          <Card image={AppetizerImg} name="Loaded fries" price="13.99" />
        </div>
      </div>
    </>
  );
};

export default AppetizerSection;
