import {
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, List, Row, Typography } from "antd";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  // Mock data (replace later with API)
  const stats = [
    {
      title: "Total Students",
      value: 1200,
      icon: <UserOutlined />,
    },
    {
      title: "Total Courses",
      value: 85,
      icon: <BookOutlined />,
    },
    {
      title: "Active Semesters",
      value: 3,
      icon: <CalendarOutlined />,
    },
    {
      title: "Enrollments",
      value: 5400,
      icon: <BarChartOutlined />,
    },
  ];

  const activities = [
    "New student registered",
    "Course updated: Data Structures",
    "Semester registration opened",
    "Faculty assigned to course",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Title level={3} style={{ marginBottom: 0 }}>
          Admin Dashboard
        </Title>
        <Text type="secondary">
          Overview of system performance and activity
        </Text>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        {stats.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
              styles={{ body: { padding: "16px" } }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Text type="secondary">{item.title}</Text>
                  <Title level={3} style={{ margin: 0 }}>
                    {item.value}
                  </Title>
                </div>

                <div style={{ fontSize: 20, color: "#1677ff" }}>
                  {item.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Section */}
      <Row gutter={[16, 16]}>
        {/* Left - System Activity */}
        <Col xs={24} lg={16}>
          <Card
            title="Recent Activity"
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <List
              dataSource={activities}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>

        {/* Right - Quick Summary */}
        <Col xs={24} lg={8}>
          <Card
            title="Quick Summary"
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div className="space-y-2">
              <Text>Active Courses: 45</Text>
              <br />
              <Text>Pending Registrations: 120</Text>
              <br />
              <Text>Blocked Students: 12</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
