import { useEffect } from "react";
import "./App.css";
import HomePage from "./containers/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from './actions'

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
      <HomePage />
    </div>
  );
}

export default App;
