// import React from 'react';
// import moment from "moment";
// import {Link} from "react-router-dom";
// const Post = ({ blogs }) => {
//   return (
      
//     <div className="grid grid-cols-1 gap-8 mt-10 ">
//       {console.log("blogs",blogs)}
//       {blogs.map((blog) => (
//         <div className={`flex max-lg:flex-col bg-white dark:bg-[#282929] cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300`}>
//           <img
//             src="https://readymadeui.com/Imagination.webp"
//             alt="Blog Post 1"
//             className="lg:w-2/5 min-h-[250px] h-full object-cover"
//           />
//           <div className="p-6 lg:w-3/5">
//             <h3 className="text-xl font-bold text-[#333] dark:text-gray-300">
//               {blog.title}
//             </h3>
//             <span className="text-sm block text-gray-400 dark:text-gray-400 mt-2 font-bold">
//               {moment(blog.createdAt).format("Do MMM YY")} | {blog.nameOfOwner}
//             </span>
//             <p className="text-sm mt-4 text-gray-700 dark:text-gray-200">
//             {blog.content.length > 150 ? blog.content.substring(0, 150) + ' ...' : blog.content}
//             </p>
//             <Link
//               to = {`/getBlogs/${blog._id}`}
//               className="mt-4 inline-block text-blue-600 text-sm hover:underline"
//             >
//               Read More
//             </Link>
//           </div>
//         </div>
//       ))}
//       </div>
     
//   );
// };

// export default Post;





// post.jsx

import React from 'react';
import moment from "moment";
import { Link } from "react-router-dom";

const Post = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 gap-8 mt-10">
      {blogs.map((blog) => (
        <div key={blog._id} className="flex max-lg:flex-col bg-white dark:bg-[#282929] cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300">
          <img
            src="https://readymadeui.com/Imagination.webp"
            alt="Blog Post"
            className="lg:w-2/5 min-h-[250px] h-full object-cover"
          />
          <div className="p-6 lg:w-3/5">
            <h3 className="text-xl font-bold text-[#333] dark:text-gray-300">
              {blog.title}
            </h3>
            <span className="text-sm block text-gray-400 dark:text-gray-400 mt-2 font-bold">
              {moment(blog.createdAt).format("Do MMM YY")} | {blog.nameOfOwner}
            </span>
            <p className="text-sm mt-4 text-gray-700 dark:text-gray-200">
              {blog.content.length > 150 ? blog.content.substring(0, 150) + ' ...' : blog.content}
            </p>
            <Link
              to={`/getBlogs/${blog._id}`}
              className="mt-4 inline-block text-blue-600 text-sm hover:underline"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
