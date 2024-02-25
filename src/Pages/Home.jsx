import { ToastContainer, toast } from "react-toastify";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../Axios/EndPoints";
import { useEffect, useState } from "react";
import { Get } from "../Axios/Get";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/actions/cartActions';

const Home = () => {
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = () => {
    Get(ENDPOINTS.ALL_PRODUCTS, false, "")
      .then((res) => {
        if (res?.data?.success) {
          setAllProducts(res?.data?.products);
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
    <div className="container">
      <div className="my-4 d-flex align-items-center justify-content-between">
        <h2>All Products</h2>
        <Link to={"/products"} className="text-decoration-none text-black border px-3 py2">
          Products Page
        </Link>
      </div>
      <div className="row justify-content-center">
        {allProducts?.map((product) => (
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
