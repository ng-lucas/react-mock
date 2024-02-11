import { Link } from "react-router-dom";

export default function ProfileButton() {
  return (
    <Link to="/user" className="mr-2 nav-link d-inline-flex align-items-center py-sm-3">
      <i className='bx bx-user fs-20 fs-sm-12 mr-2' ></i>
      <span>User</span>
    </Link>
  )
}