import OrderManagement from "@/pages/admin/OrderManagement";
import ProductManagement from "../pages/admin/ProductManagement";
import UserManagement from "../pages/admin/UserManagement";
import { TUserPaths } from "../types";
import UserDashboard from "@/pages/user/UserDashboard";

const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Manage Users",
    path: "users",
    element: <UserManagement />,
  },
  {
    name: "Manage Products",
    path: "products",
    element: <ProductManagement />,
  },
  {
    name: "Manage Orders",
    path: "orders",
    element: <OrderManagement />,
  },
];

export default adminPaths;
