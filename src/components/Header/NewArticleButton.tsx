import { Link } from "react-router-dom"

export default function NewArticleButton() {
  return (
    <>
      <Link to="/new-article" className="mr-2 nav-link d-inline-flex align-items-center py-sm-3">
        <i className='bx bx-edit fs-18 fs-sm-13 mr-2'></i>
        <span>New article</span>
      </Link>
    </>
  )
}