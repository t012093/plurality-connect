import React from 'react';
import styled from 'styled-components';

const AIInsightsCard = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 30px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #8b5cf6, #06b6d4);
  }
`;

const AIBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InsightItem = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(51, 65, 85, 0.6);
    transform: translateY(-2px);
  }
`;

const InsightHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const InsightIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;

const InsightTitle = styled.span`
  font-weight: 600;
  color: #f1f5f9;
`;

const InsightContent = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
`;

export const AIInsights: React.FC = () => {
  return (
    <AIInsightsCard>
      <AIBadge>🤖 AI インサイト</AIBadge>
      <InsightsGrid>
        <InsightItem>
          <InsightHeader>
            <InsightIcon>🎯</InsightIcon>
            <InsightTitle>最適マッチング</InsightTitle>
          </InsightHeader>
          <InsightContent>
            「高齢者見守りサービス」プロジェクトで、あなたのIoT技術スキルが95%マッチしています。
            富山テック・包括支援センター・自治会との協働が提案されています。
          </InsightContent>
        </InsightItem>
        
        <InsightItem>
          <InsightHeader>
            <InsightIcon>📚</InsightIcon>
            <InsightTitle>政策要約</InsightTitle>
          </InsightHeader>
          <InsightContent>
            富山県DX推進計画が更新されました。市民参加型スマートシティ構想で、
            3つの新しい協働機会が特定されています。
          </InsightContent>
        </InsightItem>
      </InsightsGrid>
    </AIInsightsCard>
  );
};