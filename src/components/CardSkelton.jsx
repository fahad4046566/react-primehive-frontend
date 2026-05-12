const CardSkelton = ({ count , gridCol }) => {
  if (!count || count <= 0) return null;

  return (
    <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridCol} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 animate-pulse"
        >
          <div className="w-full h-40 bg-gray-300 rounded-md"></div>
          <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="mt-4 h-8 bg-gray-300 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkelton;
