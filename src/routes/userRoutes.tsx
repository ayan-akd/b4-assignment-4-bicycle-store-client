
import UserDashboard from "../pages/user/UserDashboard";
import { TUserPaths } from "../types";

const userPaths: TUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
];

export default userPaths;
