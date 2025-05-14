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
`;

const IntroContent = styled.div`
  background-color: #2c3e50;
  border-radius: 10px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #3498db;
`;

const ContentSection = styled.div`
  max-width: 800px;
  text-align: left;
  color: #ecf0f1;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  color: #3498db;
  margin-top: 20px;
  margin-bottom: 15px;
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

interface IntroductionProps {
  onStart: () => void;
  language: 'english' | 'romanian';
}

const Introduction: React.FC<IntroductionProps> = ({ onStart, language }) => {
  return (
    <IntroContainer>
      <IntroContent>
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