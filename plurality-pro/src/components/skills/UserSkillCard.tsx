import React from 'react';
import styled from 'styled-components';
import { UserSkillProfile } from '../../pages/SkillMatchingPage';

interface UserSkillCardProps {
  user: UserSkillProfile;
  matchingMode: 'offer' | 'learn' | 'exchange' | 'mentor';
  viewMode: 'cards' | 'list' | 'compact';
  onInteraction: (userId: string, action: string) => void;
}

const Card = styled.div<{ viewMode: string }>`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 16px;
  padding: ${props => props.viewMode === 'compact' ? '16px' : '24px'};
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: ${props => props.viewMode === 'list' ? 'flex' : 'block'};
  gap: ${props => props.viewMode === 'list' ? '20px' : '0'};

  &:hover {
    background: rgba(51, 65, 85, 0.6);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(6, 182, 212, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #06b6d4);
  }
`;

const UserHeader = styled.div<{ viewMode: string }>`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.viewMode === 'compact' ? '12px' : '16px'};
  flex-shrink: 0;
  ${props => props.viewMode === 'list' ? 'width: 250px;' : ''}
`;

const UserAvatar = styled.div<{ online: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-right: 15px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.online ? '#10b981' : '#6b7280'};
    border: 2px solid rgba(51, 65, 85, 0.8);
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 4px;
`;

const UserTitle = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  margin-bottom: 2px;
`;

const UserMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #94a3b8;
`;

const TrustScore = styled.div`
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  margin-left: auto;
`;

const UserBio = styled.p<{ viewMode: string }>`
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 16px;
  display: ${props => props.viewMode === 'compact' ? 'none' : 'block'};
`;

const SkillsSection = styled.div<{ viewMode: string }>`
  margin-bottom: 16px;
  ${props => props.viewMode === 'list' ? 'flex: 1;' : ''}
`;

const SectionTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SkillItem = styled.div<{ mode: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 8px;
  margin-bottom: 6px;
  border-left: 3px solid ${props => {
    switch (props.mode) {
      case 'offer': return '#10b981';
      case 'learn': return '#3b82f6';
      case 'exchange': return '#8b5cf6';
      case 'mentor': return '#f59e0b';
      default: return '#6b7280';
    }
  }};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillName = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  font-size: 14px;
`;

const SkillLevel = styled.div<{ level: number }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${props => {
    switch (props.level) {
      case 5: return '#06b6d4';
      case 4: return '#10b981';
      case 3: return '#fbbf24';
      case 2: return '#f59e0b';
      case 1: return '#ef4444';
      default: return '#6b7280';
    }
  }};
`;

const SkillDetails = styled.div`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
`;

const StatsGrid = styled.div<{ viewMode: string }>`
  display: grid;
  grid-template-columns: ${props => props.viewMode === 'compact' ? '1fr 1fr' : '1fr 1fr 1fr'};
  gap: 12px;
  margin-bottom: 16px;
  ${props => props.viewMode === 'list' ? 'width: 200px; flex-shrink: 0;' : ''}
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
  margin-bottom: 2px;
`;

const StatLabel = styled.div`
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RecentActivity = styled.div<{ viewMode: string }>`
  margin-bottom: 16px;
  display: ${props => props.viewMode === 'compact' ? 'none' : 'block'};
`;

const ActivityItem = styled.div`
  background: rgba(71, 85, 105, 0.2);
  padding: 8px 10px;
  border-radius: 6px;
  margin-bottom: 4px;
  font-size: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ActivityProject = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 2px;
`;

const ActivityStatus = styled.div<{ status: string }>`
  color: ${props => props.status === '完了' ? '#10b981' : '#fbbf24'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          color: white;
          
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(139, 92, 246, 0.2);
          color: #a78bfa;
          border: 1px solid rgba(139, 92, 246, 0.3);
          
          &:hover {
            background: rgba(139, 92, 246, 0.3);
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #94a3b8;
          border: 1px solid rgba(71, 85, 105, 0.3);
          
          &:hover {
            background: rgba(71, 85, 105, 0.3);
            color: #cbd5e1;
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: rgba(71, 85, 105, 0.4);
          color: #cbd5e1;
          border: 1px solid rgba(71, 85, 105, 0.3);
          
          &:hover {
            background: rgba(71, 85, 105, 0.6);
            transform: translateY(-1px);
          }
        `;
    }
  }}
`;

const OnlineIndicator = styled.div<{ online: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: ${props => props.online ? '#10b981' : '#6b7280'};
  margin-left: auto;
`;

export const UserSkillCard: React.FC<UserSkillCardProps> = ({ 
  user, 
  matchingMode, 
  viewMode, 
  onInteraction 
}) => {
  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1: return '初心者';
      case 2: return '基礎';
      case 3: return '中級';
      case 4: return '上級';
      case 5: return 'エキスパート';
      default: return '';
    }
  };

  const getSkillLevelEmoji = (level: number) => {
    switch (level) {
      case 1: return '🟥';
      case 2: return '🟧';
      case 3: return '🟨';
      case 4: return '🟩';
      case 5: return '🟦';
      default: return '⚪';
    }
  };

  const getRelevantSkills = () => {
    return user.skills.filter(skill => {
      switch (matchingMode) {
        case 'offer':
          return skill.offering.available;
        case 'learn':
          return skill.learning.interested;
        case 'exchange':
          return skill.offering.available || skill.learning.interested;
        case 'mentor':
          return skill.offering.type === 'mentoring' || skill.level >= 4;
        default:
          return true;
      }
    }).slice(0, viewMode === 'compact' ? 2 : 4);
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

  const getModeText = () => {
    switch (matchingMode) {
      case 'offer': return '提供可能';
      case 'learn': return '学習希望';
      case 'exchange': return '交換可能';
      case 'mentor': return 'メンター可能';
      default: return '';
    }
  };

  const formatRate = (skill: any) => {
    if (skill.offering.type === 'probono') return 'プロボノ';
    if (skill.offering.type === 'mentoring') return 'メンター';
    if (skill.offering.rate) return `¥${skill.offering.rate.toLocaleString()}/h`;
    return '要相談';
  };

  const relevantSkills = getRelevantSkills();

  return (
    <Card viewMode={viewMode}>
      <UserHeader viewMode={viewMode}>
        <UserAvatar online={user.isOnline}>
          {user.avatar}
        </UserAvatar>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserTitle>{user.title}</UserTitle>
          <UserMeta>
            <span>📍 {user.location}</span>
            <span>⏰ 週{user.preferences.availableHours}h可能</span>
            <OnlineIndicator online={user.isOnline}>
              {user.isOnline ? '🟢 オンライン' : '⚪ オフライン'}
            </OnlineIndicator>
          </UserMeta>
        </UserInfo>
        <TrustScore>信頼度: {user.trustScore}</TrustScore>
      </UserHeader>

      <UserBio viewMode={viewMode}>{user.bio}</UserBio>

      <SkillsSection viewMode={viewMode}>
        <SectionTitle>
          {getModeIcon()} {getModeText()}:
        </SectionTitle>
        {relevantSkills.map((skill, index) => (
          <SkillItem key={index} mode={matchingMode}>
            <div>
              <SkillName>{skill.name}</SkillName>
              <SkillDetails>
                {matchingMode === 'offer' && skill.offering.available && formatRate(skill)}
                {matchingMode === 'learn' && skill.learning.interested && 
                  `目標: ${getSkillLevelText(skill.learning.targetLevel)}`}
              </SkillDetails>
            </div>
            <SkillLevel level={skill.level}>
              {getSkillLevelEmoji(skill.level)}
              {getSkillLevelText(skill.level)}
            </SkillLevel>
          </SkillItem>
        ))}
      </SkillsSection>

      <StatsGrid viewMode={viewMode}>
        <StatItem>
          <StatValue>{user.performance.completedProjects}</StatValue>
          <StatLabel>完了プロジェクト</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{user.performance.totalHours}h</StatValue>
          <StatLabel>総活動時間</StatLabel>
        </StatItem>
        {viewMode !== 'compact' && (
          <StatItem>
            <StatValue>⭐{user.performance.averageRating}</StatValue>
            <StatLabel>平均評価</StatLabel>
          </StatItem>
        )}
      </StatsGrid>

      <RecentActivity viewMode={viewMode}>
        <SectionTitle>📊 最近の活動:</SectionTitle>
        {user.recentActivity.slice(0, 2).map((activity, index) => (
          <ActivityItem key={index}>
            <ActivityProject>{activity.project}</ActivityProject>
            <ActivityStatus status={activity.status}>
              {activity.status === '完了' ? '✅' : '🔄'} {activity.status}
              {activity.rating && ' ⭐'.repeat(activity.rating)}
            </ActivityStatus>
          </ActivityItem>
        ))}
      </RecentActivity>

      <CardActions>
        <ActionButton 
          variant="primary"
          onClick={() => onInteraction(user.id, 'message')}
        >
          💬 メッセージ
        </ActionButton>
        <ActionButton 
          variant="secondary"
          onClick={() => onInteraction(user.id, 'schedule')}
        >
          📅 相談予約
        </ActionButton>
        <ActionButton 
          variant="outline"
          onClick={() => onInteraction(user.id, 'follow')}
        >
          ❤️ フォロー
        </ActionButton>
        {viewMode !== 'compact' && (
          <ActionButton 
            variant="outline"
            onClick={() => onInteraction(user.id, 'view-profile')}
          >
            🔗 詳細
          </ActionButton>
        )}
      </CardActions>
    </Card>
  );
};