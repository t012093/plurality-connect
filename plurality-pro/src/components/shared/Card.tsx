import React from 'react';
import styled from 'styled-components';

interface CardProps {
  variant?: 'glass' | 'solid' | 'gradient';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StyledCard = styled.div<{ variant: string }>`
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  ${props => {
    switch (props.variant) {
      case 'glass':
        return `
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
        `;
      case 'solid':
        return `
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        `;
      case 'gradient':
        return `
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
          border-left: 4px solid #6366f1;
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
        `;
    }
  }}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

export const Card: React.FC<CardProps> = ({ 
  variant = 'glass', 
  children, 
  className,
  style
}) => {
  return (
    <StyledCard variant={variant} className={className} style={style}>
      {children}
    </StyledCard>
  );
};