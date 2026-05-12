
const SearchInput = ({searchTerm, setSearchTerm}) => {
  return (
    <div>
      <label className="input w-70 md:w-120 h-15 rounded-4xl ">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          required
          placeholder="Search Here..."
        />
      </label>
    </div>
  );
};

export default SearchInput;
