import { FaRegTrashCan } from "react-icons/fa6";

const Card = ({ image, name, price, quantity }) => {
  return (
    <div className="group flex flex-col m-[5px] h-[350px] w-[250px] items-center justify-between relative overflow-hidden rounded-lg shadow-lg bg-gray-200">
      <div className="flex-1 w-full flex items-center justify-center z-10">
        <img
          src={image}
          alt={name}
          className="object-cover h-full w-full max-h-[200px] max-w-[200px] rounded-lg"
        />
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="text-sm font-semibold mb-2">Quantity: {quantity}</div>
        <p className="text-md font-medium text-gray-600">Rs. {price}</p>
      </div>

      <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:bg-red-600 transform group-hover:scale-110">
          <FaRegTrashCan className="text-gray-700 hover:text-white cursor-pointer text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Card;
