import React from 'react';
import styled from 'styled-components';
import { Project } from '../../pages/ProjectDiscoveryPage';

interface ProjectCardProps {
  project: Project;
  onInteraction: (projectId: string, action: string) => void;
}

const Card = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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
    background: ${props => {
      // This would be dynamic based on urgency
      return 'linear-gradient(90deg, #10b981, #06b6d4)';
    }};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const StatusBadges = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StatusBadge = styled.div<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => {
    switch (props.status) {
      case 'recruiting':
        return `
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          animation: pulse 2s infinite;
        `;
      case 'planning':
        return `
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        `;
      case 'in-progress':
        return `
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        `;
      case 'paused':
        return `
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
        `;
      case 'completed':
        return `
          background: rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
        `;
    }
  }}
`;

const MatchScore = styled.div`
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProjectTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #94a3b8;
`;

const OrganizerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OrganizerIcon = styled.div<{ type: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  
  ${props => {
    switch (props.type) {
      case 'government':
        return `
          background: linear-gradient(45deg, #ef4444, #f87171);
          color: white;
        `;
      case 'business':
        return `
          background: linear-gradient(45deg, #3b82f6, #60a5fa);
          color: white;
        `;
      case 'npo':
        return `
          background: linear-gradient(45deg, #10b981, #34d399);
          color: white;
        `;
      case 'academic':
        return `
          background: linear-gradient(45deg, #f59e0b, #fbbf24);
          color: white;
        `;
      default:
        return `
          background: linear-gradient(45deg, #6b7280, #9ca3af);
          color: white;
        `;
    }
  }}
`;

const ProjectSummary = styled.p`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 12px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #06b6d4;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
`;

const SkillTag = styled.span`
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(139, 92, 246, 0.3);
`;

const UrgencyIndicator = styled.div<{ urgency: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  
  ${props => {
    switch (props.urgency) {
      case 'critical':
        return `
          background: #ef4444;
          animation: pulse 1s infinite;
        `;
      case 'high':
        return `
          background: #f59e0b;
        `;
      case 'medium':
        return `
          background: #06b6d4;
        `;
      case 'low':
        return `
          background: #6b7280;
        `;
      default:
        return `
          background: #6b7280;
        `;
    }
  }}
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

const DeadlineWarning = styled.div<{ daysLeft: number }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;

  ${props => {
    if (props.daysLeft <= 3) {
      return `
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
        animation: pulse 2s infinite;
      `;
    } else if (props.daysLeft <= 7) {
      return `
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
        border: 1px solid rgba(245, 158, 11, 0.3);
      `;
    } else {
      return `
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.3);
      `;
    }
  }}
`;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onInteraction }) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'recruiting': return '募集中';
      case 'planning': return '企画中';
      case 'in-progress': return '実行中';
      case 'paused': return '一時停止';
      case 'completed': return '完了';
      default: return status;
    }
  };

  const getOrganizerIcon = (type: string) => {
    switch (type) {
      case 'government': return '🏛️';
      case 'business': return '🏢';
      case 'npo': return '🤝';
      case 'academic': return '🎓';
      default: return '📄';
    }
  };

  const calculateDaysLeft = (deadline?: Date) => {
    if (!deadline) return null;
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatBudget = (budget: Project['budget']) => {
    if (budget.type === 'non-monetary') return 'プロボノ';
    if (!budget.amount) return '要相談';
    
    const amount = budget.amount;
    if (amount >= 1000000) {
      return `¥${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `¥${(amount / 1000).toFixed(0)}K`;
    } else {
      return `¥${amount.toLocaleString()}`;
    }
  };

  const daysLeft = calculateDaysLeft(project.recruitment.deadline);

  return (
    <Card>
      <UrgencyIndicator urgency={project.matching.urgency} />
      
      <CardHeader>
        <StatusBadges>
          <StatusBadge status={project.recruitment.status}>
            {getStatusLabel(project.recruitment.status)}
          </StatusBadge>
        </StatusBadges>
        {project.matching.userMatchScore && (
          <MatchScore>
            🎯 {project.matching.userMatchScore}%
          </MatchScore>
        )}
      </CardHeader>

      <ProjectTitle>{project.title}</ProjectTitle>

      <ProjectMeta>
        <OrganizerInfo>
          <OrganizerIcon type={project.organizer.type}>
            {getOrganizerIcon(project.organizer.type)}
          </OrganizerIcon>
          <span>{project.organizer.name}</span>
        </OrganizerInfo>
        <span>|</span>
        <span>{project.region.prefecture}</span>
        <span>|</span>
        <span>{project.category[0]}</span>
      </ProjectMeta>

      <ProjectSummary>{project.summary}</ProjectSummary>

      {daysLeft !== null && daysLeft <= 14 && (
        <DeadlineWarning daysLeft={daysLeft}>
          ⏰ 締切まで{daysLeft}日
        </DeadlineWarning>
      )}

      <ProjectStats>
        <StatItem>
          <StatValue>{formatBudget(project.budget)}</StatValue>
          <StatLabel>予算</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{project.timeline.duration}ヶ月</StatValue>
          <StatLabel>期間</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{project.recruitment.filledPositions}/{project.recruitment.totalPositions}</StatValue>
          <StatLabel>メンバー</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{project.stats.interestCount}</StatValue>
          <StatLabel>興味あり</StatLabel>
        </StatItem>
      </ProjectStats>

      <SkillTags>
        {project.recruitment.requiredSkills.slice(0, 4).map((skill, index) => (
          <SkillTag key={index}>{skill}</SkillTag>
        ))}
        {project.recruitment.requiredSkills.length > 4 && (
          <SkillTag>+{project.recruitment.requiredSkills.length - 4}</SkillTag>
        )}
      </SkillTags>

      <CardActions>
        <ActionButton 
          variant="primary"
          onClick={() => onInteraction(project.id, 'view-details')}
        >
          📋 詳細を見る
        </ActionButton>
        <ActionButton 
          variant="secondary"
          onClick={() => onInteraction(project.id, 'show-interest')}
        >
          ❤️ 興味あり
        </ActionButton>
        <ActionButton 
          variant="outline"
          onClick={() => onInteraction(project.id, 'contact')}
        >
          💬 問い合わせ
        </ActionButton>
      </CardActions>
    </Card>
  );
};