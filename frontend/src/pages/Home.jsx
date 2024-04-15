import React from "react";
import Post from "./Post";
import Events from "./Events";
import TopVoices from "./TopVoices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowQuestions from "./showQuestions";
import { setSearchQuery } from "../app/Search/SearchSlice";
import { useSelector, useDispatch } from "react-redux";
import { CardPlaceholder } from "../components/CardPlaceholder";
import { setSort } from "../app/Sort/SortSlice";

const Home = () => {
  // let blogs = [];
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
  // const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleAddEvent = () => {
    navigate("/addEvent");
  };

  const handleSeeMore = () => {
    navigate("/allEvents");
  }

  useEffect(() => {
    setSort("");
    const getAllBlogs = async () => {
      try {
        const url = `/api/showBlogs?page=${page}&search=${search}`;
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
  }, [ page, search]);

  const handleGoToQuestions = () => {
    const recentQuestionsSection = document.getElementById("recentQuestions");
    if (recentQuestionsSection) {
      recentQuestionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className=" flex flex-col">
        <div className="scroll-smooth flex h-full flex-col md:flex-row text-center ">
          {" "}
          {/* Adjust mt-[60px] to match your navbar's height */}
          <div className="w-full md:w-2/6 items-center mt-12">
            <Events />
            <button
          onClick={handleAddEvent}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-4"
        >
          Add Your Event
        </button>
        <button
          onClick={handleSeeMore}
          className="bg-green-500 mt-5 mr-4 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          See More Events
        </button>
          </div>
          <div className="w-full md:w-4/6 mt-12">
          <div className="flex flex-row w-full justify-center h-10 items-center">
            <div className=" text-3xl font-semibold">Blogs</div>
        </div>
            <div className={` font-[sans-serif] p-4 mt-10 rounded-md `}>
              <div className="max-w-6xl max-md:max-w-lg mx-auto">
                <div className="flex my-2">
                <button
          className="bg-slate-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mx-4"
          onClick={handleGoToQuestions}
        >
          Go to Questions
        </button>
                </div>

                {obj.blog && obj.blog.length !== 0 ? (
                  <>
                  
                    <Post blogs={obj.blog ? obj.blog : []} />
                    <div class="mt-10 sm:mt-10 sm:ml-3">
                      <button
                        class="w-full mx-auto flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-green-700 dark:text-green-700 bg-green-200 hover:bg-green-300 hover:text-green-600 focus:ring ring-offset-2 ring-purple-100 focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                        onClick={() => navigate("/showBlogs")}
                      >
                        Show More
                      </button>
                    </div>
                  </>
                ) : (
                  <>
             <CardPlaceholder/>
             <CardPlaceholder/>

                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/6 scroll-smooth">
            <h1 className="text-2xl mt-12 ml-20 mr-20 font-semibold text-center">
              Top Voices On PICT Connect
            </h1>
            <TopVoices />
            <div class="mt-12 mr-6 ml-6 relative overflow-x-auto "></div>
          </div>
        </div>

        <div className="mt-10 mb-40 w-full px-10" id="recentQuestions">
          <h1 className="ml-20 text-4xl font-semibold">
            Recently asked Question!{" "}
          </h1>
          <ShowQuestions />
          <button
            class="w-full flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-green-700 dark:text-green-700 bg-green-200 hover:bg-green-300 hover:text-green-600 focus:ring ring-offset-2 ring-purple-100"
            onClick={() =>{ navigate("/showBlogs") }}
          >
            Show More
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
