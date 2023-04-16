import React from "react";

const Alert = (props: {
  value: string;
  type: "warning" | "success" | null;
}) => {
  if (props.type === "warning") {
    return (
      <div
        className={
          "bg-red-200 w-full flex justify-start items-center mt-3 h-16 rounded-xl px-5"
        }
      >
        <h2 className={"text-red-900 text-md"}>{props.value}</h2>
      </div>
    );
  } else if (props.type === "success") {
    return (
      <div
        className={
          "bg-green-200 w-full flex justify-start items-center mt-3 h-16 rounded-xl px-5"
        }
      >
        <h2 className={"text-green-900 text-md"}>{props.value}</h2>
      </div>
    );
  }

  return <></>;
};

export default Alert;
