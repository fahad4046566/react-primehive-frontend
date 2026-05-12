
import HeroSection from "../components/HeroSection";
import ServiceSection from "../components/ServiceSection";
import heroImage from "../assets/hero-image.png";
import hero2 from "../assets/secondHero.png";
import FeaturedProduct from "../components/FeaturedProduct";
import FeaturedCategory from "../components/FeaturedCategory";
import HeadingWithLink from "../components/HeadingWithLink";


const Home = () => {
   
  return (
    <div>
      <HeroSection
        heading="Elevate Your Everyday Style with Our Trendy Collection"
        paragraph="Discover the latest fashion trends and timeless classics in our collection."
        btn1text="Track Order"
        btn1link="/orders"
        btn2text="More Shop"
        btn2link="/products"
        badge={true}
        badgeText={"New Collection"}
        image={heroImage}
        bgGradient={"from-slate-200 via-blue-100 to-purple-100"}
      />
      <ServiceSection />
      <HeadingWithLink heading="Shop By Categories" link="/categories" linkText="Categories"/>
      <FeaturedCategory />
       <div className="md:pl-10 md:pr-10">
       <HeroSection
        heading="Summer Sale"
        paragraph="Upto 40% off on selected items"
        btn1text="More Shop"
        btn1link="/products"
        badge={true}
        badgeText={"Limited Time Offer"}
        image={hero2}
        bgGradient={"bg-gradient-to-r to-[#1E3A8A] via-[#3B82F6] from-[#60A5FA]"}
      />
      </div>
      <HeadingWithLink heading="Featured Products" link="/products" linkText="Products"/>
      <FeaturedProduct  />
      
    </div>
  );
};

export default Home;
