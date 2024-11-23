export type PokemonListItem = {                                                                                   
    name: string;                                                                                                      
    url: string;
    types?: Array<{
      type: {
        name: string;
      };
    }>;                                                                                                       
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
    abilities: {
      ability: {
        name: string;
      };
      is_hidden: boolean;
    }[];
    cries?: {
      latest: string;
      legacy: string
    };  
    cryUrl?: string                                                                                             
  }                                                                                                                    
                                                                                                                       
  export type PokemonListResponse = {                                                                               
    count: number;                                                                                                     
    results: PokemonListItem[];                                                                                        
  } 
