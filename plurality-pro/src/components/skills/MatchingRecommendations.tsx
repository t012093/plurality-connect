import React from 'react';
import styled from 'styled-components';
import { UserSkillProfile } from '../../pages/SkillMatchingPage';

interface MatchingRecommendationsProps {
  currentUser: { id: string; name: string };
  topMatches: UserSkillProfile[];
  matchingMode: string;
}

const PanelContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MatchCard = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(51, 65, 85, 0.6);
    transform: translateY(-2px);
    border-color: rgba(6, 182, 212, 0.4);
  }
`;

const MatchHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const MatchAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-right: 10px;
`;

const MatchInfo = styled.div`
  flex: 1;
`;

const MatchName = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  font-size: 14px;
`;

const MatchTitle = styled.div`
  color: #94a3b8;
  font-size: 12px;
`;

const MatchScore = styled.div<{ score: number }>`
  background: ${props => {
    if (props.score >= 90) return 'linear-gradient(45deg, #10b981, #34d399)';
    if (props.score >= 75) return 'linear-gradient(45deg, #06b6d4, #3b82f6)';
    if (props.score >= 60) return 'linear-gradient(45deg, #8b5cf6, #a78bfa)';
    return 'linear-gradient(45deg, #f59e0b, #fbbf24)';
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  margin-left: auto;
`;

const MatchDetails = styled.div`
  font-size: 12px;
  color: #cbd5e1;
  line-height: 1.4;
`;

const SkillTag = styled.span`
  background: rgba(6, 182, 212, 0.2);
  color: #06b6d4;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-right: 4px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
  }
`;

const StatsContainer = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatLabel = styled.span`
  color: #94a3b8;
  font-size: 12px;
`;

const StatValue = styled.span`
  color: #06b6d4;
  font-weight: 600;
  font-size: 14px;
`;

const TrendIndicator = styled.div<{ trend: 'up' | 'down' | 'stable' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${props => {
    switch (props.trend) {
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      default: return '#94a3b8';
    }
  }};
`;

const InsightCard = styled.div`
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const InsightText = styled.p`
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;

export const MatchingRecommendations: React.FC<MatchingRecommendationsProps> = ({ 
  currentUser, 
  topMatches, 
  matchingMode 
}) => {
  const calculateMatchScore = (user: UserSkillProfile): number => {
    return Math.floor(Math.random() * 30) + 70; // 70-100のランダムスコア
  };

  const getMatchReason = (user: UserSkillProfile): string => {
    const skills = user.skills.slice(0, 2).map(s => s.name);
    switch (matchingMode) {
      case 'offer':
        return `${skills.join('、')}を提供可能`;
      case 'learn':
        return `${skills.join('、')}の学習希望`;
      case 'exchange':
        return `${skills.join('、')}で相互交換`;
      case 'mentor':
        return `${skills.join('、')}でメンター可能`;
      default:
        return `${skills.join('、')}でマッチ`;
    }
  };

  const getModeIcon = () => {
    switch (matchingMode) {
      case 'offer': return '🎯';
      case 'learn': return '📚';
      case 'exchange': return '🔄';
      case 'mentor': return '👨‍🏫';
      default: return '🤝';
    }
  };

  return (
    <PanelContainer>
      <Section>
        <SectionTitle>
          {getModeIcon()} トップマッチ
        </SectionTitle>
        {topMatches.map(user => {
          const score = calculateMatchScore(user);
          return (
            <MatchCard key={user.id}>
              <MatchHeader>
                <MatchAvatar>{user.avatar}</MatchAvatar>
                <MatchInfo>
                  <MatchName>{user.name}</MatchName>
                  <MatchTitle>{user.title}</MatchTitle>
                </MatchInfo>
                <MatchScore score={score}>{score}%</MatchScore>
              </MatchHeader>
              <MatchDetails>
                {getMatchReason(user)}
                <br />
                📍 {user.location} | ⏰ 週{user.preferences.availableHours}h
                <div style={{ marginTop: '6px' }}>
                  {user.skills.slice(0, 3).map((skill, idx) => (
                    <SkillTag key={idx}>{skill.name}</SkillTag>
                  ))}
                </div>
              </MatchDetails>
              <ActionButton>💬 メッセージを送る</ActionButton>
            </MatchCard>
          );
        })}
      </Section>

      <Section>
        <SectionTitle>
          📊 マッチング統計
        </SectionTitle>
        <StatsContainer>
          <StatItem>
            <StatLabel>今日のマッチ数</StatLabel>
            <StatValue>12</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>成功率</StatLabel>
            <StatValue>78%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>平均レスポンス時間</StatLabel>
            <StatValue>2.4h</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>信頼度スコア</StatLabel>
            <StatValue>92</StatValue>
          </StatItem>
        </StatsContainer>
      </Section>

      <Section>
        <SectionTitle>
          💡 AIインサイト
        </SectionTitle>
        <InsightCard>
          <InsightText>
            あなたのReactスキルは地域で需要が高まっています。今週すでに5件のマッチング提案があります。
          </InsightText>
        </InsightCard>
        <InsightCard>
          <InsightText>
            UI/UXデザインスキルを学習すると、マッチング成功率が25%向上する見込みです。
          </InsightText>
        </InsightCard>
      </Section>

      <Section>
        <SectionTitle>
          📈 トレンド
        </SectionTitle>
        <StatsContainer>
          <StatItem>
            <StatLabel>AI/機械学習</StatLabel>
            <TrendIndicator trend="up">
              📈 +45%
            </TrendIndicator>
          </StatItem>
          <StatItem>
            <StatLabel>React開発</StatLabel>
            <TrendIndicator trend="up">
              📈 +23%
            </TrendIndicator>
          </StatItem>
          <StatItem>
            <StatLabel>データ分析</StatLabel>
            <TrendIndicator trend="stable">
              📊 安定
            </TrendIndicator>
          </StatItem>
          <StatItem>
            <StatLabel>PHP開発</StatLabel>
            <TrendIndicator trend="down">
              📉 -12%
            </TrendIndicator>
          </StatItem>
        </StatsContainer>
      </Section>
    </PanelContainer>
  );
};