import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";


const Purchase = (props) => {
  const { cartItems, removeFromCart } = props;
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };


  // console.log(cartItems)

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast.error('Item removed from cart.');
  };

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item?.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Check if customer information is provided
    if (customerInfo?.name && customerInfo?.email && customerInfo?.address) {
      // Implement checkout logic (e.g., send order to server, redirect to a checkout page)
      // You can add more checkout-related functionality here
      toast.success("Checkout completed!");
    } else {
      toast.error("Please provide all required information.");
    }
  };


  return (
    <>
      <div>
        <h2 className="text-center my-4">Shopping Cart</h2>

        {/* Display Cart Items */}
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
                      <td>{item?.price?.toFixed(2)}</td>
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
                  disabled={!customerInfo.name || !customerInfo.email || !customerInfo.address}
                >
                  Proceed to Checkout
                </Button>
              </Form>
            </div>
          </>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default Purchase;
