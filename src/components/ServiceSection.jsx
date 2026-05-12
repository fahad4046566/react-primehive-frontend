import { MdOutlineLocalShipping } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
const ServiceSection = () => {
  return (
    <div className="border border-slate-200 rounded-2xl md:ml-20 md:mr-20">
      <div className="md:flex justify-evenly p-4">
        <div className="flex p-4">
          {/* icon */}
          <div className="bg-purple-100 w-fit p-4 rounded-full">
            <MdOutlineLocalShipping className="text-blue-700 text-2xl"/>
          </div>
          {/* text  */}
          <div className="flex-col pl-2">
            <h1 className="font-bold">Free Shipping</h1>
            <p className="text-gray-700">On Orders over $70</p>
          </div>
        </div>

          <div className="flex p-4">
          {/* icon */}
          <div className="bg-purple-100 w-fit p-4 rounded-full">
            <RiSecurePaymentLine className="text-blue-700 text-2xl"/>
          </div>
          {/* text  */}
          <div className="flex-col pl-2">
            <h1 className="font-bold">Secure Payment</h1>
            <p className="text-gray-700">100% secure checkout</p>
          </div>
        </div>

          <div className="flex p-4">
          {/* icon */}
          <div className="bg-purple-100 w-fit p-4 rounded-full">
            <GiReturnArrow className="text-blue-700 text-2xl"/>
          </div>
          {/* text  */}
          <div className="flex-col pl-2">
            <h1 className="font-bold">Easy Returns</h1>
            <p className="text-gray-700">30-day returns policy</p>
          </div>
        </div>

          <div className="flex p-4">
          {/* icon */}
          <div className="bg-purple-100 w-fit p-4 rounded-full">
            <BiSupport className="text-blue-700 text-2xl"/>
          </div>
          {/* text  */}
          <div className="flex-col pl-2">
            <h1 className="font-bold">24/7 Support</h1>
            <p className="text-gray-700">We're here to help</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
