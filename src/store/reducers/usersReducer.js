import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  SET_USER,
} from "../../types/users";

// Cada reducer tiene su propio State.
const initialState = {
  users: [],
  error: null,
  loading: false,
  user: null,
  selectedUser: null,
  message: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        loading: true,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: false,
      };

    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case GET_USERS:
      return {
        ...state,
        loading: true,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: false,
      };

    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case DELETE_USER:
      return {
        ...state,
        loading: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
        error: false,
      };

    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case EDIT_USER:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload,
      };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
        error: false,
      };

    case EDIT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // En este caso, el error pasa a true. (Para poder notificar al usuario)
      };

    case SET_USER:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
}
