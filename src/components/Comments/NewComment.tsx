export default function NewComment() {
  return (
    <div className="comments-area" id="comments">
      <h2 className="comments-title h4">One Reply to “Hello world!”</h2>
      <ol className="comment-list">
        <li className="comment even thread-even depth-1" id="comment-1">
          <article className="comment-body" id="div-comment-1">
            <footer className="comment-meta">
              <div className="comment-author vcard"><img className="avatar" alt="profile pic"
                  src="images/profile-pic.jpg" height="100" width="100" /><b className="fn"><a className="url"
                    href="https://www.energeticthemes.com/" rel="external nofollow">Anushey Malik</a></b><span
                  className="says">says:</span></div>

              <div className="comment-metadata"><a href="#">
                  <time>July 29, 2018 at 9:45 pm</time></a></div>


              <div className="comment-content">
                <p>Aliquam in ante elit. Praesent blandit nibh ac justo auctor pretium. Maecenas mauris metus,
                  vulputate ac volutpat sit amet, facilisis quis odio. Nam ut commodo neque. Suspendisse
                  viverra massa eget nibh.</p>
              </div>

              <div className="reply"><a className="comment-reply-link" href="#">Reply</a></div>
            </footer>
          </article>


        </li>
      </ol>
      <div className="comment-respond" id="respond">
        <h3 className="comment-reply-title" id="reply-title">Leave a Reply </h3>
        <form className="comment-form" id="commentform" action="#" method="post" >
          <p className="comment-notes"><span id="email-notes">Your email address will not be published.</span>
            Required fields are marked <span className="required">*</span></p>
          <p className="comment-form-comment">
            <label htmlFor="comment">Comment</label>
            <textarea id="comment" name="comment" cols={10} rows={8} required={true}></textarea>
          </p>

          <p className="form-submit">
            <input className="submit" id="submit" name="submit" type="submit" value="Post Comment" />
            {/* <input id="comment_post_ID" type="hidden" name="comment_post_ID" value="1"> */}
            {/* <input id="comment_parent" type="hidden" name="comment_parent" value="0"> */}
          </p>
        </form>
      </div>

    </div>
  )
}