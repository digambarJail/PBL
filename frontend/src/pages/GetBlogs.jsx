import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { MdOutlineBookmarkAdd } from "react-icons/md";

const GetBlogs = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(null);
  const [liked , isLiked] = useState(false);
  const [nolikes, setnoLikes] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/b/${blogId}`);
        const data = await res.json();
        console.log("Fetched blog:", data);
        setBlog(data);
        if (!likes) {
          const res1 = await fetch(`/api/l/${blogId}`);
          const ldata = await res1.json();
          console.log("Fetched Likes:", ldata);
          setLikes(ldata);
          setnoLikes(ldata.data.likesCount)
          isLiked(ldata.data.isLiked)
          
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId, likes]);

  const  handlelike  = async() => {
    if(liked == false){
        setnoLikes(nolikes+1)
        console.log('f',liked , nolikes)
      
      
    }
    else{
      if(nolikes>0){
        setnoLikes(nolikes-1)
      }
      else{
        setnoLikes(0)
        console.log('t',liked , nolikes)
      }
      
    }
    isLiked(!liked)
    likes.data.isLiked = liked;
    likes.data.likeCount = nolikes;
    try {
    const res = await fetch(`/api/l/${blogId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(likes),
    });
    const data = await res.json();
    console.log(data)
  } catch (error) {
      console.log(error)
  }
  }

  // Render JSX only when blog and likes are not null
  if (!blog || !likes) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      {blog ? (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased rounded-xl">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl flex-col">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      src={blog.data.profilePicture}
                      alt=""
                      className="mr-4 w-16 h-16 rounded-full"
                    />
                    <div>
                      <span
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {blog.data.nameOfOwner}
                      </span>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        SE IT
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {moment(blog.createdAt).format("ll")}
                      </p>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  {blog.data.title}
                </h1>
              </header>
              <p className="lead">{blog.data.content}</p>
              <div className="flex mb-36 mt-16 justify-between items-center w-full mx-auto" id="hide">
              <div className="flex space-x-8 items-center">
                <div className="flex space-x-2">
                  <div
                    style={{ display: "inline" }}
                    data-tooltipped=""
                    aria-describedby="tippy-tooltip-45"
                    data-original-title="Likes"
                  >
                    <button onClick={() => handlelike()} className={`flex space-x-2 cursor-pointer rounded-sm focus:outline-none hover:bg-gray-800 ${liked ? "transition ease-in-out  scale-110  duration-300 " : ""}`}>
                    <div className="flex  space-x-2 cursor-pointer">
                      <AiFillLike />

                      <span className="text-sm text-gray-500">{nolikes}</span>
                    </div>
                    </button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div
                    style={{ display: "inline" }}
                    data-tooltipped=""
                    aria-describedby="tippy-tooltip-46"
                    data-original-title="Respond"
                  >
                    <div className="flex space-x-2 cursor-pointer">
                    <FaComment />
                      <span className="text-sm text-gray-500">7</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex cursor-not-allowed space-x-2 ">
                <div
                  style={{ display: "inline" }}
                  data-tooltipped=""
                  aria-describedby="tippy-tooltip-47"
                  data-original-title="Not working yet"
                >
                  <div className=" cursor-not-allowed flex space-x-2">
                  <MdOutlineBookmarkAdd />
                  </div>
                </div>
              </div>
            </div>
            </article>
          </div>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetBlogs;
