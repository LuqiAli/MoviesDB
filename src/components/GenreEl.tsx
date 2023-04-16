import React from "react";

const GenreEl = (props: {
  genres: boolean[];
  setGenres: (value: React.SetStateAction<boolean[]>) => void;
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

  const updateGenres = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr = [...props.genres];
    arr[Number(e.target.value) - 1] = e.target.checked;
    props.setGenres(arr);
  };

  const genreEl = genreInfo.list.map((genre, index) => {
    return (
      <label key={String(index)} htmlFor={String(index + 1)}>
        <input
          checked={props.genres[index]}
          className="peer hidden"
          onChange={(e) => updateGenres(e)}
          type="checkbox"
          name="genre"
          value={String(index + 1)}
          id={String(index + 1)}
        />
        <div
          className="cursor-pointer flex justify-center items-center bg-blue-200 p-1 h-7 text-center rounded-md drop-shadow-md mr-3 my-1.5 hover:drop-shadow-xl hover:scale-105 transition-all border-2 border-transparent peer-checked:border-black"
          style={{ backgroundColor: genreInfo.colors[index] }}
        >
          <p className="text-sm p-1">{genre}</p>
        </div>
      </label>
    );
  });

  return <div className="flex w-full flex-wrap mb-8">{genreEl}</div>;
};

export default GenreEl;
