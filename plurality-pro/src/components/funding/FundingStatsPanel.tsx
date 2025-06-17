import React from 'react';
import styled from 'styled-components';
import { FundingFlowData } from '../../pages/FundingFlowPage';

const PanelContainer = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border-left: 1px solid rgba(51, 65, 85, 0.3);
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const StatCard = styled.div<{ accent?: string }>`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-left: 4px solid ${props => props.accent || '#06b6d4'};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.4);
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  color: #f1f5f9;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  margin-bottom: 8px;
`;

const StatTrend = styled.div<{ positive?: boolean }>`
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`;

const ProgressFill = styled.div<{ percentage: number; color?: string }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: linear-gradient(90deg, ${props => props.color || '#06b6d4'}, ${props => props.color || '#06b6d4'}80);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const AlertCard = styled.div<{ type: 'warning' | 'success' | 'info' }>`
  background: ${props => {
    switch (props.type) {
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'success': return 'rgba(16, 185, 129, 0.1)';
      case 'info': return 'rgba(6, 182, 212, 0.1)';
      default: return 'rgba(51, 65, 85, 0.3)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'warning': return '#f59e0b';
      case 'success': return '#10b981';
      case 'info': return '#06b6d4';
      default: return 'rgba(71, 85, 105, 0.3)';
    }
  }};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

const AlertTitle = styled.div`
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlertContent = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.4;
`;

const ActionButton = styled.button`
  background: rgba(6, 182, 212, 0.2);
  border: 1px solid #06b6d4;
  color: #06b6d4;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background: rgba(6, 182, 212, 0.3);
    transform: translateY(-1px);
  }
`;

const ChartContainer = styled.div`
  background: rgba(51, 65, 85, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
`;

const PieChart = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
  position: relative;
`;

const PieSegment = styled.div<{ 
  percentage: number; 
  offset: number; 
  color: string;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from ${props => props.offset}deg,
    ${props => props.color} 0deg,
    ${props => props.color} ${props => props.percentage * 3.6}deg,
    transparent ${props => props.percentage * 3.6}deg
  );
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${props => props.color};
`;

interface FundingStatsPanelProps {
  data: FundingFlowData;
  period: 'month' | 'quarter' | 'year';
}

const FundingStatsPanel: React.FC<FundingStatsPanelProps> = ({ data, period }) => {
  const formatCurrency = (amount: number) => {
    return `¥${(amount / 1000000).toFixed(1)}M`;
  };

  const getExecutionRate = () => {
    return data.totalRaised > 0 ? (data.totalSpent / data.totalRaised) * 100 : 0;
  };

  const getAverageProjectSize = () => {
    return data.projects.length > 0 ? data.totalRaised / data.projects.length : 0;
  };

  const getTopFundingSource = () => {
    const sourceTotals = new Map<string, number>();
    data.projects.forEach(project => {
      project.fundingSources.forEach(source => {
        const current = sourceTotals.get(source.type) || 0;
        sourceTotals.set(source.type, current + source.amount);
      });
    });

    let maxAmount = 0;
    let topSource = '';
    sourceTotals.forEach((amount, source) => {
      if (amount > maxAmount) {
        maxAmount = amount;
        topSource = source;
      }
    });

    const sourceNames = {
      government: '補助金・交付金',
      private: '民間投資',
      crowdfunding: 'クラウドファンディング',
      corporate: '企業協賛',
      revenue: '事業収益'
    };

    return sourceNames[topSource as keyof typeof sourceNames] || topSource;
  };

  const getProjectsByStatus = () => {
    const statusCounts = {
      active: data.projects.filter(p => p.status === 'active').length,
      warning: data.projects.filter(p => p.status === 'warning').length,
      completed: data.projects.filter(p => p.status === 'completed').length,
      paused: data.projects.filter(p => p.status === 'paused').length
    };
    return statusCounts;
  };

  const statusCounts = getProjectsByStatus();
  const executionRate = getExecutionRate();

  return (
    <PanelContainer>
      <Section>
        <SectionTitle>📊 リアルタイム統計</SectionTitle>
        <StatsGrid>
          <StatCard accent="#10b981">
            <StatValue>{formatCurrency(data.totalRaised)}</StatValue>
            <StatLabel>総調達額</StatLabel>
            <StatTrend positive={true}>
              ↗ +12.3% {period === 'month' ? '先月比' : period === 'quarter' ? '前四半期比' : '前年比'}
            </StatTrend>
          </StatCard>

          <StatCard accent="#3b82f6">
            <StatValue>{formatCurrency(data.totalSpent)}</StatValue>
            <StatLabel>総支出額</StatLabel>
            <ProgressBar>
              <ProgressFill percentage={executionRate} color="#3b82f6" />
            </ProgressBar>
            <StatTrend positive={executionRate < 90}>
              実行率: {executionRate.toFixed(1)}%
            </StatTrend>
          </StatCard>

          <StatCard accent="#8b5cf6">
            <StatValue>{data.activeProjects}</StatValue>
            <StatLabel>アクティブプロジェクト</StatLabel>
            <StatTrend positive={true}>
              ↗ +2 新規開始
            </StatTrend>
          </StatCard>

          <StatCard accent="#06b6d4">
            <StatValue>{data.transparencyScore}%</StatValue>
            <StatLabel>透明性スコア</StatLabel>
            <ProgressBar>
              <ProgressFill percentage={data.transparencyScore} color="#06b6d4" />
            </ProgressBar>
          </StatCard>
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle>⚠️ アラート・通知</SectionTitle>
        
        <AlertCard type="warning">
          <AlertTitle>
            ⚠️ 予算超過注意
          </AlertTitle>
          <AlertContent>
            「子育て支援アプリ開発」が予算の93%を消化しています。
          </AlertContent>
        </AlertCard>

        <AlertCard type="success">
          <AlertTitle>
            ✅ 調達目標達成
          </AlertTitle>
          <AlertContent>
            「IoT高齢者ケアシステム」が目標金額を達成しました。
          </AlertContent>
        </AlertCard>

        <AlertCard type="info">
          <AlertTitle>
            📅 支払い期日
          </AlertTitle>
          <AlertContent>
            3件のプロジェクトで今月末までに支払い予定があります。
          </AlertContent>
        </AlertCard>
      </Section>

      <Section>
        <SectionTitle>📈 パフォーマンス分析</SectionTitle>
        
        <ChartContainer>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: '600' }}>
              プロジェクト状況分布
            </div>
          </div>
          
          <LegendContainer>
            <LegendItem>
              <LegendColor color="#10b981" />
              <span style={{ color: '#cbd5e1' }}>順調 ({statusCounts.active}件)</span>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#f59e0b" />
              <span style={{ color: '#cbd5e1' }}>要注意 ({statusCounts.warning}件)</span>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#06b6d4" />
              <span style={{ color: '#cbd5e1' }}>完了 ({statusCounts.completed}件)</span>
            </LegendItem>
            <LegendItem>
              <LegendColor color="#64748b" />
              <span style={{ color: '#cbd5e1' }}>一時停止 ({statusCounts.paused}件)</span>
            </LegendItem>
          </LegendContainer>
        </ChartContainer>

        <StatCard>
          <StatLabel>平均プロジェクト規模</StatLabel>
          <StatValue>{formatCurrency(getAverageProjectSize())}</StatValue>
          <StatLabel style={{ marginTop: '8px' }}>主要資金源</StatLabel>
          <div style={{ color: '#06b6d4', fontSize: '14px', fontWeight: '600' }}>
            {getTopFundingSource()}
          </div>
        </StatCard>
      </Section>

      <Section>
        <SectionTitle>📋 詳細レポート</SectionTitle>
        
        <ActionButton>
          📄 月次資金レポート生成
        </ActionButton>
        
        <ActionButton>
          📊 インパクト測定結果
        </ActionButton>
        
        <ActionButton>
          🔍 透明性監査レポート
        </ActionButton>
        
        <ActionButton>
          📤 データエクスポート
        </ActionButton>
      </Section>
    </PanelContainer>
  );
};

export default FundingStatsPanel;