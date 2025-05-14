import React from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import { InventoryItem as InventoryItemType } from '../types';
import { translations } from '../utils/translations';

const InventoryContainer = styled.div`
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const InventoryTitle = styled.h2`
  color: #ecf0f1;
  margin: 0 0 0.5rem 0;
  border-bottom: 1px solid #34495e;
  padding-bottom: 0.4rem;
  font-size: 1.2rem;
  text-align: center;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  overflow-y: auto;
  flex-grow: 1;
  max-height: 320px;
  padding-right: 5px;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #34495e;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #3498db;
    border-radius: 3px;
  }
`;

const Item = styled.div`
  background-color: #34495e;
  aspect-ratio: 1;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  text-align: center;
  
  &:hover {
    background-color: #3d5a80;
    transform: translateY(-2px);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  }
`;

const ItemName = styled.div`
  color: #ecf0f1;
  font-weight: bold;
  font-size: 0.85rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ClueIndicator = styled.span`
  color: #f39c12;
  font-size: 1rem;
  display: block;
  margin-top: 3px;
`;

const EmptyInventory = styled.div`
  color: #7f8c8d;
  text-align: center;
  padding: 0.5rem;
  font-style: italic;
  font-size: 0.8rem;
`;

interface InventoryProps {
  onItemSelect: (item: InventoryItemType) => void;
  language: 'english' | 'romanian';
}

const Inventory: React.FC<InventoryProps> = ({ onItemSelect, language }) => {
  const { gameState } = useGame();
  
  return (
    <InventoryContainer>
      <InventoryTitle>{translations.inventory[language]}</InventoryTitle>
      {gameState.inventory.length === 0 ? (
        <EmptyInventory>{translations.emptyInventory[language]}</EmptyInventory>
      ) : (
        <ItemsContainer>
          {gameState.inventory.map((item) => (
            <Item key={item.id} onClick={() => onItemSelect(item)}>
              {item.isClue && <ClueIndicator>★</ClueIndicator>}
              <ItemName>
                {item.name}
              </ItemName>
            </Item>
          ))}
        </ItemsContainer>
      )}
    </InventoryContainer>
  );
};

export default Inventory; 