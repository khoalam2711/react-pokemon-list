import axios from 'axios';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { getPokemons, getPokemonTypes } from './api';
import Filter from './components/Filter';
import Pagination from './components/Pagination';
import PokemonList from './components/PokemonList';

function App() {
	const [filterIsLoading, setFilterIsLoading] = useState(true);
	const [pokemonTypes, setPokemonTypes] = useState<PokemonTypeDetail[]>([]);
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const availableFilters = pokemonTypes.map((type) => type.name);

	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const PAGE_SIZE = 48;

	useEffect(() => {
		const getTypeData = async () => {
			const {
				data: { results: pokemonTypesData },
			} = await getPokemonTypes();

			const pokemonTypeDetailsPromises = pokemonTypesData.map((type: PokemonType) =>
				axios.get(type.url)
			);
			const typeResponse = await Promise.all(pokemonTypeDetailsPromises);

			const pokemonTypeDetails = typeResponse.map((response) => response.data);
			setPokemonTypes(pokemonTypeDetails);
			setFilterIsLoading(false);
		};

		const getPokemonData = async () => {
			const {
				data: { results },
			} = await getPokemons();
			setPokemons(results);
		};

		getTypeData();
		getPokemonData();
	}, []);

	const handleAddFilter = (filter: string) => {
		setActiveFilters([...activeFilters, filter]);
		setCurrentPage(0);
	};

	const handleRemoveFilter = (filter: string) => {
		const newActiveFilters = [...activeFilters];
		const index = newActiveFilters.indexOf(filter);
		newActiveFilters.splice(index, 1);
		setActiveFilters(newActiveFilters);
		setCurrentPage(0);
	};

	const handleGoToNextPage = () => {
		setCurrentPage((currentPage) => ++currentPage);
	};

	const handleGoToPrevPage = () => {
		setCurrentPage((currentPage) => --currentPage);
	};

	const filteredData = useMemo(() => {
		if (activeFilters.length > 0) {
			let unfiltered = [];
			let filtered: any = [];
			for (let i of activeFilters) {
				const type = pokemonTypes.find((type) => type.name == i);
				unfiltered.push(type!.pokemon!.map((pokemon) => pokemon.pokemon));
			}

			if (unfiltered.length >= 1) {
				filtered = unfiltered.reduce((previous, current) =>
					_.intersectionWith(previous, current, _.isEqual)
				);
			}
			return filtered;
		} else {
			return pokemons;
		}
	}, [activeFilters, pokemons]);

	const pagedData = useMemo(() => {
		const startIndex = PAGE_SIZE * currentPage;
		const endIndex = startIndex + PAGE_SIZE;
		return filteredData.slice(startIndex, endIndex);
	}, [currentPage, pokemons, filteredData]);

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
						<div className="my-12 mx-4 font-bold">{filteredData.length} results found.</div>
					</>
				)}
			</div>
			<PokemonList pokemons={pagedData} />
			<Pagination
				currentPage={currentPage}
				totalPage={filteredData.length / PAGE_SIZE}
				onGoToNextPage={handleGoToNextPage}
				onGoToPrevPage={handleGoToPrevPage}
			/>
		</div>
	);
}

export default App;
