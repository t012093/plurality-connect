import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FundingFlowSidebar from '../components/funding/FundingFlowSidebar';
import FundingFlowVisualization from '../components/funding/FundingFlowVisualization';
import FundingStatsPanel from '../components/funding/FundingStatsPanel';
import ProjectFundingTable from '../components/funding/ProjectFundingTable';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: #f1f5f9;
`;

const Header = styled.div`
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  padding: 0 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  background: rgba(6, 182, 212, 0.2);
  border: 1px solid #06b6d4;
  color: #06b6d4;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(6, 182, 212, 0.3);
    transform: translateY(-1px);
  }
`;

const Title = styled.h1`
  color: #f1f5f9;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const PeriodSelector = styled.select`
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #cbd5e1;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr 380px;
  gap: 0;
  min-height: calc(100vh - 80px);
`;

const BottomSection = styled.div`
  grid-column: 1 / -1;
  background: rgba(15, 23, 42, 0.8);
  border-top: 1px solid rgba(51, 65, 85, 0.3);
  min-height: 300px;
`;

export interface FundingSource {
  id: string;
  name: string;
  type: 'government' | 'private' | 'crowdfunding' | 'corporate' | 'revenue';
  amount: number;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  spentAmount: number;
  progressRate: number;
  status: 'active' | 'warning' | 'completed' | 'paused';
  stakeholders: string[];
  fundingSources: FundingSource[];
  timeline: {
    start: string;
    end: string;
  };
}

export interface FundingFlowData {
  totalRaised: number;
  totalSpent: number;
  activeProjects: number;
  transparencyScore: number;
  projects: Project[];
  sources: FundingSource[];
}

const FundingFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [viewMode, setViewMode] = useState<'flow' | 'network' | 'timeline'>('flow');
  const [selectedFilters, setSelectedFilters] = useState<{
    sources: string[];
    stakeholders: string[];
    amountRange: [number, number];
  }>({
    sources: ['government', 'private', 'crowdfunding', 'corporate', 'revenue'],
    stakeholders: ['government', 'business', 'npo', 'citizen', 'academic'],
    amountRange: [0, 10000000]
  });

  const [fundingData, setFundingData] = useState<FundingFlowData>({
    totalRaised: 45600000,
    totalSpent: 32400000,
    activeProjects: 12,
    transparencyScore: 87.3,
    projects: [
      {
        id: 'p1',
        name: 'IoT高齢者ケアシステム',
        category: 'ヘルスケア',
        targetAmount: 5000000,
        raisedAmount: 5000000,
        spentAmount: 3200000,
        progressRate: 64,
        status: 'active',
        stakeholders: ['government', 'business', 'academic'],
        fundingSources: [
          { id: 'f1', name: '富山県補助金', type: 'government', amount: 3000000, description: '高齢者支援事業補助金' },
          { id: 'f2', name: '民間投資', type: 'private', amount: 2000000, description: 'ベンチャーキャピタル投資' }
        ],
        timeline: { start: '2024-04-01', end: '2024-12-31' }
      },
      {
        id: 'p2',
        name: '子育て支援アプリ開発',
        category: '教育・子育て',
        targetAmount: 3000000,
        raisedAmount: 3000000,
        spentAmount: 2800000,
        progressRate: 93,
        status: 'warning',
        stakeholders: ['government', 'npo', 'citizen'],
        fundingSources: [
          { id: 'f3', name: 'クラウドファンディング', type: 'crowdfunding', amount: 1500000, description: '市民参加型資金調達' },
          { id: 'f4', name: '市町村補助金', type: 'government', amount: 1500000, description: '子育て支援補助金' }
        ],
        timeline: { start: '2024-01-01', end: '2024-06-30' }
      },
      {
        id: 'p3',
        name: 'スマート農業プラットフォーム',
        category: '農業・食料',
        targetAmount: 8000000,
        raisedAmount: 6500000,
        spentAmount: 3900000,
        progressRate: 60,
        status: 'active',
        stakeholders: ['government', 'business', 'academic'],
        fundingSources: [
          { id: 'f5', name: '農水省補助金', type: 'government', amount: 4000000, description: 'スマート農業推進事業' },
          { id: 'f6', name: '企業協賛', type: 'corporate', amount: 2500000, description: 'IT企業からの技術支援' }
        ],
        timeline: { start: '2024-02-01', end: '2025-01-31' }
      }
    ],
    sources: []
  });

  const handleFilterChange = (newFilters: typeof selectedFilters) => {
    setSelectedFilters(newFilters);
  };

  const filteredData = React.useMemo(() => {
    const filteredProjects = fundingData.projects.filter(project => {
      const hasMatchingSource = project.fundingSources.some(source => 
        selectedFilters.sources.includes(source.type)
      );
      const hasMatchingStakeholder = project.stakeholders.some(stakeholder =>
        selectedFilters.stakeholders.includes(stakeholder)
      );
      const inAmountRange = project.targetAmount >= selectedFilters.amountRange[0] && 
                           project.targetAmount <= selectedFilters.amountRange[1];
      
      return hasMatchingSource && hasMatchingStakeholder && inAmountRange;
    });

    const totalRaised = filteredProjects.reduce((sum, p) => sum + p.raisedAmount, 0);
    const totalSpent = filteredProjects.reduce((sum, p) => sum + p.spentAmount, 0);

    return {
      ...fundingData,
      projects: filteredProjects,
      totalRaised,
      totalSpent,
      activeProjects: filteredProjects.filter(p => p.status === 'active').length
    };
  }, [fundingData, selectedFilters]);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/connect')}>
          ← ダッシュボードに戻る
        </BackButton>
        <Title>
          💰 資金フロー分析
        </Title>
        <HeaderControls>
          <PeriodSelector 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
          >
            <option value="month">今月</option>
            <option value="quarter">今四半期</option>
            <option value="year">今年度</option>
          </PeriodSelector>
          
          <ControlButton 
            active={viewMode === 'flow'} 
            onClick={() => setViewMode('flow')}
          >
            フロー図
          </ControlButton>
          <ControlButton 
            active={viewMode === 'network'} 
            onClick={() => setViewMode('network')}
          >
            ネットワーク
          </ControlButton>
          <ControlButton 
            active={viewMode === 'timeline'} 
            onClick={() => setViewMode('timeline')}
          >
            タイムライン
          </ControlButton>
          
          <ControlButton>
            📊 エクスポート
          </ControlButton>
        </HeaderControls>
      </Header>

      <MainContent>
        <FundingFlowSidebar
          filters={selectedFilters}
          onFilterChange={handleFilterChange}
          period={selectedPeriod}
        />
        
        <FundingFlowVisualization
          data={filteredData}
          viewMode={viewMode}
          period={selectedPeriod}
        />
        
        <FundingStatsPanel
          data={filteredData}
          period={selectedPeriod}
        />

        <BottomSection>
          <ProjectFundingTable
            projects={filteredData.projects}
            onProjectClick={(project) => {
              console.log('Project clicked:', project);
            }}
          />
        </BottomSection>
      </MainContent>
    </Container>
  );
};

export default FundingFlowPage;