import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, InventoryItem } from '../types';

// Initial game state
const initialGameState: GameState = {
  currentScene: 'office',
  inventory: [],
  progress: 0,
  discoveredClues: [],
  passwordAttempts: 0,
  gameComplete: false
};

interface GameContextType {
  gameState: GameState;
  addToInventory: (item: InventoryItem) => void;
  removeFromInventory: (itemId: string) => void;
  changeScene: (sceneId: string) => void;
  discoverClue: (clueId: string) => void;
  attemptPassword: () => void;
  completeGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const addToInventory = (item: InventoryItem) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item]
    }));
  };

  const removeFromInventory = (itemId: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(item => item.id !== itemId)
    }));
  };

  const changeScene = (sceneId: string) => {
    setGameState(prev => ({
      ...prev,
      currentScene: sceneId
    }));
  };

  const discoverClue = (clueId: string) => {
    if (!gameState.discoveredClues.includes(clueId)) {
      setGameState(prev => ({
        ...prev,
        discoveredClues: [...prev.discoveredClues, clueId],
        progress: prev.progress + 10 // Increment progress by 10% for each clue
      }));
    }
  };

  const attemptPassword = () => {
    setGameState(prev => ({
      ...prev,
      passwordAttempts: prev.passwordAttempts + 1
    }));
  };

  const completeGame = () => {
    setGameState(prev => ({
      ...prev,
      gameComplete: true
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        addToInventory,
        removeFromInventory,
        changeScene,
        discoverClue,
        attemptPassword,
        completeGame,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 