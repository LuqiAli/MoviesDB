import React from "react";
import AlertInterface from "@/interfaces/Alert";
import Alert from "./Alert";
import GenreEl from "./GenreEl";

const MovieForm = (props: {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (finalGenres: number[]) => Promise<void>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  alerts: AlertInterface[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertInterface[]>>;
  genres: boolean[];
  setGenres: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  const genreInfo = {
    list: [
      "Action",
      "Adventure",
      "Comedy",
      "Horror",
      "Romance",
      "Mystery",
      "Crime",
      "SciFi",
      "Fantasy",
      "Documentary",
      "Drama",
    ],
    colors: [
      "#A7C7E7",
      "#C1E1C1",
      "#fdfd96",
      "#aeaeae",
      "#F8C8DC",
      "#C3B1E1",
      "#FAA0A0",
      "#b19cd9",
      "#bfe3b4",
      "#9ab8f7",
      "#C4A484",
    ],
  };

  const alertsEl = props.alerts.map((alert, index) => {
    return <Alert key={index} value={alert.value} type={alert.type} />;
  });

  const preSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let arr: AlertInterface[] = [];
    let finalGenres: number[] = [];

    props.genres.forEach((item, index) => {
      if (item === true) {
        finalGenres.push(index + 1);
      }
    });

    if (props.title === "") {
      arr.push({ value: "Please enter the movie title.", type: "warning" });
    }
    if (props.rating === -1) {
      arr.push({
        value: "Please enter the the rating of the movie.",
        type: "warning",
      });
    }
    if (finalGenres.length < 1) {
      arr.push({ value: "Please select at least 1 genre.", type: "warning" });
    }

    props.setAlerts(arr);

    if (arr.length < 1) {
      props.handleSubmit(finalGenres);
    }
  };

  return (
    <form
      className="flex flex-wrap justify-center mt-8 w-10/12"
      onSubmit={(e) => {
        preSubmit(e);
      }}
    >
      <div className="flex flex-col w-1/2">
        <label className="text-3xl mb-5" htmlFor={"title"}>
          Movie Title
        </label>
        <input
          className="w-10/12 border-b-2 bg-white border-gray-700 h-12 outline-0 focus:bg-blue-50 focus:shadow-xl indent-3 shadow-md transition-all"
          placeholder="Enter movie title"
          type={"text"}
          id="title"
          name="title"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-col justify-start w-1/4">
        <label className="text-3xl mb-5" htmlFor={"rating"}>
          Movie Rating
        </label>
        <select
          className="indent-3 appearance-none bg-white outline-0 border-0 border-b-2 border-gray-700 w-20 h-12 focus:bg-blue-50 shadow-lg transition-all"
          name="rating"
          id="rating"
          value={props.rating}
          onChange={(e) => props.setRating(Number(e.target.value))}
        >
          <option disabled value="-1">
            Select
          </option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="w-1/4 flex flex-col flex-wrap">
        <label className="text-3xl mb-4">Genre</label>
        <GenreEl genres={props.genres} setGenres={props.setGenres} />
      </div>
      {props.alerts && alertsEl}

      <input
        className="cursor-pointer capitalize border-2 border-transparent text-xl w-2/12 bg-violet-700 h-14 my-8 rounded-3xl text-gray-200 shadow-lg hover:border-violet-700 hover:bg-transparent hover:font-bold hover:text-violet-700 hover:shadow-2xl transition-all"
        type={"submit"}
        value={"submit"}
      />
    </form>
  );
};

export default MovieForm;
