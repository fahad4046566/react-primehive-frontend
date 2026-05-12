import { PiHandWavingLight } from "react-icons/pi";
import { PiHandWavingFill } from "react-icons/pi";
import { FiBox } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import UseAdminOrder from "../../hooks/UseAdminOrder";
import { useProducts } from "../../hooks/UseProducts";
import Loading from "../../components/Loading";
const Dashboard = () => {

  const {orders} = UseAdminOrder()
  const {products} = useProducts()
  console.log()
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="divider"></div>
      </div>
      <div>
        <div className="flex  items-center gap-6 bg-purple-50 p-10 rounded-xl">
          <div>
            <div className="bg-purple-100 p-5 rounded-full">
              <PiHandWavingLight className="text-4xl text-blue-700" />
            </div>
          </div>
          <div>
            <span className="font-bold flex text-xl items-center gap-2">
              Welcome back, Admin!{" "}
              <PiHandWavingFill className="text-xl text-yellow-500" />
            </span>
            <div className="text-gray-600">
              Here's what's happening with your store today.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <div className="flex justify-between md:w-160 items-center gap-6 bg-purple-50 p-10 rounded-xl">
            <div className="flex gap-2">
            <div>
              <div className="bg-purple-100 p-4 rounded-full">
                <FiBox className="text-3xl text-blue-700" />
              </div>
            </div>
            <div>
              <span className="font-semibold flex text-gray-600 text-lg items-center gap-2">
                Total Products
              </span>
              <div className="text-2xl font-bold">{!products  ? (<Loading/>):(<p>{products.length}</p>)}</div>
              <div className="text-gray-600">All Products in your store.</div>
            </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-2xl">
              <BsGraphUpArrow className="text-3xl text-blue-700"/>
            </div>
          </div>
        </div>
        <div>
          <div className="flex md:w-160 items-center justify-between gap-6 bg-purple-50 p-10 rounded-xl">
             <div className="flex gap-2">
            <div>
              <div className="bg-purple-100 p-4 rounded-full">
                <IoBagHandleOutline className="text-3xl text-blue-700" />
              </div>
            </div>
            <div>
              <span className="font-semibold flex text-gray-600 text-lg items-center gap-2">
                Total Orders
              </span>
    
              <div className="text-2xl font-bold">{!orders ? (<Loading/>):(<p>{orders.length}</p>)}</div>
              <div className="text-gray-600">All Orders Received</div>
            </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-2xl">
              <BsGraphUpArrow className="text-3xl text-blue-700"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
