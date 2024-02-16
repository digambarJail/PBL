import React, { useState } from "react";

function Login() {
  // State to manage whether the user is in login mode or registration mode
  // true for login, false for register
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Handlers to switch modes
  const handleLoginClick = () => setIsLoginMode(true);
  const handleRegClick = () => setIsLoginMode(false);

  return (

    <div className="bg-indigo-950 flex h-screen relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
        <h1 className="absolute mt-56 text-white ml-36 text-8xl">PICT Connect</h1>
        {/* <div className="absolute z-10 mt-20 right-0 w-80 mr-36 h-4/5 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
          <h1 className="absolute text-white text-2xl ml-32 mt-8">{isLoginMode ? "Login" : "Register"}</h1> */}

          {isLoginMode ? (
            // Login form
            <>
                <div className="absolute mt-36 right-0 w-80 mr-36 h-2/3 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <h1 className="absolute text-white text-2xl ml-32 mt-8">{isLoginMode ? "Login" : "Register"}</h1>
                <input className="absolute mt-32 ml-12 pt-3 pb-3 rounded pl-4 placeholder-gray-800" type="email" placeholder="Username" />
                <input className="absolute mt-52 ml-12 pt-3 pb-3 rounded pl-4 placeholder-gray-800" type="password" placeholder="Password" />
                <button onClick={handleLoginClick} className="absolute mt-80 ml-10 bg-indigo-900 text-white px-6 pb-2 pt-2.5 rounded">Login</button>
                <button onClick={handleRegClick} className="absolute mt-80 ml-44 bg-indigo-900 text-white px-6 pb-2 pt-2.5 rounded">Register</button>
                </div>
               
            </>
          ) : (
            // Register form
            <>
                <div className="absolute z-10 mt-20 right-0 w-80 mr-36 h-4/5 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <h1 className="absolute text-white text-2xl ml-32 mt-8">{isLoginMode ? "Login" : "Register"}</h1>
                <input className="absolute mt-32 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Full Name" />
                <input className="absolute mt-48 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Registration ID" />
                <input className="absolute mt-64 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Username" />
                <input className="absolute mt-80 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="password" placeholder="Password" />
                <button onClick={handleLoginClick} className="absolute mt-96 ml-10 bg-indigo-900 text-white px-6 pb-2 pt-2.5 rounded">Login</button>
                <button onClick={handleRegClick} className="absolute mt-96 ml-44 bg-indigo-900 text-white px-6 pb-2 pt-2.5 rounded">Register</button>
                </div>
                
            </>
          )}

        </div>
      </div>
  );
}

export default Login;