import { useEffect, useState } from "react";

export default function Follow(prop: {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  context: boolean;
}) {
  const { handleClick, context } = prop;

  const [followed, setFollowed] = useState<string | null>(null);

  useEffect(() => {
    if (context) {
      setFollowed("Following");
    } else {
      setFollowed("Follow");
    }
  }, [context]);

  return (
    <div className="col-lg-12">
      <div className="text-center align-items-center">
        <button
          className="btn btn-warning box-shadow-none py-1 px-5"
          onClick={handleClick}
        >
          {followed}
        </button>
      </div>
    </div>
  );
}
