import { Link } from "react-router-dom";


 const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
        <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage