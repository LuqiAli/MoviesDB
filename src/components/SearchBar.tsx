import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full h-16 mb-10 bg-gray-100 flex justify-center">
      <div className="w-8/12 bg-white h-full border-b-4 border-gray-600 focus:shadow-xl indent-3 shadow-md transition-all flex items-center px-5 focus-within:shadow-xl focus-within:bg-blue-50">
        <input
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
          className="bg-transparent h-full w-11/12 outline-0 transition-all"
        />
        <FontAwesomeIcon
          className="text-2xl ml-auto"
          icon={faSearch}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default SearchBar;
