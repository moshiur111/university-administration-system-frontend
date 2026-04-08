import { Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import FacultyLayout from "../layout/faculty/FacultyLayout";
import StudentLayout from "../layout/student/StudentLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import type { TRoutes } from "../types";
import { adminRoutes } from "./admin.routes";
import { facultyRoutes } from "./faculty.routes";
import { studentRoutes } from "./student.routes";

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
    role: ["admin"],
    children: [
      // Default redirect: /admin → /admin/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      ...adminRoutes,
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
    ],
  },
];
