import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { signInStart , signInSuccess , signInFail  } from '../app/user/userSlice';
import OAuth from '../components/OAuth';

export default function Login() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch(reset());
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFail('Please Fill Out All of the Fields!'))
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status != 200 ) {
        console.log(data);
        console.log("out catch");
        dispatch(signInFail(data.error));
        
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log("in catch");
      dispatch(signInFail(error));
    }
  };
  const shouldDisplayAlert = errorMessage !== null && Object.keys(errorMessage).length > 0;
  return (
    <div className='min-h-screen mt-40'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-40'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 rounded-lg text-white'>
              PICT
            </span>
            {" " }CONNECT
          </Link>
          <p className='text-sm mt-5'>
            {/* This is a demo project. You can sign up with your email and password
            or with Google. */}
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <div className='flex text-sm justify-end'>
            <Link to='/forgot-password' className='text-blue-500'>
            Forgot Password ?
            </Link>
          </div>
            <Button
              gradientDuoTone='redToYellow'
              type='submit'
              disabled={loading}
              outline
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont have an account?</span>
            <Link to='/reg' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {shouldDisplayAlert && (
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
































// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth } from "../store/auth";

// const Login = () => {
//   const { loginWithRedirect } = useAuth0();
//   const [user , setUser] = useState({
//     email:"",
//     password:"",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const navigate = useNavigate();
//   const { storeTokenInLS } = useAuth();
//   const handleInput = (e) =>{
//     let name = e.target.id;
//     let value = e.target.value;


//     setUser({
//       ...user,
//       [name]:value,
//     })
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setEmailError(false);
//     setPasswordError(false);
//     try {
//       const response = await fetch(`/api/login`, {
//         method: "POST",
//         headers: {
//           'Content-Type': "application/json"
//         },
//         body: JSON.stringify(user),
//       });
      
//       console.log(response);
    
//       if (response.ok) {
//         const result = await response.json();
//         console.log(result);
        
         
//         if (result === "User Does Not Exist!") {
//           setEmailError(true);
//         } else if (result === "the password is incorrect") {
//           setPasswordError(true);
//         }
//         storeTokenInLS(result.data.accessToken)
//         navigate("/");
//       } else {
//         console.log("Error:", response.statusText);
//       }
//     } catch (error) {

//       console.log("login", error);
//     }
    
//     // axios
//     //   .post("http://localhost:3001/login", { email, password })
//     //   .then((result) => {
//     //     console.log(result);
//     //     if (result.data === "Login Successful!") {
//     //       navigate("/");
//     //     } else if (result.data === "User Does Not Exist!") {
//     //       setEmailError(true);
//     //     } else if (result.data === "the password is incorrect") {
//     //       setPasswordError(true);
//     //     }
//     //   })
//       // .catch((err) => console.log(err));
//   };

//   return (
//     <div className="bg-indigo-950 flex h-screen relative">
//       <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
//         <h1 className="absolute mt-56 text-white ml-36 text-8xl">
//           PICT Connect
//         </h1>
//         <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white absolute mt-36 right-0 mr-36 ">
//           <h2 className="text-2xl font-bold pb-5">Sign In</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block mb-2 text-sm font-medium">
//                 Your email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4 ${
//                   submitted && emailError ? "border-red-500" : ""
//                 }`}
//                 placeholder="andrew@mail.com"
//                 required
//                 value={user.email}
//                 onChange={handleInput}
//               />
//               {submitted && emailError && (
//                 <p className="text-red-500">User does not exist!</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium"
//               >
//                 Your password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4 ${
//                   submitted && passwordError ? "border-red-500" : ""
//                 }`}
//                 placeholder="*********"
//                 required
//                 value={user.password}
//                 onChange={handleInput}
//               />
//               {submitted && passwordError && (
//                 <p className="text-red-500">Incorrect password!</p>
//               )}
//             </div>
//             <div className="flex items-center justify-between mb-4">
//               <button
//                 type="submit"
//                 className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
//               >
//                 Submit
//               </button>
//               <button onClick={() => loginWithRedirect()}>Log with Google</button>
//               <div className="flex items-center text-sm">
//                 <p>New here?</p>
//                 <Link to="/reg" className="underline cursor-pointer ml-1">
//                   Sign up
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
