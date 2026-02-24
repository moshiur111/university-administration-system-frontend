import type { RouteObject } from "react-router-dom";
import type { TRoutes } from "../types/route.types";

export const generateRoutes = (routes: TRoutes[]): RouteObject[] => {
  return routes.map((route) => ({
    path: route.path,
    element: route.element,
    children: route.children ? generateRoutes(route.children) : undefined,
  }));
};
