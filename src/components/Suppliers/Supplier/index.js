import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  deleteSupplierAction,
  editSupplierAction,
} from '../../../store/actions/suppliersActions';

const Supplier = ({ supplier }) => {
  const { _id, name, email, phone } = supplier;

  const dispatch = useDispatch();
  const history = useHistory(); // Habilitar history para redireccionar.

  const onDeleteSupplier = (id) => {
    // preguntar al usuario
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta accion es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        dispatch(deleteSupplierAction(id));
      }
    });
  };

  const onEditRedirection = (id) => {
    dispatch(editSupplierAction(supplier));
    history.push(`/suppliers/edit/${id}`);
  };

  return (
    <tr>
      <td>
        <span className='font-weight-bold'> {name} </span>
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td className='actions'>
        <button
          type='button'
          onClick={() => onEditRedirection(_id)}
          className='btn btn-primary m-1'
        >
          Editar
        </button>
        <button
          type='button'
          className='btn btn-danger m-1'
          onClick={() => onDeleteSupplier(_id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Supplier;
