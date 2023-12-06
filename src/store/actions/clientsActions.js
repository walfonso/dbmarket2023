import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  EDIT_CLIENT,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  SET_CLIENT,
} from '../../types/clients';

const clientUrl = '/client';

// Crear Nuevo Cliente.
export function addNewClientAction(client) {
  return async (dispatch) => {
    dispatch(addNewClient());
    try {
      // Primero intenta cargar un cliente. Cargando = True.
      await axiosClient.post(`${clientUrl}`, client);
      // Si lo agrega correctamente, dispara la accion con el objeto de cliente cargado correctamente.
      dispatch(addNewClientSuccess(client));

      // Alerta exitosa.
      Swal.fire('Correcto', 'El cliente se agrego correctamente...', 'success');
    } catch (error) {
      console.error(error);
      // Si falla, envia una notificacion de error.
      dispatch(addNewClientError(true));
      // Alerta de error.
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error, intenta de nuevo.',
      });
    }
  };
}

const addNewClient = () => ({
  type: ADD_CLIENT,
});

// Si el cliente se guarda en la base de datos.
const addNewClientSuccess = (client) => ({
  type: ADD_CLIENT_SUCCESS,
  payload: client,
});

// Si ocurre un error en el guardado del cliente.
const addNewClientError = (status) => ({
  type: ADD_CLIENT_ERROR,
  payload: status,
});

// Obtener todos los Clientes.
export function getAllClientsAction() {
  return async (dispatch) => {
    dispatch(getAllClients());
    try {
      const { data } = await axiosClient.get(`${clientUrl}/all`);
      dispatch(getAllClientsSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(getAllClientsError(true));
    }
  };
}

const getAllClients = () => ({
  type: GET_CLIENTS,
});

const getAllClientsSuccess = (clients) => ({
  type: GET_CLIENTS_SUCCESS,
  payload: clients,
});

const getAllClientsError = (status) => ({
  type: GET_CLIENTS_ERROR,
  payload: status,
});

// Eliminar Cliente.
export const deleteClientAction = (id) => {
  return async (dispatch) => {
    dispatch(deleteClient());
    try {
      await axiosClient.delete(`${clientUrl}/${id}`);
      dispatch(deleteClientSuccess(id));
      Swal.fire(
        'Eliminado',
        'El cliente se elimino correctamente...',
        'success'
      );
    } catch (error) {
      console.error(error);
      dispatch(deleteClientError(true));
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error al eliminar el cliente, intenta de nuevo.',
      });
    }
  };
};

const deleteClient = () => ({
  type: DELETE_CLIENT,
});

const deleteClientSuccess = (id) => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: id,
});

const deleteClientError = (status) => ({
  type: DELETE_CLIENT_ERROR,
  payload: status,
});

// Editar Cliente.
export const editClientAction = (client) => {
  return async (dispatch) => {
    try {
      // Primero intenta cargar un cliente. Cargando = True.
      await axiosClient.put(`${clientUrl}/${client?._id}`, client);
      // Si lo agrega correctamente, dispara la accion con el objeto de cliente cargado correctamente.
      dispatch(editClientSuccess(client));
      dispatch(getAllClientsAction());
      // Alerta exitosa.
      Swal.fire('Correcto', 'El cliente se edito correctamente...', 'success');
    } catch (error) {
      // Si falla, envia una notificacion de error.
      dispatch(editClientError(true));
      // Alerta de error.
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error, intenta de nuevo.',
      });
    }
  };
};

const editClientSuccess = (client) => ({
  type: EDIT_CLIENT_SUCCESS,
  payload: client,
});

const editClientError = (status) => ({
  type: EDIT_CLIENT_ERROR,
  payload: status,
});

export const setClientAction = (client) => {
  return async (dispatch) => {
    dispatch(setClient(client));
  };
};

const setClient = (client) => ({
  type: SET_CLIENT,
  payload: client,
});
