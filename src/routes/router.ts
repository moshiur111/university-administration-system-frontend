import { createBrowserRouter } from "react-router-dom";
import { generateRoutes } from "./routeGenerator";
import { publicRoutes } from "./routes";

export const router = createBrowserRouter([...generateRoutes(publicRoutes)]);
