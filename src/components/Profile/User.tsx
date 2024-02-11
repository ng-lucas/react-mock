import { useNavigate } from "react-router";
import SettingBtn from "../Other/SettingBtn";
import ProfileTabs from "../Tabs/ProfileTabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { USER } from "../../saga/actionTypes";
import Profile from "./Profile";
import MoonLoader from "react-spinners/MoonLoader";

export default function User() {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: USER.FETCH });
  }, [dispatch]);

  const handleSetting = () => {
    navigate("/setting");
  };

  if (user.username === "") {
    return (
      <div className="container mb-30px">
        <MoonLoader className="m-auto" color="#171822" loading size={60} />
      </div>
    );
  }

  return (
    <>
      <div className="container mb-30px">
        <Profile username={user.username} image={user.image} bio={user.bio} />
        <div className="row">
          <SettingBtn handleClick={handleSetting} />
        </div>
      </div>

      <hr />
      <ProfileTabs username={user.username} />
    </>
  );
}
