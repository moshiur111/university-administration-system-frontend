import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        University Administration System
      </Header>

      {/* Content */}
      <Content style={{ padding: "24px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
