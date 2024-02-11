import { Navigate, Outlet } from "react-router-dom";

export default function Public() {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : <Outlet />;
}
