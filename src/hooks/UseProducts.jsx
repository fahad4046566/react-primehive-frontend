import { useEffect, useState } from "react";
import { getProductsApi } from "../api/products";
import useDebounce from "./UseDebounce";


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);
 

  useEffect(() => {
    const getProducts = async () => {
       if ((debounceSearch || categoryId) && page !== 1) {
      setPage(1);
      return; 
    }
      try {
        const params = { page };
        if (debounceSearch) params.search = debounceSearch;
        if (categoryId) params.category_id = categoryId;
        setLoading(true);
        const response = await getProductsApi(params);
        setProducts(response.data.data);
        // setPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };
    getProducts();
  }, [page, debounceSearch, categoryId]);

  return {
    products,
    setProducts,
    loading,
    error,
    lastPage,
    page,
    searchTerm,
    setSearchTerm,
    categoryId,
    setCategoryId,
    setPage,
  };
};
