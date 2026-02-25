import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Login from "../pages/auth/Login";
import type { TRoutes } from "../types";

export const publicRoutes: TRoutes[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    roles: ["admin"],
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
];
