import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import type { TRoutes } from "../types";

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
