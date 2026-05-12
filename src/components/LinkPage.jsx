import { GrFormNextLink } from "react-icons/gr";

const LinkPage = ({ title }) => {
  return (
    <div>
      <h1 className="font-semibold text-xl hover:cursor-pointer flex items-center gap-4">
        <span>View All{title}</span>{" "}
        <span>
          <GrFormNextLink className="text-blue-800 text-3xl" />
        </span>
      </h1>
    </div>
  );
};

export default LinkPage;
