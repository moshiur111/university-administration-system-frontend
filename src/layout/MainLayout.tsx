import {
  AppstoreAddOutlined,
  LineChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Row, Space, Typography } from "antd";
import { motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout
      style={{ minHeight: "100vh", overflow: "hidden", background: "#020617" }}
    >
      {/* HEADER */}
      <Header
        style={{
          background: "rgba(2, 6, 23, 0.6)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Space>
          <div style={{ fontSize: 24, marginRight: 8 }}>🎓</div>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            UniAdmin
          </Text>
        </Space>

        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ fontWeight: 600, paddingInline: 24 }}
          onClick={() => navigate("/login")}
        >
          Login Portal
        </Button>
      </Header>

      {/* HERO */}
      <Content>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            paddingTop: 80, // Offset for fixed header
            background:
              "radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(147, 51, 234, 0.15), transparent 25%)",
          }}
        >
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Title
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-1px",
                marginBottom: 24,
              }}
            >
              <span style={{ color: "white" }}>The Operating System for</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Modern Universities
              </span>
            </Title>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ maxWidth: 600, padding: "0 20px" }}
          >
            <Text style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.6 }}>
              Unify your academic operations. Manage students, orchestrate
              courses, and analyze performance through one beautiful interface.
            </Text>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ marginTop: 40 }}
          >
            <Space size="middle" wrap style={{ justifyContent: "center" }}>
              <Button
                type="primary"
                size="large"
                style={{
                  height: 52,
                  paddingInline: 32,
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 8,
                  background: "#3b82f6",
                  border: "none",
                  boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)",
                }}
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>

              <Button
                size="large"
                ghost
                style={{
                  height: 52,
                  paddingInline: 32,
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 8,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                Book a Demo
              </Button>
            </Space>
          </motion.div>
        </div>

        {/* FLOATING FEATURE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            maxWidth: 1000,
            margin: "-100px auto 80px",
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(24px)",
            borderRadius: 24,
            padding: "48px 40px",
            color: "white",
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Row
            gutter={[32, 32]}
            justify="center"
            style={{ textAlign: "center" }}
          >
            <Col xs={24} md={8}>
              <TeamOutlined
                style={{ fontSize: 36, color: "#3b82f6", marginBottom: 16 }}
              />
              <Title level={4} style={{ color: "white", marginTop: 0 }}>
                Student Central
              </Title>
              <Text style={{ color: "#94a3b8" }}>
                Complete visibility into student records, enrollments, and
                academic progress.
              </Text>
            </Col>
            <Col xs={24} md={8}>
              <AppstoreAddOutlined
                style={{ fontSize: 36, color: "#8b5cf6", marginBottom: 16 }}
              />
              <Title level={4} style={{ color: "white", marginTop: 0 }}>
                Course Engine
              </Title>
              <Text style={{ color: "#94a3b8" }}>
                Build curriculums, schedule classes, and manage faculty
                assignments effortlessly.
              </Text>
            </Col>
            <Col xs={24} md={8}>
              <LineChartOutlined
                style={{ fontSize: 36, color: "#ec4899", marginBottom: 16 }}
              />
              <Title level={4} style={{ color: "white", marginTop: 0 }}>
                Smart Analytics
              </Title>
              <Text style={{ color: "#94a3b8" }}>
                Real-time data insights to help your administration make better
                decisions.
              </Text>
            </Col>
          </Row>
        </motion.div>

        <Outlet />
      </Content>

      {/* FOOTER */}
      <Footer
        style={{
          textAlign: "center",
          background: "#020617",
          color: "#64748b",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 50px",
        }}
      >
        © {new Date().getFullYear()} UniAdmin. Designed for the future of
        education.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
