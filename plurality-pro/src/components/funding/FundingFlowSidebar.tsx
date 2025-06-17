import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border-right: 1px solid rgba(51, 65, 85, 0.3);
  padding: 30px;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #06b6d4;
  cursor: pointer;
`;

const FilterLabel = styled.label<{ color?: string }>`
  color: #cbd5e1;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.color || '#06b6d4'};
    flex-shrink: 0;
  }
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RangeSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(51, 65, 85, 0.5);
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #06b6d4;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #06b6d4;
    cursor: pointer;
    border: none;
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 12px;
`;

const PeriodButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PeriodButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const StatsCard = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(71, 85, 105, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: #cbd5e1;
  font-size: 13px;
`;

const StatValue = styled.span`
  color: #06b6d4;
  font-weight: 600;
  font-size: 13px;
`;

interface FundingFlowSidebarProps {
  filters: {
    sources: string[];
    stakeholders: string[];
    amountRange: [number, number];
  };
  onFilterChange: (filters: {
    sources: string[];
    stakeholders: string[];
    amountRange: [number, number];
  }) => void;
  period: 'month' | 'quarter' | 'year';
}

const FundingFlowSidebar: React.FC<FundingFlowSidebarProps> = ({
  filters,
  onFilterChange,
  period
}) => {
  const fundingSourceTypes = [
    { key: 'government', label: '補助金・交付金', color: '#10b981' },
    { key: 'private', label: '民間投資・寄付', color: '#3b82f6' },
    { key: 'crowdfunding', label: 'クラウドファンディング', color: '#8b5cf6' },
    { key: 'corporate', label: '企業協賛', color: '#f59e0b' },
    { key: 'revenue', label: '事業収益', color: '#ef4444' }
  ];

  const stakeholderTypes = [
    { key: 'government', label: '自治体', color: '#ef4444' },
    { key: 'business', label: '企業', color: '#3b82f6' },
    { key: 'npo', label: 'NPO', color: '#10b981' },
    { key: 'citizen', label: '市民', color: '#8b5cf6' },
    { key: 'academic', label: '学術機関', color: '#f59e0b' }
  ];

  const handleSourceToggle = (sourceKey: string) => {
    const newSources = filters.sources.includes(sourceKey)
      ? filters.sources.filter(s => s !== sourceKey)
      : [...filters.sources, sourceKey];
    
    onFilterChange({
      ...filters,
      sources: newSources
    });
  };

  const handleStakeholderToggle = (stakeholderKey: string) => {
    const newStakeholders = filters.stakeholders.includes(stakeholderKey)
      ? filters.stakeholders.filter(s => s !== stakeholderKey)
      : [...filters.stakeholders, stakeholderKey];
    
    onFilterChange({
      ...filters,
      stakeholders: newStakeholders
    });
  };

  const handleAmountRangeChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.amountRange];
    newRange[index] = value;
    
    onFilterChange({
      ...filters,
      amountRange: newRange
    });
  };

  const formatAmount = (amount: number) => {
    return `¥${(amount / 1000000).toFixed(0)}M`;
  };

  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>💰 資金カテゴリ</SectionTitle>
        <FilterGroup>
          {fundingSourceTypes.map(type => (
            <FilterItem key={type.key}>
              <Checkbox
                type="checkbox"
                checked={filters.sources.includes(type.key)}
                onChange={() => handleSourceToggle(type.key)}
              />
              <FilterLabel color={type.color}>
                {type.label}
              </FilterLabel>
            </FilterItem>
          ))}
        </FilterGroup>
      </Section>

      <Section>
        <SectionTitle>🏢 ステークホルダー</SectionTitle>
        <FilterGroup>
          {stakeholderTypes.map(type => (
            <FilterItem key={type.key}>
              <Checkbox
                type="checkbox"
                checked={filters.stakeholders.includes(type.key)}
                onChange={() => handleStakeholderToggle(type.key)}
              />
              <FilterLabel color={type.color}>
                {type.label}
              </FilterLabel>
            </FilterItem>
          ))}
        </FilterGroup>
      </Section>

      <Section>
        <SectionTitle>💲 金額レンジ</SectionTitle>
        <RangeContainer>
          <div>
            <label style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
              最小金額: {formatAmount(filters.amountRange[0])}
            </label>
            <RangeSlider
              type="range"
              min="0"
              max="10000000"
              step="500000"
              value={filters.amountRange[0]}
              onChange={(e) => handleAmountRangeChange(0, parseInt(e.target.value))}
            />
          </div>
          <div>
            <label style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
              最大金額: {formatAmount(filters.amountRange[1])}
            </label>
            <RangeSlider
              type="range"
              min="0"
              max="10000000"
              step="500000"
              value={filters.amountRange[1]}
              onChange={(e) => handleAmountRangeChange(1, parseInt(e.target.value))}
            />
          </div>
          <RangeLabels>
            <span>¥0</span>
            <span>¥10M</span>
          </RangeLabels>
        </RangeContainer>
      </Section>

      <Section>
        <SectionTitle>📅 期間設定</SectionTitle>
        <PeriodButtons>
          <PeriodButton active={period === 'month'}>
            📊 今月の資金フロー
          </PeriodButton>
          <PeriodButton active={period === 'quarter'}>
            📈 今四半期の資金フロー
          </PeriodButton>
          <PeriodButton active={period === 'year'}>
            📆 今年度の資金フロー
          </PeriodButton>
        </PeriodButtons>
      </Section>

      <StatsCard>
        <SectionTitle style={{ marginBottom: '16px' }}>📋 フィルター統計</SectionTitle>
        <StatRow>
          <StatLabel>表示中ソース</StatLabel>
          <StatValue>{filters.sources.length}/5</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>表示中組織</StatLabel>
          <StatValue>{filters.stakeholders.length}/5</StatValue>
        </StatRow>
        <StatRow>
          <StatLabel>金額範囲</StatLabel>
          <StatValue>{formatAmount(filters.amountRange[1] - filters.amountRange[0])}</StatValue>
        </StatRow>
      </StatsCard>
    </SidebarContainer>
  );
};

export default FundingFlowSidebar;