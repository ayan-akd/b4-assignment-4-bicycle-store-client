import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import CustomFooter from "./CustomFooter";

const MainLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Header className="px-5 md:px-10">
        <div className="flex justify-around items-center gap-2">
          <NavLink to="/">
            <div className="text-xl font-bold text-white">Pedal Paradise</div>
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
        <CustomFooter />
      </Footer>
    </Layout>
  );
};

export default MainLayout;
