import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Purchase from "./Pages/Purchase";
import Products from "./Pages/Products";

import { useSelector } from 'react-redux';


function App() {
  const cartItems = useSelector(state => state.cart);

  return (
    <BrowserRouter>
    <Header cartItems={cartItems}/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/purchase" element={<Purchase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
