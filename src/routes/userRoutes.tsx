
import OrderHistory from "@/pages/user/OrderHistory";
import UserDashboard from "../pages/user/UserDashboard";
import { TUserPaths } from "../types";

const userPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My Orders",
    path: "order-history",
    element: <OrderHistory />,
  },
];

export default userPaths;
