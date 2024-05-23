import { useAlbum } from "@/store/server/album/query";
import { Link } from "react-router-dom";

const Albumns = () => {
  const { data } = useAlbum();

  console.log(data?.data);

  return (
    <div className=" grid gap-20 grid-cols-12">
      {data?.data.map((item) => (
        <div
          style={{ borderRadius: 10 }}
          className=" reflect bg-white col-span-3 rounded-lg "
          key={item.id}
        >
          <Link to={`/albumns/${item.id}`}>
            <img
              src={item.album_image}
              className=" rounded-t-[10px] object-top object-cover w-full h-[150px]"
              alt={item.album}
            />
            <div className=" py-2 px-2">
              <h3 className=" text-[15px] text-slate-800 font-bold">
                {item.album}
              </h3>
              <div className=" items-center grid grid-cols-12">
                <h5 className=" col-span-5 text-red-600  text-[12px] font-bold">
                  Artist Name
                </h5>
                <p className=" col-span-1">:</p>
                <p className=" col-span-6 text-[12px] text-gray-800 ">
                  {item.artist.artist}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Albumns;
