import axios from 'axios';
import { useEffect, useState } from 'react';
import { getPokemons, getPokemonTypes } from './api';
import Filter from './components/Filter';
import PokemonList from './components/PokemonList';

function App() {
	const [filterIsLoading, setFilterIsLoading] = useState(true);
	const [pokemonTypes, setPokemonTypes] = useState<PokemonTypeDetail[]>([]);
	const [activeFilters, setActiveFilters] = useState<Object>({});
	const availableFilters = pokemonTypes.map((type) => type.name);

	const [currentPage, setCurrentPage] = useState(0);
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const currentShowingPokemon = pokemons.slice(0, 48);

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

			<PokemonList pokemons={currentShowingPokemon} />
		</div>
	);
}

export default App;
