import { Link } from "react-router-dom";

import { MdNavigateNext } from "react-icons/md";
import { MdKeyboardBackspace } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

import { useCartContext } from "../../context/CartContext";
import { useEffect, useState } from "react";

const Cart = () => {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setdeletingId] = useState(null);
  const [deletingCartId, setDeletingCartId] = useState(null);

  const { cart, cartCount, updateQuantity, removeItem, clearCart, fetchCart } =
    useCartContext();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpdate(productId, newQty) {
    setUpdatingId(productId);
    await updateQuantity(productId, newQty);
    await fetchCart();
    setUpdatingId(null);
  }
  const handleRemove = async (productId) => {
    setdeletingId(productId);
    await removeItem(productId);
    await fetchCart();
    setdeletingId(null);
  };
  const handlCartEmpty = async () => {
    if (CartItems.length === 0) {
      return alert("Cart already Empty");
    } else {
      if (window.confirm("Are you sure you want to clear your entire cart?")) {
        setDeletingCartId(true);
        await clearCart();
        await fetchCart();
        setDeletingCartId(null);
      }
    }
  };

  const CartItems = cart?.items || [];

  return (
    <div className="md:p-3">
      {/* cart title + clear cart + back to product button       */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        {/* Left side: Title + Breadcrumb */}
        <div>
          <div className="md:m-10">
            <h1 className="text-xl md:text-3xl font-semibold md:font-bold">
              Your Cart
            </h1>
            <div className="flex items-center flex-wrap">
              <button className="hover:cursor-pointer font-semibold p-1 flex items-center gap-2 text-sm md:text-base">
                Home <MdNavigateNext />
              </button>
              <Link to="/cart">
                <button className="hover:cursor-pointer font-semibold p-1 text-blue-600 text-sm md:text-base">
                  Cart
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right side: Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:mr-9">
          <Link to="/products">
            <button className="btn btn-outline btn-primary text-blue-500 w-full sm:w-auto">
              <MdKeyboardBackspace className="text-xl" />
              Continue to Shopping
            </button>
          </Link>
          <div>
            {deletingCartId ? (
              <div className="text-center">Deleting Entire Cart...</div>
            ) : (
              <button
                onClick={handlCartEmpty}
                className="btn btn-error hover:cursor-pointer w-full sm:w-auto"
              >
                <MdDelete className="text-2xl text-red-900" />
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

     <div className="flex flex-col lg:flex-row justify-center gap-8 mt-6">
  {/* Order Table - horizontally scrollable on mobile */}
  <div className="w-full lg:w-auto lg:min-w-280 xl:w-200 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table className="table table-zebra w-full min-w-125">
      {/* Empty state */}
      {CartItems.length === 0 && (
        <tbody>
          <tr>
            <td colSpan="5" className="text-center font-bold p-10">
              Cart is Empty
            </td>
          </tr>
        </tbody>
      )}

      {/* Table Header */}
      <thead>
        <tr>
          <th className="font-bold text-black">Product</th>
          <th className="font-bold text-black">Price</th>
          <th className="font-bold text-black">Quantity</th>
          <th className="font-bold text-black">Delete</th>
          <th className="font-bold text-black">Total</th>
        </tr>
      </thead>

      <tbody>
        {CartItems.map((item, index) => {
          const {
            id,
            product_id,
            name,
            stock,
            image,
            price_at_add,
            subtotal,
            quantity,
          } = item;
          return (
            <tr key={`${id}-${product_id}-${index}`}>
              {/* Product column */}
              <td>
                <div className="flex items-center gap-3 min-w-37.5">
                  <img
                    src={image}
                    className="w-12 h-12 object-cover rounded-md"
                    alt={name}
                  />
                  <span className="line-clamp-2">{name}</span>
                </div>
              </td>

              {/* Price */}
              <td>Rs: {price_at_add}</td>

              {/* Quantity with + / - */}
              <td>
                <div className="border p-1 rounded-2xl border-slate-500 w-fit inline-flex items-center">
                  {updatingId === product_id ? (
                    <span className="loading loading-ball loading-xl"></span>
                  ) : (
                    <button
                      className="p-1 hover:cursor-pointer"
                      onClick={() => handleUpdate(product_id, quantity - 1)}
                      disabled={quantity === 1}
                    >
                      <LuMinus />
                    </button>
                  )}

                  <span className="px-2 md:px-4 font-semibold text-lg">
                    {quantity}
                  </span>

                  {updatingId === product_id ? (
                    <span className="loading loading-ball loading-xl"></span>
                  ) : (
                    <button
                      className="p-1 hover:cursor-pointer"
                      onClick={() => handleUpdate(product_id, quantity + 1)}
                      disabled={quantity === stock}
                    >
                      <LuPlus />
                    </button>
                  )}
                </div>
              </td>

              {/* Delete button */}
              <td>
                {deletingId === product_id ? (
                  <p className="text-sm">Deleting...</p>
                ) : (
                  <button onClick={() => handleRemove(product_id)}>
                    <MdDelete className="text-2xl text-red-500 hover:cursor-pointer" />
                  </button>
                )}
              </td>

              {/* Subtotal */}
              <td className="font-bold text-lg md:text-xl">Rs:{subtotal}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* Order Summary Card - full width on mobile, fixed width on desktop */}
  <div className="w-full lg:w-96">
    <div className="border border-base-content/5 bg-base-100 card shadow-sm">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Order Summary</h2>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          <li className="flex justify-between">
            <span className="text-base md:text-xl">Subtotal ({cartCount} Items)</span>
            <span className="font-bold text-base md:text-xl">Rs: {cart?.total}</span>
          </li>
          <div className="divider my-1"></div>
          <li className="flex justify-between">
            <span className="text-lg md:text-2xl font-semibold">Total</span>
            <span className="font-bold text-lg md:text-2xl">Rs: {cart?.total}</span>
          </li>
        </ul>

        <div className="mt-6">
          {cartCount === 0 ? (
            <button className="btn btn-primary btn-block" disabled>
              Cart is empty
            </button>
          ) : (
            <Link to="/checkout">
              <button className="btn btn-primary btn-block">
                Proceed to Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Cart;
