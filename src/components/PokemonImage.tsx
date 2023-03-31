import axios from 'axios';
import { useEffect, useState } from 'react';

interface PokemonImageProps {
	url: string;
}

const PokemonImage = ({ url }: PokemonImageProps) => {
	const [imageURL, setImageURL] = useState('');

	useEffect(() => {
		const getPokemonData = async () => {
			const { data } = await axios.get(url);
			setImageURL(data.sprites.other['official-artwork'].front_default);
		};
		getPokemonData();
	}, []);
	
	return (
		<div className="h-24 w-24 mx-auto text-center">
			{imageURL ? <img src={imageURL} width="100" height="100" /> : 'loading...'}
		</div>
	);
};

export default PokemonImage;
