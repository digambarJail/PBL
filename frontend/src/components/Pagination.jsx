const Pagination = ({ page, total, limit, setPage }) => {
    const totalPages = Math.ceil(total / limit);

    const onClick = (newPage) => {
        setPage(newPage + 1);
    };

    return (
        <div className="overflow-x-scroll sm:overflow-hidden ">
        <div className="dark:bg-gray-800 bg-slate-200 px-2  rounded-full py-2 my-10 w-fit  flex items-center justify-center ">
        <div className="flex text-gray-600 md:gap-4 text-sm md:font-medium py-2 justify-center">
            {totalPages > 0 &&
                [...Array(totalPages)].map((val, index) => (
                    <button
                        onClick={() => onClick(index)}
                        className={`flex w-fit items-center justify-center h-8 leading-tight rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out" ${page === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                        key={index}
                    >
                        {index + 1}
                    </button>
                ))}
        </div>
        </div>
        </div>
    );
};

export default Pagination;
