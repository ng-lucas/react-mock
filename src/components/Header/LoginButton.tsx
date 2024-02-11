import { Link } from "react-router-dom"

export default function LoginButton() {
  return (
    <>
      <Link to="/login" className="nav-link mr-4 d-inline-flex align-items-center py-sm-3">
        <i className='bx bx-log-in fs-18 mr-2'></i>
        <span>Login</span>
      </Link>
    </>
  )
}