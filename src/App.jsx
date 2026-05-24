
import Navbar from './components/Navbar'
import { Outlet,useLocation } from 'react-router-dom'
import { useCartContext } from './context/CartContext';
import { useEffect } from 'react';
import Footer from './components/Footer';


const App = () => {
   const { fetchCart } = useCartContext();

  useEffect(() => {
    fetchCart();  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    const location = useLocation();
     const hideComponent = location.pathname.startsWith('/admin');
  return (
    <div>
     {!hideComponent && <Navbar />}
      <main>
        <Outlet/>
      </main>
      {!hideComponent && <Footer />}
    </div>
  )
}

export default App