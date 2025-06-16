import React from 'react';
import styled from 'styled-components';

interface ParticipantCardProps {
  name: string;
  role: string;
  avatarText: string;
  voteType: 'agree' | 'disagree' | 'bridge' | 'pending';
  participantType: 'citizen' | 'expert' | 'government';
}

const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ParticipantHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ParticipantAvatar = styled.div<{ participantType: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;

  ${props => {
    switch (props.participantType) {
      case 'citizen':
        return 'background: linear-gradient(45deg, #6366f1, #8b5cf6);';
      case 'expert':
        return 'background: linear-gradient(45deg, #10b981, #34d399);';
      case 'government':
        return 'background: linear-gradient(45deg, #ef4444, #f87171);';
      default:
        return 'background: linear-gradient(45deg, #6366f1, #8b5cf6);';
    }
  }}
`;

const ParticipantInfo = styled.div`
  flex: 1;
`;

const ParticipantName = styled.div`
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 2px;
`;

const ParticipantRole = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const ParticipantVote = styled.div<{ voteType: string }>`
  margin-top: 10px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  ${props => {
    switch (props.voteType) {
      case 'agree':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        `;
      case 'disagree':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        `;
      case 'bridge':
        return `
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
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

const voteLabels = {
  agree: '👍 賛成',
  disagree: '🤔 課題提起',
  bridge: '🌉 ブリッジング',
  pending: '⏳ 検討中'
};

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  name,
  role,
  avatarText,
  voteType,
  participantType
}) => {
  return (
    <CardContainer>
      <ParticipantHeader>
        <ParticipantAvatar participantType={participantType}>
          {avatarText}
        </ParticipantAvatar>
        <ParticipantInfo>
          <ParticipantName>{name}</ParticipantName>
          <ParticipantRole>{role}</ParticipantRole>
        </ParticipantInfo>
      </ParticipantHeader>
      <ParticipantVote voteType={voteType}>
        {voteLabels[voteType]}
      </ParticipantVote>
    </CardContainer>
  );
};