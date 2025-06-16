import React from 'react';
import styled from 'styled-components';
import { ConsensusMeter } from './ConsensusMeter';
import { ParticipantCard } from './ParticipantCard';

interface DecisionLayerProps {
  title: string;
  icon: string;
  status: 'completed' | 'active' | 'pending';
  consensusRate?: number;
  bridgeRate?: number;
  participants?: Array<{
    name: string;
    role: string;
    avatarText: string;
    voteType: 'agree' | 'disagree' | 'bridge' | 'pending';
    participantType: 'citizen' | 'expert' | 'government';
  }>;
  children?: React.ReactNode;
}

const LayerContainer = styled.div`
  margin-bottom: 25px;
`;

const LayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
  border-radius: 16px;
  margin-bottom: 15px;
  border-left: 4px solid #6366f1;
`;

const LayerTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
`;

const LayerIcon = styled.span`
  margin-right: 12px;
  font-size: 24px;
`;

const LayerStatus = styled.div<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;

  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        `;
      case 'active':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          animation: pulse 2s infinite;
        `;
      case 'pending':
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        `;
    }
  }}
`;

const LayerContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-left: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ParticipantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const StatusMessage = styled.div`
  text-align: center;
  margin-top: 15px;
  color: #10b981;
  font-weight: 600;
`;

const statusLabels = {
  completed: '完了',
  active: '進行中',
  pending: '待機中'
};

export const DecisionLayer: React.FC<DecisionLayerProps> = ({
  title,
  icon,
  status,
  consensusRate,
  bridgeRate,
  participants,
  children
}) => {
  return (
    <LayerContainer>
      <LayerHeader>
        <LayerTitle>
          <LayerIcon>{icon}</LayerIcon>
          {title}
        </LayerTitle>
        <LayerStatus status={status}>
          {statusLabels[status]}
        </LayerStatus>
      </LayerHeader>
      
      <LayerContent>
        {consensusRate !== undefined && bridgeRate !== undefined && (
          <ConsensusMeter 
            consensusRate={consensusRate} 
            bridgeRate={bridgeRate} 
          />
        )}
        
        {participants && (
          <ParticipantsGrid>
            {participants.map((participant, index) => (
              <ParticipantCard
                key={index}
                name={participant.name}
                role={participant.role}
                avatarText={participant.avatarText}
                voteType={participant.voteType}
                participantType={participant.participantType}
              />
            ))}
          </ParticipantsGrid>
        )}
        
        {children}
        
        {status === 'completed' && (
          <StatusMessage>
            ✅ レイヤー完了
          </StatusMessage>
        )}
      </LayerContent>
    </LayerContainer>
  );
};