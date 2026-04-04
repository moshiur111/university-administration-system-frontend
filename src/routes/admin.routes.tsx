import {
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import Students from "../pages/admin/userManagement/Students";
import type { TRoutes } from "../types";

export const adminRoutes: TRoutes[] = [
  {
    label: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
    icon: <DashboardOutlined />,
  },
  {
    label: "User Management",
    icon: <TeamOutlined />,
    children: [
      {
        label: "Students",
        path: "students",
        element: <Students />,
        icon: <UserOutlined />,
      },
      {
        label: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
        icon: <UserAddOutlined />,
      },
    ],
  },
];
