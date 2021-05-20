import React, { useEffect } from "react";
import Article from "./Article";
import { useSelector, useDispatch } from "react-redux";
import { addNewArticle, getAllArticls } from "../actions/articls";
import "./article.css";
import { sheckShangePosts } from "../api";
import { Link } from "react-router-dom";

function Articls() {
  const allarticals = useSelector((state) => state.articls);

  const dispatch = useDispatch();

  useEffect(() => {
    const ids = {
      ids: allarticals.map((arti) => {
        return arti._id;
      }),
    };
    const getArticls = async () => {
      if (ids.ids.length > 0) {
        console.log("ther is ids");
        const { data } = await sheckShangePosts(ids);
        if (data.length > 0) {
          dispatch(addNewArticle(data));
        }
      } else {
        console.log("ther is no ids");
        await dispatch(getAllArticls());
      }
    };
    getArticls();
  }, [dispatch, allarticals]);

  return (
    <div className="articls">
      <div className="article-items">
        {allarticals.map((Articledata) => (
          <div className="article-item" key={Articledata._id}>
            <Article Articledata={Articledata} />
          </div>
        ))}
        <Link id="addArticle" to="/Login/admin/add_new_post">
          +
        </Link>
      </div>
    </div>
  );
}

export default Articls;
