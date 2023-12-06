import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.authState);
  console.log("estoy aca", user);
  return (
    <Route
      //{...rest}
      render={(props) =>
        user.email ? <Component /> : <Redirect to="/users/login" />
      }
    />
  );
};
