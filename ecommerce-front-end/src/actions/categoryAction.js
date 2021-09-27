import { categoryConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const getAllCategory = (user) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

    const res = await axiosInstance.get("/category/getcategory");
    const { categoryList } = res.data;

    if (res) {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

