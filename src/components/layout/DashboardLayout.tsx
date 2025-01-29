import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Footer, Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";

const { Content } = Layout;
const DashboardLayout = () => {
  return (
    <div>
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar />
        <Layout>
          <Header className="pl-10 pr-2 lg:pl-0 ">
            <Navbar />
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
