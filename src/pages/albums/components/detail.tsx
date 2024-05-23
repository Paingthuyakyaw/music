import { useAlbumDetail } from "@/store/server/album/query";
import { Link, useParams } from "react-router-dom";
import ArtistMusic from "./artist-music";

const AlbumDetail = () => {
  const { id } = useParams();

  const { data } = useAlbumDetail(Number(id));

  console.log(data?.data);

  return (
    <div className={`  relative mr-16 rounded-lg bg-top `}>
      <div className=" absolute bg-black w-full h-full blur-[10px] opacity-20 rounded-lg  z-0"></div>
      <div className="  z-10 relative px-4 py-2 text-white">
        <div className=" reflect2">
          <img
            src={data?.data.album_image}
            alt={data?.data.album}
            className="  rounded-[10px]  border-4  w-[200px] h-[150px] object-cover object-top "
          />
        </div>
        <div className=" items-center mt-5  grid grid-cols-12">
          <h5 className=" font-bold text-red-600 col-span-2">Album Name</h5>
          <p className=" col-span-1">:</p>
          <p className=" text-sm col-span-7">{data?.data.album}</p>
        </div>
        <div className=" items-center mt-2 grid grid-cols-12">
          <h5 className=" font-bold text-red-600 col-span-2">Artist</h5>
          <p className=" col-span-1">:</p>
          <Link className=" text-sm" to={`/artist/${data?.data.artist.id}`}>
            <p className=" hover:text-red-600 hover:underline text-sm col-span-7">
              {data?.data.artist.artist}
            </p>
          </Link>
        </div>
        <div className=" mt-2 items-center  grid grid-cols-12">
          <h5 className=" font-bold text-red-600 col-span-2">About</h5>
          <p className=" col-span-1">:</p>
          <p className=" text-sm col-span-7">{data?.data.artist.about}</p>
        </div>
      </div>
      {/* Artist Music */}
      {data?.data.music && <ArtistMusic music={data.data.music} />}
    </div>
  );
};

export default AlbumDetail;
