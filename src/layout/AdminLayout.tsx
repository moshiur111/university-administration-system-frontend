import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Space, theme, Typography } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={80}
        width={250}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
        }}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all 0.2s ease",
        }}
      >
        {/* Header */}
        <Header
          style={{
            padding: "0 20px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            position: "sticky",
            top: 0,
            zIndex: 9,
          }}
        >
          {/* Left */}
          <Space size="middle">
            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              style={{ fontSize: 18 }}
            />

            <Text strong style={{ fontSize: 16 }}>
              Admin Dashboard
            </Text>
          </Space>

          {/* Right */}
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Header>

        {/* Content */}
        <Content style={{ margin: "24px" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 112px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
