import React from "react";

const Rating = (props: { rating: number }) => {
  return (
    <div className="flex mt-auto justify-end">
      <h1 className="bg-yellow-400 h-8 py-1 px-2.5 rounded-md drop-shadow-md">
        {props.rating}/10
      </h1>
    </div>
  );
};

export default Rating;
