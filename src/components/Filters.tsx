import React from "react";
import GenreEl from "./GenreEl";

const Filters = (props: {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  genres: boolean[];
  setGenres: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  return (
    <div className="bg-white w-3/12 h-full p-5">
      <h1 className="text-4xl font-semibold">Filters</h1>
      <div className="my-3 h-0.5 bg-gray-300"></div>
      <div className="flex items-center  mt-5">
        <h3 className="text-xl">Sort By</h3>
        <select
          className="indent-3 appearance-none bg-gray-100 outline-0 border-0 border-b-2 border-gray-700 w-36 h-12 focus:bg-blue-50 shadow-lg transition-all ml-auto"
          name="sort"
          id="sort"
          value={props.sort}
          onChange={(e) => props.setSort(e.target.value)}
        >
          <option value="movie_name ASC">Name (asc)</option>
          <option value="movie_name DESC">Name (desc)</option>
          <option value="movie_rating ASC">Rating (asc)</option>
          <option value="movie_rating DESC">Rating (desc)</option>
        </select>
      </div>
      <div className="flex flex-col justify-start items-center mt-5">
        <h3 className="text-xl self-start mb-3">Genres</h3>
        <GenreEl genres={props.genres} setGenres={props.setGenres} />
      </div>
    </div>
  );
};

export default Filters;
