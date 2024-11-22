import axios from 'axios';                                                                                           
import { PokemonListResponse, PokemonDetail, PokemonListItem } from '../types/pokemon';                                               
                                                                                                                     
const BASE_URL = 'https://pokeapi.co/api/v2';                                                                        
                                                                                                                     
export const getPokemonList = async (limit = 20, offset = 0) => {                                                    
  const response = await axios.get<PokemonListResponse>(                                                             
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`                                                            
  );                                                                                                                 
  return response.data;                                                                                              
};                                                                                                                   
                                                                                                                     
export const getPokemonsByType = async (type: string) => {
  const response = await axios.get(`${BASE_URL}/type/${type}`);
  return response.data.pokemon.map((p: { pokemon: PokemonListItem }) => p.pokemon);
};

export const getPokemonDetail = async (nameOrId: string) => {                                                        
  const response = await axios.get<PokemonDetail>(                                                                   
    `${BASE_URL}/pokemon/${nameOrId}`                                                                                
  );
  // Add the cry URL to the response data
  const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${response.data.name.toLowerCase()}.mp3`;
  return { ...response.data, cryUrl };                                                                              
};  
