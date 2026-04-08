import {
  BookOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import EnrolledCourses from "../modules/student/pages/EnrolledCourses";
import OfferedCourses from "../modules/student/pages/OfferedCourses";
import StudentDashboard from "../modules/student/pages/StudentDashboard";
import type { TRoutes } from "../types";

export const studentRoutes: TRoutes[] = [
  {
    label: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
    icon: <DashboardOutlined />,
  },
  {
    label: "Offered Courses",
    path: "offered-courses",
    element: <OfferedCourses />,
    icon: <BookOutlined />,
  },
  {
    label: "Enrolled Courses",
    path: "enrolled-courses",
    element: <EnrolledCourses />,
    icon: <CheckCircleOutlined />,
  },
];
