import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen w-full bg-gray-200 flex justify-center items-center">
      <Link
        className="flex items-center w-1/5 bg-violet-600 flex justify-center text-white text-2xl p-5 rounded-xl shadow-lg border-2 border-transparent hover:border-violet-600 hover:text-violet-600 hover:bg-transparent hover:shadow-2xl hover:font-bold transition-all"
        href={"/movies"}
      >
        To The Library
        <FontAwesomeIcon className="px-4" icon={faArrowAltCircleRight} beat />
      </Link>
    </div>
  );
};

export default Home;
