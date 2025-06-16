import React from 'react';
import styled from 'styled-components';
import { Project } from '../../pages/ProjectDiscoveryPage';

interface AIMatchingPanelProps {
  topMatches: Project[];
}

const PanelContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const PanelTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AIBadge = styled.div`
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MatchingSection = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid rgba(139, 92, 246, 0.2);
`;

const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #a78bfa;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MatchCard = styled.div`
  background: rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(71, 85, 105, 0.4);
    transform: translateY(-2px);
    border-color: rgba(6, 182, 212, 0.4);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const MatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const MatchScore = styled.div`
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
`;

const MatchTitle = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  font-size: 14px;
  margin-bottom: 4px;
`;

const MatchReason = styled.div`
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
`;

const UserProfile = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
`;

const ProfileInfo = styled.div`
  h4 {
    color: #f1f5f9;
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

const ProfileRole = styled.div`
  color: #94a3b8;
  font-size: 12px;
`;

const SkillsContainer = styled.div`
  margin-bottom: 15px;
`;

const SkillsLabel = styled.div`
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const SkillTag = styled.span`
  background: rgba(6, 182, 212, 0.2);
  color: #06b6d4;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 8px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 8px;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #06b6d4;
`;

const StatLabel = styled.div`
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RecommendationCard = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const RecommendationItem = styled.div`
  padding: 12px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(71, 85, 105, 0.5);
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const RecommendationTitle = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 4px;
  font-size: 13px;
`;

const RecommendationDesc = styled.div`
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.4;
`;

const AlertsSection = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const AlertItem = styled.div<{ type: 'info' | 'warning' | 'success' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  
  ${props => {
    switch (props.type) {
      case 'warning':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.2);
        `;
      case 'success':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.2);
        `;
      default:
        return `
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.2);
        `;
    }
  }}

  &:last-child {
    margin-bottom: 0;
  }
`;

const AlertIcon = styled.span`
  font-size: 14px;
`;

export const AIMatchingPanel: React.FC<AIMatchingPanelProps> = ({ topMatches }) => {
  const userSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'IoT', 'UI/UX'];
  const userStats = {
    trustScore: 92,
    projectsCompleted: 12,
    skillsOffered: 6,
    connections: 147
  };

  const recommendations = [
    {
      title: 'IoTスキルを活用',
      description: '高齢者見守りプロジェクトでIoT技術が求められています'
    },
    {
      title: 'React開発者急募',
      description: '子育て支援アプリでReact開発者を募集中です'
    },
    {
      title: 'UXデザイン協力',
      description: 'スマート農業プラットフォームでUX改善が必要です'
    }
  ];

  const alerts = [
    {
      type: 'warning' as const,
      icon: '⏰',
      message: '高齢者見守りシステムの締切まで3日です'
    },
    {
      type: 'success' as const,
      icon: '🎯',
      message: '新しい95%マッチプロジェクトが見つかりました'
    },
    {
      type: 'info' as const,
      icon: '📢',
      message: '富山県でAI関連の新規予算が承認されました'
    }
  ];

  return (
    <PanelContainer>
      <PanelTitle>
        🤖 AIマッチング
        <AIBadge>BETA</AIBadge>
      </PanelTitle>

      <UserProfile>
        <ProfileHeader>
          <ProfileAvatar>田</ProfileAvatar>
          <ProfileInfo>
            <h4>田中 太郎</h4>
            <ProfileRole>フルスタック開発者</ProfileRole>
          </ProfileInfo>
        </ProfileHeader>

        <SkillsContainer>
          <SkillsLabel>スキル・専門分野</SkillsLabel>
          <SkillTags>
            {userSkills.map((skill, index) => (
              <SkillTag key={index}>{skill}</SkillTag>
            ))}
          </SkillTags>
        </SkillsContainer>

        <StatsGrid>
          <StatItem>
            <StatValue>{userStats.trustScore}</StatValue>
            <StatLabel>信頼スコア</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{userStats.projectsCompleted}</StatValue>
            <StatLabel>完了プロジェクト</StatLabel>
          </StatItem>
        </StatsGrid>
      </UserProfile>

      <MatchingSection>
        <SectionTitle>
          🎯 トップマッチ
        </SectionTitle>
        {topMatches.map((project, index) => (
          <MatchCard key={project.id}>
            <MatchHeader>
              <MatchScore>{project.matching.userMatchScore}%</MatchScore>
            </MatchHeader>
            <MatchTitle>{project.title}</MatchTitle>
            <MatchReason>
              あなたの{project.recruitment.requiredSkills.slice(0, 2).join('・')}スキルが
              {project.matching.userMatchScore}%マッチしています
            </MatchReason>
          </MatchCard>
        ))}
      </MatchingSection>

      <RecommendationCard>
        <SectionTitle>
          💡 AI推奨アクション
        </SectionTitle>
        {recommendations.map((rec, index) => (
          <RecommendationItem key={index}>
            <RecommendationTitle>{rec.title}</RecommendationTitle>
            <RecommendationDesc>{rec.description}</RecommendationDesc>
          </RecommendationItem>
        ))}
      </RecommendationCard>

      <AlertsSection>
        <SectionTitle>
          🔔 アラート・通知
        </SectionTitle>
        {alerts.map((alert, index) => (
          <AlertItem key={index} type={alert.type}>
            <AlertIcon>{alert.icon}</AlertIcon>
            {alert.message}
          </AlertItem>
        ))}
      </AlertsSection>
    </PanelContainer>
  );
};