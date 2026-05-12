import { useEffect, useState } from "react";
import { getProductByIdApi } from "../api/products";
import { useParams } from "react-router-dom";

export const useProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductByIdApi(id);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };
    getProducts();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};
