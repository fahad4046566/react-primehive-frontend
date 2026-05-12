import { useState, createContext, useContext } from "react";
import { addToCartApi ,updateQuantityApi,removeItemApi,clearCartApi,getCartApi} from "../api/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  
  
  const fetchCart = async () => {
      try {
          const response = await getCartApi();
          setCart(response.data.data)
          return {success:true}
        } catch (error) {
            return { success: false, message: error };
        }
    };
    const cartCount = cart?.total_items ?? 0;


  const addToCart = async (product_id, quantity) => {
    try {
      const response = await addToCartApi(product_id, quantity);
      await fetchCart();
      return {success:true,message:response.data.message}
    } catch (error) {
      return { success: false, message: error };
    }
  };
   const updateQuantity = async (product_id, quantity) => {
    try {
      const response = await updateQuantityApi(product_id, quantity);
      return {success:true,message:response.data.message}
    } catch (error) {
      return { success: false, message: error };
    }
  };
  const removeItem = async (product_id) => {
    try {
      const response = await removeItemApi(product_id);
      return {success:true,message:response.data.message}
    } catch (error) {
      return { success: false, message: error };
    }
  };
  const clearCart = async () => {
    try {
      const response = await clearCartApi();
      return {success:true,message:response.data.message}
    } catch (error) {
      return { success: false, message: error };
    }
  };

  return (
    <CartContext.Provider value={{cart,cartCount,addToCart,updateQuantity,removeItem,clearCart,fetchCart}}>{children}</CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
  return useContext(CartContext);
};
