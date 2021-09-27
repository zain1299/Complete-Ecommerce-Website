import { productConstanst } from "./constants";
import axiosInstance from "../helpers/axios";

export const addProduct = (form) => {
    return async (dispatch) => {
      dispatch({type : productConstanst.ADD_NEW_PRODUCTS_REQUEST})
      const res = await axiosInstance.post(`/product/create`, form);
      // if(res) {
      //   dispatch({
      //     type : productConstanst.ADD_NEW_PRODUCTS_SUCCESS,
      //     payload : {product : res.data.product }
      //   })
      // }else {
      //   dispatch({
      //     type : productConstanst.ADD_NEW_PRODUCTS_FAILURE,
      //     payload : res.data.error
      //   })
      // }
    };
  };