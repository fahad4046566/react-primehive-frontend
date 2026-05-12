import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useOrderDetail } from "../../hooks/UseOrderDetail";
import Loading from "../../components/Loading";

const OrderDetail = () => {
  const { error, loading, order } = useOrderDetail();

  console.log("order detail" + order);
  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!order) return <div>Product not found</div>;

  return (
    <div>
      {/* Back button */}
      <NavLink to="/orders">
        <div className="font-semibold flex items-center m-10">
          <IoIosArrowRoundBack className="text-xl text-blue-600" />
          Back to Orders
        </div>
      </NavLink>

      {/* Order summary */}
      <div className="m-4 p-4 border rounded">
        <h2 className="text-xl font-bold">Order #{order.id}</h2>
        <p>Status: {order.status}</p>
        <p>Total: Rs {order.total_amount}</p>
        <p>Payment: {order.payment_method}</p>
        <p>Shipping Address: {order.shipping_address}</p>
        <p>Placed on: {order.created_at}</p>
      </div>

      {/* Items list */}
      <div className="m-4">
        <h3 className="font-semibold text-lg">Items</h3>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between mb-2 border-b pb-2">
            <div>
              <img
                src={item.image}
                className="w-20 rounded"
                alt={item.product_name}
              />
            </div>
            <div className="flex-1 ml-4">
              <span className="font-semibold">{item.product_name}</span>
              <div>
                Price: Rs {item.price} × Qty: {item.quantity}
              </div>
            </div>
            <span>Rs {item.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
