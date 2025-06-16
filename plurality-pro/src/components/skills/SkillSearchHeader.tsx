import React, { useState } from 'react';
import styled from 'styled-components';

interface SkillSearchHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  matchingMode: string;
}

const SearchContainer = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px 16px 50px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  color: #f1f5f9;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 20px;
`;

const QuickFilters = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const QuickFilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
    'rgba(71, 85, 105, 0.3)'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(71, 85, 105, 0.3)'};
  border-radius: 20px;
  color: ${props => props.active ? 'white' : '#cbd5e1'};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
      'rgba(71, 85, 105, 0.5)'};
    transform: translateY(-1px);
  }
`;

const SearchSuggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  backdrop-filter: blur(20px);
`;

const SuggestionItem = styled.div`
  padding: 12px 16px;
  color: #cbd5e1;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.6);
  }
  
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const ModeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #94a3b8;
`;

const ModeIcon = styled.span`
  font-size: 16px;
`;

export const SkillSearchHeader: React.FC<SkillSearchHeaderProps> = ({ 
  onSearch, 
  searchQuery, 
  matchingMode 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  const suggestions = [
    'React', 'TypeScript', 'Python', 'UI/UX', 'デザイン', 'プロジェクト管理',
    'データ分析', 'AI', '機械学習', 'Figma', 'Node.js', 'マーケティング'
  ];

  const quickFilters = [
    'オンライン可', '今すぐ対応', '経験豊富', '初心者歓迎', '無料', '有償'
  ];

  const getModeText = () => {
    switch (matchingMode) {
      case 'offer': return 'スキル提供者を検索';
      case 'learn': return 'スキル学習者を検索';
      case 'exchange': return 'スキル交換者を検索';
      case 'mentor': return 'メンターを検索';
      default: return 'スキル保有者を検索';
    }
  };

  const getModeIcon = () => {
    switch (matchingMode) {
      case 'offer': return '🎯';
      case 'learn': return '📚';
      case 'exchange': return '🔄';
      case 'mentor': return '👨‍🏫';
      default: return '🔍';
    }
  };

  const handleSearch = (value: string) => {
    onSearch(value);
    setShowSuggestions(false);
  };

  const handleQuickFilter = (filter: string) => {
    const isActive = activeQuickFilters.includes(filter);
    const updated = isActive 
      ? activeQuickFilters.filter(f => f !== filter)
      : [...activeQuickFilters, filter];
    setActiveQuickFilters(updated);
    
    // 検索クエリに追加
    const filterQuery = updated.join(' ');
    onSearch(filterQuery);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && 
    suggestion.toLowerCase() !== searchQuery.toLowerCase()
  );

  return (
    <SearchContainer>
      <ModeIndicator>
        <ModeIcon>{getModeIcon()}</ModeIcon>
        {getModeText()}
      </ModeIndicator>
      
      <SearchInputContainer>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder={`${getModeText()}...`}
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <SearchSuggestions>
            {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSearch(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </SearchSuggestions>
        )}
      </SearchInputContainer>
      
      <QuickFilters>
        {quickFilters.map(filter => (
          <QuickFilterButton
            key={filter}
            active={activeQuickFilters.includes(filter)}
            onClick={() => handleQuickFilter(filter)}
          >
            {filter}
          </QuickFilterButton>
        ))}
      </QuickFilters>
    </SearchContainer>
  );
};