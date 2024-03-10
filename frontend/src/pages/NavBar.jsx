// import React, { useState , useEffect } from 'react';
// import { useAuth } from '../app/auth';
// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const {isLoggedIn} = useAuth()
//   useEffect(() => {
//     // This effect will run every time `isLoggedIn` changes
//     // Force a rerender by setting a state that isn't used elsewhere
//     setMenuOpen(prevMenuOpen => !prevMenuOpen);
//   }, [isLoggedIn]);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
  
//   return (
//     <div className="h-[64px] relative">
//       <nav className="bg-white border-gray-200 dark:bg-gray-900 top-0 z-50 w-full fixed">
//         <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
//           <a href="#" className="flex items-center">
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PICT CONNECT</span>
//           </a>
//           <div className="flex justify-center ">
//             <div className="relative lg:w-[35vw] max-w-xl">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                 </svg>
//                 <span className="sr-only">Search icon</span>
//               </div>
//               <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-full" placeholder="Search..."/>
//             </div>
//           </div>
//           <button id="toggleBtn" className="lg:hidden cursor-pointer" onClick={toggleMenu}>
//             <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//           <div id="menu" className={`lg:hidden absolute top-full left-0 right-0 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 ${menuOpen ? '' : 'hidden'}`}>
//             <ul className="py-2">
//               <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Home</a></li>
//               <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">About</a></li>
//               <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Login</a></li>
//             </ul>
//           </div>
//           <div className="hidden lg:flex lg:w-auto lg:items-center">
//             <ul className="flex flex-col lg:flex-row lg:space-x-8">
//               <li>
//                 <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700">Home</a>
//               </li>
//               <li>
//                 <a to = "#" className="text-gray-900 dark:text-white hover:text-blue-700">About</a>
//               </li>
              
//                 {isLoggedIn ? (        
//                 <li>
//                 <a href="/logout" className="text-gray-900 dark:text-white hover:text-blue-700">Logout</a>
//               </li>) : (              
//                 <li>
//                 <a href="/login" className="text-gray-900 dark:text-white hover:text-blue-700">Login</a>
//               </li>)}


//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;
