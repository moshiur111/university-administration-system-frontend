import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import { facultyRoutes } from "../../routes/faculty.routes";
import { generateSidebarItems } from "../../utils/sidebarGenerator";

type Props = {
  collapsed: boolean;
};

const FacultySidebar = ({ collapsed }: Props) => {
  const location = useLocation();

  const items = generateSidebarItems(facultyRoutes, "/faculty");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
          transition: "all 0.2s ease",
        }}
      >
        {collapsed ? "UF" : "Uni Faculty"}
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={["Faculty"]}
        items={items}
        style={{
          flex: 1,
          borderRight: 0,
          paddingTop: 8,
        }}
      />
    </div>
  );
};

export default FacultySidebar;
