import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./articleView.css";
import ReactHtmlParser from "react-html-parser";
import { useEffect, useState } from "react";

function ArticleView(props) {
  const [clickedArticle, setclickedArticle] = useState({
    photo: { base64: "" },
  });
  const clickedArticleID = useSelector((store) => store.articleView);
  const allArticls = useSelector((store) => store.articls);

  useEffect(() => {
    const top = document.querySelector(".articleView").offsetTop;
    window.scroll({
      top,
      left: 0,
      behavior: "smooth",
    });
    if (!(clickedArticleID === null)) {
      const clicked = allArticls.find((art) => art._id === clickedArticleID);
      setclickedArticle(clicked);
    } else {
      console.log(clickedArticle);
    }
  }, [allArticls, clickedArticle, clickedArticleID]);
  return (
    <div>
      <Link id="go_home" to="/">
        go to home
      </Link>
      <div className="articleView">
        <img src={clickedArticle.photo.base64} alt={clickedArticle.header} />
        <h2>{clickedArticle.header}</h2>
        <div>{ReactHtmlParser(clickedArticle.page_content)}</div>
      </div>
    </div>
  );
}

export default ArticleView;
