import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ShowQuestions = () => {
    const [data, setData] = useState([]);
    const [clickedIndexes, setClickedIndexes] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await fetch(`api/showQuestions`);
                const data = await res.json();
                console.log("Fetched questions successfully ", data);
                console.log("Fetched Questions ", data.data);
                setData(data.data);
            } catch (error) {
                console.log("Error in getting questions ", error);
            }
        };

        getQuestions();
    }, []);

    const handleAnswerClick = (index) => {
        
    };

    return (
        <div className="p-5">
            {data.map((item, index) => (
                <div className="bg-gray-800 text-white p-5 mb-5 rounded shadow-lg" key={index}>
                    <h1 className="font-bold text-xl mb-2">{item.question}</h1>
                    <p className="mb-4">Asked by: {item.nameOfOwner}</p>
                    {/* {clickedIndexes.includes(index) ? (
                        <div>
                        <textarea
                            className="bg-gray-700 text-white w-full h-24 p-2 mt-2 rounded"
                            placeholder="Your answer..."
                        ></textarea>
                        <button
                            className="mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out"
                            >
                            Submit
                        </button>
                        </div>
                    ) : ( */}
                        {/* <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleAnswerClick(index)}
                        >
                            Answer this Question
                        </button> */}
                        <Link
                            to={`/getQuestion/${item._id}`}
                            className="mt-4 inline-block text-blue-600 text-sm hover:underline"
                            >
                            Read More
                        </Link>
                    
                </div>
            ))}
        </div>
    );
};

export default ShowQuestions;
