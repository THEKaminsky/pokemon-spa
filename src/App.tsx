import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetailView from './components/PokemonDetail';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;
                                                                                                                    
const App = () => {                                                                                        
  return (                                                                                                           
    <Router>                                                                                                         
      <GlobalStyle />                                                                                                
      <Routes>                                                                                                       
        <Route path="/" element={<PokemonList />} />                                                                 
        <Route path="/pokemon/:name" element={<PokemonDetailView pokemonName="" onClose={() => {}} />} />                                                  
      </Routes>                                                                                                      
    </Router>                                                                                                        
  );                                                                                                                 
};                                                                                                                   
                                                                                                                      
 export default App;    
