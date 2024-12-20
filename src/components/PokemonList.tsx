import React, { useEffect, useState } from 'react';                                                                  
import { getPokemonList } from '../services/pokemonApi';                                                             
import { PokemonListItem } from '../types/pokemon';                                                                  
import styled from 'styled-components';
import TypeFilter from './TypeFilter';
import PokemonDetail from './PokemonDetail';
import SearchBar from './SearchBar';
import { capitalize } from '../utils/stringUtils';
                                                                                                                      
const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div<{ $sidebarOpen: boolean }>`
  margin-left: ${props => props.$sidebarOpen ? '240px' : '0'};
  width: ${props => props.$sidebarOpen ? 'calc(100% - 240px)' : '100%'};
  position: relative;
  transition: margin-left 0.3s ease, width 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
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
     5px 5px 15px rgba(0, 0, 0, 0.1);  
                                                                                                                    
   &:hover {                                                                                                          
     transform: translateY(-2px);
      border-color: #45a049;
     box-shadow: 
       5px 5px 20px rgba(0, 0, 0, 0.15);                                                                                       
   }                                                                                                                  
`;                                                                                                                   
                                                                                                                      
const PokemonList = () => {                                                                                
   const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);                                                     
   const [loading, setLoading] = useState(true);
   const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
   const [selectedType, setSelectedType] = useState<string | null>(null);
   const [searchTerm, setSearchTerm] = useState('');
   // checks size of window and sets sidebar to open or closed based on the result
   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

   useEffect(() => {
     const handleResize = () => {
       setIsSidebarOpen(window.innerWidth > 768);
     };

     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
   }, []);
                                                                                                                      
   useEffect(() => {                                                                                                  
     const fetchPokemon = async () => {                                                                               
       setLoading(true);
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
                                                                                                                      
   return (
     <Container>
       <TypeFilter 
         selectedType={selectedType} 
         onTypeSelect={setSelectedType}
         isOpen={isSidebarOpen}
         onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
       />
       <MainContent $sidebarOpen={isSidebarOpen}>
         {loading && (
           <LoadingOverlay>
             <div>Loading...</div>
           </LoadingOverlay>
         )}
         <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
         <PokemonGrid data-testid="pokemon-grid">                                                                                                    
           {pokemon
             .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
             .filter(p => !selectedType || p.types?.some((t: {type: {name: string}}) => t.type.name === selectedType))
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
