import { NavLink } from "react-router-dom";
import { TSidebarRoute, TUser, TUserPaths } from "../types";

const navRouteGenerator = (
  routes: TUserPaths[],
  token?: string | null,
  user?: TUser | null
): TSidebarRoute[] => {
  const navItems: TSidebarRoute[] = routes
    .filter((route) => {
      if (
        ["Orders", "Product Details", "Login", "Signup"].includes(route.name)
      ) {
        return false;
      }
      return true;
    })
    .map((route) => ({
      key: route.name,
      label: (
        <NavLink to={route.name === "Home" ? "/" : `/${route.path}`}>
          {route.name}
        </NavLink>
      ),
    }));

  if (token) {
    navItems.push({
      key: "dashboard",
      label: <NavLink to={`/${user?.role}/dashboard`}>Dashboard</NavLink>,
    });
  }

  return navItems;
};

export default navRouteGenerator;
