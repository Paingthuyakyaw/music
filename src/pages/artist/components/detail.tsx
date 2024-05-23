import { useArtistDetail } from "@/store/server/artist/query";
import { useParams } from "react-router-dom";

const ArtistDetail = () => {
  const { id } = useParams();

  const { data } = useArtistDetail(id || "");

  console.log(data?.data);

  return (
    <div className={` min-h-[80vh] relative mr-16 rounded-lg bg-top `}>
      <div className=" absolute bg-black w-full h-full blur-[10px] opacity-20 rounded-lg  z-0"></div>
      <div className="  relative z-20 p-6   text-white  ">
        <img
          src={data?.data.artist_image}
          className=" w-[150px] bg-cover h-[150px] "
          alt=""
        />
        <div className=" pt-4 pl-5">
          <div className="  mt-4 grid grid-cols-12 gap-5">
            <p className="col-span-2 w-28 text-sm font-bold text-red-600/60">
              Artist{" "}
            </p>
            <p className=" col-span-1">:</p>
            <h3 className=" col-span-9 text-xl font-bold">
              {data?.data.artist}{" "}
            </h3>
          </div>
          <div className=" mt-5 grid grid-cols-12 gap-5">
            <p className=" col-span-2 w-28 text-sm font-bold text-red-600/60">
              About{" "}
            </p>
            <p className=" col-span-1">:</p>
            <h3 className=" col-span-9 text-gray-500">
              {data?.data.about}{" "}
              {data?.data.about && data.data.about.length < 100 && (
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  accusantium deserunt ratione temporibus laudantium voluptatem
                  porro odio similique cupiditate, explicabo fugiat reiciendis
                  voluptas id nemo eum? Est rerum fugit repellat?
                </>
              )}
            </h3>
          </div>
          <div className="  mt-4 grid grid-cols-12 gap-5">
            <p className="col-span-2 w-28 text-sm font-bold text-red-600/60">
              Birth
            </p>
            <p className=" col-span-1">:</p>
            <h3 className=" text-gray-500 col-span-9 ">{data?.data.birth}</h3>
          </div>
          <div className="  mt-4 grid grid-cols-12 gap-5">
            <p className="col-span-2 w-28 text-sm font-bold text-red-600/60">
              Album
            </p>
            <p className=" col-span-1">:</p>
            <h3 className=" text-gray-500 col-span-9 ">
              {data?.data.album.length}
            </h3>
          </div>
          {data?.data.album.length !== 0 && (
            <>
              <div className="  mt-4 grid grid-cols-12 gap-5">
                <p className="  col-span-2 w-28 text-sm font-bold text-red-600/60">
                  Album Name
                </p>
                <p className=" col-span-1">:</p>
                <div className=" col-span-9 ">
                  {data?.data.album.map((alb) => (
                    <div className=" flex items-center gap-5" key={alb.id}>
                      <p className=" text-gray-500">{alb.album} ,</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
