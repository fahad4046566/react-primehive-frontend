import { useEffect, useState } from "react";
import { getAdminOrdersApi } from "../api/order";

const UseOrder = () => {
 const [order, setOrder] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   useEffect(() => {
     const getProducts = async () => {
       try {
         setLoading(true);
         const response = await getAdminOrdersApi();
         setOrder(response.data.data);
         setLoading(false);
       } catch (err) {
         setError(err.response?.data?.message || "Something went wrong");
         setLoading(false);
       }
     };
     getProducts();
   }, []);
 
   return {
     order,
     loading,
     error,
   };
 };


export default UseOrder