import { Card, Col, Row, Statistic, Tag, Typography } from "antd";
import { useGetFacultyOfferedCoursesQuery } from "../../offeredCourse/offeredCourse.api";

const { Title, Text } = Typography;

const FacultyDashboard = () => {
  const { data, isLoading } = useGetFacultyOfferedCoursesQuery();

  const courses = data?.data || [];

  const totalCourses = courses.length;

  const ongoingCourses = courses.filter(
    (c) => c.semesterRegistration.status === "ONGOING",
  );

  const completedCourses = courses.filter(
    (c) => c.semesterRegistration.status === "ENDED",
  );

  const cardStyle = {
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
  };

  const cardBodyStyle = {
    padding: 20,
  };

  return (
    <div
      style={{
        padding: "16px",
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <Title level={4} style={{ marginBottom: 4 }}>
          Faculty Dashboard
        </Title>
        <Text type="secondary">Overview of your courses and activity</Text>
      </div>

      {/* KPI Cards */}
      <Row gutter={[16, 16]}>
        {[
          { title: "Total Courses", value: totalCourses },
          { title: "Ongoing", value: ongoingCourses.length },
          { title: "Completed", value: completedCourses.length },
          { title: "Total Sections", value: courses.length },
        ].map((item) => (
          <Col xs={24} sm={12} md={12} lg={6} key={item.title}>
            <Card style={cardStyle} styles={{ body: cardBodyStyle }}>
              <Statistic
                title={item.title}
                value={item.value}
                loading={isLoading}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Active Courses */}
      <div style={{ marginTop: 24 }}>
        <Card style={cardStyle} styles={{ body: cardBodyStyle }}>
          <Title level={5} style={{ marginBottom: 16 }}>
            Active Courses
          </Title>

          {ongoingCourses.length === 0 && (
            <Text type="secondary">No ongoing courses</Text>
          )}

          {ongoingCourses.map((course) => (
            <div
              key={course._id}
              style={{
                display: "flex",
                flexDirection: "column", // mobile friendly
                gap: 8,
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* Top Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap", // prevent overflow
                  gap: 8,
                }}
              >
                <Text strong>{course.course.title}</Text>

                <Tag color="green">{course.semesterRegistration.status}</Tag>
              </div>

              {/* Bottom Info */}
              <Text type="secondary">
                {course.course.prefix}-{course.course.code} • Section{" "}
                {course.section} • {course.startTime} - {course.endTime}
              </Text>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
