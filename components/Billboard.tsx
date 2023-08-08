import useBillboard from "@/hooks/useBillboard";
import React, { useCallback, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();
  const [muted, setMuted] = useState(true);
  const Icon = muted ? HiSpeakerXMark : HiSpeakerWave;
  const videoSource = data
    ? data.trailerUrl === ""
      ? data.videoUrl
      : data.trailerUrl
    : "";

  const toggleMuted = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [data?.id, openModal]);

  return (
    <div className="relative h-[80h]">
      <video
        className="w-full h-[80vh] object-cover brightness-[60%]"
        autoPlay
        muted={muted}
        poster={data?.thumbnailUrl}
        src={videoSource}
      ></video>
      <div className="absolute top-[10%] md:top-[20%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flew-row items-end justify-between">
          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <PlayButton movieId={data?.id} />
            <button
              onClick={handleOpenModal}
              className="bg-white text-white bg-opacity-20 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
            >
              <AiOutlineInfoCircle className="mr-1" /> Plus d'infos
            </button>
          </div>
          <div className="button mr-8">
            <div
              onClick={toggleMuted}
              className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <Icon size={25} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
