import React from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-8 " >
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex flex-col overflow-hidden rounded-lg shadow-lg min-h-[60vh] max-h-fit border border-[#404040]"
        >
          <div className="flex-shrink-0">
            <img
              onClick={() => navigate(`/getBlogs/${blog._id}`)}
              className="h-80 w-full object-cover"
              src={blog.blogPicture || 'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'}
              alt='pic'
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6 dark:bg-[#282929]" onClick={() => navigate(`/getBlogs/${blog._id}`)}>
            <div className="flex-1">
              <a href="#" className="mt-2 block">
                <p className="text-xl font-semibold">
                {blog.title}
                </p>
                <p className="mt-3 text-base">
                {blog.content.length > 150 ? blog.content.substring(0, 150) + ' ...' : blog.content}
                </p>
              </a>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <a href="#">
                  <span className="sr-only">Roel Aufderehar</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={blog.profilePicture ||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                    alt=""
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-100">
                  <a href="#" className="hover:underline">
                  {blog.ownerName}
                  </a>
                </p>
                <div className="flex space-x-1 text-sm text-gray-400">
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
