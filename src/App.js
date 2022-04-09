import logo from "./logo.svg";
import "./App.scss";
import { Button } from "antd";
import { createContext, useEffect, useReducer, useState } from "react";
import reducer, { initialProducts } from "./reducer/reducer";
import Counter from "./components/Counter/Counter";
import { Context } from "./components/Context/Context";
import Test from "./components/Test/Test";
import Product from "./components/Product/Product";

import axios from "axios";
import { GET_PRODUCTS } from "./actions/type";

function App() {
  const [state, dispatch] = useReducer(reducer, initialProducts);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
      );
      dispatch({ type: GET_PRODUCTS, data: res.data });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Context.Provider value={[state, dispatch]}>
        <Product></Product>
      </Context.Provider>
    </div>
  );
}

export default App;
