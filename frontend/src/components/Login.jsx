import React, { useState } from "react";



function Login() {

    const [isRegClicked, setIsRegClicked] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(true);

    const handleRegClick = () => {
    setIsRegClicked(true);
    setIsLoginClicked(false);
    };

    const handleLoginClick = () => {
    setIsLoginClicked(true);
    setIsRegClicked(false);
    };

  if(isLoginClicked){
    return (

        <div className="bg-indigo-950 h-screen w-screen">
            <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
                <h1 className="absolute mt-56 text-white ml-36 text-8xl">PICT Connect</h1>
            <div className="absolute z-10 mt-28 right-0 w-80 mr-36 h-2/3 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <h1 className="absolute text-white text-2xl ml-32 mt-8">Login</h1>
                <input className="absolute mt-40 ml-12 pt-3 pb-3 rounded pl-4 placeholder-gray-800" type="email" placeholder="Username"></input>
                <input className="absolute mt-60 ml-12 pt-3 pb-3 rounded pl-4 placeholder-gray-800" type="password" placeholder="Password"></input>
                <button onClick={handleLoginClick} className="absolute mt-80 ml-10 bg-indigo-900 pl-8 pr-8 tex-white inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Login</button>
                <button onClick={handleRegClick} className="absolute mt-80 ml-44 bg-indigo-900 pl-8 pr-8 tex-white inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Register</button>

            </div>
            </div>
        </div>
        

    );

  }

  return (
    <div className="bg-indigo-950 h-screen w-screen">
            <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
                <h1 className="absolute mt-56 text-white ml-36 text-8xl">PICT Connect</h1>
            <div className="absolute z-10 mt-20 right-0 w-80 mr-36 h-4/5 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
                <h1 className="absolute text-white text-2xl ml-32 mt-8">Register</h1>

                <input className="absolute mt-32 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Full Name"></input>
                <input className="absolute mt-48 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Registration ID"></input>
                {/* <input className="absolute mt-40 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Department"></input> */}
                <input className="absolute mt-64 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Username"></input>
                <input className="absolute mt-80 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="password" placeholder="Password"></input>
                {/* <input className="absolute mt-80 ml-12 pt-1 pb-1 rounded pl-4 placeholder-gray-800" type="email" placeholder="Confirm Password"></input> */}
                <button onClick={handleLoginClick} className="absolute mt-96 ml-10 bg-indigo-900 pl-8 pr-8 tex-white inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Login</button>               
                <button onClick={handleRegClick} className="absolute mt-96 ml-44 bg-indigo-900 pl-8 pr-8 tex-white inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Register</button>
            </div>
            </div>
        </div>
  )


}


export default Login;