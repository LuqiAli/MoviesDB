import Header from "@/components/Header";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import AlertInterface from "@/interfaces/Alert";
import MovieForm from "@/components/MovieForm";

const newmovie = () => {
  const initialGenres = [
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
  ];

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(-1);
  const [genres, setGenres] = useState(initialGenres);
  const [alerts, setAlerts] = useState<AlertInterface[]>([]);

  const resetValues = () => {
    setTitle("");
    setRating(-1);
    setGenres(initialGenres);
  };

  const handleSubmit = async (finalGenres: number[]) => {
    fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        rating: rating,
        genres: finalGenres,
      }),
    }).then((res) => res.json());

    resetValues();

    setAlerts([
      {
        value: `${title} was successfully added to the movie library`,
        type: "success",
      },
    ]);
  };

  return (
    <div className="flex items-center flex-col bg-gray-100 h-screen">
      <Link className="absolute my-12 mx-28 self-start" href={"/movies"}>
        <FontAwesomeIcon
          className="text-4xl text-gray-800 cursor-pointer"
          icon={faHouse}
        ></FontAwesomeIcon>
      </Link>
      <Header />
      <h2 className="text-4xl text-center my-5 font-medium">
        Add a new movie!
      </h2>
      <MovieForm
        title={title}
        setTitle={setTitle}
        rating={rating}
        setRating={setRating}
        handleSubmit={handleSubmit}
        alerts={alerts}
        setAlerts={setAlerts}
        genres={genres}
        setGenres={setGenres}
      />
    </div>
  );
};

export default newmovie;
