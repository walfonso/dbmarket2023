import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 p-4">
        <div className="card">
          <div className="card-header">
            <h2 className="text-center mb-4 font-weight-bold">Dashboard</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <Link
                  to={"/products"}
                  className="btn btn-danger nuevo-post d-block d-md-inline-block"
                >
                  Lista de Productos
                </Link>
              </div>
              <div className="col-6">
                <Link
                  to={"/users"}
                  className="btn btn-danger nuevo-post d-block d-md-inline-block"
                >
                  Lista de Usuarios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
