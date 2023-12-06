import { combineReducers } from "redux";
import clientsReducer from "./clientsReducer";
import productsReducer from "./productsReducer";
import suppliersReducer from "./suppliersReducer";
import usersReducer from "./usersReducer";
import { authReducer } from "./authReducer";

// Se utiliza un reducer Index que integrara todos los demas reducers.

export default combineReducers({
  clients: clientsReducer,
  products: productsReducer,
  suppliers: suppliersReducer,
  users: usersReducer,
  auth: authReducer,
});
