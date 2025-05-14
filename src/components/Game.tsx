import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import Scene, { SceneDescription } from './Scene';
import Inventory from './Inventory';
import Dialog from './Dialog';
import CluesPanel from './CluesPanel';
import Introduction from './Introduction';
import GameComplete from './GameComplete';
import SolutionForm from './SolutionForm';
import { ClickableItem, InventoryItem } from '../types';
import { translations } from '../utils/translations';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  background-color: #1a1a1a;
  font-family: 'Roboto', sans-serif;
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const Title = styled.h1`
  color: #3498db;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const LanguageSelector = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LanguageButton = styled.button<{ active: boolean }>`
  background-color: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#999'};
  border: 1px solid ${props => props.active ? '#3498db' : '#999'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : 'rgba(52, 152, 219, 0.2)'};
  }
`;

const ResetButton = styled.button`
  background-color: transparent;
  color: #999;
  border: 1px solid #999;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 1rem;
  
  &:hover {
    background-color: rgba(255, 0, 0, 0.2);
    color: #fff;
    border-color: #fff;
  }
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh;
  color: white;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    height: auto;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #3498db;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const StartButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

const Attribution = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 2rem;
  max-width: 600px;
`;

// Add a styled component for the scene description
const SceneDescriptionBox = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  border-left: 4px solid #3498db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const SolutionButton = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  transition: background-color 0.2s;
  width: 100%;
  
  &:hover {
    background-color: #2ecc71;
  }
`;

const Game: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ClickableItem | InventoryItem | null>(null);
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [language, setLanguage] = useState<'english' | 'romanian'>('romanian');
  const [sceneDescription, setSceneDescription] = useState<string>('');
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const { gameState, completeGame, resetGame, changeScene } = useGame();

  // Check if game should be completed based on gathered clues
  useEffect(() => {
    if (gameState.discoveredClues.length >= 5 && 
        gameState.discoveredClues.includes('calendar') && 
        gameState.discoveredClues.includes('crumpled-paper') && 
        gameState.discoveredClues.includes('security-book') &&
        gameState.discoveredClues.includes('executable-warning') &&
        gameState.discoveredClues.includes('scam-awareness')) {
      // If all key clues are found, complete the game
      completeGame();
    }
  }, [gameState.discoveredClues, completeGame]);

  const handleItemClick = (item: ClickableItem) => {
    // If the item is the calendar in the office scene, navigate directly to calendarView scene
    if (item.id === 'calendar' && item.leadsTo === 'calendarView') {
      changeScene('calendarView');
      return;
    }
    
    // For all other items, show the dialog
    setSelectedItem(item);
  };

  const handleInventoryItemSelect = (item: InventoryItem) => {
    setSelectedItem(item);
  };

  const handleDialogClose = () => {
    setSelectedItem(null);
  };

  const handleStartGame = () => {
    setShowIntroduction(false);
  };

  const handleStartFromWelcome = () => {
    setShowWelcome(false);
    setShowIntroduction(true);
  };

  const handleLanguageChange = (lang: 'english' | 'romanian') => {
    setLanguage(lang);
  };

  const handleResetGame = () => {
    if (window.confirm(translations.resetConfirm[language])) {
      resetGame();
      setShowWelcome(true);
    }
  };

  const handleSceneDescription = (description: string) => {
    setSceneDescription(description);
  };

  const toggleSolutionForm = () => {
    setShowSolutionForm(!showSolutionForm);
  };

  if (showWelcome) {
    return (
      <GameContainer>
        <Header>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>{translations.gameTitle[language]}</span>
            <ResetButton onClick={handleResetGame}>{translations.resetGame[language]}</ResetButton>
          </div>
        </Header>
        
        <WelcomeScreen>
          <WelcomeTitle>{translations.welcomeTitle[language]}</WelcomeTitle>
          
          <div style={{ maxWidth: '800px', textAlign: 'left', color: '#ecf0f1', lineHeight: '1.6' }}>
            <h2 style={{ color: '#3498db' }}>{translations.theCase[language]}</h2>
            <p>
              <strong>{translations.missionBriefing[language]}</strong> {translations.missionDescription1[language]}
            </p>
            
            <p>
              {translations.missionDescription2[language]}
            </p>
            
            <h2 style={{ color: '#3498db', marginTop: '20px' }}>{translations.yourTask[language]}</h2>
            <p>
              {translations.taskDescription[language]}
            </p>
            
            <h2 style={{ color: '#3498db', marginTop: '20px' }}>{translations.howToPlay[language]}</h2>
            <ul>
              <li>{translations.howToPlay1[language]}</li>
              <li>{translations.howToPlay2[language]}</li>
              <li>{translations.howToPlay3[language]}</li>
              <li>{translations.howToPlay4[language]}</li>
            </ul>
          </div>
          
          <StartButton onClick={handleStartFromWelcome}>
            {translations.startInvestigation[language]}
          </StartButton>
        </WelcomeScreen>
      </GameContainer>
    );
  }
  
  return (
    <GameContainer>
      {showIntroduction && (
        <Introduction onStart={handleStartGame} language={language} />
      )}
      
      {gameState.gameComplete && (
        <GameComplete language={language} />
      )}
      
      <Header>
        <Title>{translations.gameTitle[language]}</Title>
        <ResetButton onClick={handleResetGame}>
          {translations.resetGame[language]}
        </ResetButton>
      </Header>
      
      {/* Display scene description outside the image pane */}
      {sceneDescription && (
        <SceneDescriptionBox>
          {sceneDescription}
        </SceneDescriptionBox>
      )}
      
      <MainContent>
        <Scene 
          onItemClick={handleItemClick} 
          onDescriptionDisplay={handleSceneDescription}
          language={language}
        />
        
        <SidePanel>
          <Inventory onItemSelect={handleInventoryItemSelect} language={language} />
          <CluesPanel language={language} />
          
          {/* Solution form toggle button */}
          <SolutionButton onClick={toggleSolutionForm}>
            {translations.toggleSolutionForm[language]}
          </SolutionButton>
          
          {/* Show the solution form when toggled */}
          {showSolutionForm && (
            <SolutionForm language={language} />
          )}
        </SidePanel>
      </MainContent>
      
      {selectedItem && (
        <Dialog item={selectedItem} onClose={handleDialogClose} language={language} />
      )}
    </GameContainer>
  );
};

export default Game; 