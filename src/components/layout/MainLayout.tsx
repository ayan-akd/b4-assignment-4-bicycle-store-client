import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";

const MainLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Header>
        <div className="flex justify-around items-center gap-2">
          <NavLink to="/">
            <div className="text-xl font-bold text-white">Bicycle Store</div>
          </NavLink>
          <Navbar />
          {token ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
          )}
        </div>
      </Header>
      <Content style={{ height: "100%" }}>
        <div>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
