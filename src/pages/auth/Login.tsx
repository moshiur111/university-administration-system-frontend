import { Button, Form, Input } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../redux/modules/authApi";
import type { TLoginForm } from "../../types";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onFinish = async (data: TLoginForm) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    }

    try {
      const res = await login(userInfo).unwrap();

      dispatch(
        setUser({
          user: res.data.user,
          token: res.data.accessToken,
        }),
      );
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
