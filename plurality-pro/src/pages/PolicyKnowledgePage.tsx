import React, { useState } from 'react';
import styled from 'styled-components';
import { ConnectSidebar } from '../components/connect/ConnectSidebar';
import PolicyVisualization from '../components/policy/PolicyVisualization';
import PolicyImpactMap from '../components/policy/PolicyImpactMap';
import PolicyChatbot from '../components/policy/PolicyChatbot';
import PolicyDashboard from '../components/policy/PolicyDashboard';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.97) 0%, 
    rgba(30, 41, 59, 0.95) 40%, 
    rgba(51, 65, 85, 0.93) 100%);
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-areas: "sidebar main";
`;

const MainContent = styled.main`
  grid-area: main;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
`;

const HeaderSection = styled.section`
  grid-column: 1 / -1;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  color: #f1f5f9;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PageDescription = styled.p`
  color: #cbd5e1;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 25px 0;
`;

const ViewModeToggle = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
`;

const ModeButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const VisualizationSection = styled.section`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatbotSection = styled.section`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const DashboardSection = styled.section`
  grid-column: 1 / -1;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 0;
  margin-top: 20px;
`;

export interface PolicyData {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'draft' | 'review' | 'approved' | 'implemented';
  impactScore: number;
  complexity: number;
  stakeholders: string[];
  timeline: {
    start: string;
    end: string;
    milestones: { date: string; title: string; completed: boolean }[];
  };
  metrics: {
    citizenEngagement: number;
    economicImpact: number;
    environmentalImpact: number;
    socialImpact: number;
  };
  relatedPolicies: string[];
  budget: {
    total: number;
    allocated: number;
    spent: number;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  policyReferences?: string[];
}

const PolicyKnowledgePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'infographic' | 'impact' | 'timeline'>('infographic');

  const mockPolicyData: PolicyData[] = [
    {
      id: '1',
      title: 'デジタル市民参加プラットフォーム',
      category: 'デジタル・ガバナンス',
      description: '市民が政策決定に直接参加できるデジタルプラットフォームの構築',
      status: 'implemented',
      impactScore: 85,
      complexity: 7,
      stakeholders: ['市民', '行政', 'IT企業', '学術機関'],
      timeline: {
        start: '2024-01-01',
        end: '2024-12-31',
        milestones: [
          { date: '2024-03-01', title: 'プラットフォーム設計完了', completed: true },
          { date: '2024-06-01', title: 'β版リリース', completed: true },
          { date: '2024-09-01', title: '正式版リリース', completed: true },
          { date: '2024-12-01', title: '効果測定完了', completed: false }
        ]
      },
      metrics: {
        citizenEngagement: 78,
        economicImpact: 65,
        environmentalImpact: 45,
        socialImpact: 89
      },
      relatedPolicies: ['2', '3'],
      budget: {
        total: 120000000,
        allocated: 120000000,
        spent: 89000000
      }
    },
    {
      id: '2',
      title: '地域循環経済促進政策',
      category: '経済・環境',
      description: '地域内での資源循環と経済活性化を促進する包括的政策',
      status: 'review',
      impactScore: 72,
      complexity: 8,
      stakeholders: ['地域企業', '市民', '環境団体', '農業組合'],
      timeline: {
        start: '2024-04-01',
        end: '2025-03-31',
        milestones: [
          { date: '2024-06-01', title: '実証実験開始', completed: true },
          { date: '2024-09-01', title: '中間評価', completed: false },
          { date: '2024-12-01', title: '政策パッケージ策定', completed: false },
          { date: '2025-03-01', title: '本格実施', completed: false }
        ]
      },
      metrics: {
        citizenEngagement: 65,
        economicImpact: 88,
        environmentalImpact: 92,
        socialImpact: 71
      },
      relatedPolicies: ['1', '4'],
      budget: {
        total: 200000000,
        allocated: 150000000,
        spent: 45000000
      }
    },
    {
      id: '3',
      title: 'スマートシティ基盤整備',
      category: 'インフラ・技術',
      description: 'IoTセンサーとAIを活用したスマートシティインフラの整備',
      status: 'approved',
      impactScore: 91,
      complexity: 9,
      stakeholders: ['市民', 'IT企業', '行政', '大学'],
      timeline: {
        start: '2024-07-01',
        end: '2026-06-30',
        milestones: [
          { date: '2024-09-01', title: 'センサー設置開始', completed: false },
          { date: '2025-01-01', title: 'データプラットフォーム構築', completed: false },
          { date: '2025-07-01', title: 'AIサービス開始', completed: false },
          { date: '2026-06-01', title: '全面運用開始', completed: false }
        ]
      },
      metrics: {
        citizenEngagement: 68,
        economicImpact: 85,
        environmentalImpact: 76,
        socialImpact: 82
      },
      relatedPolicies: ['1', '2'],
      budget: {
        total: 500000000,
        allocated: 300000000,
        spent: 25000000
      }
    }
  ];

  return (
    <PageContainer>
      <ConnectSidebar />
      <MainContent>
        <HeaderSection>
          <PageTitle>
            💡 政策ナレッジ
          </PageTitle>
          <PageDescription>
            政策の可視化と分析、AIアシスタントを通じて政策決定をサポートします。複雑な政策情報を直感的に理解し、データに基づいた意思決定を促進します。
          </PageDescription>
          <ViewModeToggle>
            <ModeButton
              active={viewMode === 'infographic'}
              onClick={() => setViewMode('infographic')}
            >
              📊 政策インフォグラフィック
            </ModeButton>
            <ModeButton
              active={viewMode === 'impact'}
              onClick={() => setViewMode('impact')}
            >
              🗺️ 影響マップ
            </ModeButton>
            <ModeButton
              active={viewMode === 'timeline'}
              onClick={() => setViewMode('timeline')}
            >
              📅 タイムライン
            </ModeButton>
          </ViewModeToggle>
        </HeaderSection>

        <VisualizationSection>
          {viewMode === 'infographic' && (
            <PolicyVisualization policies={mockPolicyData} />
          )}
          {viewMode === 'impact' && (
            <PolicyImpactMap policies={mockPolicyData} />
          )}
          {viewMode === 'timeline' && (
            <PolicyVisualization policies={mockPolicyData} viewMode="timeline" />
          )}
        </VisualizationSection>

        <ChatbotSection>
          <PolicyChatbot policies={mockPolicyData} />
        </ChatbotSection>

        <DashboardSection>
          <PolicyDashboard policies={mockPolicyData} />
        </DashboardSection>
      </MainContent>
    </PageContainer>
  );
};

export default PolicyKnowledgePage;