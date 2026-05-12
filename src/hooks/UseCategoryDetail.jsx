import { useEffect, useState } from "react";
import { getCategoriesByIdApi } from "../api/products";
import { useParams } from "react-router-dom";


export const UseCategoryDetail = () => {
     const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await getCategoriesByIdApi(id);
        setCategory(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  return { category, loading, error };
};