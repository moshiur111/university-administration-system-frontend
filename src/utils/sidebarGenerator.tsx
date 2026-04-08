import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import type { TRoutes } from "../types";

type TMenuItem = Required<MenuProps>["items"][number];

export const generateSidebarItems = (
  routes: TRoutes[],
  basePath: string,
): TMenuItem[] => {
  return routes.reduce((acc: TMenuItem[], route: TRoutes) => {
    // Single route
    if (route.path && route.label) {
      acc.push({
        key: `${basePath}/${route.path}`,
        icon: route.icon,
        label: <Link to={`${basePath}/${route.path}`}>{route.label}</Link>,
      });
    }

    // Group (nested)
    if (route.children && route.label) {
      acc.push({
        key: route.label,
        icon: route.icon,
        label: route.label,
        children: route.children
          .filter((child: TRoutes) => child.path && child.label)
          .map((child: TRoutes) => ({
            key: `${basePath}/${child.path}`,
            icon: child.icon,
            label: <Link to={`${basePath}/${child.path}`}>{child.label}</Link>,
          })),
      });
    }

    return acc;
  }, []);
};
