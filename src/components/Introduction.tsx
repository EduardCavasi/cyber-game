import React from 'react';
import styled from 'styled-components';
import { translations } from '../utils/translations';

const IntroContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
  overflow-y: auto;
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    align-items: flex-start;
    padding-top: 2rem;
  }
  
  @media (max-height: 600px) {
    align-items: flex-start;
    padding-top: 1rem;
  }
`;

const IntroContent = styled.div`
  background-color: #2c3e50;
  border-radius: 10px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
    max-height: 85vh;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    width: 100%;
    max-height: 80vh;
    border-radius: 8px;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #3498db;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.7rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }
`;

const ContentSection = styled.div`
  max-width: 800px;
  text-align: left;
  color: #ecf0f1;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  ul {
    padding-left: 1.5rem;
    
    @media (max-width: 480px) {
      padding-left: 1.2rem;
    }
  }
  
  li {
    margin-bottom: 0.5rem;
    
    @media (max-width: 480px) {
      margin-bottom: 0.4rem;
    }
  }
`;

const SectionTitle = styled.h2`
  color: #3498db;
  margin-top: 20px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    margin-top: 18px;
    margin-bottom: 12px;
    font-size: 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-top: 15px;
    margin-bottom: 10px;
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
  min-height: 50px;
  
  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 0.9rem 1.8rem;
    font-size: 1.1rem;
    margin-top: 1.8rem;
    min-height: 48px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    margin-top: 1.5rem;
    width: 100%;
    min-height: 46px;
  }
`;

interface IntroductionProps {
  onStart: () => void;
  language: 'english' | 'romanian';
}

const Introduction: React.FC<IntroductionProps> = ({ onStart, language }) => {
  // Add a touch event handler for better mobile experience
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <IntroContainer>
      <IntroContent onTouchStart={handleTouchStart}>
        <WelcomeTitle>{translations.welcomeTitle[language]}</WelcomeTitle>
        
        <ContentSection>
          <SectionTitle>{translations.theCase[language]}</SectionTitle>
          <p>
            <strong>{translations.missionBriefing[language]}</strong> {translations.missionDescription1[language]}
          </p>
          
          <p>
            {translations.missionDescription2[language]}
          </p>
          
          <SectionTitle>{translations.yourTask[language]}</SectionTitle>
          <p>
            {translations.taskDescription[language]}
          </p>
          
          <SectionTitle>{translations.howToPlay[language]}</SectionTitle>
          <ul>
            <li>{translations.howToPlay1[language]}</li>
            <li>{translations.howToPlay2[language]}</li>
            <li>{translations.howToPlay3[language]}</li>
            <li>{translations.howToPlay4[language]}</li>
          </ul>
        </ContentSection>
        
        <StartButton onClick={onStart}>
          {translations.startInvestigation[language]}
        </StartButton>
      </IntroContent>
    </IntroContainer>
  );
};

export default Introduction; 