import HeroSection from "../components/HeroSection";
import ServiceSection from "../components/ServiceSection";
import about from "../assets/aboutHero.png"
import team from "../assets/team.png"

const About = () => {
  return (
    <div>
      <HeroSection
        heading="About Us"
        paragraph="Welcome to our e-commerce store! We are passionate about providing you with a seamless shopping experience and a wide range of high-quality products. Our mission is to bring you the best in fashion, electronics, home goods, and more, all at competitive prices."
        btn1text="Shop Now"
        btn1link="/products"
        image={about}
        bgGradient={"bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50"}
      />
      <HeroSection
        secondHeading="Our Story"
        paragraph="Founded in 2020, our store was born out of a desire to create a one-stop destination for all your shopping needs. We started with a small team of dedicated individuals who shared a vision of making online shopping easy, enjoyable, and accessible to everyone. Over the years, we have grown into a thriving online marketplace, serving customers from around the world."
        image={team}
      />
      <ServiceSection/>
    </div>
  );
};

export default About;
