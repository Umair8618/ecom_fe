import React from "react";

const ProductCard = ({ product, addToCart }) => {
  const { name, price, description, category } = product;

  return (
    <div className="card mb-4">
      <img
        src="https://via.placeholder.com/150"
        className="card-img-top"
        alt={name}
      />
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <h5>{name}</h5>
          <div className="border bg-secondary px-2 d-flex align-items-center justify-content-center rounded text-white">
            {category}
          </div>
        </div>
        <p>{description}</p>
        <p>PKR: {price.toFixed(2)}</p>
        <button onClick={addToCart} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
