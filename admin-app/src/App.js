import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import SignUp from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, isUserLoggedIn } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const auth = state.auth;
  const category = state.category;

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }

    if (category.categories.length === 0) {
      dispatch(getInitialData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
