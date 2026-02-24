import type { ReactNode } from "react";

export type TRoutes = {
  path: string;
  element: ReactNode;
  children?: TRoutes[];
};
