// import { Button, Table, Tag } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { useGetStudentOfferedCoursesQuery } from "../../offeredCourse/offeredCourse.api";
// import type { TStudentOfferedCourse } from "../../offeredCourse/offeredCourse.types";

// const OfferedCourses = () => {
//   const { data, isLoading } = useGetStudentOfferedCoursesQuery(undefined);

//   const courses = data?.data || [];

//   const handleEnroll = (id: string) => {
//     console.log("Enroll course:", id);
//     // later connect mutation
//   };

//   const columns: ColumnsType<TStudentOfferedCourse> = [
//     {
//       title: "Course",
//       dataIndex: ["course", "title"],
//       key: "course",
//     },
//     {
//       title: "Code",
//       render: (_, record) => `${record.course.prefix}-${record.course.code}`,
//     },
//     {
//       title: "Credits",
//       dataIndex: ["course", "credits"],
//     },
//     {
//       title: "Section",
//       dataIndex: "section",
//     },
//     {
//       title: "Days",
//       render: (_, record) =>
//         record.days.map((day) => <Tag key={day}>{day}</Tag>),
//     },
//     {
//       title: "Time",
//       render: (_, record) => `${record.startTime} - ${record.endTime}`,
//     },
//     {
//       title: "Capacity",
//       dataIndex: "maxCapacity",
//     },
//     {
//       title: "Action",
//       render: (_, record) => (
//         <Button type="primary" onClick={() => handleEnroll(record._id)}>
//           Enroll
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2 style={{ marginBottom: 16 }}>Offered Courses</h2>

//       <Table
//         rowKey="_id"
//         loading={isLoading}
//         columns={columns}
//         dataSource={courses}
//         pagination={{
//           total: data?.meta?.total,
//           pageSize: data?.meta?.limit,
//         }}
//       />
//     </div>
//   );
// };

// export default OfferedCourses;

import {
  Alert,
  Button,
  Empty,
  Grid,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetStudentOfferedCoursesQuery } from "../../offeredCourse/offeredCourse.api";
import type { TStudentOfferedCourse } from "../../offeredCourse/offeredCourse.types";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const OfferedCourses = () => {
  const screens = useBreakpoint();

  const { data, isLoading, isError, refetch } =
    useGetStudentOfferedCoursesQuery(undefined);

  const courses = data?.data || [];

  const handleEnroll = (id: string) => {
    console.log("Enroll course:", id);
  };

  // 🔥 Responsive columns
  const columns: ColumnsType<TStudentOfferedCourse> = [
    {
      title: "Course",
      dataIndex: ["course", "title"],
      key: "course",
      ellipsis: true,
    },
    {
      title: "Code",
      key: "code",
      render: (_, record) => `${record.course.prefix}-${record.course.code}`,
      responsive: ["sm"], // hide on xs
    },
    {
      title: "Credits",
      dataIndex: ["course", "credits"],
      responsive: ["md"],
    },
    {
      title: "Section",
      dataIndex: "section",
      responsive: ["md"],
    },
    {
      title: "Days",
      key: "days",
      render: (_, record) => (
        <Space wrap>
          {record.days.map((day) => (
            <Tag key={day}>{day}</Tag>
          ))}
        </Space>
      ),
      responsive: ["lg"],
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: "Capacity",
      dataIndex: "maxCapacity",
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      fixed: screens.md ? "right" : undefined,
      render: (_, record) => (
        <Button
          type="primary"
          size={screens.xs ? "small" : "middle"}
          onClick={() => handleEnroll(record._id)}
        >
          Enroll
        </Button>
      ),
    },
  ];

  // 🔥 Loading state (better than spinner)
  if (isLoading) {
    return <Skeleton active />;
  }

  // 🔥 Error state
  if (isError) {
    return (
      <Alert
        message="Failed to load courses"
        description="Please try again."
        type="error"
        showIcon
        action={
          <Button size="small" onClick={refetch}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Title level={4} style={{ margin: 0 }}>
          Offered Courses
        </Title>
      </div>

      {/* Table */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={courses}
        scroll={{ x: "max-content" }} // 🔥 horizontal scroll for small devices
        pagination={{
          total: data?.meta?.total,
          pageSize: data?.meta?.limit,
          showSizeChanger: true,
        }}
        locale={{
          emptyText: <Empty description="No courses available right now" />,
        }}
      />
    </div>
  );
};

export default OfferedCourses;
