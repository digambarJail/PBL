import React from "react";
import Post from "./Post";
import Events from "./Events";
import TopVoices from "./TopVoices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowQuestions from "./showQuestions";
import { setSearchQuery } from "../app/Search/SearchSlice";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  // let blogs = [];
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleAddEvent = () => {
    navigate("/addEvent");
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const url = `/api/showBlogs?page=${page}&sort=${sort.sort},${
          sort.order
        }&genre=${filterGenre.toString()}&search=${search}`;
        const res = await fetch(url, {
          method: "GET",
        });
        const { data } = await res.json();
        if (!res.ok) {
          // console.log(data.message);
        }
        // console.log("Data received:", data);
        setObj(data || {});
        dispatch(setSearchQuery());
      } catch (err) {
        console.log(err);
      }
    };

    getAllBlogs();
  }, [sort, filterGenre, page, search]);

  
  return (
    <>
      <div className=" flex flex-col">
        <div className="scroll-smooth flex h-full flex-row text-center ">
          {" "}
          {/* Adjust mt-[60px] to match your navbar's height */}
          <div className="w-2/6 items-center mt-12">
            <Events />
            <button
              onClick={handleAddEvent}
              className="mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Add Your Event
            </button>
          </div>
          <div className="w-4/6 mt-12">
            <h1 className=" text-2xl font-semibold">Blogs</h1>
            <div className={` font-[sans-serif] p-4 mt-10 rounded-md `}>
              <div className="max-w-6xl max-md:max-w-lg mx-auto">
                <div>
                  {/* <h2 className="text-3xl font-extrabold text-[#333] dark:text-slate-100 inline-block">
                    LATEST BLOGS
                    </h2> */}
                </div>
                {/* {console.log("w", obj)} */}
                {obj.blog && obj.blog.length !== 0 ? (
                  <>
                  <Post blogs={obj.blog ? obj.blog : []} />
                  <div class="mt-10 sm:mt-10 sm:ml-3">
                  <button
                    class="w-full flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-green-700 dark:text-green-700 bg-green-100 hover:bg-green-50 hover:text-green-600 focus:ring ring-offset-2 ring-purple-100 focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    onClick={() => navigate("/showBlogs")}
                  >
                    Show More
                  </button>
                </div>
                </>
                ) : (
                  <>
                    <div class="py-4 rounded shadow-md w-60 sm:w-full animate-pulse bg-gray-800">
                      <div class="flex p-4 space-x-4 sm:px-8">
                        <div class="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
                        <div class="flex-1 py-2 space-y-4">
                          <div class="w-full h-3 rounded bg-gray-300"></div>
                          <div class="w-5/6 h-3 rounded bg-gray-300"></div>
                        </div>
                      </div>
                      <div class="p-4 space-y-4 sm:px-8">
                        <div class="w-full h-4 rounded bg-gray-300"></div>
                        <div class="w-full h-4 rounded bg-gray-300"></div>
                        <div class="w-3/4 h-4 rounded bg-gray-300"></div>
                      </div>
                    </div>
                    <div class="py-4 rounded shadow-md w-60 sm:w-full animate-pulse bg-gray-800 my-10">
                      <div class="flex p-4 space-x-4 sm:px-8">
                        <div class="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
                        <div class="flex-1 py-2 space-y-4">
                          <div class="w-full h-3 rounded bg-gray-300"></div>
                          <div class="w-5/6 h-3 rounded bg-gray-300"></div>
                        </div>
                      </div>
                      <div class="p-4 space-y-4 sm:px-8">
                        <div class="w-full h-4 rounded bg-gray-300"></div>
                        <div class="w-full h-4 rounded bg-gray-300"></div>
                        <div class="w-3/4 h-4 rounded bg-gray-300"></div>
                      </div>
                    </div>

                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-2/6 scroll-smooth">
            <h1 className="text-2xl mt-12 ml-20 mr-20 font-semibold text-center">
              Top Voices On PICT Connect
            </h1>
            <TopVoices />
            <div class="mt-12 mr-6 ml-6 relative overflow-x-auto "></div>
          </div>
        </div>

        <div className="mt-40 mb-40">
          <h1 className="ml-20 text-4xl font-semibold">
            Recently asked Question!{" "}
          </h1>
          <ShowQuestions />
        </div>
      </div>
    </>
  );
};

export default Home;
