import React, { useState , useEffect } from 'react';
import { Link , useNavigate, useLocation} from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import {TextInput} from 'flowbite-react';
import {AiOutlineSearch} from 'react-icons/ai'
import { FaMoon , FaSun} from "react-icons/fa";
import {  useSelector , useDispatch } from 'react-redux';
import { toggleTheme } from '../app/theme/themeSlice';
import { signoutSuccess } from '../app/user/userSlice';
import { setSearchQuery } from '../app/Search/SearchSlice';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search , setSearch] = useState("");
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const path = useLocation().pathname;
  const {currentUser} = useSelector(state => state.user)
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isNavigatingAway = location.pathname !== '/showBlogs';
    if (isNavigatingAway) {
      setSearch(''); // Clear search input
      dispatch(setSearchQuery('')); // Clear search query in Redux state
    }
  }, [location.pathname, dispatch]);
  
  useEffect(() => {
    console.log('currentUser updated:', currentUser);
    // Additional logic to handle profile picture updates in the Header
  }, [currentUser]);
  
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        console.log(data);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
};
const handleSubmit = (event) => {
  event.preventDefault();
  if (search.trim() === "") {
    return; // Return if search input is empty or contains only spaces
  }
  dispatch(setSearchQuery(search.trim())); // Dispatch search query
  navigate('/showBlogs'); // Navigate to showBlogs page
};

  return (
    <Navbar classname='border-b-2'>
      <Link to="/reg" classname = "self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white">
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-blue-400 to-cyan-400 rounded-lg text-white font-semibold'>PICT</span>
        <span className='text-sm sm:text-xl font-semibold dark:text-white'>{" "}Connect</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput type = 'text' placeholder='Search..' rightIcon={AiOutlineSearch} className='hidden lg:inline' value={search}
                onChange={handleSearchChange}/>
      </form>
      <Button className='w-12 h-10 lg:hidden' color = 'gray' pill>
        <AiOutlineSearch/>
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline ' color = 'gray' pill onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon = {false} inline label = {<Avatar alt = 'user' img ={currentUser.data.user.profilePicture} rounded/>}>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.data.user.name}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.data.user.email}</span>
            </Dropdown.Header>
            <Link to ='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
                    <Link to= '/login'>
                    <Button gradientDuoTone="tealToLime" outline>
                    Log In
                  </Button>
                  </Link>
        )}

        <NavbarToggle/>
        
      </div>
        <Navbar.Collapse>
          <Navbar.Link active = {path === "/"} as={'div'}>
            <Link to = "/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active = {path === "/about"} as={'div'}>
            <Link to = "/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active = {path === "/contact"} as={'div'}>
            <Link to = "/contact">Contact Us</Link>
          </Navbar.Link>
          
          <Navbar.Link active = {path === "/blog"} as={'div'}>
            <Link to = "/blog">Write / Ask Community</Link>
          </Navbar.Link>

        </Navbar.Collapse>
      
     </Navbar>
    // <div className="h-[64px] relative">
    //   <nav className="bg-white border-gray-200 dark:bg-gray-900 top-0 z-50 w-full fixed">
    //     <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
    //       <a href="#" className="flex items-center">
    //         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PICT CONNECT</span>
    //       </a>
    //       <div className="flex justify-center ">
    //         <div className="relative lg:w-[35vw] max-w-xl">
    //           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    //               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    //             </svg>
    //             <span className="sr-only">Search icon</span>
    //           </div>
    //           <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-full" placeholder="Search..."/>
    //         </div>
    //       </div>
    //       <button id="toggleBtn" className="lg:hidden cursor-pointer" onClick={toggleMenu}>
    //         <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    //         </svg>
    //       </button>
    //       <div id="menu" className={`lg:hidden absolute top-full left-0 right-0 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 ${menuOpen ? '' : 'hidden'}`}>
    //         <ul className="py-2">
    //           <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Home</a></li>
    //           <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">About</a></li>
    //           <li><a href="#" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">Login</a></li>
    //         </ul>
    //       </div>
    //       <div className="hidden lg:flex lg:w-auto lg:items-center">
    //         <ul className="flex flex-col lg:flex-row lg:space-x-8">
    //           <li>
    //             <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700">Home</a>
    //           </li>
    //           <li>
    //             <a to = "#" className="text-gray-900 dark:text-white hover:text-blue-700">About</a>
    //           </li>
              
    //             {isLoggedIn ? (        
    //             <li>
    //             <a href="/logout" className="text-gray-900 dark:text-white hover:text-blue-700">Logout</a>
    //           </li>) : (              
    //             <li>
    //             <a href="/login" className="text-gray-900 dark:text-white hover:text-blue-700">Login</a>
    //           </li>)}


    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
}

export default Header;
