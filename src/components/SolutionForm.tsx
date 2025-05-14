import React, { useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameContext';
import { translations } from '../utils/translations';

const SolutionFormContainer = styled.div`
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const FormTitle = styled.h2`
  color: #3498db;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
`;

const FormDescription = styled.p`
  color: #ecf0f1;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #ecf0f1;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  background-color: #34495e;
  border: 1px solid #445567;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

interface SolutionFormProps {
  language: 'english' | 'romanian';
}

const SolutionForm: React.FC<SolutionFormProps> = ({ language }) => {
  const { completeGame } = useGame();
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    departureLocation: '',
    hotel: '',
    departureTime: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Case-insensitive check for name and normalize spaces
    const nameMatch = formData.name.toLowerCase().trim() === 'alex johnson';
    
    // Exact match for employee ID
    const employeeIdMatch = formData.employeeId === 'AJ-20072';
    
    // Check for Fiji (case-insensitive)
    const locationMatch = formData.departureLocation.toLowerCase().trim() === 'fiji';
    
    // Check for Paradise Cove Resort (case-insensitive, allow for 'resort' to be optional)
    const hotelMatch = formData.hotel.toLowerCase().trim().includes('paradise cove');
    
    // Allow 10, 10AM, 10 AM, etc.
    const timeMatch = /^10(\s*am)?$/i.test(formData.departureTime.trim());
    
    if (nameMatch && employeeIdMatch && locationMatch && hotelMatch && timeMatch) {
      completeGame();
      setError('');
    } else {
      setError(translations.incorrectSolution[language]);
    }
  };

  return (
    <SolutionFormContainer>
      <FormTitle>{translations.solutionForm[language]}</FormTitle>
      <FormDescription>{translations.solutionDescription[language]}</FormDescription>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>{translations.colleagueName[language]}</Label>
          <Input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>{translations.employeeId[language]}</Label>
          <Input 
            type="text" 
            name="employeeId" 
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>{translations.departureLocation[language]}</Label>
          <Input 
            type="text" 
            name="departureLocation" 
            value={formData.departureLocation}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>{translations.hotel[language]}</Label>
          <Input 
            type="text" 
            name="hotel" 
            value={formData.hotel}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>{translations.departureTime[language]}</Label>
          <Input 
            type="text" 
            name="departureTime" 
            value={formData.departureTime}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit">
          {translations.submitSolution[language]}
        </SubmitButton>
      </form>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SolutionFormContainer>
  );
};

export default SolutionForm; 