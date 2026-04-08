import type { ReactNode } from "react";

export type TRoutes = {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: TRoutes[];
  role?: string[];
  label?: string;
  icon?: ReactNode;
};
