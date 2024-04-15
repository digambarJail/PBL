import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './getUserDetails.css';

const GetUserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [userBlogs, setUserBlogs] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const url = `/api/user/${userId}`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch");
                }
                setUser(data.data[0]);
                setUserBlogs(data.data[0].userBlogs);
                setUserAnswers(data.data[0].userAnswers)
            } catch (err) {
                console.error("Error fetching user details:", err);
            }
        };

        getDetails();
    }, [userId]);

    if (!user) {
        return <div className="text-center font-semibold text-xl text-gray-300">Loading...</div>;
    }

    return (
        <div className="mx-auto rounded-lg overflow-hidden md:max-w-3xl shadow-lg my-10 p-5 bg-white dark:bg-[#282929]">
            <div className="md:flex">
                <div className="w-full">
                    {console.log(user)}
                    <div className="flex justify-center">
                        <img src={user.profilePicture || 'default-profile.jpg'} alt={`${user.name}'s profile`} className="rounded-full border-2 border-purple-500 h-32 w-32 object-cover" />
                    </div>
                    <h2 className="text-center text-3xl font-semibold text-white mt-4">{user.name}</h2>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-purple-400 mb-2">User Blogs:</h3>
                        {userBlogs.length > 0 ? (
                            userBlogs.map((blog, index) => (
                                <div key={index} className="blog-card">
                                    <Link to={`/getBlogs/${blog._id}`} className="blog-title">{blog.title}
                                    <p className="blog-content">
                                        {blog.content.length > 200 ? `${blog.content.substring(0, 200)}...` : blog.content}
                                        {blog.content.length > 200 && (
                                            <button className="read-more-button">Read More</button>
                                        )}
                                    </p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No blogs found for this user.</p>
                        )}

{userAnswers.length > 0 ? (
                            userAnswers.map((answer, index) => (
                                <div key={index} className="blog-card">
                                    <Link to={`/getBlogs/${blog._id}`} className="blog-title">{blog.title}
                                    <p className="blog-content">
                                        {blog.content.length > 200 ? `${blog.content.substring(0, 200)}...` : blog.content}
                                        {blog.content.length > 200 && (
                                            <button className="read-more-button">Read More</button>
                                        )}
                                    </p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No blogs found for this user.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetUserDetails;
