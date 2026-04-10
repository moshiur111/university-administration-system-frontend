import type { ReactNode } from "react";
import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { TUser } from "../modules/auth/auth.types";
import { selectCurrentToken } from "../modules/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

type Props = {
  children: ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  // Memoize decoding (avoid re-running on every render)
  const user: TUser | null = useMemo(() => {
    if (!token) return null;

    try {
      return verifyToken(token) as TUser;
    } catch {
      return null;
    }
  }, [token]);

  // Not authenticated
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // preserve redirect
      />
    );
  }

  // Unauthorized (role mismatch)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
