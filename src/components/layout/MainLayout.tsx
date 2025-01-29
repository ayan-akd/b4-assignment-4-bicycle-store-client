import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import CustomFooter from "./CustomFooter";
import logo from "../../assets/icons/icon.png";

const MainLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Header className="px-5 md:px-10">
        <div className="flex justify-around items-center gap-2">
          <NavLink className="flex items-center gap-1" to="/">
          <img src={logo} alt="logo" className="w-10 h-10 bg-white rounded-full" />
            <div className="md:text-xl font-bold text-white">Pedal Paradise</div>
          </NavLink>
          <Navbar />
          {token ? (
            <Button danger onClick={handleLogout}>Logout</Button>
          ) : (
            <NavLink to="/login">
              <Button type="primary">Login</Button>
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
