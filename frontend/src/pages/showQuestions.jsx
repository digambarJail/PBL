import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowQuestions = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await fetch(`api/showQuestions`);
                const data = await res.json();
                setData(data.data);
            } catch (error) {
                console.log("Error in getting questions ", error);
            }
        };

        getQuestions();
    }, []);

    return (
        <div className="container mx-auto py-8">
            {data.map((item, index) => (
                <div className="bg-gray-800 text-white p-6 rounded-lg mb-8 flex items-center" key={index}>
                    <div className="flex-shrink-0 mr-4">
                        {item.profilePicture && (
                            <img src={item.profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold mb-2">{item.question}</h1>
                        <p className="text-gray-400 mb-2">Asked by: {item.nameOfOwner}</p>
                        <Link
                            to={`/getQuestion/${item._id}`}
                            className="text-blue-500 hover:underline text-sm"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowQuestions;
