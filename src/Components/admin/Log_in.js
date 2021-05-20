import React, { Fragment } from "react";
import "./Log_in.css";
import { Route } from "react-router-dom";
import Admin from "./admin";
import LoginForm from "./loginForm";

function Login() {
  return (
    <Fragment>
      <Route path="/Login" exact>
        <LoginForm />
      </Route>
      <Route path="/Login/admin">
        <Admin />
      </Route>
    </Fragment>
  );
}

export default Login;
