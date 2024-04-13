// import React, { useDebugValue, useEffect, useState , useRef } from "react";
// import {Alert , Spinner} from "flowbite-react";

// const Blog = () => {
//   const [question, setQuestion] = useState("");
//   const [content, setContent] = useState("");
//   const [title, setTitle] = useState("");
//   const [file , setFile] = useState({});
//   const [quesSubmit, setQuesSubmit] = useState(false);
//   const [blogSubmit, setBlogSubmit] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAnonymous, setIsAnonymous] = useState(false);

//   const handleQuestionChange = (e) => {
//     setQuestion(e.target.value);
//     console.log(e.target.value.trim());
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//     console.log(e.target.value.trim()); // Log the trimmed value of the input field
//   };

//   const handleContentChange = (e) => {
//     setContent(e.target.value);
//     console.log(e.target.value.trim()); // Log the trimmed value of the input field
//   };

//   const handleSubmitQuestion = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/postQuestion", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ question,isAnonymous }),
//       });

//       console.log("Content:", question);

//       const data = await response.json();
//       console.log('data',data);
//       if(!response.ok){
//         console.log('err' ,data);
//         setErrorMessage(data.message);
//         setIsLoading(false);
//         window.scrollTo(0, document.body.scrollHeight);
//       }
//       else{
//         setQuestion("");
//         setQuesSubmit(true);
//       }

//       const token = data.token;

//       console.log("Token:", token);

//       console.log("Question response ", response);



//       setTimeout(() => {
//         setQuesSubmit(false);
//       }, 5000);
//     } catch (error) {
//       console.log("Error in handleQuestionBlog ", error);
//     }
//   };

//   const handleSubmitBlog = async (e) => {

//     e.preventDefault();
//     if (!title || !content) {
//       setErrorMessage("Please fill out all fields.");
//       return;
//     }
//     setIsLoading(true);
//     console.log("Title:", title);
//     console.log("Content:", content);
//     console.log("File:", file);
  
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("blogPicture", file);
  
//     console.log("FormData:", formData); // Verify FormData contents
  
//     try {
//       const response = await fetch("/api/postBlog", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       if(!response.ok){
//         console.log('err' ,data);
//         setErrorMessage(data.message);
//         setIsLoading(false);
//       }
//       else{
//         setIsLoading(false);
//         setBlogSubmit(true);
//       }
  
//       // Handle response...
//     } catch (error) {
//       console.log("Error in handleSubmitBlog", error);
//     }

//   };
  
//   const [isDragOver, setIsDragOver] = useState(false);
//   const [previewSrc, setPreviewSrc] = useState('');

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const selectedFile = e.dataTransfer.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       displayPreview(selectedFile);
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       displayPreview(selectedFile);
//     }
//   };

//   const displayPreview = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setPreviewSrc(reader.result);
//     };
//   };

//   return (
//     <>
//       <div className="mb-36">
//         <div className="flex flex-col text-center justify-center items-center">
//           <h1 className="text-3xl py-10">Ask a Question</h1>
//           <textarea
//             className="bg-transparent w-[50%] pb-12"
//             value={question}
//             name="question"
//             id="question"
//             type="text"
//             placeholder="Type Your Question ..."
//             onChange={handleQuestionChange}
//           />
//           <div className="flex items-center gap-2 mt-4">
//             <input
//               type="checkbox"
//               id="anonymous"
//               checked={isAnonymous}
//               onChange={(e) => setIsAnonymous(e.target.checked)}
//             />
//             <label htmlFor="anonymous" className="text-md text-gray-700">
//               Do you want to ask this question anonymously?
//             </label>
//           </div>
//           <button
//             onClick={handleSubmitQuestion}
//             className="bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl"
//           >
//             Ask
//           </button>
//           {quesSubmit && (
//             <div className="text-green-600 mt-3">
//               <h1 className="text-3xl">
//                 Your question has been submitted successfully!
//               </h1>
//             </div>
//           )}
//         </div>

//         <div className="w-full my-10">
//           <div className="border-b border-gray-300 mx-auto w-[50%]"></div>
//         </div>
//           <form onSubmit={handleSubmitBlog} encType="multipart/form-data">
//         <div className="flex flex-col mt-10 text-center justify-center items-center">
//           <h1 className="text-3xl pb-10">Write a Blog</h1>
//           <div
//       className={`w-fit h-fit md:w-[600px] md:h-[200px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 my-10 ${
//         isDragOver ? 'border-indigo-600' : ''
//       }`}
//       id="dropzone"
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//     >
//       <input
//         type="file"
//         className="absolute inset-0 w-full h-full opacity-0 z-50"
//         onChange={handleFileChange}
//         id="file-upload"
//         name="file-upload"
//       />
//       <div className="text-center">
//         <img
//           className="mx-auto h-12 w-12"
//           src="https://www.svgrepo.com/show/357902/image-upload.svg"
//           alt=""
//         />
//         <h3 className="mt-2 text-sm font-medium ">
//           <label htmlFor="file-upload" className="relative cursor-pointer">
//             <span>Drag and drop</span>
//             <span className="text-indigo-400"> or browse</span>
//             <span> to upload</span>
//           </label>
//         </h3>
//         <p className="mt-1 text-xs ">PNG, JPG, GIF up to 10MB</p>
//       </div>
//     </div>
//     {previewSrc && (
//   <img src={previewSrc} className=" mx-auto max-h-[800px] max-w-[800px] mt-10 p-4" id="preview" alt="Preview" />
// )}
//           <textarea
//             className="bg-transparent w-[50%] pb-0 mb-10"
//             id="title"
//             value={title}
//             type="text"
//             name="title"
//             placeholder="Title"
//             onChange={handleTitleChange}
//           />
//           <textarea
//             className="bg-transparent w-[50%] pb-36"
//             id="content"
//             value={content}
//             type="text"
//             name="content"
//             placeholder="Write ..."
//             onChange={handleContentChange}
//           />
//           <button
//             onClick={handleSubmitBlog}
//             className="bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl relative"
//           >
//                           {isLoading ? (
//                 <>
//                   <Spinner size="sm" />
//                   <span className="pl-3">Loading...</span>
//                 </>
//               ) : (
//                 "Submit"
//               )}
//           </button>
//           {errorMessage && (
//             <Alert className="mt-5 mx-auto" color="failure">
//               {errorMessage}
//             </Alert>
//           )}
//           {blogSubmit && (
//             <div className="text-green-600 mt-3" >
//               <h1 className="text-3xl">
//                 Your blog has been submitted successfully!
//               </h1>
//             </div>
//           )}
//         </div>

//         </form>
//       </div>
//     </>
//   );
// };

// export default Blog;

import React, { useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import "./blog.css"; // Import CSS file for custom styling

const Blog = () => {
  const [questionVisible, setQuestionVisible] = useState(true);
  const [blogVisible, setBlogVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({});
  const [quesSubmit, setQuesSubmit] = useState(false);
  const [blogSubmit, setBlogSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/postQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, isAnonymous }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message);
        setIsLoading(false);
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        setQuestion("");
        setQuesSubmit(true);
      }

      setTimeout(() => {
        setQuesSubmit(false);
      }, 5000);
    } catch (error) {
      console.log("Error in handleQuestionBlog ", error);
    }
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("blogPicture", file);

    try {
      const response = await fetch("/api/postBlog", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setBlogSubmit(true);
      }
    } catch (error) {
      console.log("Error in handleSubmitBlog", error);
    }
  };

  const [isDragOver, setIsDragOver] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      displayPreview(selectedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      displayPreview(selectedFile);
    }
  };

  const displayPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader.result);
    };
  };

  return (
    <div className="mb-36">
      <div className="flex flex-row justify-center">
        <button
          className={` cursor-pointer mt-[50px] mb-0 mx-2.5 px-[35px] py-2.5 rounded-[25px] border-[none] ${questionVisible ? 'bg-[#4caf50] text-white' : ''}`}
          onClick={() => {
            setQuestionVisible(true);
            setBlogVisible(false);
          }}
        >
          Ask a Question
        </button>
        <button
          className={`cursor-pointer mt-[50px] mb-0 mx-2.5 px-[35px] py-2.5 rounded-[25px] border-[none] ${blogVisible ? 'bg-[#4caf50] text-white' : ''}`}
          onClick={() => {
            setQuestionVisible(false);
            setBlogVisible(true);
          }}
        >
          Write a Blog
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-2/3">
          {questionVisible && (
            <div className="text-center mt-10">
              <h1 className="text-3xl py-10">Ask a Question</h1>
              <textarea
                className="bg-transparent w-full pb-12 rounded-lg"
                value={question}
                name="question"
                id="question"
                type="text"
                placeholder="Type Your Question ..."
                onChange={handleQuestionChange}
              />
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonymous" className="text-md text-gray-700">
                  Do you want to ask this question anonymously?
                </label>
              </div>
              <button
                onClick={handleSubmitQuestion}
                className="bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl"
              >
                Ask
              </button>
              {quesSubmit && (
                <div className="text-green-600 mt-3">
                  <h1 className="text-3xl">
                    Your question has been submitted successfully!
                  </h1>
                </div>
              )}
            </div>
          )}

          {blogVisible && (
            <div className="text-center mt-10 flex flex-col items-center ">
              <h1 className="text-3xl pb-10">Write a Blog</h1>
              <div className={`w-fit h-fit md:w-[600px] md:h-[200px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 my-10 ${isDragOver ? 'border-indigo-600' : ''}`}
                id="dropzone"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 z-50"
                  onChange={handleFileChange}
                  id="file-upload"
                  name="file-upload"
                />
                <div className="text-center">
                  <img
                    className="mx-auto h-12 w-12"
                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                    alt=""
                  />
                  <h3 className="mt-2 text-sm font-medium ">
                    <label htmlFor="file-upload" className="relative cursor-pointer">
                      <span>Drag and drop</span>
                      <span className="text-indigo-400"> or browse</span>
                      <span> to upload</span>
                    </label>
                  </h3>
                  <p className="mt-1 text-xs ">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {previewSrc && (
                <img src={previewSrc} className=" mx-auto max-h-[800px] max-w-[800px] mt-10 p-4 justify-center" id="preview" alt="Preview" />
              )}
              <textarea
                className="bg-transparent w-full pb-0 mb-10 rounded-lg"
                id="title"
                value={title}
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleTitleChange}
              />
              <textarea
                className="bg-transparent w-full pb-36 rounded-lg"
                id="content"
                value={content}
                type="text"
                name="content"
                placeholder="Write ..."
                onChange={handleContentChange}
              />
              <button
                onClick={handleSubmitBlog}
                className="bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl relative"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              {errorMessage && (
                <Alert className="mt-5 mx-auto" color="failure">
                  {errorMessage}
                </Alert>
              )}
              {blogSubmit && (
                <div className="text-green-600 mt-3" >
                  <h1 className="text-3xl">
                    Your blog has been submitted successfully!
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;



