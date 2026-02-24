import Home from "../pages/Home";
import Login from "../pages/Login";
import type { TRoutes } from "../types/route.types";

export const publicRoutes: TRoutes[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
