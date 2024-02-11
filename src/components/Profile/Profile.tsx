export default function Profile(props: {
  username: string;
  bio: string;
  image: string;
}) {
  const { username, bio, image } = props;

  return (
    <>
      <div className="row">
        <div className="col-lg-6 offset-lg-3 text-center">
          <img
            className="mb-5 object-fit-fill rounded-circle"
            style={{ width: "180px", height: "180px" }}
            src={image}
            alt="avatar"
          />
          <h5 className="text-uppercase mb-20px">{username}</h5>
          <p>{bio}</p>
        </div>
      </div>
    </>
  );
}
