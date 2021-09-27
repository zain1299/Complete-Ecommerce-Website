import { userConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const Signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    const res = await axiosInstance.post("/admin/signup", {
      ...user,
    });

    if (res) {
      const message = res.data
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: message,
      });
    } else {
      dispatch({
        type: userConstants.USER_REGISTER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
