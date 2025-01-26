import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../components/layout/DashboardLayout";
import UserDashboard from "../pages/user/UserDashboard";
import { routesGenerator } from "../utils/routesGenerator";
import mainRoutes from "./mainRoutes";
import adminPaths from "./adminRoutes";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(mainRoutes),
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/users",
    element: <DashboardLayout />,
    children: [
      {
        path: "users/dashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);

export default router;