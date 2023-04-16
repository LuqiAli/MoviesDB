import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import MovieForm from "@/components/MovieForm";
import DeleteButton from "@/components/DeleteButton";
import AlertInterface from "@/interfaces/Alert";

const movie = () => {
  const router = useRouter();
  const { movie_id } = router.query;

  const [initialTitle, setInitialTitle] = useState("Loading");
  const [title, setTitle] = useState("Loading");
  const [rating, setRating] = useState(-1);
  const [alerts, setAlerts] = useState<AlertInterface[]>([]);
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

  const handleSubmit = async (finalGenres: number[]) => {
    fetch(`/api/movies/${movie_id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        rating: rating,
        genres: finalGenres,
      }),
    }).then((res) => res.json());

    setAlerts([
      {
        value: `Successfully updated ${title}`,
        type: "success",
      },
    ]);
  };

  const handleData = (data: any) => {
    setInitialTitle(data.movie_name);
    setTitle(data.movie_name);
    setRating(data.movie_rating);

    let arr = [...genres];

    data.tag_ids.forEach((id: string) => {
      arr[Number(id) - 1] = true;
    });
    setGenres(arr);
  };

  useEffect(() => {
    if (movie_id) {
      fetch(`/api/movies/${movie_id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => handleData(data.data[0]));
    }
  }, [movie_id]);

  return (
    <div className="flex items-center flex-col bg-gray-100 h-screen">
      <Link className="absolute my-12 mx-28 self-start" href={"/movies"}>
        <FontAwesomeIcon
          className="text-4xl text-gray-800 cursor-pointer"
          icon={faHouse}
        ></FontAwesomeIcon>
      </Link>
      <Header />
      <h1 className="text-4xl text-center my-5 font-medium">
        Update {initialTitle}
      </h1>
      <DeleteButton />
      <MovieForm
        title={title}
        setTitle={setTitle}
        rating={rating}
        setRating={setRating}
        alerts={alerts}
        setAlerts={setAlerts}
        genres={genres}
        setGenres={setGenres}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default movie;
