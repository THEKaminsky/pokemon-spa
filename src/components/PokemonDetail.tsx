import React, { useEffect, useState } from 'react';                                                                  
import { getPokemonDetail } from '../services/pokemonApi';                                                           
import { PokemonDetail } from '../types/pokemon';  
import { capitalize } from '../utils/stringUtils';                                                
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
  padding: 30px;
  background: white;
  border-radius: 8px;
  position: relative;
  display: flex;
  gap: 40px;
`;

const ImageSection = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 16px;
  padding: 20px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 
    20px 20px 60px #d9d9d9,
    -20px -20px 60px #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.2);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.3);
    }
  }
`;

const DetailSection = styled.div`
  flex-grow: 1;
  
  h1 {
    margin: 0 0 20px 0;
    color: #2e3057;
    font-size: 2.5em;
    font-weight: bold;
  }
  
  .stats {
    display: grid;
    gap: 16px;
    
    p {
      margin: 0;
      font-size: 1.2em;
      color: #4a4a4a;
      display: flex;
      align-items: center;
      
      strong {
        min-width: 80px;
        color: #2e3057;
      }
    }
  }
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
        <ImageSection>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </ImageSection>
        <DetailSection>
          <h1>{capitalize(pokemon.name)}</h1>
          <div className="stats">
            <p><strong>Height:</strong> {pokemon.height / 10}m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10}kg</p>
            <p><strong>Types:</strong> {pokemon.types.map(t => 
              capitalize(t.type.name)
            ).join(', ')}</p>
          </div>
        </DetailSection>
      </DetailContainer>    
    </ModalOverlay>                                                                                           
);                                                                                                                 
};                                                                                                                   
                                                                                                                      
 export default PokemonDetailView;   
