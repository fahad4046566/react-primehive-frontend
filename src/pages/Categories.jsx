import CardSkelton from "../components/CardSkelton";
import FeatureCategoryCard from "../components/FeatureCategoryCard";
import UseCategory from "../hooks/UseCategory";

const Categories = () => {
  const { category, error, loading } = UseCategory();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Categories</h1>
      <div className="md:pl-20 md:pr-20 p-5">
        {loading && <div><CardSkelton count={10} gridCol={5}/></div>}
        {error && <div>{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {category.map((cat) => (
            <FeatureCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
