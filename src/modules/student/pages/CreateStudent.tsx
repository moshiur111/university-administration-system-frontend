import { Card, Typography } from "antd";
import CreateStudentForm from "../components/CreateStudentForm";

const { Title, Text } = Typography;

const CreateStudent = () => {
  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
          styles={{ body: { padding: "16px 20px" } }}
        >
          <div style={{ marginBottom: 16 }}>
            <Title level={4} style={{ marginBottom: 4 }}>
              Create Student
            </Title>
            <Text type="secondary">Register a new student into the system</Text>
          </div>

          <CreateStudentForm />
        </Card>
      </div>
    </div>
  );
};

export default CreateStudent;
