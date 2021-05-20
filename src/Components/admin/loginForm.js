import React, { Fragment, useEffect, useState } from "react";
import "./Log_in.css";
import { Link } from "react-router-dom";
import { shackPasswordPost } from "../../api";
import { bake_cookie, read_cookie } from "sfcookies";

function LoginForm() {
  const [userInfo, setuserInfo] = useState({ userName: "", passWord: "" });

  useEffect(() => {
    if (userInfo.userName === "") {
      const shackCookies = async () => {
        if (!(read_cookie("userInfo") === [])) {
          if ((await shackPasswordPost(read_cookie("userInfo"))).data.isExist) {
            document.querySelector("#goAdmin").click();
          }
        }
      };
      shackCookies();
    }
  }, [userInfo.userName]);

  const handdleSubmit = async (e) => {
    e.preventDefault();
    if ((await shackPasswordPost(userInfo)).data.isExist) {
      bake_cookie("userInfo", userInfo);
      document.querySelector("#goAdmin").click();
    } else {
      alert("Username or Password isn't correct");
    }
  };

  return (
    <Fragment>
      <div className="login">
        <form className="loginForm">
          <label htmlFor="username">username:</label>
          <input
            type="text"
            value={userInfo.userName}
            onChange={(event) => {
              setuserInfo({ ...userInfo, userName: event.target.value });
            }}
            placeholder="Enter You Username"
            id="username"
          />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            placeholder="Enter You Password"
            id="password"
            value={userInfo.passWord}
            onChange={(event) => {
              setuserInfo({ ...userInfo, passWord: event.target.value });
            }}
          />
          <input type="submit" onClick={handdleSubmit} />
          <Link to="/">Go To Home Bage</Link>
          <Link to="/Login/admin" id="goAdmin" hidden>
            go to admin
          </Link>
        </form>
      </div>
    </Fragment>
  );
}

export default LoginForm;
