import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Footer, Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import CustomFooter from "./CustomFooter";


const { Content } = Layout;
const DashboardLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <div>
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar />
        <Layout>
          <Header className="pl-10 pr-2 md:pl-0 ">
            <div className="flex justify-around items-center gap-2">
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
          <Content style={{ margin: "24px 16px 0" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <CustomFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
