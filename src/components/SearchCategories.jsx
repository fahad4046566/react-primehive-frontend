import UseCategory from "../hooks/UseCategory";
import { BiSolidCategory } from "react-icons/bi";

const SearchCategories = ({ categoryId, setCategoryId }) => {
  const { category } = UseCategory();

  return (
    <div className="flex justify-center">
      <div className="dropdown dropdown-center">
        <div tabIndex={0} role="button" className="btn m-1">
          <BiSolidCategory className="text-2xl text-blue-700"/>
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <button
              onClick={() => setCategoryId("")}
              className={`px-4 py-2 rounded-full ${!categoryId ? "bg-blue-500 text-gray-900" : "bg-gray-200 text-gray-900"}`}
            >
              All
            </button>
          </li>
          <li>
            {category.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryId(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  categoryId == cat.id
                    ? "bg-blue-500 text-gray-900 hover:cursor-pointer"
                    : " text-gray-900 hover:cursor-pointer"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchCategories;
