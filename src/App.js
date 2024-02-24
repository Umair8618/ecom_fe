import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import { useState } from "react";
import Purchase from "./Pages/Purchase";
import Products from "./Pages/Products";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== productId));
  };

  return (
    <BrowserRouter>
    <Header cartItems={cartItems}/>
      <Routes>
        <Route exact path="/" element={<Home addToCart={addToCart}/>} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/purchase" element={<Purchase cartItems={cartItems} removeFromCart={removeFromCart}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
