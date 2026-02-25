import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <h1>This is MainLayout component</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;