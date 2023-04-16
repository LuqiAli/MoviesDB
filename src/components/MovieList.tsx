import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Movie from "@/interfaces/Movie";

const MovieList = (props: {
  sort: string;
  genres: boolean[];
  search: string;
}) => {
  const [movies, setMovies] = useState<[]>([]);

  useEffect(() => {
    let params = new URLSearchParams({ sort: props.sort });
    params.append("search", props.search);
    let finalGenres: number[] = [];

    props.genres.forEach((item, index) => {
      if (item === true) {
        finalGenres.push(index + 1);
      }
    });

    for (let i = 0; i < finalGenres.length; i++) {
      params.append("genres", String(finalGenres[i]));
    }

    fetch("/api/movies?" + new URLSearchParams(params), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.data));
  }, [props.sort, props.genres, props.search]);

  let moviesEl = movies.map((movie: Movie) => {
    return (
      <Card
        key={movie.movie_id}
        id={movie.movie_id}
        title={movie.movie_name}
        rating={movie.movie_rating}
        tagIds={movie.tag_ids}
        tagTitles={movie.tag_titles}
        tagColors={movie.tag_colors}
      />
    );
  });

  return (
    <div className="w-9/12 h-full bg-gray-100">
      <div className="flex flex-wrap justify-start">
        {moviesEl}
        <div className="flex justify-start m-5 mt-0 w-64 aspect-[9/11] bg-white rounded-md drop-shadow-md p-5 hover:drop-shadow-2xl hover:bg-blue-50 transition-all cursor-pointer">
          <Link
            href={"/movies/addmovie"}
            className="flex justify-center items-center min-w-full"
          >
            <FontAwesomeIcon
              className="text-8xl text-gray-400"
              icon={faSquarePlus}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
