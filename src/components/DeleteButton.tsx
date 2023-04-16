import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDelete from "@/components/ConfirmDelete";

const DeleteButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  return (
    <div className="mt-5 flex justify-center items-center flex-col">
      <div
        onClick={handleClick}
        className="rounded-3xl px-5 h-14 bg-red-600 flex justify-center items-center group transition-all box-content cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105"
      >
        <FontAwesomeIcon
          className="text-white"
          icon={faTrash}
        ></FontAwesomeIcon>
      </div>
      <ConfirmDelete show={showConfirm} setShow={setShowConfirm} />
    </div>
  );
};

export default DeleteButton;
