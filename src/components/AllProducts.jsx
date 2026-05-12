
import { useProducts } from "../hooks/UseProducts";
import SearchInput from "./SearchInput";
import SearchCategories from "./SearchCategories";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import CardSkelton from "./CardSkelton";

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    categoryId,
    setCategoryId,
    page,
    setPage,
    lastPage,
  } = useProducts();

  useEffect(() => {
    const catId = searchParams.get("category_id");
    if (catId && !categoryId) {
      setCategoryId(catId);
    }
  }, [searchParams, categoryId, setCategoryId]);

  useEffect(() => {
  if (categoryId) {
    setSearchParams({ category_id: categoryId });
  } else {
    setSearchParams({});
  }
}, [categoryId, setSearchParams]);

  return (
    <div className="md:p-10 p-5">
     
      {error && <div>{error}</div>}
      {error && <div>{error}</div>}
      <div className="flex items-center justify-center gap-3">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SearchCategories
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
      </div>

      <div className="flex justify-between">
        <div className="m-4">
         <h1 className="text-2xl font-bold">All Products</h1>
        </div>
      </div>
       {loading && <div><CardSkelton count={20} gridCol={4}/></div>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="m-10">
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </div>
  );
};

export default AllProducts;
