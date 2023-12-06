import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import User from "./User";

import { getAllUsersAction } from "../../store/actions/usersActions";

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUsers = () => dispatch(getAllUsersAction());
    getAllUsers();
  }, []);

  const { loading, error, users } = useSelector((state) => state.users);

  return (
    <>
      <h2 className="text-center my-5">Listado de Usuarios</h2>
      {loading ? <h4 className="text-center"> Loading... </h4> : null}

      {error ? (
        <p className="alert alert-danger p-2 m-4 text-center">
          Ocurrio un error.
        </p>
      ) : null}

      <div className="row pb-2">
        <div className="col-12 text-right">
          <Link
            to={"/users/new"}
            className="btn btn-danger nuevo-post d-block d-md-inline-block"
          >
            Nuevo Usuario &#43;
          </Link>
        </div>
      </div>

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0
            ? "No hay Usuarios"
            : users.map((user) => <User key={user._id} user={user} />)}
        </tbody>
      </table>
    </>
  );
};

export default Users;
