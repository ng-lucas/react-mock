import Tags from "../Other/Tags";
import TopPost from "../TopPost/TopPost";
import Tabs from "../Tabs/Tabs";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Homepage() {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/global-feed");
  }, [navigate]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <Tabs selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
          </div>

          <div className="col-lg-4 mb-60px">
            <Tags setSelectedTag={setSelectedTag} />
            <TopPost />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
