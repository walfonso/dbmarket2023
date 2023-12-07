import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUserAction, logout } from "../../../store/actions/authActions";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, message, users } = useSelector((state) => state.users);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogoutEvent = () => {
    dispatch(logout());
  };
  const isValidEmail = (value) => {
    // Expresión regular para validar un email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  const isValidPassword = (value) => {
    // Puedes agregar tus propias reglas para la contraseña aquí
    return value.length >= 6; // Por ejemplo, mínimo 6 caracteres
  };

  const handleLoginEvent = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") return;

    if (!isValidEmail(email) || !isValidPassword(password)) {
      // Mostrar mensaje de error o realizar acciones necesarias
      console.log("Email o contraseña no válidos");
      return;
    }

    const user = {
      email,
      password,
    };

    try {
      dispatch(loginUserAction(user));
      history.push("/products");
    } catch (error) {
      console.error(error);
      //history.push("/users/login");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 p-4">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Inicio de Sesión
            </h2>
            <form className="form-group">
              <div className="form-group">
                <label>
                  Usuario <span className="text-danger"></span>
                </label>
                <input
                  type="email"
                  placeholder="ingrese email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>
                  Contraseña <span className="text-danger"></span>
                </label>
                <input
                  type="password"
                  placeholder="Ingrese contraseña"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-success btn-md"
                onClick={handleLoginEvent}
              >
                Aceptar
              </button>
              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
