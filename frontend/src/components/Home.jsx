import React from 'react'
import Post from './Post';

const Home = () => {
  return (
    <>  
      <div className= "scroll-smooth bg-black flex h-screen flex-row text-center"> {/* Adjust mt-[60px] to match your navbar's height */}      
        <div className="w-2/6 items-center mt-12"> 
          <h1 className='text-white text-2xl font-semibold'>Events</h1>
          <a href="#" class="mt-12 ml-4 mr-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PISB Credenz'24</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">🎉 Get ready for a thrilling week of tech trivia and fun with our new series of Tech-Tidbits! 🎉
📆 Mark your calendars: Monday, Wednesday, and Friday at 8pm for the latest tech facts! </p>
          </a>

          <a href="#" class="mt-12 ml-4 mr-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PISB Credenz'24</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">🎉 Get ready for a thrilling week of tech trivia and fun with our new series of Tech-Tidbits! 🎉
📆 Mark your calendars: Monday, Wednesday, and Friday at 8pm for the latest tech facts! </p>
          </a>
        </div>   

        <div className="w-4/6 mt-12"> 
          <h1 className='text-white text-2xl font-semibold'>FAQ</h1>
          <Post/>
        </div>     

        <div className='w-2/6 scroll-smooth'>
          <h1 className='text-2xl mt-12 ml-20 mr-20 font-semibold text-center text-white'>Top Voices On PICT Connect</h1>


        <div class="mt-12 mr-6 ml-6 relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      
                        <th scope="col" class="px-3 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Department
                        </th>
                        <th scope="col" class="px-3 py-3">
                            Year
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            John
                        </th>
                        <td class="px-6 py-4">
                            IT
                        </td>
                        <td class="px-6 py-4">
                            SE
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Tom
                        </th>
                        <td class="px-6 py-4">
                            CE
                        </td>
                        <td class="px-6 py-4">
                            TE
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Henry
                        </th>
                        <td class="px-6 py-4">
                            ENTC
                        </td>
                        <td class="px-6 py-4">
                            SE
                        </td>
                    </tr>
                </tbody>
                  </table>
              </div>


          </div>

        </div>
    
    </>
  )
}

export default Home;