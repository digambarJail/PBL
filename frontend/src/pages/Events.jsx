import React, { useEffect, useState } from 'react';

const Events = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      console.log("Inside get all events ")
      const res = await fetch ('/api/showEvents')
      const data = await res.json();

      console.log("Fetched events successfully")
      console.log(data)

      console.log("Data of events")
      console.log(data.data)
      setData(data.data);
    };

    getEvents();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='rounded-lg mx-2'>
      <div>
        <h1 className='text-2xl font-semibold'>Events</h1>
        {data.length !== 0 ? (
          <div className=''>
            {data.map((item, index) => (
              <div className='bg-slate-200 dark:bg-[#282929] mr-5 ml-5 border border-[#404040] mt-12 rounded-xl p-10' key={index}>
                <h1 className='font-bold'>{item.name}</h1>
                {item.description}
                <p>Organized by: {item.organizer}</p>
                <p>Date: {formatDate(item.date)}</p> {/* Display formatted date */}
                <p>Venue: {item.location}</p>
                <a className='text-blue-500' href={item.url}>Click Here to know more!</a>          
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-800 mx-10 my-10">
              <div className="flex p-4 space-x-4 sm:px-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
                <div className="flex-1 py-2 space-y-4">
                  <div className="w-full h-3 rounded bg-gray-300"></div>
                  <div className="w-5/6 h-3 rounded bg-gray-300"></div>
                </div>
              </div>
              <div className="p-4 space-y-4 sm:px-8">
                <div className="w-full h-4 rounded bg-gray-300"></div>
                <div className="w-full h-4 rounded bg-gray-300"></div>
                <div className="w-3/4 h-4 rounded bg-gray-300"></div>
              </div>
            </div>
            <div className="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-800 my-10 mx-10">
              <div className="flex p-4 space-x-4 sm:px-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
                <div className="flex-1 py-2 space-y-4">
                  <div className="w-full h-3 rounded bg-gray-300"></div>
                  <div className="w-5/6 h-3 rounded bg-gray-300"></div>
                </div>
              </div>
              <div className="p-4 space-y-4 sm:px-8">
                <div className="w-full h-4 rounded bg-gray-300"></div>
                <div className="w-full h-4 rounded bg-gray-300"></div>
                <div className="w-3/4 h-4 rounded bg-gray-300"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
