import { combineReducers } from "redux";
import userReducer from "./authReducer";
import signupReducer from "./userReducer";
import categoryReducer from "./categoryReducer"
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  auth: userReducer,
  user: signupReducer,
  category : categoryReducer,
  product : productReducer, 
});

export default rootReducer;
