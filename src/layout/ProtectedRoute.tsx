import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

type Props = {
  children: ReactNode;
  allowedRoles?: string[];
};
const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { token, role } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
