const Pagination = ({ page, total, limit, setPage }) => {
    const totalPages = Math.ceil(total / limit);

    const onClick = (newPage) => {
        setPage(newPage + 1);
    };

    return (
        <div className="flex mx-10 h-12 items-center justify-center z-10">
            {totalPages > 0 &&
                [...Array(totalPages)].map((val, index) => (
                    <button
                        onClick={() => onClick(index)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white w-40 h-40" ${page === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                        key={index}
                    >
                        {index + 1}
                    </button>
                ))}
        </div>
    );
};

export default Pagination;
