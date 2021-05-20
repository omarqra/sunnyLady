import React from "react";
import { Link, Route } from "react-router-dom";
import AdminArticls from "./AdminArticls";
import Form from "./Form";
import UpdateForm from "./updateForem";
function Admin() {
  return (
    <div className="admin">
      <Route path="/Login/admin" exact>
        <Link className="adminGoToAdd" to="/">
          go to home
        </Link>
        <Link className="adminGoToAdd" to="/Login/admin/add_new_post">
          add new article
        </Link>
        <AdminArticls />
      </Route>
      <Route path="/Login/admin/add_new_post">
        <Form />
      </Route>
      <Route path="/Login/admin/update_post">
        <UpdateForm />
      </Route>
    </div>
  );
}

export default Admin;
