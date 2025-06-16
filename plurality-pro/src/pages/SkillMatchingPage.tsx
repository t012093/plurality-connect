import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserSkillCard } from '../components/skills/UserSkillCard';
import { SkillFilters } from '../components/skills/SkillFilters';
import { SkillSearchHeader } from '../components/skills/SkillSearchHeader';
import { MatchingRecommendations } from '../components/skills/MatchingRecommendations';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  min-height: 100vh;
  color: #f1f5f9;
`;

const PageLayout = styled.div`
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main matching";
  grid-template-columns: 300px 1fr 350px;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-areas: 
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const Header = styled.div`
  grid-area: header;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  padding: 20px;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(51, 65, 85, 0.3);
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MainContent = styled.div`
  grid-area: main;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  padding: 25px;
  overflow-y: auto;
`;

const MatchingPanel = styled.div`
  grid-area: matching;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(51, 65, 85, 0.3);
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
`;

const ResultsCount = styled.div`
  color: #94a3b8;
  font-size: 14px;
`;

const ViewModeToggle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ViewModeButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
    'rgba(71, 85, 105, 0.4)'};
  border: 1px solid ${props => props.active ? 
    'transparent' : 
    'rgba(71, 85, 85, 0.3)'};
  border-radius: 8px;
  color: ${props => props.active ? 'white' : '#cbd5e1'};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
      'rgba(71, 85, 105, 0.6)'};
  }
`;

const UserGrid = styled.div<{ viewMode: string }>`
  display: grid;
  grid-template-columns: ${props => {
    switch (props.viewMode) {
      case 'list':
        return '1fr';
      case 'compact':
        return 'repeat(auto-fill, minmax(300px, 1fr))';
      default:
        return 'repeat(auto-fill, minmax(380px, 1fr))';
    }
  }};
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #94a3b8;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
  
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #cbd5e1;
  }
  
  p {
    font-size: 16px;
    line-height: 1.6;
  }
`;

const MatchingModeSelector = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const ModeButton = styled.button<{ active?: boolean; mode: string }>`
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => {
    const baseColor = props.active ? 'white' : '#cbd5e1';
    const bgColor = props.active ? 
      (() => {
        switch (props.mode) {
          case 'offer': return 'linear-gradient(45deg, #10b981, #34d399)';
          case 'learn': return 'linear-gradient(45deg, #3b82f6, #60a5fa)';
          case 'exchange': return 'linear-gradient(45deg, #8b5cf6, #a78bfa)';
          case 'mentor': return 'linear-gradient(45deg, #f59e0b, #fbbf24)';
          default: return 'rgba(71, 85, 105, 0.4)';
        }
      })() : 
      'rgba(71, 85, 105, 0.4)';

    return `
      background: ${bgColor};
      color: ${baseColor};
      border: 1px solid ${props.active ? 'transparent' : 'rgba(71, 85, 105, 0.3)'};
    `;
  }}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

export interface UserSkillProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  trustScore: number;
  isOnline: boolean;
  skills: {
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    category: string;
    offering: {
      available: boolean;
      rate?: number;
      type: 'probono' | 'paid' | 'exchange' | 'mentoring';
    };
    learning: {
      interested: boolean;
      targetLevel: number;
    };
  }[];
  preferences: {
    availableHours: number;
    remoteWork: boolean;
    activityTypes: string[];
  };
  performance: {
    completedProjects: number;
    totalHours: number;
    averageRating: number;
  };
  recentActivity: {
    project: string;
    status: string;
    rating?: number;
  }[];
}

const SkillMatchingPage: React.FC = () => {
  const [users, setUsers] = useState<UserSkillProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserSkillProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingMode, setMatchingMode] = useState<'offer' | 'learn' | 'exchange' | 'mentor'>('offer');
  const [viewMode, setViewMode] = useState<'cards' | 'list' | 'compact'>('cards');
  const [filters, setFilters] = useState({
    skillCategories: [] as string[],
    skillLevels: [] as number[],
    locations: [] as string[],
    activityTypes: [] as string[],
    availability: [0, 40] as [number, number],
    onlineOnly: false
  });

  // Mock data generation
  useEffect(() => {
    const generateMockUsers = (): UserSkillProfile[] => {
      return [
        {
          id: '1',
          name: '田中 太郎',
          title: 'フルスタック開発者',
          location: '富山県富山市',
          avatar: '田',
          bio: '10年の開発経験を持つフルスタック開発者。特にReact/Node.jsでの開発が得意で、UI/UXデザインも可能です。',
          trustScore: 95,
          isOnline: true,
          skills: [
            {
              name: 'React',
              level: 5,
              category: 'フロントエンド',
              offering: { available: true, rate: 5000, type: 'paid' },
              learning: { interested: false, targetLevel: 5 }
            },
            {
              name: 'TypeScript',
              level: 4,
              category: 'プログラミング',
              offering: { available: true, rate: 4000, type: 'paid' },
              learning: { interested: false, targetLevel: 4 }
            },
            {
              name: 'UI/UX',
              level: 4,
              category: 'デザイン',
              offering: { available: true, type: 'probono' },
              learning: { interested: false, targetLevel: 4 }
            },
            {
              name: 'AI/機械学習',
              level: 1,
              category: 'データサイエンス',
              offering: { available: false, type: 'probono' },
              learning: { interested: true, targetLevel: 3 }
            }
          ],
          preferences: {
            availableHours: 20,
            remoteWork: true,
            activityTypes: ['プロボノ', '有償', 'メンタリング']
          },
          performance: {
            completedProjects: 15,
            totalHours: 480,
            averageRating: 4.8
          },
          recentActivity: [
            { project: '子育てアプリUI改善', status: '完了', rating: 5 },
            { project: '高齢者向けサイト指導', status: '進行中' }
          ]
        },
        {
          id: '2',
          name: '山田 花子',
          title: 'データサイエンティスト',
          location: '富山県高岡市',
          avatar: '山',
          bio: 'AI・機械学習の専門家として5年の経験。Pythonでのデータ分析とモデル構築が専門です。',
          trustScore: 92,
          isOnline: false,
          skills: [
            {
              name: 'Python',
              level: 5,
              category: 'プログラミング',
              offering: { available: true, rate: 6000, type: 'paid' },
              learning: { interested: false, targetLevel: 5 }
            },
            {
              name: 'データ分析',
              level: 5,
              category: 'データサイエンス',
              offering: { available: true, rate: 7000, type: 'paid' },
              learning: { interested: false, targetLevel: 5 }
            },
            {
              name: 'AI/機械学習',
              level: 4,
              category: 'データサイエンス',
              offering: { available: true, type: 'mentoring' },
              learning: { interested: false, targetLevel: 4 }
            },
            {
              name: 'React',
              level: 2,
              category: 'フロントエンド',
              offering: { available: false, type: 'probono' },
              learning: { interested: true, targetLevel: 4 }
            }
          ],
          preferences: {
            availableHours: 15,
            remoteWork: true,
            activityTypes: ['有償', 'メンタリング']
          },
          performance: {
            completedProjects: 12,
            totalHours: 360,
            averageRating: 4.9
          },
          recentActivity: [
            { project: '農業データ分析', status: '完了', rating: 5 },
            { project: 'AIチャットボット開発', status: '進行中' }
          ]
        },
        {
          id: '3',
          name: '佐藤 健一',
          title: 'デザイナー',
          location: '富山県射水市',
          avatar: '佐',
          bio: 'グラフィック・Webデザイン歴8年。ブランディングからUI/UXまで幅広く対応できます。',
          trustScore: 88,
          isOnline: true,
          skills: [
            {
              name: 'UI/UX',
              level: 5,
              category: 'デザイン',
              offering: { available: true, rate: 4500, type: 'paid' },
              learning: { interested: false, targetLevel: 5 }
            },
            {
              name: 'グラフィックデザイン',
              level: 4,
              category: 'デザイン',
              offering: { available: true, rate: 4000, type: 'paid' },
              learning: { interested: false, targetLevel: 4 }
            },
            {
              name: 'Figma',
              level: 4,
              category: 'ツール',
              offering: { available: true, type: 'probono' },
              learning: { interested: false, targetLevel: 4 }
            },
            {
              name: 'プロジェクト管理',
              level: 2,
              category: 'ビジネス',
              offering: { available: false, type: 'probono' },
              learning: { interested: true, targetLevel: 4 }
            }
          ],
          preferences: {
            availableHours: 25,
            remoteWork: false,
            activityTypes: ['プロボノ', '有償']
          },
          performance: {
            completedProjects: 8,
            totalHours: 280,
            averageRating: 4.7
          },
          recentActivity: [
            { project: 'NPOサイトリニューアル', status: '完了', rating: 5 },
            { project: '観光アプリデザイン', status: '進行中' }
          ]
        }
      ];
    };

    setTimeout(() => {
      const mockData = generateMockUsers();
      setUsers(mockData);
      setFilteredUsers(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = users.filter(user => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          user.name.toLowerCase().includes(query) ||
          user.title.toLowerCase().includes(query) ||
          user.bio.toLowerCase().includes(query) ||
          user.skills.some(skill => skill.name.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Matching mode filter
      const hasRelevantSkills = user.skills.some(skill => {
        switch (matchingMode) {
          case 'offer':
            return skill.offering.available;
          case 'learn':
            return skill.learning.interested;
          case 'exchange':
            return skill.offering.available && user.skills.some(s => s.learning.interested);
          case 'mentor':
            return skill.offering.type === 'mentoring' || skill.level >= 4;
          default:
            return true;
        }
      });
      if (!hasRelevantSkills) return false;

      // Skill categories filter
      if (filters.skillCategories.length > 0) {
        const hasCategory = user.skills.some(skill => 
          filters.skillCategories.includes(skill.category)
        );
        if (!hasCategory) return false;
      }

      // Skill levels filter
      if (filters.skillLevels.length > 0) {
        const hasLevel = user.skills.some(skill => 
          filters.skillLevels.includes(skill.level)
        );
        if (!hasLevel) return false;
      }

      // Location filter
      if (filters.locations.length > 0) {
        const hasLocation = filters.locations.some(location => 
          user.location.includes(location)
        );
        if (!hasLocation) return false;
      }

      // Availability filter
      if (user.preferences.availableHours < filters.availability[0] || 
          user.preferences.availableHours > filters.availability[1]) {
        return false;
      }

      // Online only filter
      if (filters.onlineOnly && !user.isOnline) {
        return false;
      }

      return true;
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, matchingMode, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleUserInteraction = (userId: string, action: string) => {
    console.log(`User ${userId}: ${action}`);
  };

  const matchingModes = [
    { key: 'offer', label: 'スキル提供', icon: '🎯' },
    { key: 'learn', label: 'スキル学習', icon: '📚' },
    { key: 'exchange', label: '相互交換', icon: '🔄' },
    { key: 'mentor', label: 'メンタリング', icon: '👨‍🏫' }
  ] as const;

  return (
    <PageContainer>
      <PageLayout>
        <Header>
          <MatchingModeSelector>
            {matchingModes.map(mode => (
              <ModeButton
                key={mode.key}
                active={matchingMode === mode.key}
                mode={mode.key}
                onClick={() => setMatchingMode(mode.key)}
              >
                {mode.icon} {mode.label}
              </ModeButton>
            ))}
          </MatchingModeSelector>
          
          <SkillSearchHeader 
            onSearch={handleSearch}
            searchQuery={searchQuery}
            matchingMode={matchingMode}
          />
        </Header>

        <Sidebar>
          <SkillFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            matchingMode={matchingMode}
          />
        </Sidebar>

        <MainContent>
          <ResultsHeader>
            <ResultsCount>
              {loading ? '検索中...' : `${filteredUsers.length}人のスキル保有者が見つかりました`}
            </ResultsCount>
            <ViewModeToggle>
              <span style={{ fontSize: '14px', color: '#94a3b8', marginRight: '10px' }}>表示:</span>
              <ViewModeButton
                active={viewMode === 'cards'}
                onClick={() => setViewMode('cards')}
              >
                📋 カード
              </ViewModeButton>
              <ViewModeButton
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              >
                📄 リスト
              </ViewModeButton>
              <ViewModeButton
                active={viewMode === 'compact'}
                onClick={() => setViewMode('compact')}
              >
                🔲 コンパクト
              </ViewModeButton>
            </ViewModeToggle>
          </ResultsHeader>

          {loading ? (
            <LoadingSpinner>
              スキル保有者を検索中...
            </LoadingSpinner>
          ) : filteredUsers.length === 0 ? (
            <NoResults>
              <h3>該当するスキル保有者が見つかりませんでした</h3>
              <p>検索条件やフィルターを変更して、再度お試しください。</p>
            </NoResults>
          ) : (
            <UserGrid viewMode={viewMode}>
              {filteredUsers.map(user => (
                <UserSkillCard
                  key={user.id}
                  user={user}
                  matchingMode={matchingMode}
                  viewMode={viewMode}
                  onInteraction={handleUserInteraction}
                />
              ))}
            </UserGrid>
          )}
        </MainContent>

        <MatchingPanel>
          <MatchingRecommendations 
            currentUser={{ id: 'current', name: '田中 太郎' }}
            topMatches={filteredUsers.slice(0, 3)}
            matchingMode={matchingMode}
          />
        </MatchingPanel>
      </PageLayout>
    </PageContainer>
  );
};

export default SkillMatchingPage;