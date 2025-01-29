import { Menu, Layout, Button } from "antd";
const { Sider } = Layout;
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types";
import sidebarItemGenerator from "../../utils/sidebarItemGenerator";
import adminPaths from "../../routes/adminRoutes";
import userPaths from "../../routes/userRoutes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiMenuFold4Fill, RiMenuFold3Fill } from "react-icons/ri";
import logo from "../../assets/icons/icon.png";
const userRole = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  let sidebarItems: ItemType<MenuItemType>[] | undefined;
  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(
        adminPaths,
        userRole.ADMIN
      ) as ItemType<MenuItemType>[];
      break;
    case userRole.CUSTOMER:
      sidebarItems = sidebarItemGenerator(
        userPaths,
        userRole.CUSTOMER
      ) as ItemType<MenuItemType>[];
      break;
    default:
      sidebarItems = undefined;
      break;
  }
  return (
    <Sider
      translate="yes"
      breakpoint="lg"
      collapsedWidth="0"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <Link to="/" className="flex items-center gap-1">
        <img
          src={logo}
          alt="logo"
          className="w-10 h-10 bg-white rounded-full"
        />
        <div className="md:text-xl font-bold my-5 text-white">
          Pedal Paradise
        </div>
      </Link>
      <div
        className="block lg:hidden z-50"
        style={{
          position: "absolute",
          top: "4%",
          transform: "translateY(-50%)",
          left: collapsed ? "5px" : "190px",
          transition: "left 0.3s",
          zIndex: 10,
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <RiMenuFold4Fill className="text-4xl text-blue-700" />
        ) : (
          <RiMenuFold3Fill className="text-4xl text-blue-700" />
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[`My Profile`]}
        items={sidebarItems}
      />
      {!collapsed && (
        <div className="absolute bottom-4 left-0 w-full px-4">
          <Button
            type="primary"
            danger
            onClick={handleLogout}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      )}
    </Sider>
  );
}
