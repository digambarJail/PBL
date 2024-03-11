import React from 'react';

const Blog = () => {
  return (
    <>
      <div className="mb-36">
        <div className='flex flex-col text-center justify-center items-center'>
          <h1 className='text-3xl py-10'>Ask a Question</h1>
          <textarea
            className='bg-transparent w-[50%] pb-12'
            type='text'
            placeholder='Type Your Question ...'
          />
          <button className='bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl'>Ask</button>
        </div>

        <div className="w-full my-10">
          <div className="border-b border-gray-300 mx-auto w-[50%]"></div>
        </div>

        <div className='flex flex-col mt-10 text-center justify-center items-center'>
          <h1 className='text-3xl pb-10'>Write a Blog</h1>
          <textarea
            className='bg-transparent w-[50%] pb-36'
            type='text'
            placeholder='Write ...'
          />
          <button className='bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl relative'>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Blog;
