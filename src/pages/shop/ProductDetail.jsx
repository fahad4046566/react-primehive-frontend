import { NavLink, useNavigate } from "react-router-dom";
import UseProductDetail from "../../hooks/UseProductDetail";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { useState } from "react";

import { useCartContext } from "../../context/CartContext";
import { useGlobalContext } from "../../context/AuthContext";
import CardSkelton from "../../components/CardSkelton";

const ProductDetail = () => {
  const [count, setcount] = useState(1);
  const [success, setSuccess] = useState(null);

  const { addToCart } = useCartContext();
  const { token } = useGlobalContext();
  const { product, loading, error } = UseProductDetail();

  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    const result = await addToCart(product.id, count);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => setSuccess(null), 3000);
    }
  };
if (loading) return <div className="flex justify-center md:pl-150 items-center min-h-[60vh]"><CardSkelton count={1} gridCol={1} /></div>
if (error) return <div>Error: {error}</div>;
if (!product) return <div>Product not found</div>;

  const { name, description, image, stock, category, price } = product;
  return (
    <div>
      {success && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}
      <NavLink to={"/products"}>
        <div className="font-semibold flex items-center m-10">
          <IoIosArrowRoundBack className="text-xl text-blue-600" />
          Back to Products
        </div>
      </NavLink>
     
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row">
          <img src={image} className="w-150 rounded-lg shadow-2xl" />
          <div>
            <div className="badge badge-soft badge-primary m-2">{category}</div>
            <h1 className="text-3xl font-bold m-2">{name}</h1>
            <h1 className="font-bold text-2xl m-2">Rs:{price}</h1>
            <p className="py-6 m-2">{description}</p>
            <p className="font-semibold text-lg py-6 m-2">
              Items in stock: <span className="font-bold text-xl">{stock}</span>
            </p>

            {stock === 0 ? (
              <button disabled className="btn btn-disabled">
                Out of Stock
              </button>
            ) : (
              <div className="m-2">
                <button
                  className="border p-3 rounded-2xl border-gray-500 hover:cursor-pointer"
                  onClick={() => {
                    setcount(count - 1);
                  }}
                  disabled={count === 1}
                >
                  <LuMinus />
                </button>
                <span className="p-4 font-semibold text-2xl">{count}</span>
                <button
                  className="border p-3 rounded-2xl border-gray-500 hover:cursor-pointer"
                  onClick={() => {
                    count < stock && setcount(count + 1);
                  }}
                  disabled={count === stock}
                >
                  <LuPlus />
                </button>
              </div>
            )}

            <button
              className="btn btn-primary m-2 w-full"
              onClick={handleAddToCart}
            >
              <LuShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
