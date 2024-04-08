import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const GetUserDetails = () =>{

    const { userId } = useParams();
    const [user, setUser] = useState([]);
    const [userBlogs, setUserBlogs] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
          try {
            // console.log("Inside get user details")
            let url = `/api/user/${userId}`;
            const res = await fetch(url);
            const data = await res.json();

            
            if (!res.ok) {
              console.log(data.message);
            }
            setUser(data.data[0]);
            setUserBlogs(data.data[0].userBlogs)
            console.log("Blogs ",userBlogs)
            console.log("User: ",user)
          } catch (err) {
            console.log(err);
          }
        };
    
        getDetails();
      }, []);

      if (!user) {
        return <div className="text-center font-semibold text-xl text-gray-300">Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl shadow-lg my-10 p-5 bg-gray-800">
            <div className="md:flex">
                <div className="w-full">
                    <div className="flex justify-center">
                        <img src={user.profilePicture} alt={`${user.name}'s profile`} className="rounded-full border-2 border-purple-500 h-32 w-32 object-cover" />
                    </div>
                    <h2 className="text-center text-3xl font-semibold text-white mt-4">{user.name}</h2>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-purple-400 mb-2">User Blogs:</h3>
                        {userBlogs.length > 0 ? (
                            userBlogs.map((blog, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
                                    <h4 className="text-lg font-semibold text-white">{blog.title}</h4>
                                    <p className="text-gray-300">{blog.content}</p>
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