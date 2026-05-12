import { useForm } from "react-hook-form";
import { getAdminOrdersStatusApi } from "../api/order";


const OrderStatusForm = ({ orderId, currentStatus }) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { status: currentStatus }
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    await getAdminOrdersStatusApi(orderId, { status: data.status });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("status")} disabled={isSubmitting} className="select w-30">
        <option value="pending">pending</option>
        <option value="paid">paid</option>
        <option value="shipped">shipped</option>
        <option value="delivered">delivered</option>
        <option value="cancelled">cancelled</option>
      </select>
      <button type="submit" disabled={isSubmitting} className="btn btn-md m-2 p-2">
        {isSubmitting ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default OrderStatusForm;