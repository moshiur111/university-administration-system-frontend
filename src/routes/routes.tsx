import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/admin/AdminLayout";
import FacultyLayout from "../layout/faculty/FacultyLayout";
import StudentLayout from "../layout/student/StudentLayout";
import ChangePassword from "../modules/auth/pages/ChangePassword";
import Login from "../modules/auth/pages/Login";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import type { TRoutes } from "../types";
import { adminRoutes } from "./admin.routes";
import { facultyRoutes } from "./faculty.routes";
import { studentRoutes } from "./student.routes";

export const publicRoutes: TRoutes[] = [
  // Public Layout
  {
    path: "/",
    element: <MainLayout />,
  },

  // Admin Panel (Protected)
  {
    path: "/admin",
    element: <AdminLayout />,
    role: ["admin"],
    children: [
      // Default redirect: /admin → /admin/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      ...adminRoutes,

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // Student Panel (Protected)
  {
    path: "/student",
    element: <StudentLayout />,
    role: ["student"],
    children: [
      // Default redirect: /student → /student/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      ...studentRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // Faculty Panel (Protected)
  {
    path: "/faculty",
    element: <FacultyLayout />,
    role: ["faculty"],
    children: [
      // Default redirect: /faculty → /faculty/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      ...facultyRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // Auth Route
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },

  // 404 Route
  {
    path: "*",
    element: <NotFound />,
  },

  // Unauthorized Route
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];
