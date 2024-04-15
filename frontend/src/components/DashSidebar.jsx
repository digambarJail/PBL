import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../app/user/userSlice';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl || 'profile'); // Default to 'profile' if no tab is specified
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        console.log(data);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={'User'}
              labelColor='dark'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=blogs'>
            <Sidebar.Item
              active={tab === 'blogs'}
              className='cursor-pointer'
            >
              My Blogs
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=questions'>
            <Sidebar.Item
              active={tab === 'questions'}
              className='cursor-pointer'
            >
              My Questions
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=answers'>
            <Sidebar.Item
              active={tab === 'answers'}
              className='cursor-pointer'
            >
              My Answers
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
