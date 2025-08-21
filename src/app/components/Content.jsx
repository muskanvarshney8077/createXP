"use client";

import Image from "next/image";
import { useMyContext } from "../context/Context";
import search from "../assets/search.png";
import sort from "../assets/sort.png";
import filter from "../assets/filter.png";
import searchDark from "../assets/searchDark.png";
import CustomModal from "../utils/CustomModal";
import SortByField from "./SortByField";
import FilterByField from "./FilterByField";
import AddClient from "./AddClient";
import { useEffect } from "react";

const Content = () => {
  const { state, handleState } = useMyContext();

  const tabArray = ["All", "Individual", "Company"];
  const sortLength = Object.values(state.sortBy).filter(
    (val) => typeof val === "string" && val.trim() !== ""
  ).length;

  const filterFunction = () => {
    let newArr = [...state.apidata];

    const hasSort = state.fields.some(
      (field) => state.sortBy[field.key] !== ""
    );
    if (hasSort) {
      newArr.sort((a, b) => {
        for (let field of state.fields) {
          const sortOrder = state.sortBy[field.key];
          if (!sortOrder) continue;

          let result = 0;

          if (field.key === "clientName") {
            result = a.clientName.localeCompare(b.clientName);
          } else if (field.key === "createdAt") {
            result = new Date(a.createdAt) - new Date(b.createdAt);
          } else if (field.key === "updatedAt") {
            result = new Date(a.updatedAt) - new Date(b.updatedAt);
          } else if (field.key === "clientId") {
            result = Number(a.clientId) - Number(b.clientId);
          }

          if (result !== 0) {
            return sortOrder === "asc" ? result : -result;
          }
        }
        return 0;
      });
    }

    if (state.filterBy.status.length !== 0) {
      newArr = newArr.filter((ele) =>
        state.filterBy.status
          .map((status) => status.toLowerCase())
          .includes(ele.status.toLowerCase())
      );
    }

    if (state.filterBy.updatedBy.length !== 0) {
      newArr = newArr.filter((ele) =>
        state.filterBy.updatedBy
          .map((updatedBy) => updatedBy.toLowerCase())
          .includes(ele.updatedBy.toLowerCase())
      );
    }

    if (state.searchText !== "") {
      newArr = newArr.filter((ele) =>
        ele.clientName.toLowerCase().includes(state.searchText.toLowerCase())
      );
    }

    handleState({ data: newArr });
  };

  useEffect(() => {
    if (
      state.searchText !== "" ||
      state.sortBy.clientName !== "" ||
      state.sortBy.createdAt !== "" ||
      state.sortBy.clientId !== "" ||
      state.sortBy.updatedAt !== "" ||
      state.filterBy.status.length !== 0 ||
      state.filterBy.updatedBy.length !== 0
    ) {
      filterFunction();
    } else {
      handleState({ data: state.apidata });
    }
  }, [
    state.searchText,
    state.sortBy.clientName,
    state.sortBy.createdAt,
    state.sortBy.clientId,
    state.sortBy.updatedAt,
    state.filterBy.status,
    state.filterBy.updatedBy,
    state.fields,
  ]);

  useEffect(() => {
    localStorage.setItem("sortBy", JSON.stringify(state.sortBy));
  }, [state.sortBy]);

  return (
    <div>
      <div
        className={`${
          (state.openModal && "opacity-50") ||
          (state.openModalFilter && "opacity-50") ||
          (state.openModalAdd && "opacity-50")
        }`}
      >
        <div className="mt-4">
          <div className="flex gap-2 px-2 justify-between items-center">
            <div className="flex justify-start items-center cursor-pointer">
              {tabArray.map((ele, i) => (
                <div
                  key={i}
                  className={`${
                    state.selectedTab === ele
                      ? "p-2 text-black border-b-2 rounded shadow-2xs "
                      : "text-gray-500 p-2"
                  }`}
                  onClick={() => {
                    handleState({ selectedTab: ele });
                  }}
                >
                  {ele}
                </div>
              ))}
            </div>

            <div className="flex gap-5 justify-end items-center  cursor-pointer">
              <div className="relative flex items-center gap-3 ">
                {state.searchClick && (
                  <input
                    type="text"
                    placeholder=".......Enter Client Name"
                    className="border-b-2 border-gray-200 focus:border-none focus:outline-none focus:ring-0"
                    value={state.searchText}
                    onFocus={() => handleState({ inputFocused: true })}
                    onChange={(e) => {
                      handleState({ searchText: e.target.value });
                    }}
                  />
                )}
                {state.searchClick &&
                  state.inputFocused &&
                  state.searchText && (
                    <button
                      onMouseDown={() => handleState({ searchText: "" })}
                      className="absolute right-8 text-gray-400 hover:text-black text-sm"
                    >
                      ✕
                    </button>
                  )}
                {state.searchClick ? (
                  <Image
                    src={searchDark}
                    alt=""
                    width={15}
                    height={15}
                    onClick={() => {
                      handleState({ searchClick: false });
                    }}
                  />
                ) : (
                  <Image
                    src={search}
                    alt=""
                    width={15}
                    height={15}
                    onClick={() => {
                      handleState({ searchClick: true });
                    }}
                  />
                )}
              </div>
              <div className="relative inline-block">
                <Image
                  src={sort}
                  alt=""
                  width={20}
                  height={20}
                  onClick={() => handleState({ openModal: true })}
                />
                {sortLength > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {sortLength}
                  </div>
                )}
              </div>

              <Image
                src={filter}
                alt=""
                width={20}
                height={20}
                onClick={() => handleState({ openModalFilter: true })}
              />
              <button
                className="bg-black text-white rounded-lg px-3 py-2 cursor-pointer"
                onClick={() => handleState({ openModalAdd: true })}
              >
                + Add client
              </button>
            </div>
          </div>
        </div>
        <div className="m-3">
          <div
            className={`${
              state.data.length ? "h-[70vh]" : "h-[13vh]"
            } overflow-auto border border-gray-400 rounded shadow-2xl`}
          >
            <table className="table-fixed w-full border-collapse">
              <thead className="sticky top-0 bg-pink-50 z-10">
                <tr className="text-left text-gray-400 font-semibold">
                  <td className="px-3 py-2 border-b w-30">Client ID</td>
                  <td className="px-3 py-2 border-b w-40">Client Name</td>
                  <td className="px-3 py-2 border-b w-30">Client Type</td>
                  <td className="px-3 py-2 border-b w-50">Email</td>
                  <td className="px-4 py-2 border-b w-30">Status</td>
                  <td className="px-4 py-2 border-b w-50">Created At</td>
                  <td className="px-4 py-2 border-b w-50">Updated At</td>
                  <td className="px-4 py-2 border-b w-50">Updated By</td>
                  <td className="px-4 py-2 border-b w-30 ">Source</td>
                  <td className="px-4 py-2 border-b w-30">
                    Preferred Language
                  </td>

                  <td className="px-4 py-2 border-b w-30">Client Rating</td>
                </tr>
              </thead>
              <tbody>
                {state.data?.map((ele, i) => (
                  <tr key={i} className="hover:bg-gray-50 text-[13px]">
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.clientId}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.clientName}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.clientType}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.email}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.status}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.createdAt}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.updatedAt}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.updatedBy}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.source}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.preferredLanguage}
                    </td>

                    <td className="border-b border-gray-300 px-4 py-2">
                      {ele.clientRating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {state.data.length === 0 && (
          <div className="flex items-start justify-center h-[55vh] w-screen bg-gray-100">
            <div className="text-xl text-white bg-red-600 p-3 rounded">
              No Data Found !!!
            </div>
          </div>
        )}
      </div>

      {(state.openModal || state.openModalAdd || state.openModalFilter) && (
        <CustomModal
          Adjust={`${
            state.openModal
              ? "right-[30vh] w-[50%]"
              : state.openModalAdd
              ? "right-[3vw] w-[50%]"
              : state.openModalFilter
              ? "right-[10vw] w-[30%]"
              : ""
          }`}
        >
          <>
            <div className="font-semibold mb-2">
              {(state.openModal && "Sort By") ||
                (state.openModalAdd && "Add Client Details") ||
                (state.openModalFilter && "Filter By")}
            </div>
            {state.openModal ? (
              <SortByField />
            ) : state.openModalAdd ? (
              <AddClient />
            ) : state.openModalFilter ? (
              <FilterByField />
            ) : null}
          </>
        </CustomModal>
      )}
    </div>
  );
};
export default Content;
