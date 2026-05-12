import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/shop/Products.jsx";
import ProductDetail from "./pages/shop/ProductDetail.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import About from "./pages/About.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Cart from "./pages/shop/Cart.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Orders from "./pages/orders/Orders.jsx";
import OrderDetail from "./pages/orders/OrderDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import CheckOut from "./pages/checkout/CheckOut.jsx";
import Payment from "./pages/checkout/Payment.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminProductCreate from "./pages/admin/AdminProductCreate.jsx";
import AdminProductEdit from "./pages/admin/AdminProductEdit.jsx";
import AdminCategories from "./pages/admin/AdminCategories.jsx";
import AdminCategoryCreate from "./pages/admin/AdminCategoryCreate.jsx";
import AdminCategoryEdit from "./pages/admin/AdminCategoryEdit.jsx";
import AdminOrder from "./pages/admin/AdminOrder.jsx";
import CartPage from "./pages/shop/CartPage.jsx";
import Categories from "./pages/Categories.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },

      { path: "/about", element: <About /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/cart", element: <Cart /> },
          { path: "/cartPage", element: <CartPage /> },
          { path: "/orders", element: <Orders /> },
          { path: "/payment", element: <Payment /> },
          { path: "/orders/:id", element: <OrderDetail /> },
          { path: "/checkout", element: <CheckOut /> },
        ],
      },
      {
        path: "/admin",
        element: <ProtectedRoute adminOnly={true} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "products", element: <AdminProducts /> },
              { path: "orders", element: <AdminOrder /> },
              { path: "category", element: <AdminCategories /> },
              { path: "products/create", element: <AdminProductCreate /> },
              { path: "categories/create", element: <AdminCategoryCreate /> },
              { path: "products/edit/:id", element: <AdminProductEdit /> },
              { path: "categories/edit/:id", element: <AdminCategoryEdit /> },
            ],
          },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
