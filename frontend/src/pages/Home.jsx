import React from 'react'
import Post from './Post';
import Events from './Events';
import TopVoices from './TopVoices';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // let blogs = [];
  const navigate = useNavigate();
  const [obj, setObj] = useState({});
	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	const [filterGenre, setFilterGenre] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

  const handleAddEvent = () =>{
    navigate('/addEvent')
  }

	useEffect(() => {
		const getAllBlogs = async () => {
			try {
                
				const url = `/api/showBlogs?page=${page}&sort=${sort.sort},${
					sort.order
				}&genre=${filterGenre.toString()}&search=${search}`;
				const res = await fetch(url, {
                    method: 'GET',
                  });
                  const {data} = await res.json();
                  if (!res.ok) {
                    console.log(data.message);
                  }
                  // console.log("Data received:", data);
				setObj({data} || {});
			} catch (err) {
				console.log(err);
			}
		};

		getAllBlogs();
	}, [sort, filterGenre, page, search]);
    // try {
    //         const res = await fetch('/api/showBlogs'  ,{
    //         method:'GET',
    //     });
    //     const data = await res.json();
        
    //     if (!res.ok) {
    //         console.log(data.message);
    //       }
    //       blogs = data;
    //       console.log("hi",data)


    // } catch (error) {
    //     console.log(error)
    // }

  return (
    <>  
    
      <div className= "scroll-smooth flex h-full flex-row text-center "> {/* Adjust mt-[60px] to match your navbar's height */}      
        <div className="w-2/6 items-center mt-12"> 
          
          <Events />
          <button onClick={handleAddEvent} className="mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
            Add Your Event
          </button>

          {/* <a href="#" class="mt-12 ml-4 mr-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#282929] dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PISB Credenz'24</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">🎉 Get ready for a thrilling week of tech trivia and fun with our new series of Tech-Tidbits! 🎉
📆 Mark your calendars: Monday, Wednesday, and Friday at 8pm for the latest tech facts! </p>
          </a>

          <a href="#" class="mt-12 ml-4 mr-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-[#282929] dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PISB Credenz'24</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">🎉 Get ready for a thrilling week of tech trivia and fun with our new series of Tech-Tidbits! 🎉
📆 Mark your calendars: Monday, Wednesday, and Friday at 8pm for the latest tech facts! </p>
          </a> */}


        </div>   

        <div className="w-4/6 mt-12"> 
          <h1 className=' text-2xl font-semibold'>Blogs</h1>
          <div className={`bg-white dark:bg-neutral-900 font-[sans-serif] p-4 mt-12 rounded-md `}>
            <div className="max-w-6xl max-md:max-w-lg mx-auto">
                <div>
                    {/* <h2 className="text-3xl font-extrabold text-[#333] dark:text-slate-100 inline-block">
                    LATEST BLOGS
                    </h2> */}
                </div>
                {console.log(obj)}
                <Post blogs = {obj.data ? obj.data : []}/>
            </div>
        </div>   
        </div>  

        <div className='w-2/6 scroll-smooth'>
          <h1 className='text-2xl mt-12 ml-20 mr-20 font-semibold text-center'>Top Voices On PICT Connect</h1>
          <TopVoices />
        <div class="mt-12 mr-6 ml-6 relative overflow-x-auto ">

        </div>
          

        </div>

        </div>
    
    </>
  )
}

export default Home;