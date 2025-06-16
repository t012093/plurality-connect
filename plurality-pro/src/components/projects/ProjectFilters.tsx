import React, { useState } from 'react';
import styled from 'styled-components';

interface FilterProps {
  filters: {
    categories: string[];
    regions: string[];
    budgetRange: [number, number];
    status: string[];
    skills: string[];
    urgency: string[];
  };
  onFilterChange: (filters: any) => void;
}

const FiltersContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const FiltersTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterSection = styled.div`
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);

  &:last-child {
    border-bottom: none;
  }
`;

const FilterLabel = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  color: #cbd5e1;
  font-size: 14px;

  &:hover {
    background: rgba(71, 85, 105, 0.3);
    color: #f1f5f9;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #06b6d4;
  cursor: pointer;
`;

const RangeSlider = styled.div`
  margin: 16px 0;
`;

const SliderContainer = styled.div`
  position: relative;
  margin: 20px 0;
`;

const SliderTrack = styled.div`
  height: 4px;
  background: rgba(71, 85, 105, 0.4);
  border-radius: 2px;
  position: relative;
`;

const SliderRange = styled.div<{ left: number; width: number }>`
  position: absolute;
  height: 100%;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  border-radius: 2px;
  left: ${props => props.left}%;
  width: ${props => props.width}%;
`;

const SliderInput = styled.input`
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #06b6d4;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(6, 182, 212, 0.4);
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #94a3b8;
`;

const AIMatchingSection = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid rgba(139, 92, 246, 0.2);
`;

const AIMatchingTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #a78bfa;
  margin-bottom: 12px;
  font-size: 14px;
`;

const MatchingToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 12px;
`;

const ToggleSwitch = styled.input`
  position: relative;
  width: 44px;
  height: 24px;
  appearance: none;
  background: rgba(71, 85, 105, 0.4);
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:checked {
    background: linear-gradient(45deg, #06b6d4, #3b82f6);
  }

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    transform: ${props => props.checked ? 'translateX(20px)' : 'translateX(0)'};
  }
`;

const FilterCount = styled.span`
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
`;

const ClearFilters = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #f87171;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: rgba(239, 68, 68, 0.3);
    transform: translateY(-1px);
  }
`;

const SkillInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background: rgba(71, 85, 105, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 8px;
  color: #f1f5f9;
  font-size: 14px;
  margin-bottom: 8px;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(71, 85, 105, 0.4);
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const SkillTag = styled.span`
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(139, 92, 246, 0.3);
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(139, 92, 246, 0.3);
  }
`;

export const ProjectFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const [skillInput, setSkillInput] = useState('');
  const [aiMatching, setAIMatching] = useState(true);

  const categories = [
    '健康・医療・福祉',
    '教育・子育て',
    '環境・エネルギー',
    '防災・安全',
    '産業・経済',
    '交通・インフラ',
    '文化・観光',
    'その他'
  ];

  const regions = [
    '北海道',
    '東京都',
    '神奈川県',
    '愛知県',
    '大阪府',
    '京都府',
    '富山県',
    '石川県',
    '福井県',
    'オンライン・全国'
  ];

  const statusOptions = [
    { value: 'planning', label: '企画中' },
    { value: 'recruiting', label: '募集中' },
    { value: 'in-progress', label: '実行中' },
    { value: 'paused', label: '一時停止' }
  ];

  const urgencyOptions = [
    { value: 'critical', label: '緊急' },
    { value: 'high', label: '高' },
    { value: 'medium', label: '中' },
    { value: 'low', label: '低' }
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...filters.regions, region]
      : filters.regions.filter(r => r !== region);
    
    onFilterChange({
      ...filters,
      regions: newRegions
    });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    
    onFilterChange({
      ...filters,
      status: newStatus
    });
  };

  const handleUrgencyChange = (urgency: string, checked: boolean) => {
    const newUrgency = checked
      ? [...filters.urgency, urgency]
      : filters.urgency.filter(u => u !== urgency);
    
    onFilterChange({
      ...filters,
      urgency: newUrgency
    });
  };

  const handleBudgetChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.budgetRange];
    newRange[index] = value;
    
    onFilterChange({
      ...filters,
      budgetRange: newRange
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !filters.skills.includes(skillInput.trim())) {
      onFilterChange({
        ...filters,
        skills: [...filters.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    onFilterChange({
      ...filters,
      skills: filters.skills.filter(s => s !== skill)
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      regions: [],
      budgetRange: [0, 10000000],
      status: [],
      skills: [],
      urgency: []
    });
  };

  const getTotalFilterCount = () => {
    return filters.categories.length + 
           filters.regions.length + 
           filters.status.length + 
           filters.skills.length + 
           filters.urgency.length;
  };

  const formatBudget = (amount: number) => {
    if (amount >= 1000000) {
      return `¥${(amount / 1000000).toFixed(0)}M`;
    } else if (amount >= 1000) {
      return `¥${(amount / 1000).toFixed(0)}K`;
    } else {
      return `¥${amount.toLocaleString()}`;
    }
  };

  return (
    <FiltersContainer>
      <FiltersTitle>
        🔍 フィルター
        {getTotalFilterCount() > 0 && (
          <FilterCount>{getTotalFilterCount()}</FilterCount>
        )}
      </FiltersTitle>

      <AIMatchingSection>
        <AIMatchingTitle>
          🤖 AIマッチング
        </AIMatchingTitle>
        <MatchingToggle>
          <ToggleSwitch
            type="checkbox"
            checked={aiMatching}
            onChange={(e) => setAIMatching(e.target.checked)}
          />
          <span style={{ color: '#cbd5e1', fontSize: '14px' }}>
            スキルベースマッチング
          </span>
        </MatchingToggle>
        <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.4' }}>
          あなたのプロフィールに基づいて最適なプロジェクトを優先表示します
        </div>
      </AIMatchingSection>

      <FilterSection>
        <FilterLabel>分野・カテゴリー</FilterLabel>
        <CheckboxGroup>
          {categories.map(category => (
            <CheckboxItem key={category}>
              <Checkbox
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
              />
              {category}
            </CheckboxItem>
          ))}
        </CheckboxGroup>
      </FilterSection>

      <FilterSection>
        <FilterLabel>地域</FilterLabel>
        <CheckboxGroup>
          {regions.map(region => (
            <CheckboxItem key={region}>
              <Checkbox
                type="checkbox"
                checked={filters.regions.includes(region)}
                onChange={(e) => handleRegionChange(region, e.target.checked)}
              />
              {region}
            </CheckboxItem>
          ))}
        </CheckboxGroup>
      </FilterSection>

      <FilterSection>
        <FilterLabel>予算範囲</FilterLabel>
        <RangeSlider>
          <SliderContainer>
            <SliderTrack>
              <SliderRange 
                left={(filters.budgetRange[0] / 10000000) * 100}
                width={((filters.budgetRange[1] - filters.budgetRange[0]) / 10000000) * 100}
              />
            </SliderTrack>
            <SliderInput
              type="range"
              min={0}
              max={10000000}
              step={100000}
              value={filters.budgetRange[0]}
              onChange={(e) => handleBudgetChange(0, parseInt(e.target.value))}
            />
            <SliderInput
              type="range"
              min={0}
              max={10000000}
              step={100000}
              value={filters.budgetRange[1]}
              onChange={(e) => handleBudgetChange(1, parseInt(e.target.value))}
              style={{ marginTop: '-4px' }}
            />
          </SliderContainer>
          <RangeLabels>
            <span>{formatBudget(filters.budgetRange[0])}</span>
            <span>{formatBudget(filters.budgetRange[1])}</span>
          </RangeLabels>
        </RangeSlider>
      </FilterSection>

      <FilterSection>
        <FilterLabel>プロジェクトステータス</FilterLabel>
        <CheckboxGroup>
          {statusOptions.map(option => (
            <CheckboxItem key={option.value}>
              <Checkbox
                type="checkbox"
                checked={filters.status.includes(option.value)}
                onChange={(e) => handleStatusChange(option.value, e.target.checked)}
              />
              {option.label}
            </CheckboxItem>
          ))}
        </CheckboxGroup>
      </FilterSection>

      <FilterSection>
        <FilterLabel>緊急度</FilterLabel>
        <CheckboxGroup>
          {urgencyOptions.map(option => (
            <CheckboxItem key={option.value}>
              <Checkbox
                type="checkbox"
                checked={filters.urgency.includes(option.value)}
                onChange={(e) => handleUrgencyChange(option.value, e.target.checked)}
              />
              {option.label}
            </CheckboxItem>
          ))}
        </CheckboxGroup>
      </FilterSection>

      <FilterSection>
        <FilterLabel>スキル・技術</FilterLabel>
        <SkillInput
          type="text"
          placeholder="スキルを入力 (例: React, Python, UI/UX)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
        />
        <SkillTags>
          {filters.skills.map(skill => (
            <SkillTag key={skill} onClick={() => removeSkill(skill)}>
              {skill} ✕
            </SkillTag>
          ))}
        </SkillTags>
      </FilterSection>

      {getTotalFilterCount() > 0 && (
        <ClearFilters onClick={clearAllFilters}>
          🗑️ フィルターをクリア
        </ClearFilters>
      )}
    </FiltersContainer>
  );
};