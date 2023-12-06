import React, { useState, Redirect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProductAction } from "../../../store/actions/productsActions";

const NewProduct = ({ history }) => {
  // useState Se utiliza para setear los valores en los campos del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");

  // Permite utilziar los dispatch
  const dispatch = useDispatch();

  // Acceder al state del Store! [!IMPORTANTE!]
  const { loading, error } = useSelector((state) => state.products);

  // Llama el action
  const addNewProduct = (product) => dispatch(addNewProductAction(product));

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar formulario
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      detail.trim() === "" ||
      category.trim() === ""
    )
      return;

    //Si no hay errores
    //Crear Producto
    const product = {
      name,
      price,
      detail,
      category,
    };

    addNewProduct(product);

    // Redireccionar a la lista de Productos
    //history.push("/products");
    //<Redirect to="/products" />;
    //window.location = "/products";
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 p-4">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>
                  Nombre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Precio <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio del Producto"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Detalle <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Detalle del Producto"
                  name="detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Categoria <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Categoria del Producto"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="form-group text-center">
                <span className="font-weight-bold text-danger">
                  * Campos Requeridos
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {loading ? <p> Loading... </p> : null}

            {error ? (
              <p className="alert alert-danger p-2 m-4 text-center">
                Ocurrio un error.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
