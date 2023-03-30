import axios from 'axios';

const POKEAPI_URL = 'https://pokeapi.co/api/v2';
const LIMIT = 1200;

export const getPokemonTypes = async () => {
	return axios.get(`${POKEAPI_URL}/type`);
};

export const getPokemons = async () => {
	return axios.get(`${POKEAPI_URL}/pokemon?limit=${LIMIT}`);
};
