import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PolicyData } from '../../pages/PolicyKnowledgePage';

const VisualizationContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const VisualizationHeader = styled.div`
  padding: 20px 25px 15px 25px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
`;

const HeaderTitle = styled.h3`
  color: #f1f5f9;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderDescription = styled.p`
  color: #94a3b8;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

const VisualizationContent = styled.div`
  flex: 1;
  padding: 25px;
  overflow: auto;
`;

const InfographicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  height: 100%;
`;

const PolicyCard = styled.div<{ status: string }>`
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.8) 0%, 
    rgba(30, 41, 59, 0.6) 100%);
  border: 1px solid ${props => {
    switch (props.status) {
      case 'implemented': return '#10b981';
      case 'approved': return '#06b6d4';
      case 'review': return '#f59e0b';
      case 'draft': return '#64748b';
      default: return 'rgba(71, 85, 105, 0.5)';
    }
  }};
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(6, 182, 212, 0.3);
    border-color: #06b6d4;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => {
      switch (props.status) {
        case 'implemented': return '#10b981';
        case 'approved': return '#06b6d4';
        case 'review': return '#f59e0b';
        case 'draft': return '#64748b';
        default: return '#64748b';
      }
    }};
  }
`;

const PolicyTitle = styled.h4`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const PolicyCategory = styled.div`
  color: #06b6d4;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const PolicyDescription = styled.p`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const MetricItem = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
`;

const MetricValue = styled.div`
  color: #06b6d4;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  color: #94a3b8;
  font-size: 11px;
  font-weight: 500;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${props => {
    switch (props.status) {
      case 'implemented': return 'rgba(16, 185, 129, 0.2)';
      case 'approved': return 'rgba(6, 182, 212, 0.2)';
      case 'review': return 'rgba(245, 158, 11, 0.2)';
      case 'draft': return 'rgba(100, 116, 139, 0.2)';
      default: return 'rgba(51, 65, 85, 0.3)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'implemented': return '#10b981';
      case 'approved': return '#06b6d4';
      case 'review': return '#f59e0b';
      case 'draft': return '#64748b';
      default: return '#cbd5e1';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'implemented': return '#10b981';
      case 'approved': return '#06b6d4';
      case 'review': return '#f59e0b';
      case 'draft': return '#64748b';
      default: return 'rgba(71, 85, 105, 0.5)';
    }
  }};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
`;

const ProgressFill = styled.div<{ percentage: number; color: string }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => props.color};
  border-radius: 4px;
  transition: width 0.6s ease;
`;

const TimelineContainer = styled.div`
  height: 100%;
  position: relative;
  padding: 20px;
`;

const TimelineAxis = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #06b6d4, #3b82f6);
  transform: translateX(-50%);
  border-radius: 2px;
`;

const TimelineItem = styled.div<{ position: number; side: 'left' | 'right' }>`
  position: absolute;
  top: ${props => props.position * 120}px;
  ${props => props.side}: 60%;
  width: 35%;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 12px;
  padding: 16px;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.side === 'left' ? 'right: -8px' : 'left: -8px'};
    width: 0;
    height: 0;
    border: 8px solid transparent;
    ${props => props.side === 'left' 
      ? 'border-left-color: rgba(51, 65, 85, 0.5)' 
      : 'border-right-color: rgba(51, 65, 85, 0.5)'};
  }
`;

const TimelineMarker = styled.div<{ position: number }>`
  position: absolute;
  left: 50%;
  top: ${props => props.position * 120 + 20}px;
  width: 12px;
  height: 12px;
  background: #06b6d4;
  border: 3px solid rgba(15, 23, 42, 0.8);
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

interface PolicyVisualizationProps {
  policies: PolicyData[];
  viewMode?: 'infographic' | 'timeline';
}

const PolicyVisualization: React.FC<PolicyVisualizationProps> = ({ 
  policies, 
  viewMode = 'infographic' 
}) => {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);

  const getStatusLabel = (status: string) => {
    const labels = {
      implemented: '🟢 実装済み',
      approved: '🔵 承認済み',
      review: '🟡 審査中',
      draft: '⚪ 草案'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      implemented: '#10b981',
      approved: '#06b6d4',
      review: '#f59e0b',
      draft: '#64748b'
    };
    return colors[status as keyof typeof colors] || '#64748b';
  };

  const calculateProgress = (policy: PolicyData) => {
    const completedMilestones = policy.timeline.milestones.filter(m => m.completed).length;
    return Math.round((completedMilestones / policy.timeline.milestones.length) * 100);
  };

  if (viewMode === 'timeline') {
    return (
      <VisualizationContainer>
        <VisualizationHeader>
          <HeaderTitle>
            📅 政策タイムライン
          </HeaderTitle>
          <HeaderDescription>
            政策の時系列的な進捗と関連性を可視化
          </HeaderDescription>
        </VisualizationHeader>
        <VisualizationContent>
          <TimelineContainer>
            <TimelineAxis />
            {policies.map((policy, index) => (
              <React.Fragment key={policy.id}>
                <TimelineMarker position={index} />
                <TimelineItem 
                  position={index} 
                  side={index % 2 === 0 ? 'left' : 'right'}
                >
                  <PolicyTitle>{policy.title}</PolicyTitle>
                  <PolicyCategory>{policy.category}</PolicyCategory>
                  <div style={{ marginBottom: '12px' }}>
                    <StatusBadge status={policy.status}>
                      {getStatusLabel(policy.status)}
                    </StatusBadge>
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '8px' }}>
                    進捗: {calculateProgress(policy)}%
                  </div>
                  <ProgressBar>
                    <ProgressFill 
                      percentage={calculateProgress(policy)}
                      color={getStatusColor(policy.status)}
                    />
                  </ProgressBar>
                </TimelineItem>
              </React.Fragment>
            ))}
          </TimelineContainer>
        </VisualizationContent>
      </VisualizationContainer>
    );
  }

  return (
    <VisualizationContainer>
      <VisualizationHeader>
        <HeaderTitle>
          📊 政策インフォグラフィック
        </HeaderTitle>
        <HeaderDescription>
          政策の全体像と進捗状況を直感的に把握
        </HeaderDescription>
      </VisualizationHeader>
      <VisualizationContent>
        <InfographicGrid>
          {policies.map((policy) => (
            <PolicyCard
              key={policy.id}
              status={policy.status}
              onClick={() => setSelectedPolicy(policy)}
            >
              <PolicyTitle>{policy.title}</PolicyTitle>
              <PolicyCategory>{policy.category}</PolicyCategory>
              <PolicyDescription>{policy.description}</PolicyDescription>
              
              <MetricsGrid>
                <MetricItem>
                  <MetricValue>{policy.impactScore}</MetricValue>
                  <MetricLabel>影響度</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricValue>{policy.complexity}/10</MetricValue>
                  <MetricLabel>複雑度</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricValue>{policy.metrics.citizenEngagement}%</MetricValue>
                  <MetricLabel>市民参加</MetricLabel>
                </MetricItem>
                <MetricItem>
                  <MetricValue>¥{(policy.budget.total / 1000000).toFixed(0)}M</MetricValue>
                  <MetricLabel>予算</MetricLabel>
                </MetricItem>
              </MetricsGrid>

              <div style={{ marginBottom: '12px' }}>
                <StatusBadge status={policy.status}>
                  {getStatusLabel(policy.status)}
                </StatusBadge>
              </div>

              <div style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '8px' }}>
                進捗: {calculateProgress(policy)}%
              </div>
              <ProgressBar>
                <ProgressFill 
                  percentage={calculateProgress(policy)}
                  color={getStatusColor(policy.status)}
                />
              </ProgressBar>
            </PolicyCard>
          ))}
        </InfographicGrid>
      </VisualizationContent>
    </VisualizationContainer>
  );
};

export default PolicyVisualization;