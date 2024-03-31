import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from "moment";
import {  useSelector , useDispatch } from 'react-redux';
const GetBlogs = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const {currentUser} = useSelector(state => state.user)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/b/${blogId}`);
        const data = await res.json();
        console.log('Fetched blog:', data); // Log the fetched data
        setBlog(data); // Set the state directly
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]); // Add blogId as a dependency

  console.log('Blog state:', blog); // Log the blog state

  return (
    <div>
      {blog ? (
        <>
<main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
  <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                  <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img src={currentUser.data.user.profilePicture} alt="" className="mr-4 w-16 h-16 rounded-full" />
                      <div>
                          <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{blog.data.nameOfOwner}</a>
                          <p class="text-base text-gray-500 dark:text-gray-400">SE IT</p>
                          <p class="text-base text-gray-500 dark:text-gray-400">{moment(blog.createdAt).format("ll")}</p>
                      </div>
                  </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog.data.title}</h1>
          </header>
          <p class="lead">{blog.data.content}</p>
      

      </article>
  </div>
</main>

<aside aria-label="Related articles" class="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800">
  <div class="px-4 mx-auto max-w-screen-xl">
      <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <article class="max-w-xs">
              <a href="#">
                  <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" class="mb-5 rounded-lg" alt="Image 1"></img>
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <a href="#">Our first office</a>
              </h2>
              <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                  Read in 2 minutes
              </a>
          </article>
      </div>
  </div>
</aside>
</>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetBlogs;
