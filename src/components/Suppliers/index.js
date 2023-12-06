import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Supplier from './Supplier';
import NewSupplier from './NewSupplier';

import { getAllSuppliersAction } from '../../store/actions/suppliersActions';
import { addNewSupplierAction } from '../../store/actions/suppliersActions';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadows: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos:{
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    }
}))

const Suppliers = () => {
  const [showNewSupplier, setShowNewSupplier] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const styles=useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllSuppliers = () => dispatch(getAllSuppliersAction());
    getAllSuppliers();
  }, []);

  const { loading, error, suppliers } = useSelector((state) => state.suppliers);

  // Llama el action.
  const addNewSupplier = (supplier) => dispatch(addNewSupplierAction(supplier));

  const addSupplier = (supplier) => {
    addNewSupplier(supplier);
    openCloseModal();
  };

  // onClick function to set showNewSupplier
  const onClick = () => {
    setShowNewSupplier(!showNewSupplier);
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <>
        <h2 className='text-center my-5'>Listado de Proveedores</h2>
        {loading ? <h4 className='text-center'> Loading... </h4> : null}

        {error ? (
          <p className='alert alert-danger p-2 m-4 text-center'>
            Ocurrio un error.
          </p>
        ) : null}

        <button className='btn btn-primary m-1' onClick={openCloseModal} >Agregar Proveedor (MODAL)</button>
        <Modal open={showModal} onClose={openCloseModal}>
          <NewSupplier onAdd={addSupplier} />
        </Modal>

        <table className='table table-striped'>
          <thead className='bg-primary table-dark'>
            <tr>
              <th scope='col'>Nombre</th>
              <th scope='col'>Email</th>
              <th scope='col'>Tel&eacute;fono</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0
              ? 'No hay Proveedores para mostrar'
              : suppliers.map((supplier) => (
                  <Supplier key={supplier._id} supplier={supplier} />
                ))}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default Suppliers;
