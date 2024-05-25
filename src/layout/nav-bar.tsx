import { logout } from "@/api/axio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useMe } from "@/store/server/auth/mutation";
const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onSearch = () => {
    navigate(`/search/${search}`);
  };

  const auth = Cookies.get("user");

  const { data: me } = useMe();

  console.log(me);

  const handleLogout = () => {
    logout();
    Cookies.remove("user");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className=" mr-8 mt-5 flex justify-between items-center">
      <div className=" bg-zinc-800 px-4 rounded-full overflow-hidden flex items-center">
        <IconSearch className=" text-zinc-400" size={18} />
        <form onSubmit={() => onSearch()} action="">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            className=" w-[300px] outline-none border-none bg-zinc-800 placeholder:text-zinc-400 text-gray-400 "
            placeholder="Search..."
          />
        </form>
      </div>
      <div>
        {auth && (
          <Popover>
            <PopoverTrigger>
              <div className=" gap-2 bg-red-600 rounded-full w-[120px] h-[45px] px-2 flex items-center">
                <img
                  src="https://ui.shadcn.com/avatars/02.png"
                  alt="img"
                  className=" w-8 h-8 rounded-full"
                />
                <div>
                  <p className=" font-semibold text-[12px] text-white">
                    {me?.data?.username}
                  </p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className=" p-0 w-[150px]  bg-white rounded-lg ">
              <Button onClick={handleLogout}>Log out</Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
