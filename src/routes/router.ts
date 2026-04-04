import { createBrowserRouter } from "react-router-dom";
import { generateRoutes } from "../utils/routeGenerator";
import { publicRoutes } from "./routes";

export const router = createBrowserRouter([...generateRoutes(publicRoutes)]);
