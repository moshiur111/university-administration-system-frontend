import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import { adminRoutes } from "../../routes/admin.routes";
import { generateSidebarItems } from "../../utils/sidebarGenerator";

type Props = {
  collapsed: boolean;
};

const AdminSidebar = ({ collapsed }: Props) => {
  const location = useLocation();

  const items = generateSidebarItems(adminRoutes, "/admin");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#001529",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          paddingLeft: collapsed ? 0 : 20,
          color: "white",
          fontWeight: 600,
          fontSize: collapsed ? 14 : 18,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {collapsed ? "UA" : "Uni Admin"}
      </div>

      {/* Scrollable Menu Wrapper */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="sidebar-scroll"
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["User Management"]}
          items={items}
          style={{
            borderRight: 0,
            paddingTop: 8,
          }}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
