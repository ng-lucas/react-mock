import Follow from "../Other/Follow";
import { useNavigate, useParams } from "react-router";
import ProfileTabs from "../Tabs/ProfileTabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AUTHOR } from "../../saga/actionTypes";
import Profile from "./Profile";
import MoonLoader from "react-spinners/MoonLoader";
import { Params } from "react-router-dom";
import { useCallback, useEffect } from "react";

export default function Author() {
  const props: Readonly<Params<string>> = useParams();
  const usernameDispatch: string = decodeURIComponent(props.username || "");

  const author = useSelector((state: RootState) => state.author.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAuthor = useCallback(() => {
    dispatch({ type: AUTHOR.GETAUTHOR, payload: usernameDispatch });
  }, [dispatch, usernameDispatch]);

  useEffect(() => {
    getAuthor();
  }, [getAuthor]);

  //Handle Follow Action
  const handleFollow = useCallback(() => {
    if (localStorage.getItem("token")) {
      if (author.following) {
        dispatch({ type: AUTHOR.UNFOLLOWAUTHOR, payload: usernameDispatch });
      } else {
        dispatch({
          type: AUTHOR.FOLLOWAUTHOR,
          payload: usernameDispatch,
        });
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, author.following, usernameDispatch]);

  if (author.username === "") {
    return (
      <div className="container mb-30px">
        <MoonLoader className="m-auto" color="#171822" loading size={60} />
      </div>
    );
  }

  return (
    <>
      <div className="container mb-30px">
        <Profile
          username={author.username}
          image={author.image}
          bio={author.bio}
        />
        <div className="row">
          <Follow context={author.following} handleClick={handleFollow} />
        </div>
      </div>

      <hr />

      <ProfileTabs username={usernameDispatch} />
    </>
  );
}
