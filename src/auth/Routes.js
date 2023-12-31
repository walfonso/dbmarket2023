import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import NoFoundPage from "../shared/NoFoundPage";
// Components - Users
import Login from "../components/Users/Login";
import Users from "../components/Users";
import EditUser from "../components/Users/EditUser";
import NewUser from "../components/Users/NewUser";

// Components - Clients branch
import Clients from "../components/Clients";
import NewClient from "../components/Clients/NewClient";
import EditClient from "../components/Clients/EditClient";
// Components - Products branch
import Products from "../components/Products";
import NewProduct from "../components/Products/NewProduct";
import EditProduct from "../components/Products/EditProduct";
// Components - Suppliers branch
import Suppliers from "../components/Suppliers";
import NewSupplier from "../components/Suppliers/NewSupplier";
import EditSupplier from "../components/Suppliers/EditSupplier";
import { PrivateRoute } from "./PrivateRoutes";
import { useSelector } from "react-redux";

export const Routes = () => {
  const auth = useSelector((state) => state.authState);
  console.log("valor de auth: ", auth);
  return (
    <Switch>
      <Route exact path="/" component={Products} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <Route exact path="/users/login" component={Login} />
      <PrivateRoute exact path="/users" component={Users} />
      <PrivateRoute exact path="/users/new" component={NewUser} />
      <PrivateRoute exact path="/users/edit/:id" component={EditUser} />
      <PrivateRoute exact path="/clients" component={Clients} />
      <PrivateRoute exact path="/clients/new" component={NewClient} />
      <PrivateRoute exact path="/clients/edit/:id" component={EditClient} />
      <Route exact path="/products" component={Products} />
      <PrivateRoute exact path="/products/new" component={NewProduct} />
      <PrivateRoute exact path="/products/edit/:id" component={EditProduct} />
      <PrivateRoute exact path="/suppliers" component={Suppliers} />
      <PrivateRoute exact path="/suppliers/new" component={NewSupplier} />
      <PrivateRoute exact path="/suppliers/edit/:id" component={EditSupplier} />
      <Route path="*" component={NoFoundPage} />
    </Switch>
  );
};
