import React, { useEffect, useState } from 'react'

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
          <div className='font-bold '>{item.name}</div>
        </div>
      ))}
      </div>
      ) :
      (
        <>
        <div class="flex flex-col items-center max-w-xl gap-4 mt-20 my-10">
    <div class="animate-pulse rounded-full h-20 w-20 bg-gray-800 mb-4"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
</div><div class="flex flex-col items-center max-w-xl gap-4 mt-20 my-10">
    <div class="animate-pulse rounded-full h-20 w-20 bg-gray-800 mb-4"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
    <div class="h-5 bg-gray-400 rounded w-1/2"></div>
</div>
</>
      )}
    </div>
  )
}

export default TopVoices;