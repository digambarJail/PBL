import { Alert, Button, Label, Spinner, TextInput ,FileInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !file) {
      return setErrorMessage('Please fill out all fields and select a file.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('profilePicture', file);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('year', formData.year);

      const res = await fetch('/api/register', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await res.json();

      if (data.status != 200 ) {
        console.log(data);
        setErrorMessage(data.error);
        setLoading(false);
      }
      if(res.ok) {
        setErrorMessage(null);
        setLoading(false);
        navigate('/login');
      }


    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-40">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 rounded-lg text-white">
              PICT
            </span>{" "}
            CONNECT
          </Link>
          <p className="text-sm mt-5">
            {/* This is a demo project. You can sign up with your email and password
            or with Google. */}
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} enctype="multipart/form-data">
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <div>
                <Label htmlFor="file-upload-helper-text" value="Upload Profile Picture" />
              </div>
              <FileInput
                id="file-upload"
                helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div>
              <Label value="Your Department" />
              <TextInput
                type="text"
                placeholder="IT"
                id="department"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Year" />
              <TextInput
                type="text"
                placeholder="SE"
                id="year"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="redToYellow"
              type="submit"
              disabled={loading}
              outline
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from "axios"
// import { useNavigate } from 'react-router-dom';
// const Signup = () => {
//   const [user , setUser] = useState({
//     username:"",
//     email:"",
//     password:"",
//   });
//   const navigate = useNavigate()

//   const handleInput = (e) =>{
//     let name = e.target.id;
//     let value = e.target.value;

//     setUser({
//       ...user,
//       [name]:value,
//     })
//   }
//   const handlesubmit = async (e) => {
//       e.preventDefault()
//       try{
//       const response = await fetch(`http://localhost:3001/register` , {
//         method : "POST",
//         headers:{
//           'Content-Type':"application/json"
//         },
//         body: JSON.stringify(user),

//       });
//       console.log(response)
//       if(response.ok){
//         setUser({name: "" , email:"",password:"",})
//         navigate('/login')
//       }

//     }catch(error){
//         console.log("register",error)
//     }

//       // axios.post('http://localhost:3001/register' , {name, email , password})
//       // .then(result => console.log(result))
//       // .catch(err  => console.log(err))
//       // navigate('/login')
//   }
//   return (
//     <div className="bg-indigo-950 flex h-screen relative">
//     <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
//       <h1 className="absolute mt-56 text-white ml-36 text-8xl">PICT Connect</h1>
//     <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white absolute mt-36 right-0 mr-36 h-2/3 ">
//       <h2 className="text-2xl font-bold pb-5">SignUp</h2>
//       <form onSubmit={handlesubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block mb-2 text-sm font-medium">Your name</label>
//           <input
//             type="text"
//             id="name"
//             className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
//             placeholder="Andrew Jackson"
//             required
//             value={user.name}
//             onChange={handleInput}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
//           <input
//             type="email"
//             id="email"
//             className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
//             placeholder="andrew@mail.com"
//             required
//             value={user.email}
//             onChange={handleInput}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
//           <input
//             type="password"
//             id="password"
//             className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
//             placeholder="*********"
//             required
//             value={user.password}
//             onChange={handleInput}
//           />
//         </div>
//         <div>
//           <p className="text-red-500 pb-5"></p>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <button
//             type="submit"
//             className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
//           >
//             Register
//           </button>
//           <div className="flex items-center text-sm">
//             <p>Already have an account?</p>
//             <Link to="/login" className="underline cursor-pointer ml-1">Sign in</Link>
//           </div>
//         </div>
//       </form>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Signup;
