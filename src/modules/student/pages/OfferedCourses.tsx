import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetStudentOfferedCoursesQuery } from "../../offeredCourse/offeredCourse.api";
import type { TStudentOfferedCourse } from "../../offeredCourse/offeredCourse.types";

const OfferedCourses = () => {
  const { data, isLoading } = useGetStudentOfferedCoursesQuery(undefined);

  const courses = data?.data || [];

  const handleEnroll = (id: string) => {
    console.log("Enroll course:", id);
    // later connect mutation
  };

  const columns: ColumnsType<TStudentOfferedCourse> = [
    {
      title: "Course",
      dataIndex: ["course", "title"],
      key: "course",
    },
    {
      title: "Code",
      render: (_, record) => `${record.course.prefix}-${record.course.code}`,
    },
    {
      title: "Credits",
      dataIndex: ["course", "credits"],
    },
    {
      title: "Section",
      dataIndex: "section",
    },
    {
      title: "Days",
      render: (_, record) =>
        record.days.map((day) => <Tag key={day}>{day}</Tag>),
    },
    {
      title: "Time",
      render: (_, record) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: "Capacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEnroll(record._id)}>
          Enroll
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Offered Courses</h2>

      <Table
        rowKey="_id"
        loading={isLoading}
        columns={columns}
        dataSource={courses}
        pagination={{
          total: data?.meta?.total,
          pageSize: data?.meta?.limit,
        }}
      />
    </div>
  );
};

export default OfferedCourses;
