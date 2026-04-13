import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const isAuth = localStorage.getItem("auth") === "true";

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;