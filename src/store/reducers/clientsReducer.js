import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_ERROR,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
  EDIT_CLIENT,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_ERROR,
  SET_CLIENT,
} from '../../types/clients';

// Cada reducer tiene su propio State.
const initialState = {
  clients: [],
  error: null,
  loading: false,
  client: null,
  selectedClient: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CLIENT:
      return {
        ...state,
        loading: true,
      };

    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: [...state.clients, action.payload],
        error: false,
      };

    case ADD_CLIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case GET_CLIENTS:
      return {
        ...state,
        loading: true,
      };

    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.payload,
        error: false,
      };

    case GET_CLIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case DELETE_CLIENT:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: state.clients.filter(
          (client) => client._id !== action.payload
        ),
        error: false,
      };

    case DELETE_CLIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case EDIT_CLIENT:
      return {
        ...state,
        loading: false,
        selectedClient: action.payload,
      };

    case EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: state.clients.filter(
          (client) => client._id !== action.payload
        ),
        error: false,
      };

    case EDIT_CLIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case SET_CLIENT:
      return {
        ...state,
        loading: false,
        selectedClient: action.payload,
      };
    default:
      return state;
  }
}
