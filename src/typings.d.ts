interface PokemonType {
	name: string;
	url;
}

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonTypeDetail {
	id: number;
	name: string;
	pokemon: {
		pokemon: {
			name: string;
			url: string;
		};
	}[];
}
interface PokemonDetail {
	id: string;
	name: string;
	sprites: {
		front_default: string;
		front_shiny: string;
		other: {
			'official-artwork': {
				front_default: string;
			};
		};
	};
}
