import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Outlet />
      {/* The Outlet component is a placeholder for the child route components of the current route(App) */}
    </>
  );
};
