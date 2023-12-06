import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewClientAction } from '../../../store/actions/clientsActions';

const NewClient = ({ history }) => {
  // useState Se utiliza para setear los valores en los campos del formulario.
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Permite utilziar los dispatch.
  const dispatch = useDispatch();

  // Acceder al state del Store! [!IMPORTANTE!]
  const { loading, error } = useSelector((state) => state.clients);

  // Llama el action.
  const addNewClient = (client) => dispatch(addNewClientAction(client));

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
      name,
      lastName,
      email,
      phone,
    };

    addNewClient(client);

    // Redireccionar a la lista de clientes.
    history.push('/clients');
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8 p-4'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Agregar Nuevo Cliente
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
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

export default NewClient;
