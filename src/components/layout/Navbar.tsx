import { Menu } from "antd";
import navRouteGenerator from "../../utils/navRoutesGenerator";
import mainRoutes from "../../routes/mainRoutes";
import { useAppSelector } from "@/redux/hooks";
import {
  useCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);

  const navItems = navRouteGenerator(mainRoutes, token, user);
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["Home"]}
      items={navItems}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export default Navbar;
