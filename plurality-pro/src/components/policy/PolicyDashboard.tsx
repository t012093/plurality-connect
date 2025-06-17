import React, { useState } from 'react';
import styled from 'styled-components';
import { PolicyData } from '../../pages/PolicyKnowledgePage';

const DashboardContainer = styled.div`
  padding: 25px;
  height: 400px;
  overflow-y: auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const HeaderTitle = styled.h3`
  color: #f1f5f9;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.15);
    border-color: rgba(6, 182, 212, 0.3);
  }
`;

const MetricValue = styled.div`
  color: #06b6d4;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 500;
`;

const MetricChange = styled.div<{ positive?: boolean }>`
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 20px;
  height: 250px;
`;

const ChartTitle = styled.h4`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100% - 40px);
`;

const StatusBar = styled.div<{ status: string; percentage: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusLabel = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
  min-width: 60px;
`;

const StatusBarFill = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const StatusBarProgress = styled.div<{ percentage: number; color: string }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => props.color};
  border-radius: 4px;
  transition: width 0.6s ease;
`;

const StatusCount = styled.div`
  color: #06b6d4;
  font-size: 13px;
  font-weight: 600;
  min-width: 25px;
  text-align: right;
`;

const ImpactChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100% - 40px);
`;

const ImpactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const ImpactDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  min-width: 12px;
`;

const ImpactLabel = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
  flex: 1;
`;

const ImpactValue = styled.div`
  color: #06b6d4;
  font-size: 13px;
  font-weight: 600;
`;

const RecentActivity = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 20px;
`;

const ActivityTitle = styled.h4`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 200px;
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
`;

const ActivityIcon = styled.div<{ type: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => {
    switch (props.type) {
      case 'update': return '#06b6d4';
      case 'milestone': return '#10b981';
      case 'alert': return '#f59e0b';
      default: return '#64748b';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  min-width: 24px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  color: #64748b;
  font-size: 11px;
`;

interface PolicyDashboardProps {
  policies: PolicyData[];
}

const PolicyDashboard: React.FC<PolicyDashboardProps> = ({ policies }) => {
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const statusCounts = {
    implemented: policies.filter(p => p.status === 'implemented').length,
    approved: policies.filter(p => p.status === 'approved').length,
    review: policies.filter(p => p.status === 'review').length,
    draft: policies.filter(p => p.status === 'draft').length
  };

  const totalPolicies = policies.length;
  const totalBudget = policies.reduce((sum, policy) => sum + policy.budget.total, 0);
  const totalSpent = policies.reduce((sum, policy) => sum + policy.budget.spent, 0);
  const avgImpactScore = Math.round(policies.reduce((sum, policy) => sum + policy.impactScore, 0) / policies.length);

  const statusColors = {
    implemented: '#10b981',
    approved: '#06b6d4',
    review: '#f59e0b',
    draft: '#64748b'
  };

  const impactMetrics = [
    { label: '経済影響', value: Math.round(policies.reduce((sum, p) => sum + p.metrics.economicImpact, 0) / policies.length), color: '#3b82f6' },
    { label: '社会影響', value: Math.round(policies.reduce((sum, p) => sum + p.metrics.socialImpact, 0) / policies.length), color: '#10b981' },
    { label: '環境影響', value: Math.round(policies.reduce((sum, p) => sum + p.metrics.environmentalImpact, 0) / policies.length), color: '#22c55e' },
    { label: '市民参加', value: Math.round(policies.reduce((sum, p) => sum + p.metrics.citizenEngagement, 0) / policies.length), color: '#8b5cf6' }
  ];

  const recentActivities = [
    { type: 'milestone', text: 'デジタル市民参加プラットフォームが正式版リリースを完了', time: '2時間前' },
    { type: 'update', text: '地域循環経済促進政策の予算配分が更新されました', time: '5時間前' },
    { type: 'alert', text: 'スマートシティ基盤整備の進捗に遅れが発生', time: '1日前' },
    { type: 'milestone', text: '新しい政策提案が審査フェーズに移行', time: '2日前' },
    { type: 'update', text: '市民参加率が目標値を上回りました', time: '3日前' }
  ];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>
          📊 政策ダッシュボード
        </HeaderTitle>
        <ViewToggle>
          <ToggleButton
            active={viewMode === 'overview'}
            onClick={() => setViewMode('overview')}
          >
            概要
          </ToggleButton>
          <ToggleButton
            active={viewMode === 'detailed'}
            onClick={() => setViewMode('detailed')}
          >
            詳細
          </ToggleButton>
        </ViewToggle>
      </DashboardHeader>

      <MetricsGrid>
        <MetricCard>
          <MetricValue>{totalPolicies}</MetricValue>
          <MetricLabel>総政策数</MetricLabel>
          <MetricChange positive>
            ↗ +2 今月
          </MetricChange>
        </MetricCard>
        <MetricCard>
          <MetricValue>¥{(totalBudget / 1000000000).toFixed(1)}B</MetricValue>
          <MetricLabel>総予算</MetricLabel>
          <MetricChange positive>
            ↗ +5.2% 前月比
          </MetricChange>
        </MetricCard>
        <MetricCard>
          <MetricValue>{Math.round((totalSpent / totalBudget) * 100)}%</MetricValue>
          <MetricLabel>予算執行率</MetricLabel>
          <MetricChange>
            → 計画通り
          </MetricChange>
        </MetricCard>
        <MetricCard>
          <MetricValue>{avgImpactScore}</MetricValue>
          <MetricLabel>平均影響度</MetricLabel>
          <MetricChange positive>
            ↗ +3pt 改善
          </MetricChange>
        </MetricCard>
      </MetricsGrid>

      {viewMode === 'overview' && (
        <ChartsSection>
          <ChartContainer>
            <ChartTitle>📈 政策ステータス分布</ChartTitle>
            <StatusChart>
              {Object.entries(statusCounts).map(([status, count]) => (
                <StatusBar key={status} status={status} percentage={(count / totalPolicies) * 100}>
                  <StatusLabel>
                    {status === 'implemented' && '実装済み'}
                    {status === 'approved' && '承認済み'}
                    {status === 'review' && '審査中'}
                    {status === 'draft' && '草案'}
                  </StatusLabel>
                  <StatusBarFill>
                    <StatusBarProgress
                      percentage={(count / totalPolicies) * 100}
                      color={statusColors[status as keyof typeof statusColors]}
                    />
                  </StatusBarFill>
                  <StatusCount>{count}</StatusCount>
                </StatusBar>
              ))}
            </StatusChart>
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>🎯 平均影響度指標</ChartTitle>
            <ImpactChart>
              {impactMetrics.map((metric, index) => (
                <ImpactItem key={index}>
                  <ImpactDot color={metric.color} />
                  <ImpactLabel>{metric.label}</ImpactLabel>
                  <ImpactValue>{metric.value}%</ImpactValue>
                </ImpactItem>
              ))}
            </ImpactChart>
          </ChartContainer>
        </ChartsSection>
      )}

      <RecentActivity>
        <ActivityTitle>
          🔔 最近のアクティビティ
        </ActivityTitle>
        <ActivityList>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon type={activity.type}>
                {activity.type === 'milestone' && '🎯'}
                {activity.type === 'update' && '📝'}
                {activity.type === 'alert' && '⚠️'}
              </ActivityIcon>
              <ActivityContent>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </DashboardContainer>
  );
};

export default PolicyDashboard;