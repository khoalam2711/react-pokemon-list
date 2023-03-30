import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonImage from './PokemonImage';

interface PokemonListProps {
	pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
	return pokemons.length > 0 ? (
		<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
			{pokemons.map((pokemon) => (
				<div key={pokemon.name}>
					<PokemonImage url={pokemon.url} />
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
