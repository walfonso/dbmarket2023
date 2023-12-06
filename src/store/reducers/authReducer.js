import { LOGOUT, LOGIN } from "../../types/auth";

const initialState = {
  email: null,
  name: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        email: action.payload.email,
        name: action.payload.name,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        email: "",
        name: "",
        token: "",
      };
    default:
      return state;
  }
};
