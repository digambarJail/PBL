import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GetBlogs = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

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
        <div className='text-center'>
          <h1 className='mt-5 text-4xl bold'>{blog.data.title}</h1>
          <div className='mt-12 mb-6 ml-10 mr-10 border-2 p-3'>
          <p className=' text-xl tracking-normal'>{blog.data.content}</p>
          </div>

          <h1 className='text-2xl mb-36 ml-96'> - By {blog.data.nameOfOwner}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetBlogs;
