import { Button, Card, Col, Row, Typography } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { TRTKError } from "../../../types";

import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import { useAppDispatch } from "../../../redux/hooks";
import { useChangePasswordMutation } from "../auth.api";
import { logout } from "../authSlice";

const { Title, Text } = Typography;

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (
    data: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => {
    const toastId = toast.loading("Changing password...");
    try {
      const res = await changePassword(data).unwrap();

      if (res?.data?.success) {
        toast.success("Password changed successfully", {
          id: toastId,
          duration: 2000,
        });
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error(res?.data?.error?.message || "Something went wrong");
      }

      methods.reset();
    } catch (err) {
      const error = err as TRTKError;

      const errorMessage =
        error?.data?.errorSources?.[0]?.message ??
        error?.data?.message ??
        "Failed to change password";

      toast.error(errorMessage, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        padding: "16px",
        background: "#f9fafb", // subtle SaaS background
      }}
    >
      <Col xs={24} sm={20} md={16} lg={10} xl={8}>
        <Card
          style={{
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
          bodyStyle={{ padding: "32px 24px" }}
        >
          {/* Header */}
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <Title level={3} style={{ marginBottom: 4 }}>
              Change Password
            </Title>
            <Text type="secondary">
              Update your password to keep your account secure
            </Text>
          </div>

          {/* Form */}
          <UMForm onSubmit={onSubmit}>
            <UMInput
              type="password"
              name="oldPassword"
              label="Current Password"
            />
            <UMInput type="password" name="newPassword" label="New Password" />

            <Button
              htmlType="submit"
              type="primary"
              block
              loading={isLoading}
              style={{
                marginTop: 12,
                height: 44,
                borderRadius: 8,
                fontWeight: 500,
              }}
            >
              Update Password
            </Button>
          </UMForm>
        </Card>
      </Col>
    </Row>
  );
};

export default ChangePassword;
