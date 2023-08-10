import React from "react";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();
  return (
    <div className="inline-block px-0.5">
      <div className="w-64 h-auto max-w-xs rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
          <img
            src={data.thumbnailUrl}
            alt={data.title}
            className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
          />
          <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-125 group-hover:-translate-y-[6vw] group-hover:opacity-100">
            <img
              src={data.thumbnailUrl}
              alt={data.title}
              className="cursor-pointer object-cover transition shadow-xl rounded-t-md w-full h-[12vw]"
            />
            <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
              <div className="flex flex-row items-center gap-3">
                <div
                  className="cursor-pointer bg-white w-6 h-6 lg:w-10 lg:h-10 rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                  onClick={() => router.push(`/watch/${data.id}`)}
                >
                  <BsFillPlayFill size={30} className="text-zinc-900" />
                </div>
                <FavoriteButton movieId={data.id} />
                <div
                  onClick={() => openModal(data?.id)}
                  className="cursor-pointer ml-auto group/item w-6 lg:w-10 lg:h-10 border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                >
                  <BiChevronDown
                    size={30}
                    className="text-white group-hover/item:text-neutral-300"
                  />
                </div>
              </div>
              <p className="text-green-400 font-semibold mt-4"> 
                Nouveauté{" "}
                <span className="text-white">{new Date().getFullYear()}</span>
              </p>
              <div className="flex flex-row mt-4 gap-2 items-center">
                <p className="text-white text-[10px] lg:text-sm">
                  {data.duration}
                </p>
              </div>{" "}
              <div className="flex flex-row mt-4 gap-2 items-center">
                <p className="text-white text-[10px] lg:text-sm">
                  {data.genre}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
