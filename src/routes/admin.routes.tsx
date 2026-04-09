// import {
//   DashboardOutlined,
//   TeamOutlined,
//   UserAddOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import Courses from "../modules/course/pages/Courses";
// import CreateCourse from "../modules/course/pages/CreateCourse";
// import CreateOfferedCourse from "../modules/offeredCourse/pages/CreateOfferedCourse";
// import OfferedCourses from "../modules/offeredCourse/pages/OfferedCourses";
// import CreateSemesterRegistration from "../modules/semesterRegistration/pages/CreateSemesterRegistration";
// import RegisteredSemesters from "../modules/semesterRegistration/pages/RegisteredSemesters";
// import CreateStudent from "../modules/student/pages/CreateStudent";
// import StudentDetails from "../modules/student/pages/StudentDetails";
// import StudentList from "../modules/student/pages/StudentList";
// import AdminDashboard from "../pages/admin/AdminDashboard";
// import type { TRoutes } from "../types";

// export const adminRoutes: TRoutes[] = [
//   {
//     label: "Dashboard",
//     path: "dashboard",
//     element: <AdminDashboard />,
//     icon: <DashboardOutlined />,
//   },
//   {
//     label: "User Management",
//     icon: <TeamOutlined />,
//     children: [
//       {
//         label: "Create Student",
//         path: "create-student",
//         element: <CreateStudent />,
//         icon: <UserAddOutlined />,
//       },
//       {
//         label: "Students",
//         path: "students",
//         element: <StudentList />,
//         icon: <UserOutlined />,
//       },
//       {
//         path: "students/:studentId",
//         element: <StudentDetails />,
//       },
//     ],
//   },
//   {
//     label: "Course Management",
//     children: [
//       {
//         label: "Semester Registration",
//         path: "semester-registration",
//         element: <CreateSemesterRegistration />,
//       },
//       {
//         label: "Registered Semesters",
//         path: "registered-semesters",
//         element: <RegisteredSemesters />,
//       },
//       {
//         label: "Create Course",
//         path: "create-course",
//         element: <CreateCourse />,
//       },
//       {
//         label: "Courses",
//         path: "courses",
//         element: <Courses />,
//       },
//       {
//         label: "Create Offered Course",
//         path: "create-offered-course",
//         element: <CreateOfferedCourse />,
//       },
//       {
//         label: "Offered Courses",
//         path: "Offered Courses",
//         element: <OfferedCourses />,
//       },
//     ],
//   },
// ];

import {
  AppstoreOutlined,
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileTextOutlined,
  PlusOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import Courses from "../modules/course/pages/Courses";
import CreateCourse from "../modules/course/pages/CreateCourse";
import CreateOfferedCourse from "../modules/offeredCourse/pages/CreateOfferedCourse";
import OfferedCourses from "../modules/offeredCourse/pages/OfferedCourses";
import CreateSemesterRegistration from "../modules/semesterRegistration/pages/CreateSemesterRegistration";
import RegisteredSemesters from "../modules/semesterRegistration/pages/RegisteredSemesters";
import CreateStudent from "../modules/student/pages/CreateStudent";
import StudentDetails from "../modules/student/pages/StudentDetails";
import StudentList from "../modules/student/pages/StudentList";

import ComingSoon from "../components/shared/ComingSoon";
import type { TRoutes } from "../types";

export const adminRoutes: TRoutes[] = [
  // Dashboard
  {
    label: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
    icon: <DashboardOutlined />,
  },

  // User Management
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

  // Academic Management
  {
    label: "Academic",
    icon: <BookOutlined />,
    children: [
      {
        label: "Semester Registration",
        path: "semester-registration",
        element: <CreateSemesterRegistration />,
        icon: <CalendarOutlined />,
      },
      {
        label: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
        icon: <AppstoreOutlined />,
      },
    ],
  },

  // Course Management
  {
    label: "Courses",
    icon: <BookOutlined />,
    children: [
      {
        label: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
        icon: <PlusOutlined />,
      },
      {
        label: "All Courses",
        path: "courses",
        element: <Courses />,
        icon: <AppstoreOutlined />,
      },
      {
        label: "Create Offered Course",
        path: "create-offered-course",
        element: <CreateOfferedCourse />,
        icon: <PlusOutlined />,
      },
      {
        label: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
        icon: <AppstoreOutlined />,
      },
    ],
  },

  // Insights (SaaS Feel)
  {
    label: "Analytics",
    path: "analytics",
    element: (
      <ComingSoon key="admin-analytics" feature="Admin Analytics Dashboard" />
    ),
    icon: <BarChartOutlined />,
  },

  // Reports
  {
    label: "Reports",
    path: "reports",
    element: (
      <ComingSoon key="admin-reports" feature="Reports & Export System" />
    ),
    icon: <FileTextOutlined />,
  },

  // System
  {
    label: "Settings",
    path: "settings",
    element: (
      <ComingSoon key="admin-settings" feature="System Settings & Config" />
    ),
    icon: <SettingOutlined />,
  },
];
