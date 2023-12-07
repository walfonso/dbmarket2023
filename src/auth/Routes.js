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
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route exact path="/users/login" component={Login} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/new" component={NewUser} />
      <PrivateRoute exact path="/users/edit/:id" component={EditUser} />
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/clients/new" component={NewClient} />
      <Route exact path="/clients/edit/:id" component={EditClient} />
      <Route exact path="/products" component={Products} />
      <PrivateRoute exact path="/products/new" component={NewProduct} />
      <PrivateRoute exact path="/products/edit/:id" component={EditProduct} />
      <Route exact path="/suppliers" component={Suppliers} />
      <Route exact path="/suppliers/new" component={NewSupplier} />
      <Route exact path="/suppliers/edit/:id" component={EditSupplier} />
      <Route path="*" component={NoFoundPage} />
    </Switch>
  );
};
