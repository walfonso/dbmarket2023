import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Sidebar.module.css";

const Sidebar = () => {
  const user = useSelector((state) => state.authState);
  return (
    <div className={style.sidebar}>
      <ul>
        {user.email && (
          <>
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/products">Productos</Link>
        </li>

        {user.email && (
          <>
            <li>
              <Link to="/users">Usuarios</Link>
            </li>
            <li>
              <Link to="/clients">Clientes</Link>
            </li>
            <li>
              <Link to="/suppliers">Proveedores</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
