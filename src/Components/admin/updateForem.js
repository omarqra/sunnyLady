import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import FileBase64 from "react-file-base64";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { read_cookie } from "sfcookies";
import { shackPasswordPost } from "../../api";
import { updateOneArticle } from "../../actions/articls";

function UpdateForm() {
  const clickedArticleID = useSelector((store) => store.articleView);
  const allArticls = useSelector((store) => store.articls);
  const articleToUpdate =
    allArticls.find((arti) => arti._id === clickedArticleID) || {};
  const [mydata, setmydata] = useState(articleToUpdate);

  const dispatch = useDispatch();
  const [userInfo, setuserInfo] = useState({ userName: "", passWord: "" });

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

  const saveData = async () => {
    if (mydata === articleToUpdate) {
      const goHome = document.getElementById("go-to-admin");
      goHome.click();
      return;
    }
    if (
      mydata.header === "" ||
      mydata.main_page_content === "" ||
      mydata.page_content === "" ||
      mydata.photo === ""
    ) {
      alert("Please fill in all fields");
    } else {
      await dispatch(updateOneArticle({ articleToUpdate: mydata, userInfo }));
      const goHome = document.getElementById("go-to-admin");
      goHome.click();
    }
  };

  const handlleImage = (files) => {
    if (files.type === "image/png" || "image/jpg") {
      const size = files.size.split(" ");
      const numSize = Number(size[0]);
      if (numSize < 500) {
        setmydata({ ...mydata, photo: files });
      } else {
        alert("The largest image size is 500 KB");
      }
    }
  };

  return (
    <div className="Form">
      <Link className="visible-link" id="go-to-admin" to="/login">
        go to home
      </Link>
      <Link className="visible-link" to="/Login/admin">
        go to admin
      </Link>
      <Link to="/Login" id="gotologin" hidden>
        go to login
      </Link>
      <div className="text-editer">
        <input
          type="text"
          placeholder="Enter The Header"
          maxLength="51"
          value={mydata.header}
          onChange={(e) => {
            setmydata({ ...mydata, header: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Enter the text that will appear on the main page"
          maxLength="115"
          value={mydata.main_page_content}
          onChange={(e) => {
            setmydata({ ...mydata, main_page_content: e.target.value });
          }}
        />
        <FileBase64
          multiple={false}
          onDone={handlleImage}
          value={mydata.photo}
        />
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setmydata({ ...mydata, page_content: data });
          }}
        />
        <button onClick={() => saveData(mydata)}>Update</button>
        <div className="display">{ReactHtmlParser(mydata.page_content)}</div>
      </div>
    </div>
  );
}

export default UpdateForm;
