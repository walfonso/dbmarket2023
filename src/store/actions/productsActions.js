import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  SET_PRODUCT,
} from '../../types/products.js';

const productUrl = '/product';

// Obtener todos los Productos
export function getAllProductsAction() {
  return async (dispatch) => {
    dispatch(getAllProducts());
    try {
      const { data } = await axiosClient.get(`${productUrl}/all`);
      dispatch(getAllProductsSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(getAllProductsError(true));
    }
  };
}

const getAllProducts = () => ({
  type: GET_PRODUCTS,
});

const getAllProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

const getAllProductsError = (status) => ({
  type: GET_PRODUCTS_ERROR,
  payload: status,
});

// Agregar Nuevo Nuevo
export function addNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addNewProduct());
    try {
      // Intenta cargar un Producto -- Cargando = True.
      await axiosClient.post(`${productUrl}`, product);
      // Si lo agrega correctamente, dispara la accion con el objeto de Producto cargado correctamente.
      dispatch(addNewProductSuccess(product));

      // Alerta exitosa.
      Swal.fire(
        'Correcto',
        'El Producto se agrego correctamente...',
        'success'
      );
    } catch (error) {
      console.error(error);
      // Si falla, envia una notificacion de error.
      dispatch(addNewProductError(true));
      // Alerta de error.
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error, intenta de nuevo.',
      });
    }
  };
}

const addNewProduct = () => ({
  type: ADD_PRODUCT,
});

// Si el Producto se guarda en la base de datos
const addNewProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

// Si ocurre un error en el guardado del Producto
const addNewProductError = (status) => ({
  type: ADD_PRODUCT_ERROR,
  payload: status,
});

// Borrar Producto.
export const deleteProductAction = (id) => {
  return async (dispatch) => {
    dispatch(deleteProduct());
    try {
      await axiosClient.delete(`${productUrl}/${id}`);
      dispatch(deleteProductSuccess(id));
      Swal.fire(
        'Eliminado',
        'El Producto se elimino correctamente...',
        'success'
      );
    } catch (error) {
      console.error(error);
      dispatch(deleteProductError(true));
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error al eliminar el Producto, intenta de nuevo.',
      });
    }
  };
};

const deleteProduct = () => ({
  type: DELETE_PRODUCT,
});

const deleteProductSuccess = (id) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: id,
});

const deleteProductError = (status) => ({
  type: DELETE_PRODUCT_ERROR,
  payload: status,
});

// Editar producto.
export const editProductAction = (product) => {
  return async (dispatch) => {
    try {
      // Primero intenta cargar un producto. Cargando = True.
      await axiosClient.put(`${productUrl}/${product?._id}`, product);
      // Si lo agrega correctamente, dispara la accion con el objeto de producte cargado correctamente.
      dispatch(editProductSuccess(product));
      dispatch(getAllProductsAction());
      // Alerta exitosa.
      Swal.fire('Correcto', 'El producto se edito correctamente...', 'success');
    } catch (error) {
      // Si falla, envia una notificacion de error.
      dispatch(editProductError(true));
      // Alerta de error.
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error.',
        text: 'Ocurrio un error, intenta de nuevo.',
      });
    }
  };
};

const editProductSuccess = (product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product,
});

const editProductError = (status) => ({
  type: EDIT_PRODUCT_ERROR,
  payload: status,
});

export const setProductAction = (product) => {
  return async (dispatch) => {
    dispatch(setProduct(product));
  };
};

const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});
