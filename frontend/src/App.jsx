import { Outlet } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
