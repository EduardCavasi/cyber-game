import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ClickableItem, InventoryItem } from '../types';
import { useGame } from '../context/GameContext';
import { inventoryItems } from '../utils/gameData';
import { translations } from '../utils/translations';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContainer = styled.div`
  background-color: #2c3e50;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
  
  @media (max-width: 480px) {
    width: 95%;
    max-height: 85vh;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const DialogHeader = styled.div`
  background-color: #34495e;
  padding: 1rem;
  border-bottom: 1px solid #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const DialogTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
  
  &:hover {
    color: #e74c3c;
  }
`;

const DialogContent = styled.div<{ isEmpty?: boolean }>`
  padding: ${props => props.isEmpty ? '0.5rem 1.5rem' : '1.5rem'};
  ${props => props.isEmpty && 'min-height: 0;'}
  
  @media (max-width: 480px) {
    padding: ${props => props.isEmpty ? '0.5rem 1rem' : '1rem'};
  }
`;

const DialogActions = styled.div<{ centered?: boolean }>`
  padding: 1rem;
  display: flex;
  justify-content: ${props => props.centered ? 'center' : 'flex-end'};
  gap: 0.5rem;
  border-top: 1px solid #34495e;
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    flex-direction: ${props => props.centered ? 'row' : 'column'};
    gap: 0.5rem;
  }
`;

const Button = styled.button<{ primary?: boolean; examine?: boolean; disabled?: boolean }>`
  background-color: ${props => {
    if (props.disabled) return '#546778';
    if (props.examine) return '#e74c3c';
    return props.primary ? '#2980b9' : '#34495e';
  }};
  color: white;
  border: none;
  padding: ${props => props.examine ? '0.7rem 1.5rem' : '0.5rem 1rem'};
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  font-weight: bold;
  font-size: ${props => props.examine ? '1.1rem' : 'inherit'};
  transition: background-color 0.2s;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover {
    background-color: ${props => {
      if (props.disabled) return '#546778';
      if (props.examine) return '#c0392b';
      return props.primary ? '#3498db' : '#3d5a80';
    }};
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: ${props => props.examine ? '0.6rem 1.2rem' : '0.5rem 1rem'};
    font-size: ${props => props.examine ? '1rem' : '0.9rem'};
  }
`;

const PasswordInput = styled.input`
  background-color: #34495e;
  border: 1px solid #445567;
  border-radius: 4px;
  padding: 0.7rem 1rem;
  color: white;
  width: 100%;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const HintText = styled.div`
  color: #f39c12;
  font-style: italic;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const PhishingButton = styled(Button)`
  background-color: #e74c3c;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: #c0392b;
  }
`;

// Special styling for the popup notification
const PopupDialogContainer = styled(DialogContainer)`
  background-color: #fff;
  color: #000;
  max-width: 450px;
  border: 3px solid #ff0000;
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
  
  @media (max-width: 480px) {
    max-width: 95%;
  }
`;

const PopupHeader = styled(DialogHeader)`
  background-color: #ff0000;
  color: white;
  padding: 0.8rem 1rem;
  text-align: center;
  justify-content: center;
  position: relative;
`;

const PopupTitle = styled(DialogTitle)`
  color: white;
  font-size: 1.4rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PopupCloseButton = styled(CloseButton)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.8rem;
`;

const PopupContent = styled(DialogContent)`
  padding: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
`;

const PopupButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const PopupButton = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? '#ff0000' : '#555'};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background-color: ${props => props.primary ? '#cc0000' : '#333'};
    transform: scale(1.05);
  }
`;

interface DialogProps {
  item: ClickableItem | InventoryItem | null;
  onClose: () => void;
  language: 'english' | 'romanian';
}

const Dialog: React.FC<DialogProps> = ({ item, onClose, language }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showPhishingWarning, setShowPhishingWarning] = useState(false);
  const [popupResponse, setPopupResponse] = useState<'claim' | 'report' | null>(null);
  const { addToInventory, changeScene, discoverClue, attemptPassword, gameState } = useGame();
  
  if (!item) return null;
  
  const handlePasswordSubmit = () => {
    const clickableItem = item as ClickableItem;
    
    // Check if the password is correct
    if (clickableItem.password && password === clickableItem.password) {
      // If password is correct and the item leads to a new scene
      if (clickableItem.leadsTo) {
        changeScene(clickableItem.leadsTo);
      }
      
      // If it's the computer password, add a discoveryClue
      if (clickableItem.id === 'computer') {
        discoverClue('computer-login');
      }
      
      setError('');
      onClose();
    } else {
      // Increment failed password attempt counter
      attemptPassword();
      
      // Show error and hint after a few attempts
      setError(translations.incorrectPassword[language]);
      setShowHint(true);
    }
  };
  
  const handleCollectItem = (itemId: string) => {
    if (itemId in inventoryItems) {
      const newItem = inventoryItems[itemId as keyof typeof inventoryItems];
      
      // Check if the item is already in the inventory before adding it
      const itemAlreadyCollected = gameState.inventory.some(item => item.id === newItem.id);
      
      if (!itemAlreadyCollected) {
        addToInventory(newItem);
        
        if (newItem.isClue) {
          discoverClue(newItem.id);
        }
      }
    }
  };
  
  const handleNavigate = () => {
    const clickableItem = item as ClickableItem;
    if (clickableItem.leadsTo) {
      changeScene(clickableItem.leadsTo);
      onClose();
    }
  };
  
  const handlePhishingButtonClick = () => {
    setShowPhishingWarning(true);
    // Register the phishing awareness clue
    discoverClue('phishing-awareness');
  };
  
  const isClickableItem = 'type' in item;
  
  // Create Romanian/translated versions of wrong choice and correct choice messages
  const wrongChoiceHtml = `<span style="color: #FF0000; font-weight: bold; font-size: 18px;">${translations.wrongChoice[language]}</span><br/><br/><span style="color: #FF0000; font-weight: bold; font-size: 16px;">${translations.neverClick[language]}</span><br/><br/>${translations.scamTechnique[language]}<br/><ul style="color: #FF0000; font-weight: bold;"><li>${translations.collectPersonalInfo[language]}</li><li>${translations.installMalware[language]}</li><li>${translations.trickFees[language]}</li><li>${translations.expensiveServices[language]}</li></ul><br/><span style="color: #FF0000; font-weight: bold; font-size: 16px;">${translations.beVigilant[language]}</span>`;
  
  const correctChoiceHtml = `<span style="color: #00CC00; font-weight: bold; font-size: 18px;">${translations.correctChoice[language]}</span><br/><br/>${translations.goodJob[language]}<br/><br/><span style="font-weight: bold;">${translations.redFlags[language]}</span><ul><li>${translations.tooGood[language]}</li><li>${translations.contestsNeverEntered[language]}</li><li>${translations.unreleased[language]}</li><li>${translations.grammar[language]}</li><li>${translations.highPressure[language]}</li></ul><br/>${translations.closePopups[language]}`;
  
  return (
    <DialogOverlay onClick={onClose}>
      {isClickableItem && (item as ClickableItem).id === 'browser' ? (
        <PopupDialogContainer onClick={(e) => e.stopPropagation()}>
          <PopupHeader>
            <PopupTitle>{item.name}</PopupTitle>
            <PopupCloseButton onClick={onClose}>&times;</PopupCloseButton>
          </PopupHeader>
          
          <PopupContent>
            {popupResponse === 'claim' ? (
              <div dangerouslySetInnerHTML={{ __html: wrongChoiceHtml }} />
            ) : popupResponse === 'report' ? (
              <div dangerouslySetInnerHTML={{ __html: correctChoiceHtml }} />
            ) : (
              <>
                <p>{item.description}</p>
                
                <PopupButtonContainer>
                  <PopupButton 
                    primary 
                    onClick={() => {
                      setPopupResponse('claim');
                    }}
                  >
                    {translations.claimReward[language]}
                  </PopupButton>
                  
                  <PopupButton 
                    onClick={() => {
                      setPopupResponse('report');
                      discoverClue('scam-awareness');
                    }}
                  >
                    {translations.reportScam[language]}
                  </PopupButton>
                </PopupButtonContainer>
              </>
            )}
            
            {popupResponse && (
              <div style={{ marginTop: '20px' }}>
                <PopupButton onClick={onClose}>
                  {translations.close[language]}
                </PopupButton>
              </div>
            )}
          </PopupContent>
        </PopupDialogContainer>
      ) : (
        <DialogContainer onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </DialogHeader>
          
          <DialogContent isEmpty={isClickableItem && (item as ClickableItem).id === 'calendar'}>
            {/* Hide description for wall calendar, show for all other items */}
            {(!isClickableItem || (item as ClickableItem).id !== 'calendar') && (
              <>
                {isClickableItem && (item as ClickableItem).id === 'run-executable' || 
                  isClickableItem && (item as ClickableItem).id === 'claim-reward' ||
                  isClickableItem && (item as ClickableItem).id === 'report-scam' ? (
                  <div dangerouslySetInnerHTML={{ __html: item.description || '' }} />
                ) : (
                  showPhishingWarning && isClickableItem && (item as ClickableItem).id === 'password-hint-email' ? (
                    <div dangerouslySetInnerHTML={{ __html: translations.phishingWarning[language] }} />
                  ) : (
                    <p>{item.description}</p>
                  )
                )}
                
                {/* Add phishing button if this is the phishing email and warning is not shown yet */}
                {isClickableItem && 
                 (item as ClickableItem).id === 'password-hint-email' && 
                 !showPhishingWarning && (
                  <PhishingButton 
                    onClick={handlePhishingButtonClick}
                  >
                    {translations.clickToSecure[language]}
                  </PhishingButton>
                )}
              </>
            )}
            
            {isClickableItem && (item as ClickableItem).requiresPassword && (
              <>
                <PasswordInput
                  type="password"
                  placeholder={translations.enterPassword[language]}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handlePasswordSubmit();
                    }
                  }}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {showHint && (item as ClickableItem).hint && (
                  <HintText>{(item as ClickableItem).hint}</HintText>
                )}
              </>
            )}
            
            {isClickableItem && (item as ClickableItem).containsItems && (
              <p>{translations.containsItems[language]}</p>
            )}
          </DialogContent>
          
          <DialogActions centered={isClickableItem && (item as ClickableItem).id === 'calendar'}>
            {isClickableItem && 
             (item as ClickableItem).containsItems && 
             (item as ClickableItem).id !== 'password-hint-email' && (
              <Button 
                onClick={() => {
                  const items = (item as ClickableItem).containsItems;
                  if (items && items.length > 0) {
                    items.forEach(itemId => handleCollectItem(itemId));
                  }
                  onClose();
                }}
                disabled={!(item as ClickableItem).containsItems?.some(itemId => 
                  !gameState.inventory.some(invItem => invItem.id === itemId)
                )}
              >
                {(item as ClickableItem).containsItems?.some(itemId => 
                  !gameState.inventory.some(invItem => invItem.id === itemId)
                ) ? translations.collectItems[language] : translations.alreadyCollected[language]}
              </Button>
            )}

            {/* Show an "I Understand" button when phishing warning is displayed */}
            {showPhishingWarning && (
              <Button primary onClick={onClose}>
                {translations.iUnderstand[language]}
              </Button>
            )}
            
            {isClickableItem && (item as ClickableItem).leadsTo && !(item as ClickableItem).requiresPassword && (
              <Button 
                primary={(item as ClickableItem).id !== 'calendar'} 
                examine={(item as ClickableItem).id === 'calendar'}
                onClick={handleNavigate}
              >
                {isClickableItem && (item as ClickableItem).id === 'calendar' ? translations.examine[language].toUpperCase() : ((item as ClickableItem).type === 'door' ? translations.goThrough[language] : translations.examine[language])}
              </Button>
            )}
            
            {isClickableItem && (item as ClickableItem).requiresPassword && (
              <Button primary onClick={handlePasswordSubmit}>
                {translations.submitPassword[language]}
              </Button>
            )}
          </DialogActions>
        </DialogContainer>
      )}
    </DialogOverlay>
  );
};

export default Dialog; 