import { useGlobalContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../../components/Pagination";
import { useProducts } from "../../hooks/UseProducts";
import { getProductsApi } from "../../api/products";
import { adminDeleteProductApi } from "../../api/admin";
import SearchInput from "../../components/SearchInput";
import ListSkeleton from "../../components/ListSkelton";

const AdminProducts = () => {
  const { token } = useGlobalContext();
  const {
    products,
    setProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    lastPage,
  } = useProducts();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;
    try {
      await adminDeleteProductApi(id, token);
      const productsData = await getProductsApi();
      setProducts(productsData.data.data);
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
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-gray-400 mt-2">Manage all products in your store</p>
          </div>
          <div className="flex items-center gap-5">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <NavLink to={"/admin/products/create"}>
              <button className="btn btn-primary h-15">
                <span className="text-xl">+</span> Add Product
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
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                return (
                  <tr key={p.id}>
                    <th>#{p.id}</th>
                    <th>
                      <img className="w-15" src={p.image} alt="" />
                    </th>
                    <th>{p.name}</th>
                    <th>Rs: {Math.round(p.price)}</th>
                    <td>{p.stock}</td>
                    <td>{p.status}</td>
                    <td className="flex gap-2">
                      <NavLink to={`/admin/products/edit/${p.id}`}>
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
      <Pagination page={page} lastPage={lastPage} setPage={setPage} />
    </>
  );
};

export default AdminProducts;
