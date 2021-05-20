import React from "react";
import Home from "./Components/Home";
import Articls from "./Components/Articls";
import ArticleView from "./Components/articleView";
import Footer from "./Components/Footer";
import Login from "./Components/admin/Log_in";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/" exact>
        <Articls />
      </Route>
      <Route path="/articleView">
        <ArticleView />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>

      <Route path="/">
        <Footer />
      </Route>
    </BrowserRouter>
  );
}

export default App;
