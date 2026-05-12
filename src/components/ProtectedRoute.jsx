import { Navigate, Outlet} from "react-router-dom";
import { useGlobalContext } from "../context/AuthContext";

const ProtectedRoute = ({ adminOnly}) => { 
  const { token, user } = useGlobalContext();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet/>;
};
export default ProtectedRoute