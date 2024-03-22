import React, { useEffect, useState } from 'react'

const Events = () => {

  const [data,setData] = useState([])

  useEffect(() => {

    const getEvents = async () =>{
      console.log("Inside get all events ")
      const res = await fetch ('/api/showEvents')
      const data = await res.json();

      console.log("Fetched events successfully")
      console.log(data)

      console.log("Data of events")
      console.log(data.data)
      setData(data.data);
    } 

    getEvents()
  },[])

  return (
    <div>
      <h1 className=' text-2xl font-semibold'>Events</h1>
      <div className=''>
      {data.map((item, index) => (
        <div className='bg-gray-800 mr-5 ml-5 border-white border-2 mt-12' key={index}>
          <h1 className='font-bold '>{item.name}</h1>
          {item.description}
          <p>Organized by : {item.organizer}</p>
          <p>Date: {item.date}</p>          
          <p>Venue: {item.location}</p>
          <p>Click to know more {item.url}</p>
          
        </div>
      ))}
      </div>
    </div>
  )
}

export default Events;