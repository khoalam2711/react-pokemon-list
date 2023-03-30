import axios from 'axios';
import { useEffect, useState } from 'react';

interface PokemonListProps {
	pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
	const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
	useEffect(() => {
		const getPokemonData = async () => {
			const pokemonDetailsPromises = pokemons.map((pokemon) => axios.get(pokemon.url));
			const data = (await Promise.all(pokemonDetailsPromises)).map((response) => response.data);
			setPokemonDetails(data);
		};
		getPokemonData();
	}, [pokemons]);

	return pokemonDetails.length > 0 ? (
		<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
			{pokemonDetails.map((pokemon) => (
				<div key={pokemon.id}>
					<div className="h-24 w-24 mx-auto">
						<img
							src={pokemon.sprites.other['official-artwork'].front_default}
							width="100"
							height="100"
						/>
					</div>
					<div className="text-center">{pokemon.name}</div>
				</div>
			))}
		</div>
	) : (
		<div className="w-100 flex justify-center">
			<h2 className="font-bold text-3xl">No results found</h2>
		</div>
	);
};

export default PokemonList;
