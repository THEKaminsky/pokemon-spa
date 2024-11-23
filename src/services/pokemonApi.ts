import axios from 'axios';                                                                                           
import { PokemonListResponse, PokemonDetail, PokemonListItem } from '../types/pokemon';                                               
                                                                                                                     
const BASE_URL = 'https://pokeapi.co/api/v2';                                                                        
                                                                                                                     
export const getPokemonList = async (limit = 0, offset = 0) => {                                                    
  const response = await axios.get<PokemonListResponse>(                                                             
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`                                                            
  );
  
  // Fetch details for each Pokemon to get their types
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
