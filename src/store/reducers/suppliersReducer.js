import {
  ADD_SUPPLIER,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_ERROR,
  GET_SUPPLIERS,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
  DELETE_SUPPLIER,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_ERROR,
  EDIT_SUPPLIER,
  EDIT_SUPPLIER_SUCCESS,
  EDIT_SUPPLIER_ERROR,
  SET_SUPPLIER
} from '../../types/suppliers';

// Cada reducer tiene su propio State.
const initialState = {
  suppliers: [],
  error: null,
  loading: false,
  supplier: null,
  selectedSupplier: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SUPPLIER:
      return {
        ...state,
        loading: true,
      };

    case ADD_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: [...state.suppliers, action.payload],
        error: false,
      };

    case ADD_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case GET_SUPPLIERS:
      return {
        ...state,
        loading: true,
      };

    case GET_SUPPLIERS_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: action.payload,
        error: false,
      };

    case GET_SUPPLIERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case DELETE_SUPPLIER:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload
        ),
        error: false,
      };

    case DELETE_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case EDIT_SUPPLIER:
      return {
        ...state,
        loading: false,
        supplier: action.payload,
      };

    case EDIT_SUPPLIER_SUCCESS:
      return {
        ...state,
        loading: false,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload
        ),
        error: false,
      };

    case EDIT_SUPPLIER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };
    case SET_SUPPLIER:
      return {
        ...state,
        loading: false,
        selectedSupplier: action.payload,
      };
    default:
      return state;
  }
}
