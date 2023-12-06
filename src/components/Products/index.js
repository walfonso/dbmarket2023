import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Product from "./Product";
import { getAllProductsAction } from "../../store/actions/productsActions";

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllProducts = () => dispatch(getAllProductsAction());
    getAllProducts();
  }, []);

  const { loading, error, products } = useSelector((state) => state.products);

  return (
    <>
      <h2 className="text-center my-5">Listado de Productos</h2>
      {loading ? <h4 className="text-center"> Loading... </h4> : null}

      {error ? (
        <p className="alert alert-danger p-2 m-4 text-center">
          Ocurrio un error.
        </p>
      ) : null}

      <div className="row pb-2">
        <div className="col-12 text-right">
          <Link
            to={"/products/new"}
            className="btn btn-danger nuevo-post d-block d-md-inline-block"
          >
            Nuevo Producto &#43;
          </Link>
        </div>
      </div>

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Categoria</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0
            ? "No hay Productos"
            : products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
        </tbody>
      </table>
    </>
  );
};

export default Products;
