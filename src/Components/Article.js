import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getClickedID } from "../actions/articls";
import { Fragment, useEffect, useState } from "react";

function Article(props) {
  const [myID, setmyID] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!myID === false) {
      dispatch(getClickedID(myID));
      const mylink = document.getElementById("Link_articleView");
      mylink.click();
    }
  }, [myID, dispatch]);

  return (
    <Fragment>
      <Link to="/articleView" id="Link_articleView">
        <div
          id="layout"
          style={{
            backgroundImage: `url(${props.Articledata.photo.base64})`,
          }}
        >
          <div className="layout-1"></div>
        </div>
      </Link>
      <div
        className="main-content"
        onClick={(e) => {
          setmyID(props.Articledata._id);
        }}
      >
        <h2>{props.Articledata.header}</h2>
        <p>{props.Articledata.main_page_content}</p>
      </div>
    </Fragment>
  );
}

export default Article;
