import { NavLink } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { useGlobalContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
const Navbar = () => {
  const { token, logout } = useGlobalContext();
  const {cartCount} = useCartContext()
  const centernavLinks = [
    { id: 1, path: null, title: <IoCloseSharp />, onClick: null, icon: null },
    { id: 2, path: "/", title: "Home", onClick: null, icon: null },
    { id: 3, path: "/products", title: "Shop", onClick: null, icon: null },
    { id: 4, path: "/about", title: "About Us", onClick: null, icon: null },
    { id: 5, path: "/categories", title: "Categories", onClick: null, icon: null },
  ];
  const rightLinks = [];
  if (token) {
    rightLinks.push({
      id: 6,
      path: "/login",
      title: "Logout",
      onClick: logout,
      icon: <MdLogout />,
    }),
    centernavLinks.push({
      id: 7,
      path:"/orders",
      title:"Orders",
      onClick:null
    });
  } else {
    rightLinks.push(
      {
        id: 8,
        path: "/login",
        title: "Login",
        onClick: null,
        icon: <MdLogin />,
      },
      {
        id: 9,
        path: "/register",
        title: "Register",
        onClick: null,
        icon: <FaUserPlus />,
      },
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-50 shadow-md">
        <div className="drawer">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-base-300 w-full flex justify-between items-center">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                
              </div>
              

              <NavLink to={"/"} className="pl-14">
                <h2 className="text-2xl font-bold">Shopio.</h2>
              </NavLink>

              <div className="hidden flex-none lg:block">
                
                <ul className="flex-row menu">
                  {centernavLinks.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className={item.id === 1 ? "md:hidden block" : "block"}
                      >
                        <NavLink
                          className={({ isActive }) =>
                            `transition-all duration-300 text-xl ${
                              isActive
                                ? "text-blue-700 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] underline underline-offset-8"
                                : " hover:text-blue-500"
                            }`
                          }
                          to={item.path}
                        >
                          <span>{item.icon}</span>
                          <button>
                            {item.title}
                          </button>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="hidden flex-none lg:block pr-4">
                <ul className="flex-row menu">
                

                  {rightLinks.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className={item.id === 1 ? "md:hidden block" : "block"}
                      >
                        <NavLink
                          className={({ isActive }) =>
                            `transition-all duration-300 text-xl ${
                              isActive
                                ? "text-blue-700 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] underline underline-offset-8"
                                : " hover:text-blue-500"
                            }`
                          }
                          to={item.path}
                        >
                          <span>{item.icon}</span>
                          <button
                            onClick={() => {
                              item.onClick();
                            }}
                          >
                            {item.title}
                          </button>
                        </NavLink>
                      </li>
                    );
                  })}
                    {/* without array custom cart button */}
                  <NavLink
                    className={({ isActive }) =>
                      `transition-all duration-300 text-xl mt-3 ml-2  ${
                        isActive
                          ? "text-blue-700 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] underline underline-offset-8"
                          : " hover:text-blue-500"
                      }`
                    }
                    to={"/cart"}
                  >
                    <span className="relative inline-block">
                      <GrCart className="text-2xl" />
                      {cartCount > 0 && (
                        <div className="absolute -top-3 -right-3 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full min-w-5 text-center">
                          {cartCount > 99 ? "99+" : cartCount}
                        </div>
                      )}
                    </span>
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {centernavLinks.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink
                      className={({ isActive }) =>
                        `transition-all duration-300 text-xl py-4 px-4 ${
                          isActive
                            ? "text-blue-700 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] underline underline-offset-8"
                            : " hover:text-blue-500"
                        }`
                      }
                      onClick={() => {
                        document.getElementById("my-drawer-2").checked = false;
                        if (item.onClick) item.onClick();
                      }}
                      to={item.path}
                    >
                      <span>{item.icon}</span>
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
