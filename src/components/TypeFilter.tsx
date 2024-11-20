import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  padding: 20px;
  background-color: #f5f5f5;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const TypeButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${props => props.isSelected ? '#4CAF50' : 'white'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#45a049' : '#f0f0f0'};
  }
`;

interface TypeFilterProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
}

const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <SidebarContainer>
      <h2>Filter by Type</h2>
      <TypeButton
        isSelected={selectedType === null}
        onClick={() => onTypeSelect(null)}
      >
        All Types
      </TypeButton>
      {pokemonTypes.map(type => (
        <TypeButton
          key={type}
          isSelected={selectedType === type}
          onClick={() => onTypeSelect(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </TypeButton>
      ))}
    </SidebarContainer>
  );
};

export default TypeFilter;
