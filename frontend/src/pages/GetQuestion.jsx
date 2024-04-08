// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import moment from 'moment';

// const GetQuestion = () => {
//   const { quesId } = useParams();
//   const [question, setQuestion] = useState(null);
//   const [answer, setAnswer] = useState('');
//   const [answers, setAnswers] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         const res = await fetch(`/api/q/${quesId}`);
//         const data = await res.json();
//         if (data && data.data) {
//           setQuestion(data.data);
//         } else {
//           console.error('Invalid data structure:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching question:', error);
//       }
//     };

//     fetchQuestion();
//   }, [quesId]);

//   useEffect(() => {
//     const fetchAnswers = async () => {
//       try {
//         const res = await fetch(`/api/answer/${quesId}`);
//         const data = await res.json();
//         setAnswers(data.data[0].Qanswers || []);
//       } catch (error) {
//         console.error('Error fetching answers:', error);
//       }
//     };

//     fetchAnswers();
//   }, [quesId]);

//   const handleAnswerChange = (e) => {
//     setAnswer(e.target.value);
//   };

//   const submitAnswer = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/answer/${quesId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ answer }), // Assuming your server expects an object with an answer property.
//       });

//       if (!response.ok) {
//         let errorMsg = 'Failed to submit answer';
//         try {
//           const errorData = await response.json();
//           errorMsg += `: ${errorData.message}`;
//         } catch (parseError) {
//           // Failed to parse error data, use default message
//         }
//         throw new Error(`${errorMsg} (Status: ${response.status})`);
//       }

//       const data = await response.json();
//       setSuccessMessage('Your answer has been submitted successfully!');
//       setAnswer('');

//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000); // Clear success message after 3 seconds

//     } catch (error) {
//       console.error("Error in submitAnswer:", error.message);
//     }
//   };
 
//   return (
//     <div>
//       <div className="container mx-auto px-4 flex justify-center mt-10 mb-4 w-full">
//         {question !== null ? (
//           <div className="bg-white dark:bg-[#282929] rounded-lg shadow-lg p-6  border  border-[#404040] w-[120%]">
//             <div className="flex items-center mb-4">
//               <img src={question.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
//               <div>
//                 <h1 className="text-2xl font-bold mb-1">{question.question}</h1>
//                 <p className="text-gray-700">Asked by: {question.nameOfOwner}</p>
//                 <p className="text-gray-700">Asked on: {moment(question.createdAt).format('ll')}</p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <textarea value={answer} onChange={handleAnswerChange} className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500" placeholder="Type your answer here..."></textarea>
//               <button onClick={submitAnswer} className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">Answer</button>
//               {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//             </div>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>

//       <div className="answers mb-36 bg-white dark:bg-[#282828] border  border-[#404040] rounded-lg shadow-lg p-4 mx-10">
//         <h2 className="text-xl font-semibold  mb-4">Answers:</h2>
//         {answers.length === 0 ? (
//           <p>No answers yet. Be the first one to answer!</p>
//         ) : (
//           <div className="space-y-4">
//             {answers.map((answer, index) => (
//               <div key={index} className="answer bg-white dark:bg-[#282828] rounded-lg shadow-slate-lg p-4 border  border-[#373737]">
//                 <div className="flex items-center mb-4">
//                   <img src={answer.userDetails[0].profilePicture} alt="User avatar" className="w-10 h-10 rounded-full mr-3"/>
//                   <div>
//                     <p className="font-semibold e">{answer.userDetails[0].name}</p>
//                     <p className="text-xs text-gray-400">Answered on {moment(answer.createdAt).format('ll')}</p>
//                   </div>
//                 </div>
//                 <p className="">{answer.answer}</p>
//                 <div class="flex gap-2 mt-4">
//                   <button class="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
//                     <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//                       <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
//                     </svg>
//                     <span>342</span>
//                   </button>
//                   <button class="py-1.5 px-3 hover:text-red-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
//                     <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//                       <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
//                     </svg>
//                     <span>12</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



// export default GetQuestion;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const GetQuestion = () => {
  const { quesId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [likedAnswers, setLikedAnswers] = useState({});

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`/api/q/${quesId}`);
        const data = await res.json();
        if (data && data.data) {
          setQuestion(data.data);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [quesId]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await fetch(`/api/answer/${quesId}`);
        const data = await res.json();
        setAnswers(data.data[0].Qanswers || []);
        // Initialize liked status for each answer
        const initialLikedStatus = {};
        data.data[0].Qanswers.forEach(answer => {
          initialLikedStatus[answer._id] = false;
        });
        setLikedAnswers(initialLikedStatus);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [quesId]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const submitAnswer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/answer/${quesId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });

      if (!response.ok) {
        let errorMsg = 'Failed to submit answer';
        try {
          const errorData = await response.json();
          errorMsg += `: ${errorData.message}`;
        } catch (parseError) {
          // Failed to parse error data, use default message
        }
        throw new Error(`${errorMsg} (Status: ${response.status})`);
      }

      const data = await response.json();
      setSuccessMessage('Your answer has been submitted successfully!');
      setAnswer('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds

    } catch (error) {
      console.error("Error in submitAnswer:", error.message);
    }
  };

  const handleLikeAnswer = async (answerId) => {
    try {
      console.log("inside like")
      const isLiked = likedAnswers[answerId];
      const newLikedAnswers = { ...likedAnswers, [answerId]: !isLiked };
      setLikedAnswers(newLikedAnswers);
      
      console.log("before fetching before res")
      const res = await fetch(`/api/likeAnswer/${answerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLiked: !isLiked }),
      });
      
      console.log("after fetching before res")
      if (!res.ok) {
        throw new Error('Failed to toggle like status for answer');
      }
      console.log("after fetching after res")
  
      // Handle response accordingly, if needed
    } catch (error) {
      console.error('Error toggling like status for answer:', error);
    }
  };
  

  return (
    <div>
      <div className="container mx-auto px-4 flex justify-center mt-10 mb-4 w-full">
        {question !== null ? (
          <div className="bg-white dark:bg-[#282929] rounded-lg shadow-lg p-6  border  border-[#404040] w-[120%]">
            <div className="flex items-center mb-4">
              <img src={question.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <h1 className="text-2xl font-bold mb-1">{question.question}</h1>
                <p className="text-gray-700">Asked by: {question.nameOfOwner}</p>
                <p className="text-gray-700">Asked on: {moment(question.createdAt).format('ll')}</p>
              </div>
            </div>
            <div className="mt-4">
              <textarea value={answer} onChange={handleAnswerChange} className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500" placeholder="Type your answer here..."></textarea>
              <button onClick={submitAnswer} className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">Answer</button>
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="answers mb-36 bg-white dark:bg-[#282828] border  border-[#404040] rounded-lg shadow-lg p-4 mx-10">
        <h2 className="text-xl font-semibold  mb-4">Answers:</h2>
        {answers.length === 0 ? (
          <p>No answers yet. Be the first one to answer!</p>
        ) : (
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div key={index} className="answer bg-white dark:bg-[#282828] rounded-lg shadow-slate-lg p-4 border  border-[#373737]">
                <div className="flex items-center mb-4">
                  <img src={answer.userDetails[0].profilePicture} alt="User avatar" className="w-10 h-10 rounded-full mr-3"/>
                  <div>
                    <p className="font-semibold e">{answer.userDetails[0].name}</p>
                    <p className="text-xs text-gray-400">Answered on {moment(answer.createdAt).format('ll')}</p>
                  </div>
                </div>
                <p className="">{answer.answer}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleLikeAnswer(answer._id)} className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
                    {likedAnswers[answer._id] ? (
                      <svg className="w-4 h-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                      </svg>
                    )}
                    <span>{likedAnswers[answer._id] ? 'Liked' : 'Like'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuestion;

