import React, { useState } from 'react';
import styled from 'styled-components';
import { PolicyDocument } from '../../pages/PolicySummaryPage';

const SummaryContainer = styled.div`
  padding: 25px;
  height: 600px;
  overflow-y: auto;
`;

const SummaryHeader = styled.div`
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
`;

const HeaderTitle = styled.h3`
  color: #f1f5f9;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DocumentInfo = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 15px;
`;

const DocumentTitle = styled.h4`
  color: #06b6d4;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const DocumentMeta = styled.div`
  display: flex;
  gap: 20px;
  color: #94a3b8;
  font-size: 14px;
`;

const ProcessingStatus = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 12px 16px;
  color: #10b981;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SummaryTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
`;

const TabButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.2)' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#06b6d4' : 'transparent'};
  color: ${props => props.active ? '#06b6d4' : '#94a3b8'};
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SummarySection = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 20px;
`;

const SectionTitle = styled.h5`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionContent = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
`;

const KeyPointsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const KeyPointItem = styled.li`
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  &::before {
    content: '▸';
    color: #06b6d4;
    font-weight: bold;
    margin-top: 2px;
  }
`;

const StakeholderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  margin-top: 8px;
`;

const StakeholderBadge = styled.div`
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid #8b5cf6;
  color: #8b5cf6;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const MetricCard = styled.div`
  background: rgba(71, 85, 105, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const MetricValue = styled.div`
  color: #06b6d4;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(51, 65, 85, 0.3);
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, #06b6d4, #0891b2)' 
    : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.variant === 'primary' ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: #f1f5f9;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.variant === 'primary' 
      ? 'rgba(6, 182, 212, 0.3)' 
      : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const ImpactHighlight = styled.div`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1));
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;

const ImpactTitle = styled.div`
  color: #10b981;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ImpactText = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.5;
`;

const CitizenFriendlySection = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
`;

const FriendlyTitle = styled.div`
  color: #8b5cf6;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FriendlyContent = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
`;

interface AISummaryDisplayProps {
  document: PolicyDocument;
  summary: NonNullable<PolicyDocument['aiSummary']>;
}

const AISummaryDisplay: React.FC<AISummaryDisplayProps> = ({
  document,
  summary
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'citizen'>('overview');

  const formatCurrency = (amount: number) => {
    return `¥${(amount / 1000000).toFixed(0)}M`;
  };

  const generateCitizenFriendlyExplanation = () => {
    return `この政策は、${document.municipality}にお住まいの皆さんの生活をより便利で豊かにするための取り組みです。

🏠 **日常生活への影響**
・市役所での手続きがスマートフォンで完結
・子育て支援サービスがより利用しやすく
・高齢者向けサービスの充実

💰 **家計への影響**
・行政手続きの効率化により時間とコストを節約
・新しいサービスの多くは無料で利用可能
・長期的には税収効率化により住民サービス向上

📅 **実施スケジュール**
・来年春頃からサービス開始予定
・段階的に機能を拡充
・皆さんの意見を聞きながら改善を継続`;
  };

  const handleExport = (format: 'pdf' | 'text') => {
    console.log(`Exporting summary as ${format}`);
    // Export functionality would be implemented here
  };

  const handleShare = () => {
    console.log('Sharing summary');
    // Share functionality would be implemented here
  };

  return (
    <SummaryContainer>
      <SummaryHeader>
        <HeaderTitle>
          🤖 AI要約結果
        </HeaderTitle>
        <DocumentInfo>
          <DocumentTitle>{document.title}</DocumentTitle>
          <DocumentMeta>
            <span>📍 {document.municipality}</span>
            <span>🏛️ {document.department}</span>
            <span>📁 {document.documentType}</span>
            <span>📅 {document.uploadDate.toLocaleDateString()}</span>
          </DocumentMeta>
        </DocumentInfo>
        <ProcessingStatus>
          ✅ AI要約処理が完了しました
        </ProcessingStatus>
      </SummaryHeader>

      <SummaryTabs>
        <TabButton
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          📋 概要
        </TabButton>
        <TabButton
          active={activeTab === 'detailed'}
          onClick={() => setActiveTab('detailed')}
        >
          📊 詳細分析
        </TabButton>
        <TabButton
          active={activeTab === 'citizen'}
          onClick={() => setActiveTab('citizen')}
        >
          👥 市民向け説明
        </TabButton>
      </SummaryTabs>

      <SummaryContent>
        {activeTab === 'overview' && (
          <>
            <SummarySection>
              <SectionTitle>
                📝 エグゼクティブサマリー
              </SectionTitle>
              <SectionContent>
                {summary.executiveSummary}
              </SectionContent>
            </SummarySection>

            <SummarySection>
              <SectionTitle>
                🎯 重要ポイント
              </SectionTitle>
              <KeyPointsList>
                {summary.keyPoints.map((point, index) => (
                  <KeyPointItem key={index}>
                    {point}
                  </KeyPointItem>
                ))}
              </KeyPointsList>
            </SummarySection>

            <ImpactHighlight>
              <ImpactTitle>
                💡 市民への影響
              </ImpactTitle>
              <ImpactText>
                {summary.citizenImpact}
              </ImpactText>
            </ImpactHighlight>
          </>
        )}

        {activeTab === 'detailed' && (
          <>
            <SummarySection>
              <SectionTitle>
                💰 予算・コスト分析
              </SectionTitle>
              <MetricsGrid>
                <MetricCard>
                  <MetricValue>{formatCurrency(summary.estimatedCost)}</MetricValue>
                  <MetricLabel>推定総コスト</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>{formatCurrency(summary.estimatedCost / 3)}</MetricValue>
                  <MetricLabel>年間平均コスト</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>¥{Math.round(summary.estimatedCost / 420000)}</MetricValue>
                  <MetricLabel>市民一人当たり</MetricLabel>
                </MetricCard>
              </MetricsGrid>
            </SummarySection>

            <SummarySection>
              <SectionTitle>
                📅 実施スケジュール
              </SectionTitle>
              <SectionContent>
                {summary.implementationTimeline}
              </SectionContent>
            </SummarySection>

            <SummarySection>
              <SectionTitle>
                👥 関係ステークホルダー
              </SectionTitle>
              <StakeholderGrid>
                {summary.stakeholders.map((stakeholder, index) => (
                  <StakeholderBadge key={index}>
                    {stakeholder}
                  </StakeholderBadge>
                ))}
              </StakeholderGrid>
            </SummarySection>
          </>
        )}

        {activeTab === 'citizen' && (
          <CitizenFriendlySection>
            <FriendlyTitle>
              🏠 市民の皆さまへの分かりやすい説明
            </FriendlyTitle>
            <FriendlyContent>
              {generateCitizenFriendlyExplanation()}
            </FriendlyContent>
          </CitizenFriendlySection>
        )}
      </SummaryContent>

      <ActionButtons>
        <ActionButton variant="primary" onClick={() => handleExport('pdf')}>
          📄 PDF出力
        </ActionButton>
        <ActionButton variant="secondary" onClick={() => handleExport('text')}>
          📝 テキスト出力
        </ActionButton>
        <ActionButton variant="secondary" onClick={handleShare}>
          🔗 共有
        </ActionButton>
      </ActionButtons>
    </SummaryContainer>
  );
};

export default AISummaryDisplay;