import React from "react";

const Genre = (props: { value: string; color: string; id: number }) => {
  return (
    <div
      className="cursor-pointer flex justify-center items-center bg-blue-200 p-1 h-7 text-center rounded-md drop-shadow-md mr-1.5 my-1 transition-all checked:outline-white checked:outline-5"
      style={{ backgroundColor: props.color }}
    >
      <p className="text-sm p-1">{props.value}</p>
    </div>
  );
};

export default Genre;
