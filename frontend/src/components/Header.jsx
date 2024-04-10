import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../app/theme/themeSlice';
import { signoutSuccess } from '../app/user/userSlice';
import { setSearchQuery } from '../app/Search/SearchSlice';
import { SearchResult } from './SearchResult';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [obj , setObj] = useState(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isNavigatingAway = location.pathname !== '/showBlogs';
    if (isNavigatingAway) {
      setSearch(''); // Clear search input
      // dispatch(setSearchQuery('')); // Clear search query in Redux state
      setSearchResults([]); // Clear search results
    }
  }, [location.pathname, dispatch]);

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
  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const url = `/api/showQuestions?page=1&search=${search}`;
        const res = await fetch(url, {
          method: "GET",
        });
        const { data } = await res.json();
        if (!res.ok) {
          // console.log(data.message);
        }
        console.log("Data received:", data);
        setObj(data || {});
        dispatch(setSearchQuery());
      } catch (err) {
        console.log(err);
      }
    };

    getAllQuestions();
  }, [search]);

  const handleSearchChange =  (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);

    if (inputValue.length > 3) {
      // Perform search logic and set search results
  
      setSearchResults(obj.questions);
    } else {
      // Clear search results if input length is less than or equal to 3
      setSearchResults([]);
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (search.trim() === '') {
      return; // Return if search input is empty or contains only spaces
    }
    dispatch(setSearchQuery(search)); // Dispatch search query
    navigate('/showBlogs'); // Navigate to showBlogs page
    setSearchResults([]);
  };

  return (
    <Navbar className="border-b-2">
      <Link to="/reg" className="self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 via-blue-400 to-cyan-400 rounded-lg text-white font-semibold">PICT</span>
        <span className="text-sm sm:text-xl font-semibold dark:text-white">{" "}Connect</span>
      </Link>
      {location.pathname !== '/showBlogs' && (
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <TextInput
              type="text"
              placeholder="Search.."
              rightIcon={AiOutlineSearch}
              className="lg:flex w-[60%] lg:w-[120%] md:w-[100%] sm:w-[60%]"
              value={search}
              onChange={handleSearchChange}
            />
            {search.length > 0 && (
              <ul className="absolute z-20 flex flex-col bg-slate-400 w-[250px] rounded-sm h-min-[400px] bg-surface shadow-popover max-h-96 rounded-base text-md border border-line-subdued overflow-auto focus-visible:ring-1 focus:outline-none h-fit overflow-y-auto isolate">
                <li className="bg-slate-600 p-4 align-middle text-center" onClick={() => navigate(`/showBlogs`)}>
                  Search for <span className="font-bold">"{search}"</span> in Blogs, Questions
                </li>
                <li className="p-4 align-middle text-center bg-slate-800">Questions</li>
                <div className="relative">
                  {searchResults.map((result, index) => (
                    <li className="border p-4" onClick={() => navigate(`/getQuestion/${result._id}`)} key={index}>
                      <SearchResult title={result.question} content={result.nameOfOwner} />
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </div>
        </form>
      )}


      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.data.user.profilePicture} rounded />}>
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.data.user.name}</span>
              <span className="block text-sm font-medium truncate">{currentUser.data.user.email}</span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button gradientDuoTone="tealToLime" outline>
              Log In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/contact'} as={'div'}>
          <Link to="/contact">Contact Us</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/blog'} as={'div'}>
          <Link to="/blog">Write / Ask Community</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
