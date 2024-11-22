import React, { useEffect, useState } from 'react';                                                                  
import { getPokemonList, getPokemonsByType } from '../services/pokemonApi';                                                             
import { PokemonListItem } from '../types/pokemon';                                                                  
import styled from 'styled-components';
import TypeFilter from './TypeFilter';
import PokemonDetail from './PokemonDetail';
import SearchBar from './SearchBar';
import { capitalize } from '../utils/stringUtils';
                                                                                                                      
const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin-left: 240px;
  width: calc(100% - 200px);
  position: relative;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const PokemonGrid = styled.div`                                                                                      
   display: grid;                                                                                                     
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));                                                      
   gap: 20px;                                                                                                         
   padding: 20px;                                                                                                     
`;                                                                                                                   
                                                                                                                      
const PokemonCard = styled.div`                                                                                    
   padding: 20px;                                                                                                     
   border: 2px solid #ddd;                                                                                            
   border-radius: 8px;                                                                                                
   color: inherit;                                                                                                    
   text-align: center;                                                                                                
   cursor: pointer;
   box-shadow: 
     20px 20px 60px #d9d9d9;                                                                                                                      
   &:hover {                                                                                                          
     border-color: pink;                                                                                       
   }                                                                                                                  
`;                                                                                                                   
                                                                                                                      
const PokemonList: React.FC = () => {                                                                                
   const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);                                                     
   const [loading, setLoading] = useState(true);
   const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
   const [selectedType, setSelectedType] = useState<string | null>(null);
   const [searchTerm, setSearchTerm] = useState('');
                                                                                                                      
   useEffect(() => {                                                                                                  
     const fetchPokemon = async () => {                                                                               
       setLoading(true);
       try {                                                                                                          
         if (selectedType) {
           const pokemonOfType = await getPokemonsByType(selectedType);
           setPokemon(pokemonOfType);
         } else {
           const data = await getPokemonList(151); // First 151 Pokemon                                                 
           setPokemon(data.results);                                                                                    
         }
       } catch (error) {                                                                                              
         console.error('Error fetching pokemon:', error);                                                             
       } finally {                                                                                                    
         setLoading(false);                                                                                           
       }                                                                                                              
     };                                                                                                               
                                                                                                                      
     fetchPokemon();                                                                                                  
   }, [selectedType]);                                                                                            
                                                                                                                      
   return (
     <Container>
       <TypeFilter selectedType={selectedType} onTypeSelect={setSelectedType} />
       <MainContent>
         {loading && (
           <LoadingOverlay>
             <div>Loading...</div>
           </LoadingOverlay>
         )}
         <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
         <PokemonGrid>                                                                                                    
           {pokemon
             .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
             .map((p) => (                                                                                          
             <PokemonCard key={p.name} onClick={() => setSelectedPokemon(p.name)}>                                                         
               <h3>{capitalize(p.name)}</h3>                                                                                          
             </PokemonCard>                                                                                               
           ))}                                                                                                            
         </PokemonGrid>
         {selectedPokemon && (
           <PokemonDetail
             pokemonName={selectedPokemon}
             onClose={() => setSelectedPokemon(null)}
           />
         )}
       </MainContent>
     </Container>                                                                                                   
   );                                                                                                                 
 };                                                                                                                   
                                                                                                                      
 export default PokemonList;  
