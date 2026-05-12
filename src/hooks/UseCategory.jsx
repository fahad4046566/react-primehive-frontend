import { getCategoriesApi } from "../api/products";
import { useEffect, useState } from "react";

const UseCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await getCategoriesApi();
        setCategory(response.data.data.category);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return {
    category,
    setCategory,
    loading,
    error,
  };
};

export default UseCategory;
