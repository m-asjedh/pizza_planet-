import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("HOME");
    } else if (location.pathname === "/orders") {
      setActiveTab("ORDERS");
    } else if (location.pathname === "/products") {
      setActiveTab("PRODUCTS");
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="hidden sm:block">
        <div className="bg-black h-[60px] m-2 flex justify-between items-center px-6 rounded-full lg:mb-10">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-[40px]" />
          </div>

          <div className="flex gap-7 items-center">
            <div
              className="relative cursor-pointer px-4 py-2 text-white font-medium"
              onClick={() => setActiveTab("HOME")}
            >
              <Link to="/" className="text-white">
                HOME
              </Link>
              {activeTab === "HOME" && (
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transition-all duration-300"></div>
              )}
            </div>

            <div
              className="relative cursor-pointer px-4 py-2 text-white font-medium"
              onClick={() => setActiveTab("ORDERS")}
            >
              <Link to="/orders" className="text-white">
                ORDERS
              </Link>
              {activeTab === "ORDERS" && (
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transition-all duration-300"></div>
              )}
            </div>

            <div
              className="relative cursor-pointer px-4 py-2 text-white font-medium"
              onClick={() => setActiveTab("PRODUCTS")}
            >
              <Link to="/products" className="text-white">
                PRODUCTS
              </Link>
              {activeTab === "PRODUCTS" && (
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transition-all duration-300"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="bg-black h-[60px] m-2 flex justify-between items-center px-6 rounded-full mb-10">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-[40px]" />
          </div>

          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="bg-black m-6 text-white py-4 flex flex-col items-center space-y-4 rounded-lg">
            <div
              className="cursor-pointer px-4 py-2 font-medium"
              onClick={() => {
                setActiveTab("HOME");
                setIsMenuOpen(false);
              }}
            >
              <Link to="/" className="text-white">
                HOME
              </Link>
              {activeTab === "HOME" && (
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transition-all duration-300"></div>
              )}
            </div>

            <div
              className="cursor-pointer px-4 py-2 font-medium"
              onClick={() => {
                setActiveTab("ORDERS");
                setIsMenuOpen(false);
              }}
            >
              <Link to="/orders" className="text-white">
                ORDERS
              </Link>
              {activeTab === "ORDERS" && (
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transition-all duration-300"></div>
              )}
            </div>

            <div
              className="cursor-pointer px-4 py-2 font-medium"
              onClick={() => {
                setActiveTab("PRODUCTS");
                setIsMenuOpen(false);
              }}
            >
              <Link to="/products" className="text-white">
                PRODUCTS
              </Link>
              {activeTab === "PRODUCTS" && (
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transition-all duration-300"></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
