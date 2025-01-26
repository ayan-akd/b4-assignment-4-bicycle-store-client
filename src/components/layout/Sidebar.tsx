import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types";
import sidebarItemGenerator from "../../utils/sidebarItemGenerator";
import adminPaths from "../../routes/adminRoutes";
import userPaths from "../../routes/userRoutes";
import { Link } from "react-router-dom";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

export default function Sidebar() {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  } else {
    user = {
      role: "admin",
    };
  }

  let sidebarItems: ItemType<MenuItemType>[] | undefined;
  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(
        adminPaths,
        userRole.ADMIN
      ) as ItemType<MenuItemType>[];
      break;
    case userRole.USER:
      sidebarItems = sidebarItemGenerator(
        userPaths,
        userRole.USER
      ) as ItemType<MenuItemType>[];
      break;
    default:
      sidebarItems = undefined;
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
      }}
    >
      <Link to="/">
        <div className="text-xl font-bold m-5 text-white">Bicycle Store</div>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
}
