import axios from "axios"

const POKEAPI_URL = "https://pokeapi.co/api/v2"

export const getPokemonTypes = async () => {
	return axios.get(`${POKEAPI_URL}/type`);
}