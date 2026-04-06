import {
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CreateStudent from "../modules/student/pages/CreateStudent";
import StudentDetails from "../modules/student/pages/StudentDetails";
import StudentList from "../modules/student/pages/StudentList";
import AdminDashboard from "../pages/admin/AdminDashboard";
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
        label: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
        icon: <UserAddOutlined />,
      },
      {
        label: "Students",
        path: "students",
        element: <StudentList />,
        icon: <UserOutlined />,
      },
      {
        path: "students/:studentId",
        element: <StudentDetails />,
      },
    ],
  },
];
