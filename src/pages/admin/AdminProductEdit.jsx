import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseCategory from "../../hooks/UseCategory";
import { adminUpdateProductApi } from "../../api/admin";
import { getProductByIdApi } from "../../api/products";
import Loading from "../../components/Loading";
import { compressImage } from "../../lib/imagecompression";

const AdminProductEdit = () => {
  const { category, loading, error } = UseCategory();
  const { id } = useParams();

  const [compressedImage, setCompressedImage] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsCompressing(true);
      try {
        const compressed = await compressImage(file);
        setCompressedImage(compressed);
      } catch (err) {
        console.error("Compression error:", err);
        setCompressedImage(file);
      } finally {
        setIsCompressing(false);
      }
    }
  };
  const {
    register,
    handleSubmit,reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("description", data.description);
    formData.append("category_id", data.category);
    formData.append("status", data.status);
    formData.append('_method', 'PUT'); 
    if (compressedImage) {
      formData.append("image", compressedImage);
    }
    try {
      const response = await adminUpdateProductApi(id, formData);
      if (response.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(error);
    }
  };
 useEffect(() => {
    const preFill = async () => {
      const response = await getProductByIdApi(id);
      reset(response.data.data);
    };
    preFill();
  }, [id, reset]);
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
            <h1 className="m-5 text-center text-4xl font-bold">Edit Product</h1>

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

            <label className="label">Price</label>
            <input
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price must be greater than or equal to 0",
                },
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Invalid price format",
                },
              })}
              className="input"
              placeholder="Price"
            />
            {errors.price && (
              <div className="text-red-500">{errors.price.message}</div>
            )}

            <label className="label">Stock</label>
            <input
              type="number"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock must be 0 or more" },
                valueAsNumber: true,
              })}
              className="input"
              placeholder="Stock"
            />
            {errors.stock && (
              <div className="text-red-500">{errors.stock.message}</div>
            )}

            <label className="label">Description</label>
            <textarea
              {...register("description", {
                required: "Post description is required",
                minLength: { value: 40, message: "Post Body is too short" },
              })}
              className="textarea"
              placeholder="Product description"
            />
            {errors.description && (
              <div className="text-red-500">{errors.description.message}</div>
            )}

            <label className="label">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")} 
              onChange={handleImageChange}
              className="file-input file-input-primary"
            />
            {errors.image && (
              <div className="text-red-500">{errors.image.message}</div>
            )}
            {errors.image && (
              <div className="text-red-500">{errors.image.message}</div>
            )}

            <label className="label">Category</label>
            <select
              {...register("category")}
              defaultValue="Pick a font"
              className="select select-ghost"
            >
              <option disabled={true}>Select Category</option>
              {category.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label className="label">Status</label>
            <select
              {...register("status")}
              defaultValue="Pick a font"
              className="select select-ghost"
            >
              <option disabled={true}>Select Status</option>
              <option>active</option>
              <option>inactive</option>
            </select>
            <button
              disabled={isSubmitting || isCompressing}
              type="submit"
              className="btn btn-primary mt-4"
            >
              {isSubmitting ? `Updating Product...` : `Update Product`}
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default AdminProductEdit;
