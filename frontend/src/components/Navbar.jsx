import { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("HOME");

  const tabs = ["HOME", "ORDERS", "PRODUCTS"];

  return (
    <div className="bg-black h-[60px]  m-2 flex justify-between items-center px-6 rounded-full mb-10">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-[40px]" />
      </div>

      <div className="flex gap-7 items-center">
        {tabs.map((tab) => (
          <div
            key={tab}
            className="relative cursor-pointer px-4 py-2 text-white font-medium"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transition-all duration-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
