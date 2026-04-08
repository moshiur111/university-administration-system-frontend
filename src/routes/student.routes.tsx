import {
  BarChartOutlined,
  BellOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ComingSoon from "../components/shared/ComingSoon";
import OfferedCourses from "../modules/student/pages/OfferedCourses";
import StudentDashboard from "../modules/student/pages/StudentDashboard";
import type { TRoutes } from "../types";

// export const studentRoutes: TRoutes[] = [
//   {
//     label: "Dashboard",
//     path: "dashboard",
//     element: <StudentDashboard />,
//     icon: <DashboardOutlined />,
//   },
//   {
//     label: "Offered Courses",
//     path: "offered-courses",
//     element: <OfferedCourses />,
//     icon: <BookOutlined />,
//   },
//   {
//     label: "Enrolled Courses",
//     path: "enrolled-courses",
//     element: <EnrolledCourses />,
//     icon: <CheckCircleOutlined />,
//   },
// ];

export const studentRoutes: TRoutes[] = [
  {
    label: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
    icon: <DashboardOutlined />,
  },

  // Core Academic
  {
    label: "Offered Courses",
    path: "offered-courses",
    element: <OfferedCourses />,
    icon: <BookOutlined />,
  },
  {
    label: "Enrolled Courses",
    path: "enrolled-courses",
    element: <ComingSoon key="enrolled-courses" feature="Enrolled Courses" />,
    icon: <CheckCircleOutlined />,
  },

  // Daily Workflow
  {
    label: "Schedule",
    path: "schedule",
    element: <ComingSoon key="schedule" feature="Class Schedule & Calendar" />,
    icon: <CalendarOutlined />,
  },

  // Academic Actions
  {
    label: "Assignments",
    path: "assignments",
    element: (
      <ComingSoon key="assignments" feature="Assignments & Submissions" />
    ),
    icon: <FileTextOutlined />,
  },

  // Engagement
  {
    label: "Notifications",
    path: "notifications",
    element: <ComingSoon key="notifications" feature="Notifications Center" />,
    icon: <BellOutlined />,
  },

  // Analytics (SaaS Level)
  {
    label: "Analytics",
    path: "analytics",
    element: (
      <ComingSoon key="analytics" feature="Student Performance Analytics" />
    ),
    icon: <BarChartOutlined />,
  },

  // Settings (Always needed)
  {
    label: "Settings",
    path: "settings",
    element: <ComingSoon key="settings" feature="Account & Preferences" />,
    icon: <SettingOutlined />,
  },
];
