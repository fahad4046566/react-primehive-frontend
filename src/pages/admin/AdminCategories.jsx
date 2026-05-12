import { useGlobalContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import UseCategory from "../../hooks/UseCategory";
import { getProductsApi } from "../../api/products";
import { adminDeleteCategoryApi } from "../../api/admin";
import ListSkeleton from "../../components/ListSkelton";

const AdminCategories = () => {
  const { token } = useGlobalContext();
  const { category, setCategory, error, loading } = UseCategory();
console.log(category)
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Category?",
    );
    if (!confirmed) return;
    try {
      await adminDeleteCategoryApi(id, token);
      const CategoryData = await getProductsApi();
      setCategory(CategoryData.data.data);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post");
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Categories</h1>
            <p className="text-gray-400 mt-2">
              Manage all your categoriesfor your products in your store
            </p>
          </div>
          <div className="flex items-center gap-5">
            <NavLink to={"/admin/categories/create"}>
              <button className="btn btn-primary h-15">
                <span className="text-xl">+</span> Add Category
              </button>
            </NavLink>
          </div>
        </div>
        <div className="divider"></div>

        <div className="overflow-x-auto">
          
          {error && <div>{error}</div>}
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.map((p) => {
                return (
                  <tr key={p.id}>
                    <th>#{p.id}</th>
                    <th>{p.name}</th>
                    <th>{p.slug}</th>
                    <td>{p.description}</td>
                    <td>{p.created_at}</td>
                    <td className="flex gap-2">
                      <NavLink to={`/admin/categories/edit/${p.id}`}>
                        <button className="p-2 rounded-xl border border-blue-300">
                          <CiEdit className="text-xl text-blue-500" />
                        </button>
                      </NavLink>
                      <button
                        onClick={() => {
                          handleDelete(p.id);
                        }}
                        className="p-2 rounded-xl border border-red-300"
                      >
                        <RiDeleteBin6Line className="text-xl text-red-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
           {loading && <div className="m-4"><ListSkeleton /></div>}
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
