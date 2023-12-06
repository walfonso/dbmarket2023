import Swal from "sweetalert2";
import axiosClient from "../../config/axios";
import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  SET_USER,
} from "../../types/users";

const userUrl = "/user";

// Crear Nuevo Usuario.
export function addNewUserAction(user) {
  return async (dispatch) => {
    dispatch(addNewUser());
    try {
      // Primero intenta cargar un cliente. Cargando = True.
      await axiosClient.post(`${userUrl}`, user);
      // Si lo agrega correctamente, dispara la accion con el objeto de cliente cargado correctamente.
      dispatch(addNewUserSuccess(user));

      // Alerta exitosa.
      Swal.fire("Correcto", "El usuario se agrego correctamente...", "success");
    } catch (error) {
      console.error(error);
      // Si falla, envia una notificacion de error.
      dispatch(addNewUserError(true));
      // Alerta de error.
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error.",
        text: "Ocurrio un error, intenta de nuevo.",
      });
    }
  };
}

const addNewUser = () => ({
  type: ADD_USER,
});

// Si el usuario se guarda en la base de datos.
const addNewUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

// Si ocurre un error en el guardado del usuario.
const addNewUserError = (status) => ({
  type: ADD_USER_ERROR,
  payload: status,
});

// Obtener todos los Usuarios.
export function getAllUsersAction() {
  return async (dispatch) => {
    dispatch(getAllUsers());
    try {
      const { data } = await axiosClient.get(`${userUrl}/all`);
      dispatch(getAllUsersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(getAllUsersError(true));
    }
  };
}

const getAllUsers = () => ({
  type: GET_USERS,
});

const getAllUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

const getAllUsersError = (status) => ({
  type: GET_USERS_ERROR,
  payload: status,
});

// Eliminar Usuario.
export const deleteUserAction = (id) => {
  return async (dispatch) => {
    dispatch(deleteUser());
    try {
      await axiosClient.delete(`${userUrl}/${id}`);
      dispatch(deleteUserSuccess(id));
      Swal.fire(
        "Eliminado",
        "El usuario se elimino correctamente...",
        "success"
      );
    } catch (error) {
      console.error(error);
      dispatch(deleteUserError(true));
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error.",
        text: "Ocurrio un error al eliminar el usuario, intenta de nuevo.",
      });
    }
  };
};

const deleteUser = () => ({
  type: DELETE_USER,
});

const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});

const deleteUserError = (status) => ({
  type: DELETE_USER_ERROR,
  payload: status,
});

// Editar usuario.
export const editUserAction = (user) => {
  return async (dispatch) => {
    try {
      // Primero intenta cargar un usuario. Cargando = True.
      await axiosClient.put(`${userUrl}/${user?._id}`, user);
      // Si lo agrega correctamente, dispara la accion con el objeto de usuario cargado correctamente.
      dispatch(editUserSuccess(user));
      dispatch(getAllUsersAction());
      // Alerta exitosa.
      Swal.fire("Correcto", "El usuario se edito correctamente...", "success");
    } catch (error) {
      // Si falla, envia una notificacion de error.
      dispatch(editUserError(true));
      // Alerta de error.
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error.",
        text: "Ocurrio un error, intenta de nuevo.",
      });
    }
  };
};

const editUserSuccess = (user) => ({
  type: EDIT_USER_SUCCESS,
  payload: user,
});

const editUserError = (status) => ({
  type: EDIT_USER_ERROR,
  payload: status,
});

export const setUserAction = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
