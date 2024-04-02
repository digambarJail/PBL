import React, { useEffect, useState } from 'react'

const TopVoices = () => {

  const [data,setData] = useState([])

  useEffect(() => {

    const getTopVoices = async () =>{
      console.log("Inside get top voices ")
      const res = await fetch ('/api/getTopVoices')
      const data = await res.json();

      console.log("Fetched top voices successfully")
      console.log(data)

      console.log("Data of top voices")
      console.log(data.data)
      setData(data.data);
    } 

    getTopVoices()
  },[])

  return (
    <div>
      <div className=''>
      {data.slice(0, 3).map((item, index) => (
        <div className='bg-slate-200 dark:bg-gray-800 mr-5 ml-5 border-white border-2 mt-12 rounded-full p-4 group-hover:o' key={index}>
          <h1 className='font-bold '>{item.name}</h1>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TopVoices;