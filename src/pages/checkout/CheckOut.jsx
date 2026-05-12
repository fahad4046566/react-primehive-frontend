import { Link, useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { getAddressApi, addAddressApi } from "../../api/address";
import { checkoutApi } from "../../api/order";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCartContext } from "../../context/CartContext";
import { MdLock } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaCcStripe } from "react-icons/fa6";

const CheckOut = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const newAddressString = `${watch("address_type")}, ${watch("full_address")}, ${watch("phone")}`;
  const onSubmit = async (data) => {
    if (isNewAddress) {
      data.shipping_address = newAddressString;
      await addAddressApi({
        address_type: data.address_type,
        full_address: data.full_address,
        phone: data.phone,
        is_default: data.is_default,
      });
    } else {
      data.shipping_address = selectedAddress;
    }

    delete data.address_type;
    delete data.phone;
    delete data.full_address;
    delete data.is_default;

    const result = await checkoutApi(data);

    // eslint-disable-next-line react-hooks/incompatible-library
    const paymentMethod = watch("payment_method");
    if (result.data.success) {
      if (paymentMethod === "cod") {
        navigate("/orders");
      } else {
        navigate("/payment", {
          state: { clientSecret: result.data.data.client_secret },
        });
      }
    }
  };
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isNewAddress, setIsNewAddress] = useState(false);
  // for selcect only one radio for  address and other's disabled

  // const [error, setError] = useState(null);

  const { cart, fetchCart } = useCartContext();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await getAddressApi();
        setAddress(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CartItems = cart?.items || [];
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4">
          {/* left section  */}
          <div className="bg-amber-100 p-4">
            {/* not a part of form  */}
            <div className="flex items-center justify-between">
              <div>
                <div className="md:m-10">
                  <h1 className="text-3xl md:text-3xl font-bold">Checkout</h1>
                  <div className="flex">
                    <button className="hover:cursor-pointer font-semibold p-1 flex items-center gap-2">
                      Home <MdNavigateNext />
                    </button>

                    <Link to={"/cart"}>
                      <button className="hover:cursor-pointer font-semibold p-1  flex items-center gap-2">
                        Cart <MdNavigateNext />
                      </button>
                    </Link>

                    <button className="hover:cursor-pointer font-semibold p-1 text-blue-600">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* address section  */}

            {/* this is for saved address  */}

            <label>
              <div className="flex gap-2 items-center m-4">
                <div className="badge badge-primary">1</div>
                <div>
                  <h1 className="font-semibold text-xl">Shipping Address</h1>
                </div>
              </div>

              <div className="flex gap-2 items-center m-4">
                <input
                  type="radio"
                  name="radio-4"
                  value={selectedAddress}
                  onClick={() => setIsNewAddress(false)}
                  {...register("shipping_address")}
                  className="radio radio-primary"
                />
                <div>
                  <h1 className="font-semibold text-xl">
                    Select Saved Address
                  </h1>
                </div>
              </div>
              {errors.shipping_address && (
                <p className="error">{errors.shipping_address.message}</p>
              )}
              <select
                {...register("shipping_address", {
                  required: "Please select a shipping address",
                })}
                onChange={(e) => {
                  const fullAddress = e.target.value;
                  const selected = address.find(
                    (a) => a.full_address === fullAddress,
                  );
                  setSelectedAddress(fullAddress);
                  setValue("address_id", selected?.id);
                  setValue("shipping_address", fullAddress);
                }}
                className="select w-200 ml-4"
                defaultValue=""
              >
                <option value="">Pick an address</option>
                {address.map((add) => {
                  return (
                    <option value={add.full_address} key={add.id}>
                      {add.full_address}
                    </option>
                  );
                })}
              </select>
              <input type="hidden" {...register("address_id")} />
            </label>
            <div className="divider m-4">OR</div>
            {/* this is for add new address  */}
            <div className="flex m-3 gap-4">
              <label>
                <div className="flex gap-2 items-center m-4">
                  <input
                    type="radio"
                    name="radio-4"
                    value={newAddressString}
                    onClick={() => {
                      setIsNewAddress(true);
                      setValue("address_id", null);
                    }}
                    {...register("shipping_address")}
                    className="radio radio-primary"
                  />
                  <div>
                    <h1 className="font-semibold text-xl">Use New Address</h1>
                  </div>
                </div>

                <div className="p-2">
                  <h1 className="font-semibold text-lg ">
                    Select Address type
                  </h1>
                  <label className="p-2 md:p-10">
                    <input
                      className="radio radio-primary"
                      type="radio"
                      value="home"
                      {...register("address_type")}
                    />
                    Home
                  </label>
                  <label className="p-2 md:p-10">
                    <input
                      className="radio radio-primary"
                      type="radio"
                      value="office"
                      {...register("address_type")}
                    />
                    Office
                  </label>
                  <label className="p-2 md:p-10">
                    <input
                      className="radio radio-primary"
                      type="radio"
                      value="other"
                      {...register("address_type")}
                    />{" "}
                    Other
                  </label>
                </div>
                <div>
                  <h1 className="font-semibold text-lg ">Phone Number</h1>
                  <input
                    {...register("phone", {
                      required: isNewAddress
                        ? "Phone number is required"
                        : false,
                      minLength: isNewAddress
                        ? { value: 10, message: "Too short" }
                        : false,
                      maxLength: isNewAddress
                        ? { value: 13, message: "Too long" }
                        : false,
                      pattern: isNewAddress
                        ? {
                            value: /^03[0-9]{9}$/,
                            message: "Invalid phone number (03XXXXXXXXX)",
                          }
                        : false,
                    })}
                    className="input w-200 mt-2"
                    placeholder="Enter Your Phone Number"
                  />
                  {errors.phone && (
                    <div className="text-red-500">{errors.phone.message}</div>
                  )}
                </div>
                <div>
                  <h1 className="font-semibold text-lg ">Full Address</h1>
                  <input
                    {...register("full_address", {
                      required: isNewAddress
                        ? "Full address is required"
                        : false,
                      minLength: isNewAddress
                        ? { value: 10, message: "Address too short" }
                        : false,
                      maxLength: isNewAddress
                        ? { value: 255, message: "Address too long" }
                        : false,
                    })}
                    className="input w-200 mt-2"
                    placeholder="Enter Your Full Address"
                  />
                  {errors.full_address && (
                    <div className="text-red-500">
                      {errors.full_address.message}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <label className="">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox checkbox-primary"
                      {...register("is_default")}
                    />{" "}
                    Set as default
                  </label>
                </div>
              </label>
            </div>
            {/* address section  ended */}

            <div>
              {/* cod method  */}
              <label className="flex items-start gap-5 mt-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="cod"
                  {...register("payment_method")}
                  className="radio radio-primary mt-1"
                />
                <div className="flex items-center gap-3">
                  <BsCashCoin className="text-5xl text-gray-600" />
                  <div>
                    <div className="font-semibold">Cash On Delivery</div>
                    <p className="text-sm text-gray-500">
                      Pay with cash when your order is delivered.
                    </p>
                  </div>
                </div>
              </label>
            </div>
            <div>
              {/* stripe method  */}
              <label className="flex items-start gap-5 p-4 mt-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="stripe"
                  {...register("payment_method")}
                  className="radio radio-primary mt-1"
                />
                <div className="flex items-center gap-3">
                  <FaCcStripe className="text-5xl text-gray-600" />
                  <div>
                    <div className="font-semibold">Pay with Stripe</div>
                    <p className="text-sm text-gray-500">
                      Pay Securely using your card via Stripe.
                    </p>
                  </div>
                </div>
              </label>
            </div>
            <div>
              <p className="text-md text-gray-500 flex items-center gap-2 mt-2">
                <MdLock />
                Pay Securely using your card via Stripe.
              </p>
            </div>
          </div>
          {/* Order Summary box     right section  */}

          <div className="bg-amber-700">
            <div className="border border-base-content/5 bg-base-100 card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                </div>

                {CartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <div>
                      <img className="w-20 rounded" src={item.image} alt="" />
                    </div>
                    <div>
                      <span className="font-semibold">{item.name}</span>
                      <div className="">Qty: {item.quantity}</div>
                    </div>

                    <span>Rs {item.subtotal}</span>
                  </div>
                ))}

                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Subtotal:</span>
                    <span>Rs {cart?.total}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>Rs {cart?.total}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    <MdLock />
                    {isSubmitting ? "Creating Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckOut;
