
import { useProducts } from "../hooks/UseProducts";
import ProductCard from "./ProductCard";
import CardSkelton from "./CardSkelton";

const FeaturedProduct = () => {
 const {products,loading,error} = useProducts()

  const featured = products.slice(0, 5);

  return (
    <div className="md:p-20 p-5">
      {loading && <div><CardSkelton count={5} gridCol={5}/></div>}
      {error && <div>{error}</div>}
      {error && <div>{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
