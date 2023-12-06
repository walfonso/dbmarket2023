import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import {
  deleteProductAction,
  setProductAction,
} from "../../../store/actions/productsActions";

const Product = ({ product }) => {
  const { _id, name, price, detail, category } = product;
  const dispatch = useDispatch();
  const history = useHistory(); // Habilitar history para redireccionar.

  const user = useSelector((state) => state.authState);
  const onDeleteProduct = (id) => {
    // Is login

    if (user.email) {
      // preguntar al usuario
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta accion es irreversible.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          dispatch(deleteProductAction(id));
        }
      });
    } else {
      history.push(`/users/login`);
    }
  };

  const onEditRedirection = (id) => {
    dispatch(setProductAction(product));
    history.push(`/products/edit/${id}`);
  };

  return (
    <tr>
      <td>
        <span className="font-weight-bold"> {name} </span>
      </td>
      <td>{price}</td>
      <td>{detail}</td>
      <td>{category}</td>
      <td className="actions">
        <button
          type="button"
          onClick={() => onEditRedirection(_id)}
          className="btn btn-primary m-1"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={() => onDeleteProduct(_id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Product;
