import { Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import type { TRoutes } from "../types";
import { adminRoutes } from "./admin.routes";

export const publicRoutes: TRoutes[] = [
  // Public Layout
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

  // Auth Route
  {
    path: "/login",
    element: <Login />,
  },

  // Admin Panel (Protected)
  {
    path: "/admin",
    element: <AdminLayout />,
    roles: ["admin"],
    children: [
      // Default redirect: /admin → /admin/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      ...adminRoutes,
    ],
  },
];
