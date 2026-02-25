import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../redux/modules/authApi";
import type { TLoginForm } from "../../types";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (data: TLoginForm) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    try {
      const res = await login(userInfo).unwrap();

      const token = res.data.accessToken;
      const user = verifyToken(token);

      dispatch(
        setUser({
          user,
          token,
          role: user.role,
        }),
      );

      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <h1>This is Login component</h1>
      <Form.Item name="userId" label="ID">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
