import React from "react";
import Genre from "./Genre";
import Rating from "./Rating";
import { useRouter } from "next/router";

const Card = (props: {
  id: number;
  title: string;
  rating: number;
  tagIds: number[];
  tagTitles: string[];
  tagColors: string[];
}) => {
  const router = useRouter();

  let genreArr = [];

  for (let i = 0; i < props.tagIds.length; i++) {
    genreArr.push(
      <Genre
        key={props.tagIds[i]}
        value={props.tagTitles[i]}
        color={props.tagColors[i]}
        id={props.tagIds[i]}
      />
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push(`/movies/${props.id}`);
  };
  return (
    <div
      onClick={(e) => handleClick(e)}
      className="flex justify-start m-5 mt-0 w-64 aspect-[9/11] bg-white rounded-md drop-shadow-md p-5 hover:drop-shadow-2xl hover:bg-blue-50 transition-all cursor-pointer"
    >
      <div className="flex flex-col min-w-full">
        <h1 className="text-3xl font-medium">{props.title}</h1>
        <div className="my-3 h-0.5 bg-gray-300"></div>
        {/* <h3 className="text-sm">Genres</h3> */}
        <div className="flex flex-wrap my-0.5">{genreArr}</div>
        <Rating rating={props.rating} />
      </div>
    </div>
  );
};

export default Card;
