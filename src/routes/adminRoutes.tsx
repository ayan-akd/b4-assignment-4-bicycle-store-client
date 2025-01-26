import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductManagement from "../pages/admin/ProductManagement";
import UserManagement from "../pages/admin/UserManagement";
import ProductDetails from "../pages/user/ProductDetails";
import { TUserPaths } from "../types";

const adminPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
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
    name: "Product Details",
    path: "products/:productId",
    element: <ProductDetails />,
  },
];

export default adminPaths;
