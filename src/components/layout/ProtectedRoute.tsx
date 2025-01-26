import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { TRole, TUser } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";

type TProtectedRoute = {
  children: ReactNode;
  role: TRole | undefined;
};

export default function ProtectedRoute({ children, role }: TProtectedRoute) {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const dispatch = useAppDispatch();
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (role !== undefined && user?.role !== role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
