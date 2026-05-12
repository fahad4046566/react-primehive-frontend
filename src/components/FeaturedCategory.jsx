import UseCategory from "../hooks/UseCategory";
import CardSkelton from "./CardSkelton";
import FeatureCategoryCard from "./FeatureCategoryCard";

const FeaturedCategory = () => {
  const { category, error, loading } = UseCategory();
  const featured = category.slice(0, 5);
  return (
    <div className="md:pl-20 md:pr-20 p-5">
      {loading && <div><CardSkelton count={5} gridCol={5}/></div>}
      {error && <div>{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {featured.map((cat) => (
          <FeatureCategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategory;
