import { productConstanst } from "../actions/constants";

const initialState = {
    products : []
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstanst.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};

export default productReducer;
