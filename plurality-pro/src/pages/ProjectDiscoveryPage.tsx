import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { SearchHeader } from '../components/projects/SearchHeader';
import { AIMatchingPanel } from '../components/projects/AIMatchingPanel';

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
  grid-template-columns: 300px 1fr 320px;
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

const SortOptions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SortButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #06b6d4, #3b82f6)' : 
    'rgba(71, 85, 105, 0.4)'};
  border: 1px solid ${props => props.active ? 
    'transparent' : 
    'rgba(71, 85, 105, 0.3)'};
  border-radius: 20px;
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

export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  organizer: {
    name: string;
    type: 'government' | 'business' | 'npo' | 'academic';
    trustScore: number;
    logo?: string;
  };
  category: string[];
  region: {
    prefecture: string;
    city?: string;
    scope: 'local' | 'regional' | 'national' | 'online';
  };
  tags: string[];
  budget: {
    amount?: number;
    currency: 'JPY';
    type: 'fixed' | 'range' | 'tbd' | 'non-monetary';
  };
  timeline: {
    startDate: Date;
    endDate: Date;
    duration: number;
  };
  recruitment: {
    status: 'planning' | 'recruiting' | 'in-progress' | 'paused' | 'completed';
    totalPositions: number;
    filledPositions: number;
    requiredSkills: string[];
    participationType: string[];
    deadline?: Date;
  };
  matching: {
    userMatchScore?: number;
    popularity: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  };
  progress: {
    phase: string;
    completionRate: number;
    lastUpdated: Date;
  };
  stats: {
    viewCount: number;
    interestCount: number;
    applicationCount: number;
    bookmarkCount: number;
  };
}

const ProjectDiscoveryPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'newest' | 'deadline' | 'budget' | 'popular'>('match');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    regions: [] as string[],
    budgetRange: [0, 10000000] as [number, number],
    status: [] as string[],
    skills: [] as string[],
    urgency: [] as string[]
  });

  // Mock data generation
  useEffect(() => {
    const generateMockProjects = (): Project[] => {
      const mockProjects: Project[] = [
        {
          id: '1',
          title: '高齢者見守りIoTシステム開発',
          summary: 'センサーとAIを活用した独居高齢者の安全確保システム',
          description: '独居高齢者の日常生活をIoTセンサーでモニタリングし、異常を検知した際に家族や地域包括支援センターに自動通知するシステムの開発です。プライバシーに配慮しながら、安心・安全な地域社会の実現を目指します。',
          organizer: {
            name: '富山市地域包括支援センター',
            type: 'government',
            trustScore: 94
          },
          category: ['健康・医療・福祉', '防災・安全'],
          region: {
            prefecture: '富山県',
            city: '富山市',
            scope: 'local'
          },
          tags: ['IoT', 'AI', '高齢者支援', 'センサー', 'React', 'Python'],
          budget: {
            amount: 2500000,
            currency: 'JPY',
            type: 'fixed'
          },
          timeline: {
            startDate: new Date('2025-07-01'),
            endDate: new Date('2026-03-31'),
            duration: 9
          },
          recruitment: {
            status: 'recruiting',
            totalPositions: 7,
            filledPositions: 4,
            requiredSkills: ['React', 'Python', 'IoT', 'UI/UX', 'プロジェクト管理'],
            participationType: ['プロボノ', '有償契約'],
            deadline: new Date('2025-07-15')
          },
          matching: {
            userMatchScore: 95,
            popularity: 87,
            urgency: 'high'
          },
          progress: {
            phase: '要件定義',
            completionRate: 15,
            lastUpdated: new Date()
          },
          stats: {
            viewCount: 324,
            interestCount: 47,
            applicationCount: 12,
            bookmarkCount: 23
          }
        },
        {
          id: '2',
          title: '子育て支援マッチングアプリ',
          summary: '地域の子育て世帯をつなぐコミュニティプラットフォーム',
          description: '子育て中の親同士が情報交換・相互支援できるモバイルアプリの開発。地域の子育てイベント情報、一時預かりサービス、育児相談などの機能を統合したプラットフォームです。',
          organizer: {
            name: 'NPO法人とやまファミリーサポート',
            type: 'npo',
            trustScore: 88
          },
          category: ['教育・子育て'],
          region: {
            prefecture: '富山県',
            scope: 'regional'
          },
          tags: ['React Native', 'Firebase', '子育て', 'モバイルアプリ', 'UX'],
          budget: {
            amount: 1200000,
            currency: 'JPY',
            type: 'range'
          },
          timeline: {
            startDate: new Date('2025-06-15'),
            endDate: new Date('2025-12-15'),
            duration: 6
          },
          recruitment: {
            status: 'recruiting',
            totalPositions: 5,
            filledPositions: 2,
            requiredSkills: ['React Native', 'Firebase', 'UI/UX', 'Swift', 'Kotlin'],
            participationType: ['プロボノ', 'スキル提供'],
            deadline: new Date('2025-06-30')
          },
          matching: {
            userMatchScore: 78,
            popularity: 92,
            urgency: 'medium'
          },
          progress: {
            phase: '企画',
            completionRate: 5,
            lastUpdated: new Date()
          },
          stats: {
            viewCount: 156,
            interestCount: 34,
            applicationCount: 8,
            bookmarkCount: 19
          }
        },
        {
          id: '3',
          title: 'スマート農業データプラットフォーム',
          summary: 'センサーデータとAI分析による農業効率化システム',
          description: '農地に設置したIoTセンサーから収集したデータ（土壌、気象、作物生育状況）をAIで分析し、最適な栽培アドバイスを提供するシステムです。収益向上と持続可能な農業の実現を目指します。',
          organizer: {
            name: '富山アグリテック株式会社',
            type: 'business',
            trustScore: 91
          },
          category: ['産業・経済', '環境・エネルギー'],
          region: {
            prefecture: '富山県',
            scope: 'regional'
          },
          tags: ['IoT', 'AI', '農業', 'データ分析', 'Python', 'Django'],
          budget: {
            amount: 8000000,
            currency: 'JPY',
            type: 'fixed'
          },
          timeline: {
            startDate: new Date('2025-08-01'),
            endDate: new Date('2026-07-31'),
            duration: 12
          },
          recruitment: {
            status: 'planning',
            totalPositions: 12,
            filledPositions: 0,
            requiredSkills: ['Python', 'Django', 'データ分析', 'IoT', 'AI/ML'],
            participationType: ['有償契約', '入札'],
            deadline: new Date('2025-07-20')
          },
          matching: {
            userMatchScore: 85,
            popularity: 76,
            urgency: 'medium'
          },
          progress: {
            phase: '企画',
            completionRate: 0,
            lastUpdated: new Date()
          },
          stats: {
            viewCount: 89,
            interestCount: 21,
            applicationCount: 3,
            bookmarkCount: 15
          }
        }
      ];
      
      return mockProjects;
    };

    setTimeout(() => {
      const mockData = generateMockProjects();
      setProjects(mockData);
      setFilteredProjects(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = projects.filter(project => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasCategory = filters.categories.some(cat => 
          project.category.includes(cat)
        );
        if (!hasCategory) return false;
      }

      // Region filter
      if (filters.regions.length > 0) {
        const hasRegion = filters.regions.some(region => 
          project.region.prefecture === region || project.region.city === region
        );
        if (!hasRegion) return false;
      }

      // Budget filter
      if (project.budget.amount) {
        if (project.budget.amount < filters.budgetRange[0] || 
            project.budget.amount > filters.budgetRange[1]) {
          return false;
        }
      }

      // Status filter
      if (filters.status.length > 0) {
        if (!filters.status.includes(project.recruitment.status)) {
          return false;
        }
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasSkill = filters.skills.some(skill => 
          project.recruitment.requiredSkills.includes(skill)
        );
        if (!hasSkill) return false;
      }

      return true;
    });

    // Sort logic
    switch (sortBy) {
      case 'match':
        filtered.sort((a, b) => (b.matching.userMatchScore || 0) - (a.matching.userMatchScore || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.progress.lastUpdated).getTime() - new Date(a.progress.lastUpdated).getTime());
        break;
      case 'deadline':
        filtered.sort((a, b) => {
          if (!a.recruitment.deadline) return 1;
          if (!b.recruitment.deadline) return -1;
          return new Date(a.recruitment.deadline).getTime() - new Date(b.recruitment.deadline).getTime();
        });
        break;
      case 'budget':
        filtered.sort((a, b) => (b.budget.amount || 0) - (a.budget.amount || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => b.matching.popularity - a.matching.popularity);
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, filters, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleProjectInteraction = (projectId: string, action: string) => {
    console.log(`Project ${projectId}: ${action}`);
    // Here you would typically update the project stats or send to API
  };

  const sortOptions = [
    { key: 'match', label: 'マッチ度順' },
    { key: 'newest', label: '新着順' },
    { key: 'deadline', label: '締切順' },
    { key: 'budget', label: '予算順' },
    { key: 'popular', label: '人気順' }
  ] as const;

  return (
    <PageContainer>
      <PageLayout>
        <Header>
          <SearchHeader 
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
        </Header>

        <Sidebar>
          <ProjectFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Sidebar>

        <MainContent>
          <ResultsHeader>
            <ResultsCount>
              {loading ? '検索中...' : `${filteredProjects.length}件のプロジェクトが見つかりました`}
            </ResultsCount>
            <SortOptions>
              <span style={{ fontSize: '14px', color: '#94a3b8', marginRight: '10px' }}>並び順:</span>
              {sortOptions.map(option => (
                <SortButton
                  key={option.key}
                  active={sortBy === option.key}
                  onClick={() => setSortBy(option.key)}
                >
                  {option.label}
                </SortButton>
              ))}
            </SortOptions>
          </ResultsHeader>

          {loading ? (
            <LoadingSpinner>
              プロジェクトを読み込み中...
            </LoadingSpinner>
          ) : filteredProjects.length === 0 ? (
            <NoResults>
              <h3>該当するプロジェクトが見つかりませんでした</h3>
              <p>検索条件やフィルターを変更して、再度お試しください。</p>
            </NoResults>
          ) : (
            <ProjectGrid>
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onInteraction={handleProjectInteraction}
                />
              ))}
            </ProjectGrid>
          )}
        </MainContent>

        <MatchingPanel>
          <AIMatchingPanel 
            topMatches={filteredProjects.slice(0, 3)}
          />
        </MatchingPanel>
      </PageLayout>
    </PageContainer>
  );
};

export default ProjectDiscoveryPage;