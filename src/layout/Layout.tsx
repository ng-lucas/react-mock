import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Toast from "../components/Other/Toast";

const Layout = () => {
  return (
    <div>
      <Header />

      <div className="container" style={{ marginTop: "3em" }}>
        <Outlet />
      </div>
      <Toast />
    </div>
  );
};

export default Layout;
