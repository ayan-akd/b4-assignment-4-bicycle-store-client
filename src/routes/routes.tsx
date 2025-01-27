import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routesGenerator } from "../utils/routesGenerator";
import mainRoutes from "./mainRoutes";
import adminPaths from "./adminRoutes";
import ErrorPage from "@/pages/ErrorPage";
import userPaths from "./userRoutes";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(mainRoutes),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: <DashboardLayout />,
    children: routesGenerator(userPaths)
  },
]);

export default router;