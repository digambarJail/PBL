import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const GetQuestion = () => {
  const { quesId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

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
        console.log(data)
        // console.log(data.data[0].answers)
        setAnswers(data.data[0].answers)
        // console.log(answers)
        // if (data && data.data && data.data[0].questionAnswers) {
        //   setAnswers(data.data[0].questionAnswers); // Store just the questionAnswers array
        //   // console.log(answers)
        // } else {
        //   console.error('Invalid data structure:', data);
        // }
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
        body: JSON.stringify({ answer }), // Assuming your server expects an object with an answer property.
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
      console.log("Success:", data);

      // Show success message and clear form
      setSuccessMessage('Your answer has been submitted successfully!');
      setAnswer('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds

    } catch (error) {
      console.error("Error in submitAnswer:", error.message);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 flex justify-center mt-10 mb-36">
        {question !== null ? (
          <div className="bg-gray-950 rounded-lg shadow-lg p-6 max-w-md">
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

      <div className="answers mt-8 bg-gray-950 rounded-lg shadow-lg p-4">
  <h2 className="text-xl font-semibold text-white mb-4">Answers:</h2>
  <div className="space-y-4">
    {answers.map((answer, index) => (
      <div key={index} className="answer bg-gray-800 rounded-lg shadow-lg p-4">
        {/* If you have user information, display it here. For example: */}
        <div className="flex items-center mb-4">
          <img src={answer.profilePicture} alt="User avatar" className="w-10 h-10 rounded-full mr-3"/>
          <div>
            <p className="font-semibold text-white">{answer.userName}</p>
            <p className="text-xs text-gray-400">Answered on {moment(answer.createdAt).format('ll')}</p>
          </div>
        </div>

        {/* Display answer content here */}
        <p className="text-gray-300">{answer.answer}</p>
        
        {/* Optionally, if you have like/dislike or any interaction, add them here */}
        <div className="flex items-center justify-end mt-4">
          <button className="text-green-500 hover:text-green-600">
            <i className="fas fa-thumbs-up"></i> Like
          </button>
          <button className="text-red-500 hover:text-red-600 ml-4">
            <i className="fas fa-thumbs-down"></i> Dislike
          </button>
        </div>
      </div>
    ))}
  </div>
</div>



    </div>
  );
};

export default GetQuestion;
