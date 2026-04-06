import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Header */}
      <Header
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          paddingInline: "24px",
        }}
      >
        University Administration System
      </Header>

      {/* Content */}
      <Content style={{ padding: "24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
