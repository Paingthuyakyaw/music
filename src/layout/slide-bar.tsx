import { slideNav } from "@/assets/slide-nav";
import { Link, useLocation } from "react-router-dom";

const SlideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className=" fixed ">
      <h4 className="  pl-6 pt-5 text-white text-2xl">Logo</h4>
      <div className=" space-y-4 mt-10">
        {slideNav.map((nav) => (
          <Link
            to={nav.path}
            className={`w-full pl-6 py-2 before:hover:bg-red-600/85 before:transition-all before:top-0 hover:text-red-600 transition-all duration-300 before:duration-300 before:hover:h-full before:absolute before:left-0 before:w-1    flex items-center gap-3  relative ${
              pathname === nav.path
                ? " before:h-full before:bg-red-600 before:text-red-600 text-red-600 "
                : "text-gray-400 before:h-[0]"
            }`}
            key={nav.id}
          >
            {nav.icon}
            <p>{nav.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SlideBar;
