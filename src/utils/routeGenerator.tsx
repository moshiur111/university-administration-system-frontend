import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import type { TRoutes } from "../types";

export const generateRoutes = (routes: TRoutes[]): RouteObject[] => {
  return routes.map((route) => ({
    path: route.path,
    element: route.roles ? (
      <ProtectedRoute allowedRoles={route.roles}>
        {route.element}
      </ProtectedRoute>
    ) : (
      route.element
    ),
    children: route.children ? generateRoutes(route.children) : undefined,
  }));
};
