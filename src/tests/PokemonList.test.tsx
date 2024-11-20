import React from 'react';                                                                                           
import { render, screen, waitFor } from '@testing-library/react';                                                    
import { BrowserRouter } from 'react-router-dom';                                                                    
import PokemonList from '../components/PokemonList';                                                                 
import { getPokemonList } from '../services/pokemonApi';                                                             
                                                                                                                     
jest.mock('../services/pokemonApi');                                                                                 
                                                                                                                     
const mockPokemonList = {                                                                                            
  count: 1,                                                                                                          
  results: [                                                                                                         
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }                                               
  ]                                                                                                                  
};                                                                                                                   
                                                                                                                     
describe('PokemonList', () => {                                                                                      
  beforeEach(() => {                                                                                                 
    (getPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);                                                
  });                                                                                                                
                                                                                                                     
  it('renders pokemon list', async () => {                                                                           
    render(                                                                                                          
      <BrowserRouter>                                                                                                
        <PokemonList />                                                                                              
      </BrowserRouter>                                                                                               
    );                                                                                                               
                                                                                                                     
    expect(screen.getByText('Loading...')).toBeInTheDocument();                                                      
                                                                                                                     
    await waitFor(() => {                                                                                            
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();                                                     
    });                                                                                                              
  });                                                                                                                
});  