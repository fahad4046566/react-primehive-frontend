import { Link } from "react-router-dom";
import ProductHero from "../assets/ProductHero.png";
import { MdNavigateNext } from "react-icons/md";

const ProductHeroSection = () => {
  return (
    <div className="md:p-5 pt-5 p-2">
      <div className="hero md:h-72 rounded-4xl bg-linear-to-br from-purple-100 via-purple-50 to-indigo-50">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <p className="py-6 font-semibold text-xl md:w-100">
              Discover premium products at the best prices
            </p>
          </div>
          <div className="md:m-10">
            <h1 className="text-3xl md:text-3xl font-bold">
              Shop Our Collection
            </h1>
            <div className="flex">
              <Link to={"/"}>
                <button className="hover:cursor-pointer font-semibold p-2 flex items-center gap-2">
                  Home <MdNavigateNext />
                </button>
              </Link>
              <Link to={"/products"}>
                <button className="hover:cursor-pointer font-semibold p-1">
                  Shop
                </button>
              </Link>
            </div>
          </div>

          <img src={ProductHero} className="h-70" />
        </div>
      </div>
    </div>
  );
};

export default ProductHeroSection;
