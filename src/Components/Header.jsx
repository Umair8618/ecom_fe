import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Header = (props) => {
  const { cartItems } = props;
  return (
    <>
      <div className="d-flex align-items-center justify-content-center header gap-5">
        <Link to="/" className="text-decoration-none text-white">
          <div className="h3">Shopping App</div>
        </Link>
        <div className="d-flex align-items-center position-relative">
          <Link to="/purchase">
            <FaShoppingCart color="white" style={{ fontSize: "40px" }} />
            <span className="badge bg-danger rounded-circle position-absolute top-0">
                {cartItems?.length}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
