import React, { useEffect, useState } from 'react';

const Events = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await fetch('/api/showEvents');
      const responseData = await res.json();
      setData(responseData.data);
    };

    getEvents();
  }, []);

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
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold mb-8'>Upcoming Events</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data.slice(5).map((item, index) => (
          <div key={index} className='bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
              <p className='text-gray-600 dark:text-gray-400'>{item.description}</p>
            </div>
            <div className='p-6 border-t border-gray-200 dark:border-gray-700'>
              <p className='text-gray-700 dark:text-gray-300'>Organized by: {item.organizer}</p>
              <p className='text-gray-700 dark:text-gray-300'>Date: {formatDate(item.date)}</p>
              <p className='text-gray-700 dark:text-gray-300'>Venue: {item.location}</p>
              <a href={item.url} className='text-blue-500 hover:underline'>Click Here to know more!</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
