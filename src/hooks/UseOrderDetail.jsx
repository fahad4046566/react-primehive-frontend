import { useEffect, useState } from "react";
import { getOrderByIdApi } from "../api/order";
import { useParams } from "react-router-dom";

export const useOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await getOrderByIdApi(id);
        setOrder(response.data.data);
        console.log(response.data.data)
        setLoading(false);
      } catch (err) {
        setError(err.response?.data.message || "Something went wrong");
        setLoading(false);
      }
    };
    getProducts();
  }, [id]);

  return {
    order,
    loading,
    error,
  };
};
