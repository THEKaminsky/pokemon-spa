import React from 'react';
import styled from 'styled-components';
import { capitalize } from '../utils/stringUtils';

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: 200px;
  padding: 0 20px;
  background-color: #f5f5f5;
  height: 100vh;
  position: fixed;
  left: ${props => props.$isOpen ? '0' : '-240px'};
  top: 0;
  overflow-y: auto;
  transition: left 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    box-shadow: ${props => props.$isOpen ? '2px 0 8px rgba(0,0,0,0.1)' : 'none'};
  }
`;

const ToggleButton = styled.button`
  display: none;
  position: fixed;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  
  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    display: block;

    &:hover {
      background-color: #45a049;
      color: white;
    }
  }
`;

const TypeButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${props => props.$isSelected ? '#4CAF50' : 'white'};
  color: ${props => props.$isSelected ? 'white' : 'black'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$isSelected ? '#45a049' : '#f0f0f0'};
    border-color: #45a049;
  }
`;

interface TypeFilterProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ selectedType, onTypeSelect, isOpen, onToggle } : TypeFilterProps) => {
  return (
    <>
      <ToggleButton onClick={onToggle}>
        {isOpen ? '◀' : '▶'}
      </ToggleButton>
      <SidebarContainer $isOpen={isOpen}>
      <h2>Filter by Type</h2>
      <TypeButton
        $isSelected={selectedType === null}
        onClick={() => onTypeSelect(null)}
      >
        All Types
      </TypeButton>
      {pokemonTypes.map(type => (
        <TypeButton
          key={type}
          $isSelected={selectedType === type}
          onClick={() => onTypeSelect(type)}
        >
          {capitalize(type)}
        </TypeButton>
      ))}
    </SidebarContainer>
    </>
  );
};

export default TypeFilter;
