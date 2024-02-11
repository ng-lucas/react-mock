import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/userReducer";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  return (
    <>
      <Link
        onClick={handleClick}
        to=""
        className="nav-link d-inline-flex align-items-center py-sm-3"
      >
        <i className="bx bx-log-out fs-20 mr-2 rotate-y-180"></i>
        <span>Logout</span>
      </Link>
    </>
  );
}
