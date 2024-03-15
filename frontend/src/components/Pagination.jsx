

const Pagination = ({ page, total, limit, setPage }) => {
	const totalPages = Math.ceil(total / limit);

	const onClick = (newPage) => {
		setPage(newPage + 1);
	};

	return (
		<div className=" @apply absolute w-[calc(100%_-_20px)] h-[45px] flex items-center justify-center z-[100] mx-2.5 my-0 left-0 bottom-0;">
			{totalPages > 0 &&
				[...Array(totalPages)].map((val, index) => (
					<button
						onClick={() => onClick(index)}
						className='text-sm font-medium w-[30px] h-[30px] flex items-center justify-center shadow-[var(--box-shadow)] cursor-pointer bg-[white] mx-[5px] my-0 rounded-[5px] border-[none]'
						key={index}
					>
						{index + 1}
					</button>
				))}
		</div>
	);
};

export default Pagination;