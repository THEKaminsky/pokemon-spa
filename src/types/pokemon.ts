export type PokemonListItem = {                                                                                   
    name: string;                                                                                                      
    url: string;                                                                                                       
  }                                                                                                                    
                                                                                                                       
  export type PokemonDetail = {                                                                                     
    id: number;                                                                                                        
    name: string;                                                                                                      
    height: number;                                                                                                    
    weight: number;                                                                                                    
    sprites: {                                                                                                         
      front_default: string;                                                                                           
    };                                                                                                                 
    types: {                                                                                                           
      type: {                                                                                                          
        name: string;                                                                                                  
      };                                                                                                               
    }[];                                                                                                               
  }                                                                                                                    
                                                                                                                       
  export type PokemonListResponse = {                                                                               
    count: number;                                                                                                     
    results: PokemonListItem[];                                                                                        
  } 