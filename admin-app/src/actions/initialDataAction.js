import { categoryConstants, productConstanst } from "./constants";
import axiosInstance from "../helpers/axios";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axiosInstance.post(`/initialdata`);

    if (res) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstanst.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
    }
    console.log(res);
  };
};
