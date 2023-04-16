import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ConfirmDelete = (props: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { movie_id } = router.query;

  const makeQuery = async () => {
    fetch(`/api/movies/${movie_id}`, { method: "DELETE" }).then((res) =>
      res.json()
    );
    router.push("/movies");
  };

  const handleClick = (check: boolean) => {
    check === true ? makeQuery() : props.setShow(false);
  };

  if (props.show === true) {
    return (
      <div className="h-14 flex items-center gap-3">
        <span className="text-xl">Are you sure?</span>
        <FontAwesomeIcon
          className="text-green-700 cursor-pointer text-xl"
          icon={faCheck}
          onClick={() => handleClick(true)}
        />
        <FontAwesomeIcon
          className="text-red-800 cursor-pointer text-xl"
          icon={faX}
          onClick={() => handleClick(false)}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default ConfirmDelete;
