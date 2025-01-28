import Home from "../pages/Home/Home";
import AllProducts from "../pages/user/AllProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/user/ProductDetails";
import { TUserPaths } from "../types";
import About from "../pages/About";
import Checkout from "@/pages/user/Checkout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import VerifyOrder from "@/pages/user/VerifyOrder";

const mainRoutes: TUserPaths[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "All Products",
    path: "all-products",
    element: <AllProducts />,
  },
  {
    name: "Product Details",
    path: "product/:productId",
    element: <ProductDetails />,
  },
  {
    name: "Checkout",
    path: "checkout/:productId",
    element: (
      <ProtectedRoute role="customer">
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    name: "Login",
    path: "login",
    element: <Login />,
  },
  {
    name: "Signup",
    path: "signup",
    element: <Register />,
  },
  {
    name: "About",
    path: "about",
    element: <About />,
  },
  {
    name: "Verify Order",
    path: "verify-order",
    element: (
      <ProtectedRoute role="customer">
        <VerifyOrder />,
      </ProtectedRoute>
    ),
  },
];

export default mainRoutes;
