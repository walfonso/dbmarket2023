import { Link } from "react-router-dom";

import style from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/users">Usuarios</Link>
        </li>
        {/*
        <li>
          <Link to="/clients">Clientes</Link>
        </li>
        <li>
          <Link to="/suppliers">Proveedores</Link>
        </li>
        */}
      </ul>
    </div>
  );
};

export default Sidebar;
