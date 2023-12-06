import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editClientAction } from '../../../store/actions/clientsActions';

const EditClient = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [clientState, setClient] = useState({
    _id: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const { loading, error, selectedClient } = useSelector(
    (state) => state?.clients
  );

  useEffect(() => {
    setClient(selectedClient);
  }, [selectedClient]);

  if (!clientState) return history.push('/');

  console.log(clientState);

  const { name, lastName, email, phone } = clientState;

  const onFormChange = (e) => {
    console.log(e.target.value);
    setClient({
      ...clientState,
      [e.target.name]: e.target.value,
    });
  };

  const editClient = (client) => dispatch(editClientAction(client));

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar formulario.
    if (
      name.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      phone.trim() === ''
    )
      return;

    //Si no hay errores.
    //Crear Cliente.
    const client = {
      _id: clientState._id,
      name,
      lastName,
      email,
      phone,
    };

    editClient(client);
    // Redireccionar a la lista de clientes.
    history.push('/clients');
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8 p-4'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Editar Cliente
            </h2>

            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label>
                  Nombre Cliente <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre del Cliente'
                  name='name'
                  value={name}
                  onChange={onFormChange}
                />
              </div>

              <div className='form-group'>
                <label>
                  Apellido Cliente <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Apellido del Cliente'
                  name='lastName'
                  value={lastName}
                  onChange={onFormChange}
                />
              </div>

              <div className='form-group'>
                <label>
                  Email Cliente <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Email del Cliente'
                  name='email'
                  value={email}
                  onChange={onFormChange}
                />
              </div>

              <div className='form-group'>
                <label>
                  Telefono Cliente <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Telefono del Cliente'
                  name='phone'
                  value={phone}
                  onChange={onFormChange}
                />
              </div>

              <div className='form-group text-center'>
                <span className='font-weight-bold text-danger'>
                  * Campos Requeridos
                </span>
              </div>

              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
              >
                Agregar
              </button>
            </form>
            {loading ? <p> Loading... </p> : null}

            {error ? (
              <p className='alert alert-danger p-2 m-4 text-center'>
                Ocurrio un error.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
