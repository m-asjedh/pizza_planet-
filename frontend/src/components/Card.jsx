/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa";

const Card = ({ image, name, price }) => {
  return (
    <div className="group flex flex-col m-[5px] h-[400px] items-center justify-between relative overflow-hidden rounded-lg shadow-lg bg-white">
      {/* Image Section */}
      <div className="flex-1 w-full flex items-center justify-center z-10">
        <img
          src={image}
          alt={name}
          className="object-cover h-full w-full max-h-[200px] max-w-[200px] rounded-lg"
        />
      </div>

      {/* Name and Price Section */}
      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-md font-medium text-gray-600">${price}</p>
      </div>

      {/* Hover Action */}
      <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:bg-slate-600 transform group-hover:scale-110">
          <FaPlus className="text-gray-700 hover:text-white cursor-pointer text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Card;
