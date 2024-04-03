// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import moment from "moment";

// const GetQuestion = () => {
//   const { quesId } = useParams();
//   const [question, setQuestion] = useState(null);
  
//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         const res = await fetch(`/api/q/${quesId}`);
//         const data = await res.json();
//         console.log('Fetched Question :', data); // Log the fetched data
//         if (data && data.data) { // Ensure data and data.data are not null/undefined
//           setQuestion(data.data); // Set the state directly
//         } else {
//           console.error('Invalid data structure:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching question:', error);
//       }
//     };

//     fetchQuestion();
//   }, [quesId]); // Add quesId as a dependency

//   console.log('Ques state:', question); // Log the question state

//   const [answer, setAnswer] = useState('');

//   const handleAnswerChange = (e) =>{
//     setAnswer(e.target.value)
//   }

//   console.log(answer)


//   }

//   const submitAnswer = async (e) =>{
//     e.preventDefault();

//     try {
//       console.log("Inside try block of submit answer")
//       const response = await fetch(`api/answer/${quesId}`, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           // "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify(answer),
//     });

//     console.log("Content:", answer);

//     if (!response.ok) {
//       throw new Error('Failed to submit answer');
//     }      

//     console.log("Answer response ", response);


//     const data = await response.json();
//     console.log(data)

//     const token = data.token;

//     console.log('Token:', token);

//     console.log("Submit answer response ", response);

//   //   setQuestion('');
//     // setEventSubmit(true);

//   //   setTimeout(() => {
//   //   setEventSubmit(false);
//   // }, 5000);
//     } catch (error) {
//       console.log("Error in submitAnswer ", error);
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 flex justify-center mt-10 mb-56">
//       {question !== null ? (
//         <div className="bg-gray-950 rounded-lg shadow-lg p-6 max-w-md">
//           <div className="flex items-center mb-4">
//             <img src={question.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
//             <div>
//               <h1 className="text-2xl font-bold mb-1">{question.question}</h1>
//               <p className="text-gray-700">Asked by: {question.nameOfOwner}</p>
//               <p className="text-gray-700">Asked on: {moment(question.createdAt).format("ll")}</p>
//             </div>
//           </div>
//           <div className="mt-4">
//             <textarea onChange={handleAnswerChange} className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500" placeholder="Type your answer here..."></textarea>
//             <button onClick={submitAnswer} className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">Answer</button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
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
        if (data && data.data) {
          setAnswers(data.data);
          console.log("Answers ",answers)
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [quesId]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
    <div className="container mx-auto px-4 flex justify-center mt-10 mb-36">
      {question !== null ? (
        <div className="bg-gray-950 rounded-lg shadow-lg p-6 max-w-md">
          {/* Question and User Info */}
          <div className="flex items-center mb-4">
            <img src={question.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
            <div>
              <h1 className="text-2xl font-bold mb-1">{question.question}</h1>
              <p className="text-gray-700">Asked by: {question.nameOfOwner}</p>
              <p className="text-gray-700">Asked on: {moment(question.createdAt).format('ll')}</p>
            </div>
          </div>
          {/* Answer Submission Form */}
          <div className="mt-4">
            <textarea value={answer} onChange={handleAnswerChange} className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500" placeholder="Type your answer here..."></textarea>
            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600">Answer</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>

    <h1>Answers to this question</h1>

    </div>
  );
};

export default GetQuestion;
