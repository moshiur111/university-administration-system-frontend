import { IdcardOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useFormContext } from "react-hook-form";

const { Text } = Typography;

type TLoginForm = {
  userId: string;
  password: string;
};

const DemoAccounts = () => {
  const { reset } = useFormContext<TLoginForm>();

  const users = [
    {
      role: "Admin",
      id: "A-0001",
      password: "admin123",
      icon: <UserOutlined />,
    },
    {
      role: "Student",
      id: "2025020001",
      password: "student123",
      icon: <TeamOutlined />,
    },
    {
      role: "Faculty",
      id: "F-0001",
      password: "faculty123",
      icon: <IdcardOutlined />,
    },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <Text strong>🚀 Quick Demo Login</Text>

      <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
        {users.map((user) => (
          <Button
            key={user.role}
            icon={user.icon}
            block
            style={{
              textAlign: "left",
              borderRadius: 8,
              height: "auto",
              padding: "10px",
            }}
            onClick={() =>
              reset({
                userId: user.id,
                password: user.password,
              })
            }
          >
            <div>
              <b>{user.role}</b>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                ID: {user.id} | Pass: {user.password}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DemoAccounts;
