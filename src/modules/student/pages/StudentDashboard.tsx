import {
  BarChartOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Card, Col, List, Row, Table, Tag } from "antd";

const StudentDashboard = () => {
  // Mock Data (replace later with RTK Query)
  const stats = [
    { title: "Enrolled Courses", value: 6, icon: <BookOutlined /> },
    { title: "Completed", value: 3, icon: <CheckCircleOutlined /> },
    { title: "Ongoing", value: 3, icon: <ClockCircleOutlined /> },
    { title: "Avg GPA", value: "3.75", icon: <BarChartOutlined /> },
  ];

  const courses = [
    {
      key: "1",
      course: "Data Structures",
      instructor: "Dr. Smith",
      status: "ongoing",
    },
    {
      key: "2",
      course: "Algorithms",
      instructor: "Dr. John",
      status: "completed",
    },
  ];

  const schedule = [
    { time: "10:00 AM", course: "Data Structures" },
    { time: "12:00 PM", course: "Algorithms" },
  ];

  const activities = [
    "Assignment submitted for Data Structures",
    "New lecture uploaded in Algorithms",
    "Quiz scheduled tomorrow",
  ];

  const columns = [
    {
      title: "Course",
      dataIndex: "course",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "ongoing" ? "blue" : "green"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <Row gutter={[16, 16]}>
        {stats.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{item.title}</p>
                  <h2 className="text-2xl font-semibold">{item.value}</h2>
                </div>
                <div className="text-xl text-blue-500">{item.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Grid */}
      <Row gutter={[16, 16]}>
        {/* Courses */}
        <Col xs={24} lg={16}>
          <Card
            title="My Courses"
            extra={<a href="/student/courses">View All</a>}
            className="rounded-2xl shadow-sm"
          >
            <Table
              columns={columns}
              dataSource={courses}
              pagination={false}
              rowKey="key"
            />
          </Card>
        </Col>

        {/* Schedule */}
        <Col xs={24} lg={8}>
          <Card title="Today's Schedule" className="rounded-2xl shadow-sm">
            <List
              dataSource={schedule}
              renderItem={(item) => (
                <List.Item>
                  <div className="flex justify-between w-full">
                    <span>{item.course}</span>
                    <span className="text-gray-500">{item.time}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Activity */}
        <Col xs={24}>
          <Card title="Recent Activity" className="rounded-2xl shadow-sm">
            <List
              dataSource={activities}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;
