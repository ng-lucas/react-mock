import { Link } from "react-router-dom"

export default function SettingButton() {
  return (
    <>
      <Link to="/setting" className="mr-2 nav-link d-inline-flex align-items-center py-sm-3">
        <i className='bx bx-cog fs-18 fs-sm-13 mr-2' ></i>
        <span>Setting</span>
      </Link>
    </>
  )
}