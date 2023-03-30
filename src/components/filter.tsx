import React from 'react';

interface FilterProps {
	filters: string[];
	activeFilters: any;
	onAddFilter: Function;
	onRemoveFilter: Function;
}

const Filter = ({ filters, activeFilters, onAddFilter, onRemoveFilter }: FilterProps) => {
	return (
		<div className="flex items-center mx-4 my-4">
			<div className="mr-2 my-4 font-bold self-start">Types:</div>
			<div>
				{filters.map((filter) =>
					activeFilters.includes(filter) ? (
						<button
							className="px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold text-white bg-red-900"
							key={filter}
							onClick={() => onRemoveFilter(filter)}
						>
							{filter}
						</button>
					) : (
						<button
							className="px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold text-red-900"
							key={filter}
							onClick={() => onAddFilter(filter)}
						>
							{filter}
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default Filter;
