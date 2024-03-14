import React, { useDebugValue, useEffect, useState } from 'react';

const Blog = () => {

  const [question,setQuestion] = useState('');
  const [content,setContent] = useState('');
  const [title, setTitle] = useState('');

  const [quesSubmit, setQuesSubmit] = useState(false);
  const [blogSubmit, setBlogSubmit] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    console.log(e.target.value.trim());
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value.trim()); // Log the trimmed value of the input field
  };
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(e.target.value.trim()); // Log the trimmed value of the input field
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/postQuestion', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({question}),
      });

      console.log("Content:", question);

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }
  
      const data = await response.json();
      console.log(data)
  
      const token = data.token;
  
      console.log('Token:', token);
  
      console.log("Question response ", response);

      setQuestion('');
      setQuesSubmit(true);

      setTimeout(() => {
      setQuesSubmit(false);
    }, 5000);
    } catch (error) {
      console.log("Error in handleQuestionBlog ", error);
    }
  }
  
  const handleSubmitBlog = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/postBlog', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title,content}),
      });

      console.log("Title:", title);
      console.log("Content:", content);

  
      if (!response.ok) {
        throw new Error('Failed to submit blog');
      }
  
      const data = await response.json();
  
      const token = data.token;
  
      console.log('Token:', token);
  
      console.log("Blog response ", response);

      setTitle('');
      setContent('')
      setBlogSubmit(true);

      setTimeout(() => {
      setBlogSubmit(false);
    }, 5000);
    } catch (error) {
      console.log("Error in handleSubmitBlog ", error);
    }
  }
  

  return (
    <>
      <div className="mb-36">
        <div className='flex flex-col text-center justify-center items-center'>
          <h1 className='text-3xl py-10'>Ask a Question</h1>
          <textarea
            className='bg-transparent w-[50%] pb-12'
            value={question}
            name='question'
            id='question'
            type='text'
            placeholder='Type Your Question ...'
            onChange={handleQuestionChange}
          />
          <button onClick={handleSubmitQuestion} className='bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl'>Ask</button>
          {quesSubmit && (
            <div className="text-green-600 mt-3"><h1 className='text-3xl'>Your question has been submitted successfully!</h1></div>
          )}
        </div>

        <div className="w-full my-10">
          <div className="border-b border-gray-300 mx-auto w-[50%]"></div>
        </div>

        <div className='flex flex-col mt-10 text-center justify-center items-center'>
          <h1 className='text-3xl pb-10'>Write a Blog</h1>
          <textarea
            className='bg-transparent w-[50%] pb-0 mb-10'
            id='title'
            value={title}
            type='text'
            name='title'
            placeholder='Title'
            onChange={handleTitleChange}
          />
          <textarea
            className='bg-transparent w-[50%] pb-36'
            id='content'
            value={content}
            type='text'
            name='content'
            placeholder='Write ...'
            onChange={handleContentChange}
          />
          <button onClick={handleSubmitBlog} className='bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl relative'>Submit</button>
          {blogSubmit && (
            <div className="text-green-600 mt-3"><h1 className='text-3xl'>Your blog has been submitted successfully!</h1></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
