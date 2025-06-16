import React from 'react';
import styled from 'styled-components';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

const FloatingFab = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.6);
  }
`;

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <FloatingFab onClick={onClick}>
      ➕
    </FloatingFab>
  );
};