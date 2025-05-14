import React from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import { clues } from '../utils/gameData';
import { translations } from '../utils/translations';

const CluesPanelContainer = styled.div`
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const CluesPanelTitle = styled.h2`
  color: #ecf0f1;
  margin-top: 0;
  border-bottom: 1px solid #34495e;
  padding-bottom: 0.5rem;
  text-align: center;
  font-size: 1.2rem;
`;

const CluesList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 0;
`;

const ClueItem = styled.li`
  color: #ecf0f1;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const NoClues = styled.div`
  color: #7f8c8d;
  text-align: center;
  padding: 0.5rem;
  font-style: italic;
`;

interface CluesPanelProps {
  language: 'english' | 'romanian';
}

const CluesPanel: React.FC<CluesPanelProps> = ({ language }) => {
  const { gameState } = useGame();
  
  // Get details of discovered clues
  const discoveredCluesDetails = clues.filter(clue => {
    // Check if any of the items that can reveal this clue have been discovered
    return clue.foundIn.some(location => gameState.discoveredClues.includes(location)) || 
      // Also include clue if the ID itself has been directly discovered
      gameState.discoveredClues.includes(clue.id);
  });
  
  return (
    <CluesPanelContainer>
      <CluesPanelTitle>
        {translations.discoveredClues[language]}
      </CluesPanelTitle>
      
      {discoveredCluesDetails.length === 0 ? (
        <NoClues>{translations.noClues[language]}</NoClues>
      ) : (
        <CluesList>
          {discoveredCluesDetails.map(clue => (
            <ClueItem key={clue.id}>{clue.text}</ClueItem>
          ))}
        </CluesList>
      )}
    </CluesPanelContainer>
  );
};

export default CluesPanel;