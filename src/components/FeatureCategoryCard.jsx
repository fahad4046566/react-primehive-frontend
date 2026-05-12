import { NavLink } from "react-router-dom"

const FeatureCategoryCard = ({ category }) => {
  return (
    <div>
        <NavLink
            key={category.id}
            to={`/products?category_id=${category.id}`}
            className="group block transform transition-all duration-300 hover:-translate-y-1"
          >
            <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-base-200">
              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
                    {category.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="badge badge-primary badge-sm text-white px-3 py-1">
                    {category.products_count} items
                  </div>
                </div>

                <h2 className="card-title text-xl font-bold mt-3 group-hover:text-primary transition-colors">
                  {category.name}
                </h2>

                {category.description && (
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {category.description}
                  </p>
                )}

                <div className="mt-4 flex justify-end">
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Browse →
                  </span>
                </div>
              </div>
            </div>
          </NavLink>
    </div>
  )
}

export default FeatureCategoryCard