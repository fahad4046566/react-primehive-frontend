
import { VscNewCollection } from "react-icons/vsc";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { SiTicktick } from "react-icons/si";

const HeroSection = ({
  badge,
  secondHeading,
  heading,
  paragraph,
  showCheckmark,
  btn1text,
  btn1link,
  btn2text,
  btn2link,
  image,
  bgGradient,
  badgeText ,
}) => {
  return (
    <div className="pl-10 pr-10 p-4">
      <div className={`hero rounded-4xl bg-linear-to-br ${bgGradient}`}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src= {image}  className="md:h-100 rounded-lg" />
          <div>
            {badge && (
              <div className="mb-4 badge badge-soft badge-primary">
                <VscNewCollection />
                {badgeText}
              </div>
            )}
            <div >
             {showCheckmark && (
              <SiTicktick className="text-green-500 text-5xl" />
            )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">{heading}</h1>
            {secondHeading && <h1 className="text-xl md:text-3xl font-bold">{secondHeading}</h1>}
            
            <p className="py-6 font-semibold text-xl md:w-100">
              {paragraph}
            </p>
           
           <div className="flex gap-2.5">
           {btn1link && 
            <NavLink to={btn1link}>
                <button className="btn btn-primary p-6 rounded-4xl bg-blue-600 flex items-center">
                  {btn1text}
                  <span>
                    <FaArrowRightLong />
                  </span>
                </button>
              </NavLink>
           } 
             {btn2link  &&
             <NavLink to={btn2link}>
                <button className="btn btn-primary p-6 border-slate-300 rounded-4xl text-gray-700 bg-slate-100 flex items-center">
                  {btn2text}
                </button>
              </NavLink>
             }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
