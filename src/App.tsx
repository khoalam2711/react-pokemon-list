import { useEffect, useState } from 'react';
import { getPokemonTypes } from './api';
import Filter from './components/filter';

function App() {
	const [filterIsLoading, setFilterIsLoading] = useState(true);
	const [activeFilters, setActiveFilters] = useState<Object>({});
	const [availableFilters, setAvailableFilters] = useState<string[]>([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await getPokemonTypes();
			console.log(data);
			const pokemonTypes: string[] = data.results.map((type: any) => type.name);
			setAvailableFilters(pokemonTypes);
			setFilterIsLoading(false);
		};
		getData();
	});

	const handleAddFilter = (filter: string) => {
		setActiveFilters({ ...activeFilters, [filter]: true });
	};

	const handleRemoveFilter = (filter: string) => {
		setActiveFilters({ ...activeFilters, [filter]: false });
	};
	return (
		<div className="App">
			<div className="mx-auto max-w-screen-xl">
				{filterIsLoading ? null : (
					<>
						<Filter
							filters={availableFilters}
							activeFilters={activeFilters}
							onAddFilter={handleAddFilter}
							onRemoveFilter={handleRemoveFilter}
						/>
						<div className="my-12 mx-4 font-bold">1200 results found.</div>
					</>
				)}
			</div>

		</div>
	);
}

export default App;
