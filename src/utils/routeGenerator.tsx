import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "../layout/ProtectedRoute";
import type { TRoutes } from "../types";

export const generateRoutes = (routes: TRoutes[]): RouteObject[] => {
  return routes.map((route) => {
    // If route has children but NO path → it's just a group (menu only)
    if (!route.path && route.children) {
      return {
        children: generateRoutes(route.children),
      };
    }

    return {
      path: route.path,
      element: route.role ? (
        <ProtectedRoute allowedRoles={route.role}>
          {route.element}
        </ProtectedRoute>
      ) : (
        route.element
      ),
      children: route.children ? generateRoutes(route.children) : undefined,
    };
  });
};
