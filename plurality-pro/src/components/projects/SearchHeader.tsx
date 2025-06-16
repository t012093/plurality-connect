import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  position: relative;
  max-width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px 16px 50px;
  background: rgba(51, 65, 85, 0.4);
  border: 2px solid rgba(71, 85, 105, 0.3);
  border-radius: 25px;
  color: #f1f5f9;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(51, 65, 85, 0.6);
    box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 20px;
  pointer-events: none;
`;

const QuickFilters = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const QuickFilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
    'rgba(71, 85, 105, 0.4)'};
  border: 1px solid ${props => props.active ? 
    'transparent' : 
    'rgba(71, 85, 105, 0.3)'};
  border-radius: 20px;
  color: ${props => props.active ? 'white' : '#cbd5e1'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
      'rgba(71, 85, 105, 0.6)'};
    transform: translateY(-1px);
  }
`;

const SearchSuggestions = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(51, 65, 85, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 16px;
  margin-top: 8px;
  padding: 12px;
  z-index: 100;
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(-10px)'};
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const SuggestionItem = styled.div`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: #cbd5e1;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(71, 85, 105, 0.4);
    color: #f1f5f9;
  }
`;

const SuggestionIcon = styled.span`
  color: #94a3b8;
  font-size: 16px;
`;

const VoiceSearchButton = styled.button`
  padding: 12px;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  color: #a78bfa;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;

  &:hover {
    background: rgba(139, 92, 246, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SearchStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #94a3b8;
  font-size: 14px;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch, searchQuery }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quickFilters, setQuickFilters] = useState({
    recruitment: false,
    urgent: false,
    probono: false,
    remote: false
  });

  const searchSuggestions = [
    { text: 'IoTを使った高齢者支援', icon: '🔍' },
    { text: 'React開発者募集', icon: '💻' },
    { text: '予算100万円以下', icon: '💰' },
    { text: '富山県のプロジェクト', icon: '📍' },
    { text: 'AI・機械学習', icon: '🤖' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleQuickFilter = (filter: keyof typeof quickFilters) => {
    const newFilters = { ...quickFilters };
    newFilters[filter] = !newFilters[filter];
    setQuickFilters(newFilters);

    // Apply quick filter to search
    const filterQueries = {
      recruitment: '募集中',
      urgent: '緊急',
      probono: 'プロボノ',
      remote: 'リモート'
    };

    if (newFilters[filter]) {
      const query = searchQuery ? `${searchQuery} ${filterQueries[filter]}` : filterQueries[filter];
      onSearch(query);
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.start();
      
      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        onSearch(result);
      };
    } else {
      alert('音声検索はこのブラウザではサポートされていません');
    }
  };

  return (
    <div>
      <HeaderContainer>
        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="プロジェクトを検索 (例: IoT 高齢者支援、React 開発、富山県...)"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(searchQuery.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          <SearchSuggestions show={showSuggestions}>
            {searchSuggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                <SuggestionIcon>{suggestion.icon}</SuggestionIcon>
                {suggestion.text}
              </SuggestionItem>
            ))}
          </SearchSuggestions>
        </SearchContainer>

        <VoiceSearchButton onClick={handleVoiceSearch} title="音声検索">
          🎤
        </VoiceSearchButton>

        <QuickFilters>
          <QuickFilterButton
            active={quickFilters.recruitment}
            onClick={() => handleQuickFilter('recruitment')}
          >
            🟢 募集中
          </QuickFilterButton>
          <QuickFilterButton
            active={quickFilters.urgent}
            onClick={() => handleQuickFilter('urgent')}
          >
            🔴 緊急
          </QuickFilterButton>
          <QuickFilterButton
            active={quickFilters.probono}
            onClick={() => handleQuickFilter('probono')}
          >
            🤝 プロボノ
          </QuickFilterButton>
          <QuickFilterButton
            active={quickFilters.remote}
            onClick={() => handleQuickFilter('remote')}
          >
            💻 リモート
          </QuickFilterButton>
        </QuickFilters>
      </HeaderContainer>

      <SearchStats>
        <StatItem>
          📊 アクティブプロジェクト: <strong>127件</strong>
        </StatItem>
        <StatItem>
          👥 参加可能: <strong>89件</strong>
        </StatItem>
        <StatItem>
          ⏰ 締切間近: <strong>12件</strong>
        </StatItem>
        <StatItem>
          🎯 あなたのマッチ: <strong>23件</strong>
        </StatItem>
      </SearchStats>
    </div>
  );
};