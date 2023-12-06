import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import {
  ADD_SUPPLIER,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_ERROR,
  EDIT_SUPPLIER,
  EDIT_SUPPLIER_SUCCESS,
  EDIT_SUPPLIER_ERROR,
  DELETE_SUPPLIER,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_ERROR,
  GET_SUPPLIERS,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
  SET_SUPPLIER,
} from '../../types/suppliers';

const supplierUrl = '/supplier';

// Crear Nuevo Suppliere.
export function addNewSupplierAction(supplier) {
  return async (dispatch) => {
    dispatch(addNewSupplier());
    try {
      // Primero intenta cargar un proveedor. Cargando = True.
      await axiosClient.post(`${supplierUrl}`, supplier);
      // Si lo agrega correctamente, dispara la accion con el objeto de suppliere cargado correctamente.
      dispatch(addNewSupplierSuccess(supplier));

      // Alerta exitosa.
      Swal.fire(
        'Correcto',
        'El suppliere se agrego correctamente...',
        'success'
      );
    } catch (error) {
      console.error(error);
      // Si falla, envia una notificacion de error.
      dispatch(addNewSupplierError(true));
      // Alerta de error.
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error, intenta de nuevo.',
      });
    }
  };
}

const addNewSupplier = () => ({
  type: ADD_SUPPLIER,
});

// Si el suppliere se guarda en la base de datos.
const addNewSupplierSuccess = (supplier) => ({
  type: ADD_SUPPLIER_SUCCESS,
  payload: supplier,
});

// Si ocurre un error en el guardado del suppliere.
const addNewSupplierError = (status) => ({
  type: ADD_SUPPLIER_ERROR,
  payload: status,
});

// Obtener todos los Supplieres.
export function getAllSuppliersAction() {
  return async (dispatch) => {
    dispatch(getAllSuppliers());
    try {
      const { data } = await axiosClient.get(`${supplierUrl}/all`);
      dispatch(getAllSuppliersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(getAllSuppliersError(true));
    }
  };
}

const getAllSuppliers = () => ({
  type: GET_SUPPLIERS,
});

const getAllSuppliersSuccess = (suppliers) => ({
  type: GET_SUPPLIERS_SUCCESS,
  payload: suppliers,
});

const getAllSuppliersError = (status) => ({
  type: GET_SUPPLIERS_ERROR,
  payload: status,
});

// Eliminar Suppliere.
export const deleteSupplierAction = (id) => {
  return async (dispatch) => {
    dispatch(deleteSupplier());
    try {
      await axiosClient.delete(`${supplierUrl}/${id}`);
      dispatch(deleteSupplierSuccess(id));
      Swal.fire(
        'Eliminado',
        'El suppliere se elimino correctamente...',
        'success'
      );
    } catch (error) {
      console.error(error);
      dispatch(deleteSupplierError(true));
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error al eliminar el suppliere, intenta de nuevo.',
      });
    }
  };
};

const deleteSupplier = () => ({
  type: DELETE_SUPPLIER,
});

const deleteSupplierSuccess = (id) => ({
  type: DELETE_SUPPLIER_SUCCESS,
  payload: id,
});

const deleteSupplierError = (status) => ({
  type: DELETE_SUPPLIER_ERROR,
  payload: status,
});

// Editar proveedor.
export const editSupplierAction = (supplier) => {
  return async (dispatch) => {
    try {
      // Primero intenta cargar un proveedor. Cargando = True.
      await axiosClient.put(`${supplierUrl}/${supplier?._id}`, supplier);
      // Si lo agrega correctamente, dispara la accion con el objeto de suppliere cargado correctamente.
      dispatch(editSupplierSuccess(supplier));
      dispatch(getAllSuppliersAction());
      // Alerta exitosa.
      Swal.fire(
        'Correcto',
        'El proveedor se edito correctamente...',
        'success'
      );
    } catch (error) {
      // Si falla, envia una notificacion de error.
      dispatch(editSupplierError(true));
      // Alerta de error.
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error, intenta de nuevo.',
      });
    }
  };
};

const editSupplierSuccess = (supplier) => ({
  type: EDIT_SUPPLIER_SUCCESS,
  payload: supplier,
});

const editSupplierError = (status) => ({
  type: EDIT_SUPPLIER_ERROR,
  payload: status,
});

export const setSupplierAction = (supplier) => {
  return async (dispatch) => {
    dispatch(setSupplier(supplier));
  };
};

const setSupplier = (supplier) => ({
  type: SET_SUPPLIER,
  payload: supplier,
});
