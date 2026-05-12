
import { NavLink } from "react-router-dom";


const ProductCard = ({product}) => {
   const { id, image, name, price } = product;
   
   return (
    <NavLink to={`/products/${id}`}>
      <div className="card bg-base-100 w-full shadow-sm hover:shadow-md transition-shadow">
        <figure className="bg-purple-50">
          <img 
            className="h-48 w-full object-cover" 
            src={image} 
            alt={name} 
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title line-clamp-1">{name}</h2>
          <p className="font-bold text-xl">Rs: {price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Buy Now</button>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductCard