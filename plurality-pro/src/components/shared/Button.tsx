import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'agree' | 'disagree' | 'bridge' | 'submit';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const StyledButton = styled.button<{ variant: string; size: string }>`
  padding: ${props => 
    props.size === 'small' ? '6px 12px' :
    props.size === 'large' ? '15px 30px' : '12px 20px'
  };
  border: none;
  border-radius: ${props => props.size === 'small' ? '8px' : '12px'};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: ${props => 
    props.size === 'small' ? '12px' :
    props.size === 'large' ? '16px' : '14px'
  };

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${props => {
    switch (props.variant) {
      case 'agree':
        return `
          background: linear-gradient(45deg, #10b981, #34d399);
          color: white;
        `;
      case 'disagree':
        return `
          background: linear-gradient(45deg, #ef4444, #f87171);
          color: white;
        `;
      case 'bridge':
        return `
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          animation: bridgePulse 3s infinite;
        `;
      case 'submit':
        return `
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 25px;
        `;
      default:
        return `
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
        `;
    }
  }}
`;

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick,
  disabled = false,
  ...props 
}) => {
  return (
    <StyledButton 
      variant={variant} 
      size={size} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};