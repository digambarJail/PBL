import React, { useEffect, useState } from 'react';

const Events = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await fetch('/api/showEvents');
      const data = await res.json();
      setData(data.data);
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
      {data.length !== 0 ? (
        <div>
          {data.slice(0, 5).map((item, index) => (
            <div key={index} className='mb-6 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-lg shadow-md'>
              <div className='p-6'>
                <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
                <p className='text-gray-600 dark:text-gray-400'>{item.description}</p>
              </div>
              <div className='p-6 border-t border-gray-200 dark:border-gray-700'>
                <p className='text-gray-700 dark:text-gray-300'>
                  <span className="font-semibold">Organized by:</span> {item.organizer}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <span className="font-semibold">Date:</span> {formatDate(item.date)}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <span className="font-semibold">Venue:</span> {item.location}
                </p>
                <a href={item.url} className='text-blue-500 hover:underline'>Click Here to know more!</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='mb-6 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-lg shadow-md animate-pulse'>
              <div className='p-6'>
                <div className='w-2/3 h-4 mb-4 bg-gray-200 dark:bg-gray-600 rounded-lg'></div>
                <div className='w-full h-6 mb-4 bg-gray-200 dark:bg-gray-600 rounded-lg'></div>
                <div className='w-1/2 h-4 mb-4 bg-gray-200 dark:bg-gray-600 rounded-lg'></div>
                <div className='w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-lg'></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
