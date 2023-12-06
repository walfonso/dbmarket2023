import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editUserAction } from "../../../store/actions/usersActions";

const EditUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userState, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });

  const { loading, error, selectedUser } = useSelector((state) => state?.users);

  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]);

  if (!userState) return history.push("/");

  console.log(userState);

  const { name, email, password } = userState;

  const onFormChange = (e) => {
    console.log(e.target.value);
    setUser({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const editUser = (user) => dispatch(editUserAction(user));

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar formulario.
    if (name.trim() === "" || email.trim() === "" || password.trim() === "")
      return;

    //Si no hay errores.
    //Crear Usuario.
    const user = {
      _id: userState._id,
      name,
      email,
      password,
    };

    editUser(user);
    // Redireccionar a la lista de usuarios
    history.push("/users");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 p-4">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Usuario
            </h2>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>
                  Nombre del Usuario <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Usuario"
                  name="name"
                  value={name}
                  onChange={onFormChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingrese Email"
                  name="email"
                  value={email}
                  onChange={onFormChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="ingrese Contraseña"
                  name="phone"
                  value={password}
                  onChange={onFormChange}
                />
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
                Guardar
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

export default EditUser;
