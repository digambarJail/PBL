import React from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ blogs }) => {
  const navigate = useNavigate();

  console.log("blogs" , blogs);
  return (
    <div className="grid grid-cols-1 gap-8 " >
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex flex-col overflow-hidden rounded-lg  min-h-[20vh] max-h-fit border border-[#404040]  shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-[102%] transition-all duration-300"
        >
          <div className="flex-shrink-0">
            <img
              onClick={() => navigate(`/getBlogs/${blog._id}`)}
              className="h-80 w-full object-cover"
              src={blog.blogPicture || 'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'}
              alt='pic'
            />
          </div>
          <div className="flex flex-1 flex-col dark: justify-between p-6 dark:bg-[#282929]" onClick={() => navigate(`/getBlogs/${blog._id}`)}>
            <div className="flex-1">
              <a href="" className="mt-2 block">
                <p className="text-xl font-semibold dark:text-white text-black">
                {blog.title}
                </p>
                <p className="mt-3 text-base dark:text-white text-black">
                {blog.content.length > 150 ? blog.content.substring(0, 150) + ' ...' : blog.content}
                </p>
              </a>
            </div>
            
            <div className="flex items-center mt-10">
              <div className="flex-shrink-0">
              <a href={`/getUserDetails/${blog.ownerId}`}>
                  <span className="sr-only"></span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={blog.profilePicture ||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    alt=""
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-slate-100 text-slate-700">
                  <a href={`/getUserDetails/${blog.ownerId}`} className="hover:underline">
                  {blog.ownerName}
                  </a>
                </p>

                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime="2020-03-16">{moment(blog.createdAt).format("Do MMM YY")} </time>
                  <span aria-hidden="true">·</span>
                  {/* <span>6 min read</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
