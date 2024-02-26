import React from 'react'

const Home = () => {
  return (
    <>  
      <div className="bg-black flex h-screen flex-row text-center"> {/* Adjust mt-[60px] to match your navbar's height */}      
        <div className="w-2/6 items-center mt-12"> 
          <h1 className='text-white text-2xl font-semibold'>Events</h1>
          <a href="#" class="mt-12 ml-4 mr-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PISB Credenz'24</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">🎉 Get ready for a thrilling week of tech trivia and fun with our new series of Tech-Tidbits! 🎉
📆 Mark your calendars: Monday, Wednesday, and Friday at 8pm for the latest tech facts! </p>
          </a>
        </div>

        <div>
          <button className= " bg-indigo-900 text-white rounded">See more...</button>
        </div>     

        <div className="w-4/6"> 
          <h1 className='text-white'>FAQ</h1>
        </div>     

        <div className='w-2/6'>
          <h1 className='text-2xl font-semibold text-center text-white'>Top Voices On PICT Connect</h1>
        </div>

    </div>
    
    </>
  )
}

export default Home;