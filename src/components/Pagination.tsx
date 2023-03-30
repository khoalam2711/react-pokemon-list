import React from 'react';

interface PaginationProps {
	onGoToNextPage: Function;
	onGoToPrevPage: Function;
	totalPage: number;
	currentPage: number;
}

const Pagination = ({ onGoToNextPage, currentPage, totalPage, onGoToPrevPage }: PaginationProps) => {
	return (
		<div className="mt-8 flex justify-center">
			<button
				className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
				disabled={currentPage <= 0}
				onClick = {() => onGoToPrevPage()}
			>
				Prev
			</button>
			<button
				className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
				onClick={() => onGoToNextPage()}
				disabled={currentPage >= totalPage - 1}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
