import React, { useState } from 'react';
import styled from 'styled-components';

interface ProSocialFeedProps {
  onPost?: (content: string, type: 'bridge' | 'project') => void;
  onEngagement?: (action: string) => void;
}

const FeedContainer = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 30px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FeedTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
`;

const FeedFilters = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterBtn = styled.button<{ active?: boolean }>`
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

const PostComposer = styled.div`
  background: rgba(71, 85, 105, 0.3);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const ComposerTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  background: transparent;
  border: none;
  outline: none;
  color: #f1f5f9;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  line-height: 1.5;

  &::placeholder {
    color: #94a3b8;
  }
`;

const ComposerActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionBtn = styled.button<{ variant?: 'bridge' | 'project' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  ${props => {
    switch (props.variant) {
      case 'bridge':
        return `
          background: linear-gradient(45deg, #8b5cf6, #06b6d4);
          color: white;
        `;
      case 'project':
        return `
          background: rgba(71, 85, 105, 0.6);
          color: #cbd5e1;
          border: 1px solid rgba(71, 85, 105, 0.3);
        `;
      default:
        return `
          background: rgba(71, 85, 105, 0.6);
          color: #cbd5e1;
          border: 1px solid rgba(71, 85, 105, 0.3);
        `;
    }
  }}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const PostItem = styled.div`
  background: rgba(71, 85, 105, 0.3);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(71, 85, 105, 0.4);
    transform: translateY(-2px);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const PostAvatar = styled.div<{ avatarColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.avatarColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 2px;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;

const BridgeScore = styled.div<{ variant?: 'bridge' | 'official' }>`
  background: ${props => props.variant === 'official' ? 
    'linear-gradient(45deg, #ef4444, #f87171)' : 
    'linear-gradient(45deg, #8b5cf6, #06b6d4)'};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
`;

const PostContent = styled.div`
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const PostEngagement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EngagementButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const EngagementBtn = styled.button`
  background: none;
  border: 1px solid rgba(71, 85, 105, 0.3);
  color: #94a3b8;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    border-color: #06b6d4;
    color: #06b6d4;
  }
`;

const PostMeta2 = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;

export const ProSocialFeed: React.FC<ProSocialFeedProps> = ({ onPost, onEngagement }) => {
  const [postContent, setPostContent] = useState('');
  const [activeFilter, setActiveFilter] = useState('ブリッジング');
  const [aiAnalysis, setAIAnalysis] = useState('AI分析中...');

  const handlePostSubmit = (type: 'bridge' | 'project') => {
    if (postContent.trim()) {
      onPost?.(postContent, type);
      setPostContent('');
      setAIAnalysis('AI分析中...');
    }
  };

  const handleContentChange = (content: string) => {
    setPostContent(content);
    
    if (content.length > 10) {
      setAIAnalysis('AI分析中...');
      
      setTimeout(() => {
        const bridgeScore = Math.floor(Math.random() * 40) + 60;
        setAIAnalysis(`ブリッジング度: ${bridgeScore}%`);
      }, 1500);
    } else {
      setAIAnalysis('AI分析中...');
    }
  };

  const filters = ['ブリッジング', 'プロジェクト', '政策', '資金'];

  const posts = [
    {
      author: '山田教授',
      role: '富山大学・AI専門',
      time: '30分前',
      avatar: '山',
      avatarColor: 'linear-gradient(45deg, #10b981, #34d399)',
      bridgeScore: '🌉 92%',
      content: '高齢者見守りシステムについて、技術的課題と社会的ニーズの両方を考慮した統合アプローチを提案します。IoT技術の導入には確かにコストがかかりますが、段階的実装により初期投資を抑制しつつ、地域コミュニティの結束も強化できるのではないでしょうか。',
      engagement: { likes: 47, concerns: 8, comments: 15, shares: 23 },
      meta: '💰 関連予算: ¥2.5M | 👥 関心者: 34名'
    },
    {
      author: '富山市政策企画課',
      role: '行政',
      time: '1時間前',
      avatar: '市',
      avatarColor: 'linear-gradient(45deg, #ef4444, #f87171)',
      bridgeScore: '🏛️ 公式',
      variant: 'official' as const,
      content: '【政策更新】スマートシティ推進計画の市民参加枠を拡大します。特にIoT、データ分析、コミュニティ運営の専門性をお持ちの方との協働を希望しています。予算¥15Mの一部を市民主導プロジェクトに配分予定です。',
      engagement: { likes: 89, ideas: 34, applications: '申請' },
      meta: '📊 AI要約済み | 🔗 詳細リンク'
    },
    {
      author: '富山テック株式会社',
      role: '民間企業・技術',
      time: '2時間前',
      avatar: 'T',
      avatarColor: 'linear-gradient(45deg, #3b82f6, #60a5fa)',
      bridgeScore: '🌉 85%',
      content: '地域課題解決における産学官連携について。我々の技術リソースを地域に還元したいと考えています。特に教育・福祉・環境分野でのIoT活用に関して、技術提供と人材派遣の両面でサポート可能です。持続可能なビジネスモデルも含めて検討したいと思います。',
      engagement: { collaboration: 67, comments: 28, consultation: '相談' },
      meta: '💼 提供可能: 技術者5名 | 💰 投資意向: ¥5M'
    }
  ];

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedTitle>🌉 プロソーシャル・フィード</FeedTitle>
        <FeedFilters>
          {filters.map(filter => (
            <FilterBtn 
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterBtn>
          ))}
        </FeedFilters>
      </FeedHeader>

      {/* Post Composer */}
      <PostComposer>
        <ComposerTextarea
          value={postContent}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="建設的な提案や意見を共有してください。AIがブリッジング度を評価します..."
        />
        <ComposerActions>
          <ActionButtons>
            <ActionBtn variant="bridge" onClick={() => handlePostSubmit('bridge')}>
              🌉 ブリッジング投稿
            </ActionBtn>
            <ActionBtn variant="project" onClick={() => handlePostSubmit('project')}>
              📋 プロジェクト提案
            </ActionBtn>
          </ActionButtons>
          <div style={{ color: '#94a3b8', fontSize: '12px' }}>
            {aiAnalysis}
          </div>
        </ComposerActions>
      </PostComposer>

      {/* Feed Posts */}
      {posts.map((post, index) => (
        <PostItem key={index}>
          <PostHeader>
            <PostAvatar avatarColor={post.avatarColor}>
              {post.avatar}
            </PostAvatar>
            <AuthorInfo>
              <AuthorName>{post.author}</AuthorName>
              <PostMeta>{post.role} | {post.time}</PostMeta>
            </AuthorInfo>
            <BridgeScore variant={post.variant}>
              {post.bridgeScore}
            </BridgeScore>
          </PostHeader>
          <PostContent>{post.content}</PostContent>
          <PostEngagement>
            <EngagementButtons>
              {Object.entries(post.engagement).map(([key, value]) => (
                <EngagementBtn 
                  key={key}
                  onClick={() => onEngagement?.(key)}
                >
                  {key === 'likes' && '👍'}
                  {key === 'concerns' && '🤔'}
                  {key === 'comments' && '💬'}
                  {key === 'shares' && '🔄'}
                  {key === 'ideas' && '💡'}
                  {key === 'applications' && '📋'}
                  {key === 'collaboration' && '🤝'}
                  {key === 'consultation' && '📋'}
                  {' '}
                  {value}
                </EngagementBtn>
              ))}
            </EngagementButtons>
            <PostMeta2>{post.meta}</PostMeta2>
          </PostEngagement>
        </PostItem>
      ))}
    </FeedContainer>
  );
};