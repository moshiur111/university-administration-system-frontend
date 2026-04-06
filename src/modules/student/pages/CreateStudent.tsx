import { Card, Col, Row, Typography } from "antd";
import CreateStudentForm from "../components/CreateStudentForm";

const { Title, Text } = Typography;

const CreateStudent = () => {
  return (
    <div style={{ padding: 24 }}>
      <Row justify="center">
        <Col xs={24} lg={22} xl={20}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Title level={3}>Create Student</Title>
            <Text type="secondary">Register a new student into the system</Text>

            <div style={{ marginTop: 24 }}>
              <CreateStudentForm />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateStudent;
