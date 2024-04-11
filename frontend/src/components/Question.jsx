import React from 'react';
import { Link } from 'react-router-dom';

export const Question = ({ data }) => {
    return (
        <div className="container mx-auto py-8">
            {data.map((item, index) => (
                <div className="dark:bg-gray-800 bg-slate-200 border border-[#404040] p-6 rounded-lg mb-8 flex items-center" key={index}>
                    {!item.isAnonymous && item.profilePicture && (
                        <div className="flex-shrink-0 mr-4">
                            <img src={item.profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-xl font-semibold mb-2">{item.question}</h1>
                        {!item.isAnonymous ? (
                            <p className="text-gray-400 mb-2">Asked by: {item.nameOfOwner}</p>
                        ) : (
                            <p className="text-gray-400 mb-2">Asked by: Anonymous</p>
                        )}
                        <Link
                            to={`/getQuestion/${item._id}`}
                            className="text-blue-500 hover:bg-blue-200 text-sm inline-block border border-blue-500 rounded-full px-4 py-2 transition duration-300 ease-in-out">
                            Answer
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};
