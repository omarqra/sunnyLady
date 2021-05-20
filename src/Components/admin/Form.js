import { useState } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import FileBase64 from "react-file-base64";
import "./Form.css";
import { PostArticle } from "../../api";

function Form() {
  const [mydata, setmydata] = useState({
    header: "",
    main_page_content: "",
    page_content: "",
    photo: "",
  });

  const saveData = async () => {
    if (
      mydata.header === "" ||
      mydata.main_page_content === "" ||
      mydata.page_content === "" ||
      mydata.photo === ""
    ) {
      alert("Please fill in all fields");
    } else {
      await PostArticle(mydata).catch((error) => {
        console.log(error);
      });

      const goHome = document.getElementById("go-to-home");
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
      <Link className="visible-link" id="go-to-home" to="/">
        go to home
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
        <FileBase64 multiple={false} onDone={handlleImage} />
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setmydata({ ...mydata, page_content: data });
          }}
        />
        <button onClick={() => saveData(mydata)}>Release</button>
        <div className="display">{ReactHtmlParser(mydata.page_content)}</div>
      </div>
    </div>
  );
}

export default Form;
