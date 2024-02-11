import { Link } from "react-router-dom"

export default function SignupButton() {
  return (
    <>
      <Link to="/signup" className="nav-link mr-4 d-inline-flex align-items-center py-sm-3">
        <i className='bx bx-user-plus fs-20 fs-sm-13 mr-2'></i>
        <span>Signup</span>
      </Link>
    </>
  )
}