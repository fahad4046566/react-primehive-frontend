import HeroSection from "../../components/HeroSection";
import hero from "../../assets/ProductHero.png";
import { useGlobalContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import UseOrder from "../../hooks/UseOrder";
import { CgCalendarDates } from "react-icons/cg";
import { FaCcStripe } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect } from "react";
import CardSkelton from "../../components/CardSkelton"

const Orders = () => {
  const { order, error, loading } = UseOrder();
  const { token } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/products");
  }, [token, navigate]);

  const statusConfig = {
    pending: { label: "Pending", class: "badge-warning" },
    paid: { label: "Paid", class: "badge-success" },
    shipped: { label: "Shipped", class: "badge-info" },
    delivered: { label: "Delivered", class: "badge-success" },
    cancelled: { label: "Cancelled", class: "badge-error" },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        heading="My Orders"
        paragraph="Your order history at a glance"
        btn2text="Continue Shopping"
        btn2link="/products"
        badge={false}
        image={hero}
        bgGradient="bg-gradient-to-r from-slate-100 to-slate-100"
      />

      {error && (
        <div className="max-w-4xl mx-auto mt-4 px-4">
          <div className="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <CardSkelton count={6} gridCol={3}/>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Order Summary Cards - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {order.map((item) => {
              const { id, status, created_at, payment_method, total_amount } = item;
              const { label, class: badgeClass } = statusConfig[status] || statusConfig.pending;

              return (
                <div key={id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Order #{id}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <CgCalendarDates /> {created_at}
                      </p>
                    </div>
                    <div className={`badge ${badgeClass} text-xs`}>{label}</div>
                  </div>
                  <div className="border-t border-gray-100 my-3"></div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-green-600">Rs {Math.round(total_amount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Payment</p>
                      <div className="flex items-center gap-1 text-sm">
                        {payment_method === "stripe" ? <FaCcStripe className="text-blue-600" /> : <BsCashStack />}
                        <span>{payment_method === "stripe" ? "Stripe" : "COD"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Items & Address Section - Mobile Stack */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items List */}
            <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-semibold text-lg">Order Items</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {order.map((orderItem) => {
                  const orderId = orderItem.id;
                  const { items } = orderItem;
                  if (!items || items.length === 0) return null;
                  return (
                    <div key={orderId} className="p-4">
                      {items.map((product, idx) => (
                        <div key={`${orderId}-${idx}`} className="flex flex-wrap items-center gap-4 py-3 border-b last:border-0">
                          <img src={product.image} alt={product.product_name} className="w-16 h-16 object-cover rounded-md" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.product_name}</p>
                            <p className="text-sm text-gray-500">
                              Rs {product.price} x {product.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">Rs {product.total}</p>
                            <NavLink to={`/orders/${orderId}`} className="text-primary text-sm hover:underline flex items-center gap-1">
                              View Details <FaArrowRightLong size={12} />
                            </NavLink>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="lg:w-80 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex items-center gap-2">
                <SlLocationPin className="text-blue-900 text-xl" />
                <h2 className="font-semibold text-lg">Shipping Address</h2>
              </div>
              <div className="p-4 space-y-4">
                {order.map((item) => (
                  <div key={item.id} className="text-sm text-gray-700 border-b border-gray-50 pb-3 last:border-0">
                    <p className="font-medium">Order #{item.id}</p>
                    <p>{item.shipping_address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;