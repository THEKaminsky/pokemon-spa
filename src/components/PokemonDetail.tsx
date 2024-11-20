import React, { useEffect, useState } from 'react';                                                                  
import { getPokemonDetail } from '../services/pokemonApi';                                                           
import { PokemonDetail } from '../types/pokemon';                                                  
import styled from 'styled-components';                                                                              

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
                                                                                                                    
const DetailContainer = styled.div`                                                                                  
  max-width: 800px;                                                                                                  
  margin: 0 auto;                                                                                                    
  padding: 20px;
  background: white;
  border-radius: 8px;
  position: relative;
`;                                                                                                                   
                                                                                                                    
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;
                                                                                                                    
interface PokemonDetailViewProps {
  pokemonName: string;
  onClose: () => void;
}

const PokemonDetailView: React.FC<PokemonDetailViewProps> = ({ pokemonName, onClose }) => {                                                                          
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);                                               
  const [loading, setLoading] = useState(true);                                                                      
                                                                                                                    
useEffect(() => {                                                                                                  
    const fetchPokemonDetail = async () => {                                                                         
    try {                                                                                                          
        const data = await getPokemonDetail(pokemonName);                                                                   
        setPokemon(data);                                                                                            
    } catch (error) {                                                                                              
        console.error('Error fetching pokemon detail:', error);                                                      
    } finally {                                                                                                    
        setLoading(false);                                                                                           
    }                                                                                                              
    };                                                                                                               
                                                                                                                    
    fetchPokemonDetail();                                                                                            
}, [pokemonName]);                                                                                                        
                                                                                                                    
if (loading) return <div>Loading...</div>;                                                                         
if (!pokemon) return <div>Pokemon not found</div>;                                                                 
                                                                                                                    
return (                                                                                                           
    <ModalOverlay onClick={onClose}>
      <DetailContainer onClick={e => e.stopPropagation()}>                                                                                                
        <CloseButton onClick={onClose}>Close</CloseButton>                                                                 
        <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>                                                                                        
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />                                                 
        <div>                                                                                                          
            <p>Height: {pokemon.height / 10}m</p>                                                                        
            <p>Weight: {pokemon.weight / 10}kg</p>                                                                       
            <p>Types: {pokemon.types.map(t => t.type.name).join(', ')}</p>                                               
        </div>                                                                                                         
      </DetailContainer>    
    </ModalOverlay>                                                                                           
);                                                                                                                 
};                                                                                                                   
                                                                                                                      
 export default PokemonDetailView;   
