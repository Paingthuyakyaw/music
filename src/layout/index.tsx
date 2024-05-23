import { Navigate, Outlet } from "react-router-dom";
import SlideBar from "./slide-bar";
import Navbar from "./nav-bar";

const MaingLayout = () => {
  const token = true;

  if (!token) return <Navigate to={"/login"} />;

  if (token)
    return (
      <div className="">
        <div className="grid  grid-cols-12 gap-16">
          <div className=" min-h-screen  bg-zinc-800/40 col-span-3">
            <SlideBar />
          </div>
          <div className=" col-span-9">
            <Navbar />
            <div className=" mt-7">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
};

export default MaingLayout;
