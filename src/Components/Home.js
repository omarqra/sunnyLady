import React from "react";
import bg_image from "../images/background.png";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <img src={bg_image} alt="background" />
      <div className="containt">
        <h1>Sunny Lady</h1>
        <span>
          welcome to my blog <br />
          where i show my literary work <br />
          and others
        </span>
      </div>
    </div>
  );
}

export default Home;
