import { ToastContainer, toast } from "react-toastify";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { addToCart } = props;

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 20.99,
      description: "Description of Product 1",
      category:"product1"
    },
    {
      id: 2,
      name: "Product 2",
      price: 15.49,
      description: "Description of Product 2",
      category:"product2"
    },
    {
      id: 3,
      name: "Product 3",
      price: 15.49,
      description: "Description of Product 3",
      category:"product3"
    },
    {
      id: 4,
      name: "Product 4",
      price: 15.49,
      description: "Description of Product 4",
      category:"product4"
    },
    {
      id: 5,
      name: "Product 5",
      price: 54.49,
      description: "Description of Product 5",
      category:"product5"
    },
    // Add more product data as needed
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
    <div className="container">
      <div className="my-4 d-flex align-items-center justify-content-between">
        <h2>All Products</h2>
        <Link to={"/products"} className="text-decoration-none text-black border px-3 py2">
          Products
        </Link>
      </div>
      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-md-3">
            <ProductCard
              product={product}
              addToCart={() => handleAddToCart(product)}
            />
          </div>
        ))}
      </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
