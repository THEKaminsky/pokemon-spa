import axios from 'axios';                                                                                           
import { PokemonListResponse, PokemonDetail } from '../types/pokemon';                                               
                                                                                                                     
const BASE_URL = 'https://pokeapi.co/api/v2';                                                                        
                                                                                                                     
export const getPokemonList = async (limit = 20, offset = 0) => {                                                    
  const response = await axios.get<PokemonListResponse>(                                                             
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`                                                            
  );                                                                                                                 
  return response.data;                                                                                              
};                                                                                                                   
                                                                                                                     
export const getPokemonDetail = async (nameOrId: string) => {                                                        
  const response = await axios.get<PokemonDetail>(                                                                   
    `${BASE_URL}/pokemon/${nameOrId}`                                                                                
  );                                                                                                                 
  return response.data;                                                                                              
};  