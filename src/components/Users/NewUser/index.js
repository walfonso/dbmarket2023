import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewUserAction } from "../../../store/actions/usersActions";

const NewUser = ({ history }) => {
  // useState Se utiliza para setear los valores en los campos del formulario.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //funciones validaciones
  const validateName = () => {
    if (name.trim() === "") {
      setNameError("El nombre es requerido");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    // Puedes usar una expresión regular para validar el formato del correo electrónico.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("El correo electrónico no es válido");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.trim() === "") {
      setPasswordError("La contraseña es requerida");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Permite utilziar los dispatch.
  const dispatch = useDispatch();

  // Acceder al state del Store! [!IMPORTANTE!]
  const { loading, error } = useSelector((state) => state.users);

  // Llama el action.
  const addNewUser = (user) => dispatch(addNewUserAction(user));

  const onSubmit = (e) => {
    e.preventDefault();
    // Validar formulario.
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    //Validar formulario.
    if (name.trim() === "" || email.trim() === "" || password.trim() === "")
      return;

    //Si no hay errores.
    //Crear Usuario.
    const user = {
      name,
      email,
      password,
    };

    addNewUser(user);

    // Redireccionar a la lista de Usuarios.
    console.log("history");
    console.log(history);
    history.push("/users");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 p-4">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Usuario
            </h2>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>
                  Nombre del Usuario <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${nameError ? "is-invalid" : ""}`}
                  placeholder="Nombre del Usuario"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  Email Usuario <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  placeholder="Email del Usuario"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    passwordError ? "is-invalid" : ""
                  }`}
                  placeholder="Password del Usuario"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
                {passwordError && (
                  <div className="invalid-feedback">{passwordError}</div>
                )}
              </div>

              <div className="form-group text-center">
                <span className="font-weight-bold text-danger">
                  * Campos Requeridos
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {loading ? <p> Loading... </p> : null}

            {error ? (
              <p className="alert alert-danger p-2 m-4 text-center">
                Ocurrio un error.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
