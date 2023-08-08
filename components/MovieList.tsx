import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <>
      <h1 className="flex mx-16 font-bold text-md text-white">
        {title}
      </h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex flex-nowrap mx-14">
          {data.map((movie: Record<string, any>) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
