import { adminCreateProductApi, generateDescriptionApi } from "../../api/admin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { compressImage } from "../../lib/imagecompression";
import UseCategory from "../../hooks/UseCategory";
import Loading from "../../components/Loading";

const AdminProductCreate = () => {
  const { category, loading, error } = UseCategory();
  const [compressedImage, setCompressedImage] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [generating, setGenerating] = useState(false);

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
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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
    if (compressedImage) {
      formData.append("image", compressedImage);
    }
    try {
      const response = await adminCreateProductApi(formData);
      if (response.data.success) {
        setTimeout(() => navigate("/admin/products"), 100);
      }
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const handleGenerateDescription = async () => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const name = watch("name");
    if (!name) {
      alert("Please enter product name first");
      return;
    }
    setGenerating(true);
    const result = await generateDescriptionApi(name);
    if (result.data.success) {
      setValue("description", result.data.description);
    }
    setGenerating(false);
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <h1 className="m-5 text-center text-4xl font-bold">Add new</h1>

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

            <button
              type="button" 
              onClick={handleGenerateDescription}
              disabled={generating}
              className="btn btn-secondary btn-sm"
            >
              {generating ? "Generating..." : "✨ Generate with AI"}
            </button>

            <label className="label">Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                validate: {
                  required: (value) => value?.[0] || "Image is required",
                },
              })}
              onChange={handleImageChange}
              className="file-input file-input-primary"
            />
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
              {isSubmitting ? `Adding Product...` : `Add Product`}
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default AdminProductCreate;
