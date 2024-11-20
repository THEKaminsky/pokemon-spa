import React, { useEffect, useState } from 'react';                                                                  
import { getPokemonList } from '../services/pokemonApi';                                                             
import { PokemonListItem } from '../types/pokemon';                                                                  
import styled from 'styled-components';
import PokemonDetail from './PokemonDetail';
                                                                                                                      
const PokemonGrid = styled.div`                                                                                      
   display: grid;                                                                                                     
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));                                                      
   gap: 20px;                                                                                                         
   padding: 20px;                                                                                                     
`;                                                                                                                   
                                                                                                                      
const PokemonCard = styled.div`                                                                                    
   padding: 20px;                                                                                                     
   border: 1px solid #ddd;                                                                                            
   border-radius: 8px;                                                                                                
   color: inherit;                                                                                                    
   text-align: center;                                                                                                
   cursor: pointer;
                                                                                                                      
   &:hover {                                                                                                          
     background-color: #f5f5f5;                                                                                       
   }                                                                                                                  
`;                                                                                                                   
                                                                                                                      
const PokemonList: React.FC = () => {                                                                                
   const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);                                                     
   const [loading, setLoading] = useState(true);
   const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
                                                                                                                      
   useEffect(() => {                                                                                                  
     const fetchPokemon = async () => {                                                                               
       try {                                                                                                          
         const data = await getPokemonList(151); // First 151 Pokemon                                                 
         setPokemon(data.results);                                                                                    
       } catch (error) {                                                                                              
         console.error('Error fetching pokemon:', error);                                                             
       } finally {                                                                                                    
         setLoading(false);                                                                                           
       }                                                                                                              
     };                                                                                                               
                                                                                                                      
     fetchPokemon();                                                                                                  
   }, []);                                                                                                            
                                                                                                                      
   if (loading) return <div>Loading...</div>;                                                                         
                                                                                                                      
   return (
     <>
       <PokemonGrid>                                                                                                    
         {pokemon.map((p) => (                                                                                          
           <PokemonCard key={p.name} onClick={() => setSelectedPokemon(p.name)}>                                                         
             <h3>{p.name}</h3>                                                                                          
           </PokemonCard>                                                                                               
         ))}                                                                                                            
       </PokemonGrid>
       {selectedPokemon && (
         <PokemonDetail
           pokemonName={selectedPokemon}
           onClose={() => setSelectedPokemon(null)}
         />
       )}
     </>                                                                                                   
   );                                                                                                                 
 };                                                                                                                   
                                                                                                                      
 export default PokemonList;  
