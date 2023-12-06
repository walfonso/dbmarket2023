import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProductAction } from "../../../store/actions/productsActions";
const EditProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [productState, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    detail: "",
    category: "",
  });

  const { loading, error, product } = useSelector((state) => state?.products);

  useEffect(() => {
    setProduct(product);
  }, [product]);

  if (!productState) return history.push("/");

  console.log(productState);

  const { name, price, detail, category } = productState;

  const onFormChange = (e) => {
    setProduct({
      ...productState,
      [e.target.name]: e.target.value,
    });
  };

  const editProduct = (product) => dispatch(editProductAction(product));

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.value);

    //Validar formulario.
    if (
      name.trim() === "" ||
      price === "" ||
      detail.trim() === "" ||
      category.trim() === ""
    )
      return;

    //Si no hay errores.
    //Crear Cliente.
    const product = {
      _id: productState._id,
      name,
      price,
      detail,
      category,
    };

    editProduct(product);
    // Redireccionar a la lista de clientes.
    history.push("/products");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 p-4">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>
                  Nombre del Producto <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del Producto"
                  name="name"
                  value={name}
                  onChange={onFormChange}
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
                  onChange={onFormChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Descripción <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Detalle del Producto"
                  name="detail"
                  value={detail}
                  onChange={onFormChange}
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Categoria del Producto"
                  name="category"
                  value={category}
                  onChange={onFormChange}
                ></textarea>
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
                Guardar
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

export default EditProduct;
