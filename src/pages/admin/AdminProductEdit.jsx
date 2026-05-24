import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseCategory from "../../hooks/UseCategory";
import { adminUpdateProductApi ,generateDescriptionApi } from "../../api/admin";
import { getProductByIdApi } from "../../api/products";
import Loading from "../../components/Loading";
import { compressImage } from "../../lib/imagecompression";

// icons 
import {  FiCheckCircle,  FiTag, FiDollarSign, FiPackage, FiFileText, FiImage, FiToggleLeft } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdCategory } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";

const AdminProductEdit = () => {
  const { category, loading, error } = UseCategory();
  const { id } = useParams();

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
    handleSubmit,reset,
    formState: { errors, isSubmitting },
    watch,
    setValue,
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
      {/* <div className="">
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

             <button
              type="button" 
              onClick={handleGenerateDescription}
              disabled={generating}
              className="btn btn-secondary btn-sm"
            >
              {generating ? "Generating..." : "✨ Generate with AI"}
            </button>

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
      </div> */}
       <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <FaEdit className="text-white text-2xl" />
                <h1 className="text-2xl font-bold text-white">Edit Existing Product</h1>
              </div>
              <p className="text-blue-100 text-sm mt-1">Fill in the details to add a new product to your store</p>
            </div>
      
            {/* Form Body */}
            <div className="p-6 space-y-6">
              {/* Name & Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiTag className="text-gray-500" /> Product Name
                  </label>
                  <input
                    {...register("name", {
                      required: "Product Name is required",
                      minLength: { value: 2, message: "Name is too short" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g. Wireless Headphones"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
      
                {/* Price Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiDollarSign className="text-gray-500" /> Price
                  </label>
                  <input
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be ≥ 0" },
                      pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Invalid price format" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>
              </div>
      
              {/* Stock & Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stock Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiPackage className="text-gray-500" /> Stock Quantity
                  </label>
                  <input
                    type="number"
                    {...register("stock", {
                      required: "Stock is required",
                      min: { value: 0, message: "Stock must be 0 or more" },
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                </div>
      
                {/* Category Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MdCategory className="text-gray-500" /> Category
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option disabled>Select Category</option>
                    {category.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>
              </div>
      
              {/* Status & Image Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiToggleLeft className="text-gray-500" /> Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option disabled>Select Status</option>
                    <option>active</option>
                    <option>inactive</option>
                  </select>
                </div>
      
                {/* Image Upload */}
                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiImage className="text-gray-500" /> Product Image
                  </label>
                   <label className="flex-1 cursor-pointer">
                      {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-500 transition">
                        <FiUpload className="mx-auto text-gray-400 text-xl" /> 
                         <span className="text-sm text-gray-500">Click to upload</span> 
                      </div> */}
                    </label>
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
                 
              </div>
      
              {/* Description Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiFileText className="text-gray-500" /> Description
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={generating}
                    className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
                  >
                    <HiOutlineSparkles className="text-yellow-500" />
                    {generating ? "Generating..." : "Generate with AI"}
                  </button>
                </div>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 40, message: "Description too short (min 40 chars)" },
                  })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Write a detailed product description..."
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>
            </div>
      
            {/* Actions Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || isCompressing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span> Updating...
                  </>
                ) : (
                  <>
                    <FiCheckCircle /> Update Product
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminProductEdit;
