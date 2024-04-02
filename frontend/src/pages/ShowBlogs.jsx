import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";

export default function ShowBlogs() {
  const [obj, setObj] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const search = useSelector((state) => state.search.searchQuery);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const url = `/api/showBlogs?page=${page}&search=${search}`;
        const res = await fetch(url);
        const { data } = await res.json();
        if (!res.ok) {
          console.log(data.message);
        }
        setObj(data || {});
      } catch (err) {
        console.log(err);
      }
    };

    getAllBlogs();
  }, [page, search]);

  return (
    <>
      <div className="w-screen flex items-center mt-10">
        <button
          type="button"
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 mx-4"
          onClick={(e) => {
            navigate("/");
          }}
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Go back</span>
        </button>
        <div className="flex justify-center mx-4 my-auto">
          { search === "" ? (
                          <span className="font-bold text-center justify-center align-middle text-3xl">
                          Start Seaching Something!
                        </span>
          ) : (
            <span className="font-bold text-center justify-center align-middle text-3xl">
            Results for "{search}"
          </span>
          )

          }
        </div>
      </div>
      <div class="flex w-full md:max-w-xl rounded shadow my-10 mx-8">
        <a
          href="#"
          aria-current="false"
          class="w-full flex justify-center font-medium rounded-l px-5 py-2 border bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
        >
          Recent
        </a>

        <a
          href="#"
          aria-current="page"
          class="w-full flex justify-center font-medium px-5 py-2 border-t border-b bg-gray-900 text-white  border-gray-900 hover:bg-gray-800"
        >
          Popular
        </a>

        <a
          href="#"
          aria-current="false"
          class="w-full flex items-center gap-x-2 justify-center font-medium rounded-r px-5 py-2 border bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
        >
          Trending
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
            ></path>
          </svg>
        </a>
      </div>
      <div className="flex flex-row">
        <div className="w-[150%] mx-8">
          {obj.blog && obj.blog.length > 0&& search != "" ? (
            <>
              <Post blogs={obj.blog} />
              <Pagination
                page={page}
                limit={obj.limit || 0}
                total={obj.total || 0}
                setPage={(page) => setPage(page)}
              />
            </>
          ) : (
            <div class="my-10 ml-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                No Result Found!
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                Try Searching something else
              </p>
            </div>
          )}
        </div>
        <div className="w-1/2 mt-10 mx-10">
          <Dropdown label="Sort By" placement="bottom" color="gray">
            <Dropdown.Item>Recent</Dropdown.Item>
            <Dropdown.Item>Oldest</Dropdown.Item>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Most Liked</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
