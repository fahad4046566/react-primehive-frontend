import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";

const HeadingWithLink = ({ heading , link , linkText}) => {
  return (
    <div className="flex items-center justify-between p-3 pt-5 md:pt-10 md:pl-20 md:pr-20 ">
      <div>
        <h1 className="font-bold text-xl md:text-3xl">{heading}</h1>
      </div>
        <Link to={link}>
      <div>
        <h1 className="font-semibold  md:text-xl hover:cursor-pointer flex items-center gap-4">
          <span>View All {linkText}</span>
          <span>
            <GrFormNextLink className="text-blue-800 md:text-3xl" />
          </span>
        </h1>
      </div>
      </Link>
    </div>
  );
};

export default HeadingWithLink;
