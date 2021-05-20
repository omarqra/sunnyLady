import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { read_cookie } from "sfcookies";
import {
  getAllArticls,
  getClickedID,
  deletOneArticle,
  addNewArticle,
} from "../../actions/articls";
import { shackPasswordPost, sheckShangePosts } from "../../api";
import "./Adminarticle.css";

function AdminArticls() {
  const allarticals = useSelector((state) => state.articls);
  const [myID, setmyID] = useState(false);
  const [userInfo, setuserInfo] = useState({ userName: "", passWord: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.userName === "") {
      const userSFcoockies = read_cookie("userInfo");
      const shackCookies = async () => {
        if (!(userSFcoockies === [])) {
          if (!(await shackPasswordPost(userSFcoockies)).data.isExist) {
            document.querySelector("#gotologin").click();
          } else {
            setuserInfo(userSFcoockies);
          }
        }
      };
      shackCookies();
    }
  }, [userInfo.userName]);

  useEffect(() => {
    if (!myID === false) {
      dispatch(getClickedID(myID));
      const mylink = document.getElementById("Link_articleView");
      mylink.click();
    }
  }, [myID, dispatch]);

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

  const hunddleDelete = (id) => {
    dispatch(deletOneArticle({ id, userInfo }));
  };

  const hunddleEdit = (id) => {
    dispatch(getClickedID(id));
    document.querySelector("#UpdateForm").click();
  };

  return (
    <div className="articls">
      <Link to="/Login" id="gotologin" hidden>
        go to login
      </Link>
      <Link to="/Login/admin/update_post" id="UpdateForm" hidden>
        go to UpdateForm
      </Link>
      <div className="article-items">
        {allarticals.map((Articledata) => (
          <div key={Articledata._id}>
            <div className="tools">
              <i
                className="delete fas fa-trash-alt"
                onClick={() => hunddleDelete(Articledata._id)}
              ></i>
              <i
                className="edit fas fa fa-edit"
                onClick={() => hunddleEdit(Articledata._id)}
              ></i>
            </div>
            <div className="article-item">
              <Link to="/articleView" id="Link_articleView">
                <div
                  id="layout"
                  style={{
                    backgroundImage: `url(${Articledata.photo.base64})`,
                  }}
                >
                  <div className="layout-1"></div>
                </div>
              </Link>
              <div
                className="main-content"
                onClick={(e) => {
                  setmyID(Articledata._id);
                }}
              >
                <h2>{Articledata.header} </h2>
                <p>{Articledata.main_page_content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminArticls;
