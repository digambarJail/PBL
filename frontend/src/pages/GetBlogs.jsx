import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Comments from "../components/Comments";

const GetBlogs = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [liked, isLiked] = useState(false);
  const [nolikes, setnoLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setComment(e.target.value.trim());
  };

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
          setnoLikes(ldata.data.likesCount);
          isLiked(ldata.data.isLiked);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/c/${blogId}`);
        const cdata = await res.json();
        console.log("Fetched Comments:", cdata);
        setComments(cdata.data[0].blogComments); // Update comments state with fetched comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
    fetchBlog();
  }, [blogId, likes]);

  const handlelike = async () => {
    const newLikes = liked ? nolikes - 1 : nolikes + 1; 
    setnoLikes(newLikes);
    isLiked(!liked);

    try {
      const res = await fetch(`/api/l/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { isLiked: liked, likeCount: newLikes } }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/c/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment }),
      });
      const data = await res.json();
      console.log('posts',data);
      const res1 = await fetch(`/api/c/${blogId}`);
      const cdata = await res1.json();
      console.log("Fetched Comments up:", cdata);
      setComments(cdata.data[0].blogComments);
      // Update comments state with the new comment
  
      // Clear the comment input field
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  // Render JSX only when blog and likes are not null
  if (!blog || !likes) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
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
            <div
              className="flex mb-36 mt-16 justify-between items-center w-full mx-auto"
              id="hide"
            >
              <div className="flex space-x-8 items-center">
                <div className="flex space-x-2">
                  <div
                    style={{ display: "inline" }}
                    data-tooltipped=""
                    aria-describedby="tippy-tooltip-45"
                    data-original-title="Likes"
                  >
                    <button
                      onClick={() => handlelike()}
                      className={`flex space-x-2 cursor-pointer rounded-sm focus:outline-none hover:bg-gray-800 ${
                        liked
                          ? "transition ease-in-out  scale-110  duration-300 "
                          : ""
                      }`}
                    >
                      <div className="flex  space-x-2 cursor-pointer">
                        <AiFillLike />

                        <span className="text-sm text-gray-500">
                          {nolikes}
                        </span>
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
                    <FaComment onClick={() => setShowComments(!showComments)} />
                      <span className="text-sm text-gray-500">{comments.length}</span>
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
            {showComments && (
            <div className="w-fullbg-white rounded-lg border p-1 md:p-3 m-10 w-full">
              <h3 className="font-semibold p-1">Discussion</h3>
              {comments.length > 0 ? (
                <Comments comments={comments} />
              ) : (
                <p>No comments yet.</p>
              )}
              <form onSubmit={postComment}>
                <div className="w-full px-3 mb-2 mt-6">
                  <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                    name="body"
                    placeholder="Comment"
                    value={comment}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="w-full flex justify-end px-3 my-3">
                  <input
                    type="submit"
                    className="px-2.5 py-1.5 rounded-md text-white  bg-indigo-500 text-lg"
                    value="Post Comment"
                  />
                </div>
              </form>
            </div>
            )}
          </article>  
        </div>
      </main>
    </div>
  );
};

export default GetBlogs;
