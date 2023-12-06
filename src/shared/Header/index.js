import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginUserAction, logout } from "../../store/actions/authActions";

const Header = () => {
  const auth = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  console.log("email: ", auth.email);
  const handleLogoutEvent = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary  justify-content-between">
      <div className="container">
        <h1>
          <Link to={"/"} className="text-light">
            MCGA
          </Link>
        </h1>
        <Link to={"/users/login"} className="text-light ">
          {auth.email ? (
            <button
              type="button"
              className="btn btn-success btn-md"
              onClick={handleLogoutEvent}
            >
              Cerrar sesión
            </button>
          ) : (
            "Iniciar sesión"
          )}
        </Link>
        
      </div>
    </nav>
  );
};

export default Header;
