import axiosClient from "../../config/axios";
import { LOGOUT, LOGIN } from "../../types/auth";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
const userUrl = "/user";

export const loginUser = (email, name, token) => ({
  type: LOGIN,
  payload: { email, name, token },
});

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const loginUserAction = withRouter((props) => {
  console.log("dataUser", props.dataUser);
  return async (dispatch) => {
    try {
      const response = await axiosClient.post(
        `${userUrl}/login`,
        props.dataUser
      );
      const user = response.data; // Assuming the API returns the user object

      console.log(user);
      if (user.success) {
        dispatch(
          loginUser(user.payload.email, user.payload.name, user.payload.token)
        );
        console.log("AUTORIZADO", user.payload.name);
      } else {
        props.history.push("/users/login");
      }
    } catch (error) {
      console.log("NO AUTORIZADO");
      console.error("DIO ERROR ", error);
    }
  };
});
