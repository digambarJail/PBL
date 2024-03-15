import React from 'react'
import  { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../app/Search/SearchSlice';
import Post from './Post';
import Pagination from '../components/Pagination';
export default function ShowBlogs() {
    const [obj, setObj] = useState({});
	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	const [filterGenre, setFilterGenre] = useState([]);
	const [page, setPage] = useState(1);
    const search = useSelector((state) => state.search.searchQuery);
	useEffect(() => {
		const getAllBlogs = async () => {
			try {
                
				const url = `/api/showBlogs?page=${page},&search=${search}`;
				const res = await fetch(url, {
                    method: 'GET',
                  });
                  const {data} = await res.json();
                  if (!res.ok) {
                    console.log(data.message);
                  }
                  console.log("Data received:", data);
				setObj({data} || {});
			} catch (err) {
				console.log(err);
			}
		};

		getAllBlogs();
	}, [sort, filterGenre, page, search]);
  return (
    <>
    <section className='w-1/3 flex left'>
        <div></div>
    </section>
    <aside className='w-1/3 right'>
    <Post blogs = {obj.data ? obj.data : []} />
    </aside>
    <Pagination
    page={page}
    limit={obj.limit ? obj.limit : 0}
    total={obj.total ? obj.total : 0}
    setPage={(page) => setPage(page)}
/>
</>

  )
}
