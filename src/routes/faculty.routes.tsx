import {
  BarChartOutlined,
  BookOutlined,
  DashboardOutlined,
  ScheduleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import ComingSoon from "../components/shared/ComingSoon";
import FacultyDashboard from "../modules/faculty/pages/FacultyDashboard";
import MyCourses from "../modules/faculty/pages/MyCourses";
import type { TRoutes } from "../types";

// export const facultyRoutes: TRoutes[] = [
//   {
//     label: "Dashboard",
//     path: "dashboard",
//     element: <FacultyDashboard />,
//     icon: <DashboardOutlined />,
//   },
//   {
//     label: "My Courses",
//     path: "my-courses",
//     element: <MyCourses />,
//     icon: <BookOutlined />,
//   },
// ];

export const facultyRoutes: TRoutes[] = [
  {
    label: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
    icon: <DashboardOutlined />,
  },
  {
    label: "My Courses",
    path: "my-courses",
    element: <MyCourses />,
    icon: <BookOutlined />,
  },

  // 🚧 Coming Soon Features
  {
    label: "Schedule",
    path: "schedule",
    element: <ComingSoon key="schedule" feature="Schedule" />,
    icon: <ScheduleOutlined />,
  },
  {
    label: "Students",
    path: "students",
    element: <ComingSoon key="students" feature="Student Management" />,
    icon: <TeamOutlined />,
  },
  {
    label: "Analytics",
    path: "analytics",
    element: <ComingSoon key="analytics" feature="Analytics Dashboard" />,
    icon: <BarChartOutlined />,
  },
];
