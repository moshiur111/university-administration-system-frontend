import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button, Card, Form, Input, Typography } from "antd";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

const { Title, Text } = Typography;

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const token = res.data.accessToken;
      const user = verifyToken(token);

      dispatch(
        setUser({
          user,
          token,
        }),
      );

      toast.success(res.message || "Login successful!", {
        id: toastId,
        duration: 2000,
      });

      navigate("/admin");
    } catch (err) {
      const error = err as FetchBaseQueryError;

      const message =
        (error.data as { message?: string })?.message ||
        "Invalid credentials. Please try again.";

      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
      }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 0 }}>
            Welcome Back 👋
          </Title>
          <Text type="secondary">Login to your account</Text>
        </div>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="userId"
            label="User ID"
            rules={[{ required: true, message: "Please enter your ID" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your ID"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter password"
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
            style={{ borderRadius: 8 }}
          >
            Login
          </Button>
        </Form>

        {/* Footer */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text type="secondary">© 2026 University System</Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
