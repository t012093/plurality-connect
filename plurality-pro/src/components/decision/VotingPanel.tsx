import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

const VotingContainer = styled.div`
  height: fit-content;
`;

const VotingTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 15px;
  text-align: center;
`;

const CurrentProposal = styled.div`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #6366f1;
`;

const ProposalText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 15px;
`;

const VoteButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
`;

const VoteButton = styled(Button)`
  flex-direction: column;
  gap: 5px;
  padding: 15px 10px;
`;

const VoteIcon = styled.span`
  font-size: 24px;
`;

const VoteLabel = styled.span`
  font-size: 14px;
`;

const VoteCount = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;

const BridgeSuggestions = styled.div`
  background: rgba(99, 102, 241, 0.05);
  border-radius: 12px;
  padding: 15px;
  margin-top: 15px;
`;

const BridgeTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #6366f1;
  margin-bottom: 10px;
`;

const BridgeSuggestion = styled.div`
  background: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  color: #374151;
  border-left: 3px solid #6366f1;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MyInput = styled.div`
  margin-top: 20px;
`;

const InputTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const OpinionSpace = styled.div`
  height: 200px;
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
  border-radius: 12px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
`;

const RealTimeStats = styled.div`
  background: rgba(16, 185, 129, 0.05);
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
`;

const StatsTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 15px;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const RecentActivities = styled.div`
  margin-top: 20px;
`;

const ActivityItem = styled.div<{ borderColor: string }>`
  background: white;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  border-left: 3px solid ${props => props.borderColor};
`;

interface VotingPanelProps {
  onVote?: (type: 'agree' | 'disagree' | 'bridge') => void;
  onSubmitOpinion?: (opinion: string) => void;
}

export const VotingPanel: React.FC<VotingPanelProps> = ({
  onVote,
  onSubmitOpinion
}) => {
  const [opinion, setOpinion] = useState('');
  const [votes, setVotes] = useState({
    agree: 156,
    disagree: 42,
    bridge: 89
  });

  const handleVote = (type: 'agree' | 'disagree' | 'bridge') => {
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
    onVote?.(type);
  };

  const handleSubmitOpinion = () => {
    if (opinion.trim()) {
      onSubmitOpinion?.(opinion);
      setOpinion('');
    }
  };

  return (
    <VotingContainer>
      <Card>
        <VotingTitle>🗳️ あなたの意見</VotingTitle>
        
        <CurrentProposal>
          <h4 style={{ marginBottom: '10px', color: '#6366f1' }}>現在の提案</h4>
          <ProposalText>
            技術仕様の高度化に伴い、追加予算¥25Mの承認を求めます。段階的支出と成果連動支払いにより、リスクを最小化します。
          </ProposalText>
        </CurrentProposal>
        
        <VoteButtonsGrid>
          <VoteButton variant="agree" onClick={() => handleVote('agree')}>
            <VoteIcon>👍</VoteIcon>
            <VoteLabel>賛成</VoteLabel>
            <VoteCount>{votes.agree}票</VoteCount>
          </VoteButton>
          
          <VoteButton variant="disagree" onClick={() => handleVote('disagree')}>
            <VoteIcon>🤔</VoteIcon>
            <VoteLabel>課題提起</VoteLabel>
            <VoteCount>{votes.disagree}票</VoteCount>
          </VoteButton>
          
          <VoteButton variant="bridge" onClick={() => handleVote('bridge')}>
            <VoteIcon>🌉</VoteIcon>
            <VoteLabel>ブリッジング</VoteLabel>
            <VoteCount>{votes.bridge}票</VoteCount>
          </VoteButton>
        </VoteButtonsGrid>

        <BridgeSuggestions>
          <BridgeTitle>💡 ブリッジング提案例</BridgeTitle>
          <BridgeSuggestion>
            「段階的予算承認制にして、第1段階で50%、成果確認後に残り50%を支出」
          </BridgeSuggestion>
          <BridgeSuggestion>
            「外部監査を条件に、透明性を確保した上での予算追加」
          </BridgeSuggestion>
        </BridgeSuggestions>

        <MyInput>
          <InputTextarea
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
            placeholder="あなたの意見や提案を記入してください。建設的なブリッジング意見は高く評価されます..."
          />
          <Button 
            variant="submit" 
            onClick={handleSubmitOpinion}
            style={{ marginTop: '15px' }}
          >
            意見を投稿
          </Button>
        </MyInput>
      </Card>

      <OpinionSpace>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          color: '#6366f1',
          fontWeight: 600
        }}>
          3D 意見空間
        </div>
      </OpinionSpace>

      <RealTimeStats>
        <StatsTitle>📊 リアルタイム統計</StatsTitle>
        <StatsGrid>
          <StatItem>
            <StatValue>287</StatValue>
            <StatLabel>総参加者</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>85%</StatValue>
            <StatLabel>ブリッジ度</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>72%</StatValue>
            <StatLabel>現在合意率</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>6</StatValue>
            <StatLabel>残り日数</StatLabel>
          </StatItem>
        </StatsGrid>
      </RealTimeStats>

      <RecentActivities>
        <h4 style={{ color: '#1a202c', marginBottom: '15px', fontSize: '16px' }}>
          📝 最新の活動
        </h4>
        
        <ActivityItem borderColor="#6366f1">
          <div style={{ fontSize: '12px', color: '#6b7280' }}>5分前</div>
          <div style={{ fontWeight: 600, fontSize: '13px', margin: '5px 0' }}>
            監査委員会がブリッジング提案
          </div>
          <div style={{ fontSize: '12px', color: '#374151' }}>
            「段階的支出での透明性確保」を提案
          </div>
        </ActivityItem>

        <ActivityItem borderColor="#10b981">
          <div style={{ fontSize: '12px', color: '#6b7280' }}>15分前</div>
          <div style={{ fontWeight: 600, fontSize: '13px', margin: '5px 0' }}>
            市民代表 田中さんが賛成
          </div>
          <div style={{ fontSize: '12px', color: '#374151' }}>
            「雇用創出効果を評価」
          </div>
        </ActivityItem>

        <ActivityItem borderColor="#f59e0b">
          <div style={{ fontSize: '12px', color: '#6b7280' }}>1時間前</div>
          <div style={{ fontWeight: 600, fontSize: '13px', margin: '5px 0' }}>
            富山県財政課が検討継続
          </div>
          <div style={{ fontSize: '12px', color: '#374151' }}>
            「追加資料を要請」
          </div>
        </ActivityItem>
      </RecentActivities>
    </VotingContainer>
  );
};