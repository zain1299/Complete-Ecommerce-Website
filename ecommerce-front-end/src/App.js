import { useEffect } from "react";
import "./App.css";
import HomePage from "./containers/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "./actions";
import { Switch, Route } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";

function App() {
  const state = useSelector((state) => state);
  const category = state.category;

  const dispatch = useDispatch();

  useEffect(() => {
    if (category.categories.length === 0) {
      dispatch(getAllCategory());
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:slug" component={ProductListPage} />
      </Switch>
    </div>
  );
}

export default App;
