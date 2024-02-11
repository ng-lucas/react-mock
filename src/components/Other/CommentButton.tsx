export default function CommentButton({ onClick }) {
  return (
    <div className="col-lg-12">
      <div className="text-center align-items-center">
        <input className="submit" id="submit" name="submit" type="submit" value="Post Comment" onClick={onClick} />
      </div>
    </div>
  )
}
