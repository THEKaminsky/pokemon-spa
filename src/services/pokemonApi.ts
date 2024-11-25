import axios from 'axios';
import { PokemonListResponse, PokemonDetail } from '../types/pokemon';                                               
                                                                                                                     
const BASE_URL = 'https://pokeapi.co/api/v2';      

export const getPokemonList = async (limit = 0, offset = 0) => {                                                    
  const response = await axios.get<PokemonListResponse>(                                                             
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`                                                            
  );
  // Fetch details for each Pokemon to get their types
  // I dont love this, but it works
  // Using the /types endpoint is not ideal, as it returns all pokemon, not just the ones for the given 151 Pokemon
  const detailedResults = await Promise.all(
    response.data.results.map(async (pokemon) => {
      const details = await getPokemonDetail(pokemon.name);
      return {
        ...pokemon,
        types: details.types
      };
    })
  );
  
  return {
    ...response.data,
    results: detailedResults
  };                                                                                              
};                                                                                                                   
                                                                                                                     

export const getPokemonDetail = async (nameOrId: string) => {                                                        
  const response = await axios.get<PokemonDetail>(                                                                   
    `${BASE_URL}/pokemon/${nameOrId}`                                                                                
  );
  return { ...response.data };                                                                              
};  
