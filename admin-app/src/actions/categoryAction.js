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

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    const res = await axiosInstance.post(`/category/create`, form);
    if (res) {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      });
    } else {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.eroor,
      });
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    const res = await axiosInstance.post(`/category/update`, form);
    if (res) {
      console.log("if res", res);
    } else {
      console.log("esle res", res);
    }
  };
};
