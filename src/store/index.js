import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
//import reducer from "./reducers";
import { authReducer } from "./reducers/authReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import usersReducer from "./reducers/usersReducer";
import productsReducer from "./reducers/productsReducer";
import clientsReducer from "./reducers/clientsReducer";
import suppliersReducer from "./reducers/suppliersReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authState"],
};

const rootReducer = combineReducers({
  authState: authReducer,
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
  clients: clientsReducer,
  suppliers: suppliersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),

    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
