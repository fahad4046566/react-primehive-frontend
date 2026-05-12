
import SearchInput from "../../components/SearchInput";
import Pagination from "../../components/Pagination";
import UseAdminOrder from "../../hooks/UseAdminOrder";
import OrderStatusForm from "../../components/OrderStatusForm";
import ListSkeleton from "../../components/ListSkelton";


const AdminOrder = () => {
  const {
    orders,
    loading,
    error,
    lastPage,
    page,
    searchTerm,
    setSearchTerm,
    setPage,
  } = UseAdminOrder();
 
const statusConfig = {
    pending: { label: "Pending", class: "badge-warning" },
    paid: { label: "Paid", class: "badge-success" },
    shipped: { label: "Shipped", class: "badge-info" },
    delivered: { label: "Delivered", class: "badge-success" },
    cancelled: { label: "Cancelled", class: "badge-error" },
  };
  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Orders</h1>
            <p className="text-gray-400 mt-2">
              Manage all of Your orders in your store
            </p>
          </div>
          <div className="flex items-center gap-5">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
        <div className="divider"></div>

        <div className="overflow-x-auto">
          
          <table className="table">
            {/* head */}
            <thead>
              
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>User Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!orders ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    {error}
                  </td>
                </tr>
              ) : (
                orders?.map((order) => {
                     const { label, class: badgeClass } = statusConfig[order.status] || statusConfig.pending;
                  return (
                    <tr key={order.id}>
                      <th>#{order.id}</th>
                      <th>
                        <p
                          className="p-4  w-fit rounded-full"
                          style={{
                            backgroundColor: `hsl(${(order.id * 137) % 360}, 60%, 60%)`,
                            color: "#1f2937",
                          }}
                        >
                          {order.user_name
                            ?.split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </p>
                      </th>
                      <th>
                        <h1>{order.user_name}</h1>
                        <p>{order.email}</p>
                      </th>

                      <td>
                        <p className={`badge ${badgeClass}`}>{label}</p>
                      </td>
                      <td>
                        <OrderStatusForm
                          orderId={order.id}
                          currentStatus={order.status}
                            
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
           {loading && <div className="m-4"><ListSkeleton /></div>}
        </div>
      </div>
      <Pagination page={page} lastPage={lastPage} setPage={setPage} />
    </>
  );
};

export default AdminOrder;
