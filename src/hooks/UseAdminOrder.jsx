import { getAdminOrdersApi } from "../api/order";
import { useEffect, useState } from "react";
import useDebounce from "./UseDebounce";

 const UseAdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const debounceSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  useEffect(() => {
    const getorders = async () => {
      try {
        const params = { page };
        if (debounceSearch) params.search = debounceSearch;
        setLoading(true);
        const response = await getAdminOrdersApi(params);
        setOrders(response.data.data);
        setLastPage(response.data.last_page);
        setLoading(false);
        setError(response?.data?.message || "Something went wrong");
      } catch (err) {
        console.error(err)
        setLoading(false);
      }
    };
    getorders();
  }, [page, debounceSearch,]);

  return {
    orders,
    setOrders,
    loading,
    error,
    lastPage,
    page,
    searchTerm,
    setSearchTerm,
    setPage,
  };
};
export default UseAdminOrder;