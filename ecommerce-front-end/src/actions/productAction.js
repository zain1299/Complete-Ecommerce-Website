import { productConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const getProductsBySlug = (slug) => {
  return async (disaptch) => {
    const res = await axiosInstance.get(`/products/${slug}`);
    if (res) {
      disaptch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    }
  };
};
