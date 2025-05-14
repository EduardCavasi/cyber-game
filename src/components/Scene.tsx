import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import { ClickableItem as ClickableItemType } from '../types';
import { scenes } from '../utils/gameData';
import { translations } from '../utils/translations';

// Background images for each scene
const backgroundImages = {
  office: "/images/office.jpg", // Updated to use the local office image
  computerDesktop: "/images/desktop.png", // Updated to use the local desktop image
  emailClient: "/images/mailbox.png", // Updated to use mailbox.png image
  filesFolder: "/images/files.png", // Updated to use the local files image
  browser: "https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Browser with map
  calendarView: "/images/calendar.png" // Calendar close-up
};

// Export this component for use in other files
export const SceneDescription = styled.div`
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  border-top: 1px solid #444;
  z-index: 15;
`;

const SceneContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #1a1a1a;
  border: 2px solid #333;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
    pointer-events: none;
  }
`;

const ClickableArea = styled.div<{
  x: number;
  y: number;
  width: number;
  height: number;
  itemType: string;
}>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: ${props => props.width}%;
  height: ${props => props.height}%;
  cursor: pointer;
  background-color: transparent;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  &:hover {
    outline: none;
    box-shadow: none;
    background-color: transparent;
  }
`;

const HoverIndicator = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  z-index: 20;
  transition: opacity 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;

const SceneName = styled.h2`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: white;
  text-shadow: 1px 1px 2px black;
  margin: 0;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  z-index: 15;
`;

const PositionDebugPanel = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 100;
`;

const ItemLabel = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 6px;
  border-radius: 2px;
  font-size: 0.7rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 25;
`;

const BackButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 25;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
  
  &::before {
    content: "←";
    font-size: 1.1rem;
  }
`;

// Update clickable area positions based on the selected images
const getUpdatedClickableItems = (scene: string, items: ClickableItemType[]) => {
  const updatedItems = [...items];
  
  // Adjust positions based on the specific scene and actual positions in the image
  if (scene === 'office') {
    // Find sticky note and position it on the desk
    const stickyNoteItem = updatedItems.find(item => item.id === 'sticky-note');
    if (stickyNoteItem) {
      stickyNoteItem.x = 55;  // Position of sticky note on desk
      stickyNoteItem.y = 67;
      stickyNoteItem.width = 10;
      stickyNoteItem.height = 10;
    }
    
    // Position calculator on the desk
    const calculatorItem = updatedItems.find(item => item.id === 'calculator');
    if (calculatorItem) {
      calculatorItem.x = 50;  // Position of calculator on desk
      calculatorItem.y = 35;
      calculatorItem.width = 35;
      calculatorItem.height = 28;
    }
    
    const calendarItem = updatedItems.find(item => item.id === 'calendar');
    if (calendarItem) {
      calendarItem.x = 50;
      calendarItem.y = 10;
      calendarItem.width = 35;
      calendarItem.height = 28;
      calendarItem.leadsTo = 'calendarView';
    }
    
    // Update drawer position
    const drawerItem = updatedItems.find(item => item.id === 'desk-drawer');
    if (drawerItem) {
      drawerItem.x = 54;  // Desk drawer position
      drawerItem.y = 85;
      drawerItem.width = 12;
      drawerItem.height = 14;
    }
    
    // Update trash bin position
    const trashBinItem = updatedItems.find(item => item.id === 'trash-bin');
    if (trashBinItem) {
      trashBinItem.x = 10;  // Trash bin position
      trashBinItem.y = 80;
      trashBinItem.width = 15;
      trashBinItem.height = 15;
    }
    
    // Update bookshelf position
    const bookshelfItem = updatedItems.find(item => item.id === 'bookshelf');
    if (bookshelfItem) {
      bookshelfItem.x = 10;  // Bookshelf position
      bookshelfItem.y = 30;
      bookshelfItem.width = 20;
      bookshelfItem.height = 40;
    }
  } 
  else if (scene === 'calendarView') {
    // Back button for calendar view
    const backButton = updatedItems.find(item => item.id === 'back-to-office');
    if (backButton) {
      backButton.x = 10;
      backButton.y = 90;
      backButton.width = 15;
      backButton.height = 8;
    }
    
    // Examine calendar clickable area
    const examineCalendar = updatedItems.find(item => item.id === 'examine-calendar');
    if (examineCalendar) {
      examineCalendar.x = 40;
      examineCalendar.y = 40;
      examineCalendar.width = 50;
      examineCalendar.height = 40;
    }
  }
  else if (scene === 'computerDesktop') {
    // Email client icon
    const emailItem = updatedItems.find(item => item.id === 'email-client');
    if (emailItem) {
      emailItem.x = 45;
      emailItem.y = 35;
      emailItem.width = 10;
      emailItem.height = 15;
    }
    
    // Files folder icon
    const filesItem = updatedItems.find(item => item.id === 'files-folder');
    if (filesItem) {
      filesItem.x = 20;
      filesItem.y = 35;
      filesItem.width = 10;
      filesItem.height = 15;
    }
    
    // Browser icon
    const browserItem = updatedItems.find(item => item.id === 'browser');
    if (browserItem) {
      browserItem.x = 75;
      browserItem.y = 35;
      browserItem.width = 10;
      browserItem.height = 15;
    }
    
    // Back button
    const backItem = updatedItems.find(item => item.id === 'return-to-office');
    if (backItem) {
      backItem.x = 85;
      backItem.y = 85;
      backItem.width = 12;
      backItem.height = 10;
    }
  }
  else if (scene === 'emailClient') {
    // Flight confirmation email
    const suspiciousEmail = updatedItems.find(item => item.id === 'suspicious-email');
    if (suspiciousEmail) {
      suspiciousEmail.x = 20;
      suspiciousEmail.y = 30;
      suspiciousEmail.width = 20;
      suspiciousEmail.height = 10;
    }
    
    // Password hint email
    const passwordEmail = updatedItems.find(item => item.id === 'password-hint-email');
    if (passwordEmail) {
      passwordEmail.x = 20;
      passwordEmail.y = 50;
      passwordEmail.width = 20;
      passwordEmail.height = 10;
    }
    
    // Travel booking email
    const travelEmail = updatedItems.find(item => item.id === 'travel-booking-email');
    if (travelEmail) {
      travelEmail.x = 20;
      travelEmail.y = 70;
      travelEmail.width = 20;
      travelEmail.height = 10;
    }
    
    // Back button
    const backItem = updatedItems.find(item => item.id === 'back-to-desktop');
    if (backItem) {
      backItem.x = 15;
      backItem.y = 90;
      backItem.width = 12;
      backItem.height = 8;
    }
  }
  else if (scene === 'filesFolder') {
    // Executable file
    const executableFile = updatedItems.find(item => item.id === 'run-executable');
    if (executableFile) {
      executableFile.x = 30;
      executableFile.y = 30;
      executableFile.width = 50;
      executableFile.height = 12;
    }
    
    // Back button
    const backItem = updatedItems.find(item => item.id === 'back-to-desktop');
    if (backItem) {
      backItem.x = 10;
      backItem.y = 85;
      backItem.width = 12;
      backItem.height = 10;
    }
  }
  else if (scene === 'browser') {
    // Fiji search result
    const fijiSearch = updatedItems.find(item => item.id === 'fiji-search');
    if (fijiSearch) {
      fijiSearch.x = 25;
      fijiSearch.y = 70;
      fijiSearch.width = 30;
      fijiSearch.height = 12;
      fijiSearch.description = 'Search results for "Fiji resorts with no extradition".';
    }
    
    // Map location
    const mapLocation = updatedItems.find(item => item.id === 'map-location');
    if (mapLocation) {
      mapLocation.x = 65;
      mapLocation.y = 70;
      mapLocation.width = 30;
      mapLocation.height = 12;
      mapLocation.description = 'A map showing a specific location in Fiji: "Paradise Cove Resort".';
    }
    
    // Back button
    const backItem = updatedItems.find(item => item.id === 'back-to-desktop');
    if (backItem) {
      backItem.x = 10;
      backItem.y = 85;
      backItem.width = 12;
      backItem.height = 10;
    }
  }
  
  return updatedItems;
};

export interface SceneProps {
  onItemClick: (item: ClickableItemType) => void;
  onDescriptionDisplay: (description: string) => void;
  language: 'english' | 'romanian';
}

const Scene: React.FC<SceneProps> = ({ onItemClick, onDescriptionDisplay, language }) => {
  const { gameState, changeScene } = useGame();
  const currentScene = scenes[gameState.currentScene];
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [debugMode, setDebugMode] = useState(false);
  const [mousePercent, setMousePercent] = useState({ x: 0, y: 0 });

  // Determine if the current scene has a parent scene to go back to
  const hasBackButton = currentScene.id !== 'office' && 
                          currentScene.clickableItems.some(item => 
                            item.id.startsWith('back-to-') || item.id === 'return-to-office'
                          );

  // Get updated clickable items based on actual positions in the image
  const adjustedClickableItems = getUpdatedClickableItems(
    currentScene.id, 
    currentScene.clickableItems
  );

  // Send the description to parent component
  useEffect(() => {
    if (onDescriptionDisplay && currentScene.description) {
      onDescriptionDisplay(currentScene.description);
    }
  }, [currentScene.description, onDescriptionDisplay]);

  const handleItemClick = (item: ClickableItemType) => {
    onItemClick(item);
  };

  const handleBackClick = () => {
    const backButton = currentScene.clickableItems.find(item => 
      item.id.startsWith('back-to-') || item.id === 'return-to-office'
    );
    if (backButton && backButton.leadsTo) {
      changeScene(backButton.leadsTo);
    }
  };

  const handleItemHover = (itemName: string | null, e?: React.MouseEvent) => {
    // Don't show hover text in calendar view for non-debug mode
    if (currentScene.id === 'calendarView' && !debugMode && itemName !== null) {
      setHoverItem(null);
      return;
    }
    
    setHoverItem(itemName);
    if (e) {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePos({ x, y });
      
      // Calculate percentage positions for debug mode
      const percentX = Math.round((x / rect.width) * 100);
      const percentY = Math.round((y / rect.height) * 100);
      setMousePercent({ x: percentX, y: percentY });
    }
    
    if (hoverItem) {
      // Update hover indicator position
    }
  };

  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  useEffect(() => {
    // Add keyboard shortcut for debug mode (Ctrl+Shift+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        toggleDebugMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [debugMode]);

  return (
    <SceneContainer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ 
        backgroundImage: `url(${backgroundImages[currentScene.id as keyof typeof backgroundImages]})`
      }}
    >
      <SceneName>{currentScene.name}</SceneName>
      
      {debugMode && (
        <PositionDebugPanel>
          Mouse position: {mousePercent.x}% x {mousePercent.y}%
        </PositionDebugPanel>
      )}
      
      {/* Add visible back button */}
      {hasBackButton && (
        <BackButton onClick={handleBackClick}>
          {translations.backToOffice[language]}
        </BackButton>
      )}
      
      {hoverItem && currentScene.id !== 'calendarView' && (
        <HoverIndicator 
          style={{ 
            left: mousePos.x + 15, 
            top: mousePos.y + 15
          }}
        >
          {hoverItem}
        </HoverIndicator>
      )}
      
      {adjustedClickableItems.map((item) => (
        <React.Fragment key={item.id}>
          <ClickableArea
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
            itemType={item.type}
            onClick={() => handleItemClick(item)}
            onMouseEnter={(e) => handleItemHover(item.name, e)}
            onMouseLeave={() => handleItemHover(null)}
            title={item.name}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              zIndex: debugMode ? 20 : 10
            }}
          />
          
          {debugMode && (
            <ItemLabel style={{ left: `${item.x}%`, top: `${item.y - 5}%` }}>
              {item.name} ({item.x},{item.y})
            </ItemLabel>
          )}
        </React.Fragment>
      ))}
      
      {debugMode && (
        <div style={{ position: 'absolute', bottom: '60px', right: '10px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px', borderRadius: '5px', fontSize: '12px' }}>
          <p>Debug Mode Active</p>
          <p>Press Ctrl+Shift+D to toggle</p>
        </div>
      )}
    </SceneContainer>
  );
};

export default Scene; 