import React, { useState, useEffect } from "react";
import Image from "next/image";
import drag from "../assets/drag.png";

import { useMyContext } from "../context/Context";

const SortByField = ({ filterFunction }) => {
  const { state, handleState } = useMyContext();

  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleDragStart = (idx) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (idx) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...state.fields];
    const [removed] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, removed);
    handleState({ fields: updated });
    setDraggedIdx(null);
    filterFunction();
  };
  useEffect(() => {
    filterFunction();
  }, [state.fields]);

  return (
    <>
      {state.fields.map((field, idx) => (
        <div
          key={field.id}
          className="flex justify-start items-center gap-5 w-full"
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(idx)}
          style={{
            boxShadow: draggedIdx === idx ? "0 0 8px #0077ff" : "none",
            borderRadius: "4px",
            padding: "4px",
          }}
        >
          <div className="flex justify-start items-center gap-2 w-[30%]">
            <div>
              <Image src={drag} alt="drag" width={15} height={15} />
            </div>
            <div>
              <Image src={field.icon} alt="" width={15} height={15} />
            </div>
            <div>{field.label}</div>
          </div>

          <div className="w-[65%] flex justify-between cursor-pointer">
            <div className="flex justify-start items-center gap-5">
              <div
                className={`${
                  state.sortBy[field.key] === "asc"
                    ? "px-2 py-1 bg-blue-100"
                    : "px-2 py-1 bg-pink-100"
                }`}
                onClick={() =>
                  handleState({
                    sortBy: { ...state.sortBy, [field.key]: "asc" },
                  })
                }
              >
                {field.type === "az" ? "↑ A-Z" : "↑ Newest to oldest"}
              </div>

              <div
                className={`${
                  state.sortBy[field.key] === "desc"
                    ? "px-2 py-1 bg-blue-100"
                    : "px-2 py-1 bg-pink-100"
                }`}
                onClick={() =>
                  handleState({
                    sortBy: { ...state.sortBy, [field.key]: "desc" },
                  })
                }
              >
                {field.type === "az" ? "↓ Z-A" : "↓ Oldest to Newest"}
              </div>
            </div>

            {state.sortBy[field.key] !== "" && (
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleState({
                    sortBy: { ...state.sortBy, [field.key]: "" },
                  })
                }
              >
                X
              </div>
            )}
          </div>
        </div>
      ))}
      <hr className="border-gray-200 mt-4" />
    </>
  );
};

export default SortByField;
