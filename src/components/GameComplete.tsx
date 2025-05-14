import React, { useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import { translations } from '../utils/translations';

const GameCompleteContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 1s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ContentContainer = styled.div`
  background-color: #2c3e50;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  animation: scaleIn 0.5s ease-out;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    width: 95%;
    padding: 1rem;
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const Title = styled.h1`
  color: #27ae60;
  margin-top: 0;
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const SubTitle = styled.h2`
  color: #3498db;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Message = styled.p`
  color: #ecf0f1;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1.5rem 0;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
    margin: 1rem 0;
  }
`;

const CyberSecurityLessons = styled.div`
  background-color: #34495e;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  text-align: left;
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin: 1rem 0;
  }
`;

const LessonTitle = styled.h3`
  color: #f39c12;
  margin-top: 0;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const LessonList = styled.ul`
  padding-left: 1.5rem;
  color: #ecf0f1;
  
  @media (max-width: 480px) {
    padding-left: 1.2rem;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
  
  &:hover {
    background-color: #2980b9;
  }
  
  @media (max-width: 480px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

interface GameCompleteProps {
  language: 'english' | 'romanian';
}

const GameComplete: React.FC<GameCompleteProps> = ({ language }) => {
  const { resetGame } = useGame();
  
  return (
    <GameCompleteContainer>
      <ContentContainer>
        <Title>{translations.missionAccomplished[language]}</Title>
        <SubTitle>{translations.caseSolved[language]}</SubTitle>
        
        <Message>
          {translations.congratulations[language]}
        </Message>
        
        <CyberSecurityLessons>
          <LessonTitle>{translations.cybersecurityLessons[language]}</LessonTitle>
          <LessonList>
            <li>{translations.lesson1[language]}</li>
            <li>{translations.lesson2[language]}</li>
            <li>{translations.lesson3[language]}</li>
            <li>{translations.lesson4[language]}</li>
            <li>{translations.lesson5[language]}</li>
          </LessonList>
        </CyberSecurityLessons>
        
        <Button onClick={resetGame}>{translations.playAgain[language]}</Button>
      </ContentContainer>
    </GameCompleteContainer>
  );
};

export default GameComplete; 