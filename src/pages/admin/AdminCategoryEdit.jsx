import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminUpdateCategoryApi} from "../../api/admin";
import { UseCategoryDetail } from "../../hooks/UseCategoryDetail";
import Loading from "../../components/Loading";

const AdminCategoryEdit = () => {
  const { category, error, loading } = UseCategoryDetail();
 
  console.log(category);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await adminUpdateCategoryApi(id, {
      name: data.name,
      description: data.description,
    });
    navigate("/admin/category");
  };

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

 
  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <h1 className="m-5 text-center text-4xl font-bold">
              Add new Category
            </h1>

            <label className="label">Name</label>
            <input
              {...register("name", {
                required: "Product Name is required",
                minLength: { value: 2, message: "name is too short" },
              })}
              className="input"
              placeholder="Name"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}

            <label className="label">Description</label>
            <textarea
              {...register("description", {
                required: "Category description is required",
                minLength: { value: 20, message: "Category Body is too short" },
              })}
              className="textarea"
              placeholder="Category description"
            />
            {errors.description && (
              <div className="text-red-500">{errors.description.message}</div>
            )}
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary mt-4"
            >
              {isSubmitting ? `Adding Product...` : `Add Product`}
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default AdminCategoryEdit;
