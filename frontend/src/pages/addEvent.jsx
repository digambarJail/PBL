import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddEvent = () => {
    const [eventDetails, setEventDetails] = useState({
        name: '',
        date: new Date(), // Set initial date to today
        description: '',
        organizer: '',
        location: '',
        url: '',
    });

    const [eventSubmit, setEventSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setEventDetails({
            ...eventDetails,
            date: date,
        });
    };

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/addEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...eventDetails,
                    date: eventDetails.date.toISOString(), // Convert date to string
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit event');
            }

            const data = await response.json();
            console.log(data);

            setEventSubmit(true);

            setTimeout(() => {
                setEventSubmit(false);
            }, 5000);
        } catch (error) {
            console.log('Error in handleSubmitEvent ', error);
        }
    };

    return (
        <>
            <div className="mb-36">
                <div className='flex flex-col text-center justify-center items-center'>
                    <h1 className='text-3xl py-10'>Add Your Event</h1>
                    <input
                        className='bg-transparent w-[50%] pb-2 mb-10'
                        value={eventDetails.name}
                        name='name'
                        id='name'
                        type='text'
                        placeholder='Event Name'
                        onChange={handleChange}
                    />
                    <p>Choose Event Date: </p>
                    <DatePicker
                        selected={eventDetails.date}
                        onChange={handleDateChange}
                        className='bg-transparent w-[50%] mb-10'
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Date"
                    />
                    <textarea
                        className='bg-transparent w-[50%] pb-10 mb-10'
                        value={eventDetails.description}
                        name='description'
                        id='description'
                        type='text'
                        placeholder='Description'
                        onChange={handleChange}
                    />
                    <textarea
                        className='bg-transparent w-[50%]  mb-10'
                        value={eventDetails.organizer}
                        name='organizer'
                        id='organizer'
                        type='text'
                        placeholder='Organized by'
                        onChange={handleChange}
                    />
                    <textarea
                        className='bg-transparent w-[50%] mb-10'
                        value={eventDetails.location}
                        name='location'
                        id='location'
                        type='text'
                        placeholder='Venue'
                        onChange={handleChange}
                    />
                    <textarea
                        className='bg-transparent w-[50%] mb-10'
                        value={eventDetails.url}
                        name='url'
                        id='url'
                        type='text'
                        placeholder='Event Official Page'
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmitEvent} className='bg-green-500 rounded-xl mt-6 px-5 py-2.5 text-white text-xl'>Add Event</button>
                    {eventSubmit && (
                        <div className="text-green-600 mt-3"><h1 className='text-3xl'>Event Added Successfully!</h1></div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddEvent;
