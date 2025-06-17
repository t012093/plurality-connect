import React, { useState } from 'react';
import styled from 'styled-components';
import { PolicyDocument } from '../../pages/PolicySummaryPage';

const TableContainer = styled.div`
  padding: 25px;
  height: 600px;
  overflow-y: auto;
`;

const TableHeader = styled.div`
  margin-bottom: 25px;
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
  font-size: 13px;
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const FilterControls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const ComparisonTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const TableHeaderRow = styled.tr`
  background: rgba(51, 65, 85, 0.4);
`;

const HeaderCell = styled.th`
  color: #f1f5f9;
  font-weight: 600;
  padding: 16px 12px;
  text-align: left;
  border-bottom: 2px solid rgba(71, 85, 105, 0.3);
  white-space: nowrap;
  min-width: 120px;

  &:first-child {
    min-width: 200px;
    position: sticky;
    left: 0;
    background: rgba(51, 65, 85, 0.4);
    z-index: 1;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(51, 65, 85, 0.2);
  }

  &:hover {
    background: rgba(6, 182, 212, 0.1);
  }
`;

const Cell = styled.td`
  color: #cbd5e1;
  padding: 12px;
  border-bottom: 1px solid rgba(71, 85, 105, 0.2);
  vertical-align: top;

  &:first-child {
    color: #f1f5f9;
    font-weight: 600;
    position: sticky;
    left: 0;
    background: inherit;
    z-index: 1;
  }
`;

const MetricValue = styled.div<{ type?: 'currency' | 'percentage' | 'score' }>`
  color: ${props => {
    switch (props.type) {
      case 'currency': return '#10b981';
      case 'percentage': return '#06b6d4';
      case 'score': return '#8b5cf6';
      default: return '#cbd5e1';
    }
  }};
  font-weight: 600;
  margin-bottom: 4px;
`;

const MetricDescription = styled.div`
  color: #64748b;
  font-size: 11px;
  line-height: 1.3;
`;

const ImpactBadge = styled.span<{ level: 'high' | 'medium' | 'low' }>`
  background: ${props => {
    switch (props.level) {
      case 'high': return 'rgba(16, 185, 129, 0.2)';
      case 'medium': return 'rgba(245, 158, 11, 0.2)';
      case 'low': return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.level) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#6b7280';
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#6b7280';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const DocumentTypeChip = styled.span<{ type: string }>`
  background: ${props => {
    switch (props.type) {
      case 'policy': return 'rgba(59, 130, 246, 0.2)';
      case 'ordinance': return 'rgba(139, 92, 246, 0.2)';
      case 'plan': return 'rgba(6, 182, 212, 0.2)';
      case 'report': return 'rgba(16, 185, 129, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'policy': return '#3b82f6';
      case 'ordinance': return '#8b5cf6';
      case 'plan': return '#06b6d4';
      case 'report': return '#10b981';
      default: return '#6b7280';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'policy': return '#3b82f6';
      case 'ordinance': return '#8b5cf6';
      case 'plan': return '#06b6d4';
      case 'report': return '#10b981';
      default: return '#6b7280';
    }
  }};
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
`;

const SummarySection = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`;

const SummaryTitle = styled.h4`
  color: #06b6d4;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const SummaryCard = styled.div`
  background: rgba(71, 85, 105, 0.3);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
`;

const SummaryValue = styled.div`
  color: #06b6d4;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const SummaryLabel = styled.div`
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
`;

interface PolicyComparisonTableProps {
  documents: PolicyDocument[];
}

const PolicyComparisonTable: React.FC<PolicyComparisonTableProps> = ({ documents }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('uploadDate');

  const documentTypes = ['all', 'policy', 'ordinance', 'plan', 'report'];

  const filteredDocuments = documents.filter(doc => 
    filterType === 'all' || doc.documentType === filterType
  );

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'cost':
        return (b.aiSummary?.estimatedCost || 0) - (a.aiSummary?.estimatedCost || 0);
      case 'impact':
        return (b.citizenImpactAnalysis?.economicImpact || 0) - (a.citizenImpactAnalysis?.economicImpact || 0);
      case 'uploadDate':
      default:
        return b.uploadDate.getTime() - a.uploadDate.getTime();
    }
  });

  const formatCurrency = (amount: number) => {
    return `¥${(amount / 1000000).toFixed(0)}M`;
  };

  const getImpactLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'policy': return '政策';
      case 'ordinance': return '条例';
      case 'plan': return '計画';
      case 'report': return '報告書';
      default: return type;
    }
  };

  const calculateTotalCost = () => {
    return sortedDocuments.reduce((sum, doc) => 
      sum + (doc.aiSummary?.estimatedCost || 0), 0
    );
  };

  const calculateAverageImpact = () => {
    const impacts = sortedDocuments
      .map(doc => doc.citizenImpactAnalysis?.economicImpact || 0)
      .filter(impact => impact > 0);
    return impacts.length > 0 
      ? impacts.reduce((sum, impact) => sum + impact, 0) / impacts.length 
      : 0;
  };

  return (
    <TableContainer>
      <TableHeader>
        <HeaderTitle>
          ⚖️ 政策比較テーブル
        </HeaderTitle>
        <HeaderDescription>
          複数の政策文書を横断的に比較・分析します
        </HeaderDescription>
      </TableHeader>

      <FilterControls>
        {documentTypes.map(type => (
          <FilterButton
            key={type}
            active={filterType === type}
            onClick={() => setFilterType(type)}
          >
            {type === 'all' ? '全て' : getDocumentTypeLabel(type)}
          </FilterButton>
        ))}
        <FilterButton
          active={sortBy === 'cost'}
          onClick={() => setSortBy('cost')}
        >
          💰 コスト順
        </FilterButton>
        <FilterButton
          active={sortBy === 'impact'}
          onClick={() => setSortBy('impact')}
        >
          📊 影響度順
        </FilterButton>
      </FilterControls>

      <ComparisonTable>
        <Table>
          <thead>
            <TableHeaderRow>
              <HeaderCell>政策文書</HeaderCell>
              <HeaderCell>文書種別</HeaderCell>
              <HeaderCell>自治体</HeaderCell>
              <HeaderCell>推定コスト</HeaderCell>
              <HeaderCell>経済的影響</HeaderCell>
              <HeaderCell>社会的影響</HeaderCell>
              <HeaderCell>個人生活影響</HeaderCell>
              <HeaderCell>地域影響</HeaderCell>
              <HeaderCell>アップロード日</HeaderCell>
            </TableHeaderRow>
          </thead>
          <tbody>
            {sortedDocuments.map(doc => (
              <TableRow key={doc.id}>
                <Cell>
                  <div style={{ maxWidth: '180px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {doc.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {doc.department}
                    </div>
                  </div>
                </Cell>
                <Cell>
                  <DocumentTypeChip type={doc.documentType}>
                    {getDocumentTypeLabel(doc.documentType)}
                  </DocumentTypeChip>
                </Cell>
                <Cell>{doc.municipality}</Cell>
                <Cell>
                  {doc.aiSummary?.estimatedCost ? (
                    <MetricValue type="currency">
                      {formatCurrency(doc.aiSummary.estimatedCost)}
                    </MetricValue>
                  ) : (
                    <span style={{ color: '#64748b' }}>処理中</span>
                  )}
                </Cell>
                <Cell>
                  {doc.citizenImpactAnalysis?.economicImpact ? (
                    <>
                      <MetricValue type="percentage">
                        {doc.citizenImpactAnalysis.economicImpact}%
                      </MetricValue>
                      <ImpactBadge level={getImpactLevel(doc.citizenImpactAnalysis.economicImpact)}>
                        {getImpactLevel(doc.citizenImpactAnalysis.economicImpact)}
                      </ImpactBadge>
                    </>
                  ) : (
                    <span style={{ color: '#64748b' }}>処理中</span>
                  )}
                </Cell>
                <Cell>
                  {doc.citizenImpactAnalysis?.socialImpact ? (
                    <>
                      <MetricValue type="percentage">
                        {doc.citizenImpactAnalysis.socialImpact}%
                      </MetricValue>
                      <ImpactBadge level={getImpactLevel(doc.citizenImpactAnalysis.socialImpact)}>
                        {getImpactLevel(doc.citizenImpactAnalysis.socialImpact)}
                      </ImpactBadge>
                    </>
                  ) : (
                    <span style={{ color: '#64748b' }}>処理中</span>
                  )}
                </Cell>
                <Cell>
                  {doc.citizenImpactAnalysis?.personalLifeImpact ? (
                    <>
                      <MetricValue type="percentage">
                        {doc.citizenImpactAnalysis.personalLifeImpact}%
                      </MetricValue>
                      <ImpactBadge level={getImpactLevel(doc.citizenImpactAnalysis.personalLifeImpact)}>
                        {getImpactLevel(doc.citizenImpactAnalysis.personalLifeImpact)}
                      </ImpactBadge>
                    </>
                  ) : (
                    <span style={{ color: '#64748b' }}>処理中</span>
                  )}
                </Cell>
                <Cell>
                  {doc.citizenImpactAnalysis?.regionalImpact ? (
                    <>
                      <MetricValue type="percentage">
                        {doc.citizenImpactAnalysis.regionalImpact}%
                      </MetricValue>
                      <ImpactBadge level={getImpactLevel(doc.citizenImpactAnalysis.regionalImpact)}>
                        {getImpactLevel(doc.citizenImpactAnalysis.regionalImpact)}
                      </ImpactBadge>
                    </>
                  ) : (
                    <span style={{ color: '#64748b' }}>処理中</span>
                  )}
                </Cell>
                <Cell>
                  <div style={{ fontSize: '12px' }}>
                    {doc.uploadDate.toLocaleDateString()}
                  </div>
                </Cell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ComparisonTable>

      <SummarySection>
        <SummaryTitle>
          📈 比較サマリー
        </SummaryTitle>
        <SummaryGrid>
          <SummaryCard>
            <SummaryValue>{sortedDocuments.length}</SummaryValue>
            <SummaryLabel>比較対象文書数</SummaryLabel>
          </SummaryCard>
          <SummaryCard>
            <SummaryValue>{formatCurrency(calculateTotalCost())}</SummaryValue>
            <SummaryLabel>総推定コスト</SummaryLabel>
          </SummaryCard>
          <SummaryCard>
            <SummaryValue>{Math.round(calculateAverageImpact())}%</SummaryValue>
            <SummaryLabel>平均経済的影響度</SummaryLabel>
          </SummaryCard>
          <SummaryCard>
            <SummaryValue>
              {sortedDocuments.filter(doc => 
                doc.citizenImpactAnalysis?.economicImpact && 
                doc.citizenImpactAnalysis.economicImpact >= 70
              ).length}
            </SummaryValue>
            <SummaryLabel>高影響政策数</SummaryLabel>
          </SummaryCard>
        </SummaryGrid>
      </SummarySection>
    </TableContainer>
  );
};

export default PolicyComparisonTable;