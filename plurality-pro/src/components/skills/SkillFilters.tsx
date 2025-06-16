import React from 'react';
import styled from 'styled-components';

interface SkillFiltersProps {
  filters: {
    skillCategories: string[];
    skillLevels: number[];
    locations: string[];
    activityTypes: string[];
    availability: [number, number];
    onlineOnly: boolean;
  };
  onFilterChange: (filters: any) => void;
  matchingMode: string;
}

const FilterContainer = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h4`
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
    'rgba(71, 85, 105, 0.3)'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(71, 85, 105, 0.3)'};
  border-radius: 8px;
  color: ${props => props.active ? 'white' : '#cbd5e1'};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
      'rgba(71, 85, 105, 0.5)'};
  }
`;

const RangeContainer = styled.div`
  margin-top: 8px;
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 8px 0;
  accent-color: #06b6d4;
`;

const RangeLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #cbd5e1;
  cursor: pointer;
  
  input {
    accent-color: #06b6d4;
  }
`;

export const SkillFilters: React.FC<SkillFiltersProps> = ({ 
  filters, 
  onFilterChange, 
  matchingMode 
}) => {
  const skillCategories = ['フロントエンド', 'プログラミング', 'デザイン', 'データサイエンス', 'ビジネス', 'ツール'];
  const skillLevels = [1, 2, 3, 4, 5];
  const locations = ['富山市', '高岡市', '射水市', '砺波市'];
  const activityTypes = ['プロボノ', '有償', 'メンタリング', '学習交換'];

  const handleCategoryToggle = (category: string) => {
    const updated = filters.skillCategories.includes(category)
      ? filters.skillCategories.filter(c => c !== category)
      : [...filters.skillCategories, category];
    onFilterChange({ ...filters, skillCategories: updated });
  };

  const handleLevelToggle = (level: number) => {
    const updated = filters.skillLevels.includes(level)
      ? filters.skillLevels.filter(l => l !== level)
      : [...filters.skillLevels, level];
    onFilterChange({ ...filters, skillLevels: updated });
  };

  const handleLocationToggle = (location: string) => {
    const updated = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    onFilterChange({ ...filters, locations: updated });
  };

  const handleActivityToggle = (activity: string) => {
    const updated = filters.activityTypes.includes(activity)
      ? filters.activityTypes.filter(a => a !== activity)
      : [...filters.activityTypes, activity];
    onFilterChange({ ...filters, activityTypes: updated });
  };

  return (
    <div>
      <FilterContainer>
        <FilterSection>
          <FilterTitle>💼 スキルカテゴリ</FilterTitle>
          <FilterGrid>
            {skillCategories.map(category => (
              <FilterButton
                key={category}
                active={filters.skillCategories.includes(category)}
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
              </FilterButton>
            ))}
          </FilterGrid>
        </FilterSection>

        <FilterSection>
          <FilterTitle>⭐ スキルレベル</FilterTitle>
          <FilterGrid>
            {skillLevels.map(level => (
              <FilterButton
                key={level}
                active={filters.skillLevels.includes(level)}
                onClick={() => handleLevelToggle(level)}
              >
                {level === 1 && '🟥 初心者'}
                {level === 2 && '🟧 基礎'}
                {level === 3 && '🟨 中級'}
                {level === 4 && '🟩 上級'}
                {level === 5 && '🟦 専門家'}
              </FilterButton>
            ))}
          </FilterGrid>
        </FilterSection>

        <FilterSection>
          <FilterTitle>📍 地域</FilterTitle>
          <FilterGrid>
            {locations.map(location => (
              <FilterButton
                key={location}
                active={filters.locations.includes(location)}
                onClick={() => handleLocationToggle(location)}
              >
                {location}
              </FilterButton>
            ))}
          </FilterGrid>
        </FilterSection>

        <FilterSection>
          <FilterTitle>🎯 活動タイプ</FilterTitle>
          <FilterGrid>
            {activityTypes.map(activity => (
              <FilterButton
                key={activity}
                active={filters.activityTypes.includes(activity)}
                onClick={() => handleActivityToggle(activity)}
              >
                {activity}
              </FilterButton>
            ))}
          </FilterGrid>
        </FilterSection>

        <FilterSection>
          <FilterTitle>⏰ 利用可能時間（週）</FilterTitle>
          <RangeContainer>
            <RangeInput
              type="range"
              min="0"
              max="40"
              value={filters.availability[1]}
              onChange={(e) => onFilterChange({
                ...filters,
                availability: [0, parseInt(e.target.value)] as [number, number]
              })}
            />
            <RangeLabel>
              <span>0h</span>
              <span>{filters.availability[1]}h以上</span>
            </RangeLabel>
          </RangeContainer>
        </FilterSection>

        <FilterSection>
          <CheckboxContainer>
            <input
              type="checkbox"
              checked={filters.onlineOnly}
              onChange={(e) => onFilterChange({ ...filters, onlineOnly: e.target.checked })}
            />
            🟢 オンラインのみ
          </CheckboxContainer>
        </FilterSection>
      </FilterContainer>
    </div>
  );
};