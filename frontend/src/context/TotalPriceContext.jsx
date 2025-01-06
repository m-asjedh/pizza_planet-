import { createContext, useContext, useState } from "react";

export const TotalPriceContext = createContext();

export const TotalPriceProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState([]);

  const addItem = (item) => {
    setTotalPrice((prevItems) => [...prevItems, item]);
    console.log(item);
  };

  const calculateTotalPrice = () => {
    return totalPrice.reduce((total, item) => total + item.price, 0);
  };

  console.log(totalPrice);

  return (
    <TotalPriceContext.Provider
      value={{ totalPrice, addItem, calculateTotalPrice, setTotalPrice }}
    >
      {children}
    </TotalPriceContext.Provider>
  );
};

export const useTotalPrice = () => {
  const context = useContext(TotalPriceContext);
  if (!context) {
    throw new Error("useTotalPricemust ne within the ToalPriceProvider");
  }
  return context;
};
