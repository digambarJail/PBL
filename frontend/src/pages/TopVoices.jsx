import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";


const TopVoices = () => {

  const [data,setData] = useState([])

  useEffect(() => {

    const getTopVoices = async () =>{
      console.log("Inside get top voices ")
      const res = await fetch ('/api/getTopVoices')
      const data = await res.json();

      // console.log("Fetched top voices successfully")
      // console.log(data)

      // console.log("Data of top voices")
      // console.log(data.data)
      setData(data.data);
    } 

    getTopVoices()
  },[])

  return (
    <div className='p-4'>
      {data.length !== 0 ? (
      <div className='mt-5 border  border-[#404040] rounded-xl dark:bg-[#282929]'>
      {data.slice(0, 3).map((item, index) => (
        <div className=' mr-5 ml-5 border  border-[#404040] mt-12 rounded-xl p-4 group-hover:o mb-10 flex flex-row items-center space-x-2 ' key={index}>
          <div className='font-bold w-[20%]'>{index+1}</div>
          <div className='font-bold w-[20%]'><img src={data[index].profilePicture} alt=""  className='rounded-avatar shrink-0 h-[3.5rem] w-[3.5rem] object-cover object-center rounded-md'/></div>

          <Link 
            to={`/getUserDetails/${item._id}`} 
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            {item.name}
          </Link>
          
        </div>
      ))}
      </div>
      ) :
      (
        <>
    
<div role="status" class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
    <div class="flex items-center justify-between">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div class="flex items-center justify-between pt-4">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <span class="sr-only">Loading...</span>
</div>

</>
      )}
    </div>
  )
}

export default TopVoices;