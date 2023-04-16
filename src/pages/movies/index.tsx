import React, { useState } from "react";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [sort, setSort] = useState("movie_name");
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="h-screen bg-gray-100">
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex justify-start">
        <Filters
          sort={sort}
          setSort={setSort}
          genres={genres}
          setGenres={setGenres}
        />
        <MovieList sort={sort} genres={genres} search={search} />
      </div>
    </div>
  );
}
