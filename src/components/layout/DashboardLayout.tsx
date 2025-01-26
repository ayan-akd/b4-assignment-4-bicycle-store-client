import { NavLink, Outlet } from "react-router-dom";
import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";

const { Content } = Layout;
const DashboardLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar />
        <Layout>
          <Header>
            <div className="flex justify-around items-center gap-2">
              <Navbar />
              {token ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <NavLink to="/login">
                  <Button >Login</Button>
                </NavLink>
              )}
            </div>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            ></div>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
