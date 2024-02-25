import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import ModalComponent from "../Components/ModalComponent/ModalComponent";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../Redux/actions/cartActions';

import { setProducts } from '../Redux/actions/productActions';
import { Get } from "../Axios/Get";
import { ENDPOINTS } from "../Axios/EndPoints";

const Purchase = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  console.log("cartItems >>>", cartItems)

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);

  
const fetchProducts = () => {
  Get(ENDPOINTS.ALL_PRODUCTS, false, "")
    .then((res) => {
      if (res?.data?.success) {
        // Dispatch an action to set products in the Redux store
        dispatch(setProducts(res?.data?.data));
      } else {
        console.error("Products Api Fetched But Success Is False");
      }
    })
    .catch((error) => {
      console.log("error while fetching all products ");
    });
};

useEffect(() => {
  fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.error("Item removed from cart.");
  };

  const calculateTotal = () => {
    return cartItems
      ?.reduce((total, item) => total + parseInt(item?.price, 10), 0);
  };

  const handleCheckout = () => {
    // Check if customer information is provided
    if (customerInfo?.name && customerInfo?.email && customerInfo?.address) {
      // Dispatch an action to clear the cart
      dispatch(clearCart());
      setShowModal(true);
      setIsPurchase(true);
    } else {
      toast.error("Please provide all required information.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsPurchase(false);
  };

  const handleButtonClick = () => {
    setShowModal(false);
    setIsPurchase(false);
  };

  return (
    <>
      <div>
        <h2 className="text-center my-4">Shopping Cart</h2>

        {cartItems?.length === 0 ? (
          <>
            <div className="container text-center">No Item in Cart</div>
          </>
        ) : (
          <>
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price (PKR)</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item?.id}>
                      <td>{item?.name}</td>
                      <td>{item?.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoveFromCart(item?.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Display Total */}
              <div className="text-end">
                <h4>Total (PKR) : {calculateTotal()}</h4>
              </div>

              {/* Customer Information Form */}
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {/* Checkout Button */}
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handleCheckout}
                  disabled={
                    !customerInfo.name ||
                    !customerInfo.email ||
                    !customerInfo.address
                  }
                >
                  Proceed to Checkout
                </Button>
              </Form>
            </div>
          </>
        )}
        {showModal && (
          <ModalComponent
            onClose={handleCloseModal}
            onButtonClick={handleButtonClick}
            isPurchase={isPurchase}
          />
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Purchase;
