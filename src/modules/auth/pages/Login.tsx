import { zodResolver } from "@hookform/resolvers/zod";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Button, Card, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import DemoAccounts from "../../../pages/DemoAccounts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { verifyToken } from "../../../utils/verifyToken";
import { useLoginMutation } from "../auth.api";
import type { TLoginForm } from "../auth.types";
import { loginSchema } from "../auth.validation";
import { selectCurrentUser, setUser } from "../authSlice";

const { Title, Text } = Typography;

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);

  // track password change flag WITHOUT state (no re-render needed)
  const needsPasswordChangeRef = useRef(false);

  const onSubmit = async (data: TLoginForm) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      if (!res?.data?.accessToken) {
        throw new Error("Invalid response from server");
      }

      const token = res.data.accessToken;
      const decodedUser = verifyToken(token);

      // store flag temporarily
      needsPasswordChangeRef.current = res.data.needsPasswordChange;

      dispatch(
        setUser({
          user: decodedUser,
          token,
        }),
      );

      toast.success(res.message || "Login successful!", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      const error = err as FetchBaseQueryError;

      const message =
        (error?.data as { message?: string })?.message ||
        (err as Error)?.message ||
        "Invalid credentials. Please try again.";

      toast.error(message, { id: toastId, duration: 2000 });
    }
  };

  // final navigation logic (race-condition safe)
  useEffect(() => {
    if (user) {
      if (needsPasswordChangeRef.current) {
        navigate("/change-password", { replace: true });
      } else {
        navigate(`/${user.role}/dashboard`, { replace: true });
      }
    }
  }, [user, navigate]);

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

        {/* Custom Form */}
        <UMForm onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
          <UMInput name="userId" label="User ID" />
          <UMInput name="password" label="Password" type="password" />

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

          {/* Forgot Password */}
          <div style={{ textAlign: "right", marginTop: 8 }}>
            <Button
              type="link"
              size="small"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Button>
          </div>

          {/* Demo Accounts */}
          <DemoAccounts />
        </UMForm>

        {/* Footer */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Text type="secondary">© 2026 University System</Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
