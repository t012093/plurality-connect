import React from 'react';
import styled from 'styled-components';

interface ConsensusMeterProps {
  consensusRate: number;
  bridgeRate: number;
}

const ConsensusContainer = styled.div`
  margin: 20px 0;
`;

const ConsensusLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
`;

const MeterContainer = styled.div`
  background: #f3f4f6;
  border-radius: 10px;
  height: 12px;
  position: relative;
  overflow: hidden;
`;

const MeterFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #10b981 75%, #059669 100%);
  border-radius: 10px;
`;

const MeterIndicator = styled.div<{ position: number }>`
  position: absolute;
  top: -4px;
  left: ${props => props.position}%;
  width: 20px;
  height: 20px;
  background: #6366f1;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.8);
  animation: pulse 2s infinite;
  z-index: 2;
  transform: translateX(-50%);
`;

const ConsensusScore = styled.div`
  text-align: center;
  margin-top: 12px;
  font-weight: 600;
  color: #6366f1;
  font-size: 16px;
`;

export const ConsensusMeter: React.FC<ConsensusMeterProps> = ({ 
  consensusRate, 
  bridgeRate 
}) => {
  return (
    <ConsensusContainer>
      <ConsensusLabel>
        <span>強い反対</span>
        <span>中立</span>
        <span>強い賛成</span>
      </ConsensusLabel>
      <MeterContainer>
        <MeterFill />
        <MeterIndicator position={consensusRate} />
      </MeterContainer>
      <ConsensusScore>
        合意率: {consensusRate}% | ブリッジ度: {bridgeRate}%
      </ConsensusScore>
    </ConsensusContainer>
  );
};