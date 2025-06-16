import React, { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from '../components/decision/Sidebar';
import { VotingPanel } from '../components/decision/VotingPanel';
import { DecisionLayer } from '../components/decision/DecisionLayer';
import { Card } from '../components/shared/Card';

const DecisionContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 280px 1fr 350px;
  gap: 20px;
  min-height: 100vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 15px;
    padding: 15px;
  }
`;

const MainDecision = styled.div``;

const DecisionHeader = styled.div`
  margin-bottom: 30px;
`;

const DecisionTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
`;

const DecisionMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 15px;
`;

const DecisionStatus = styled.div`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: linear-gradient(45deg, #f59e0b, #fbbf24);
  color: white;
  display: inline-block;
`;

const DecisionLayers = styled.div`
  margin-bottom: 30px;
`;

const ExpertReview = styled.div`
  margin-top: 20px;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin: 15px 0;
`;

const ReviewItem = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ReviewLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 5px;
`;

const ReviewScore = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #10b981;
`;

const DecisionPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);

  const handleVote = (type: 'agree' | 'disagree' | 'bridge') => {
    const messages = {
      agree: '賛成票を投じました！',
      disagree: '課題提起しました！',
      bridge: 'ブリッジング提案をしました！'
    };
    
    showNotification(messages[type]);
  };

  const handleSubmitOpinion = (opinion: string) => {
    showNotification('意見を投稿しました！ブリッジング度を分析中...');
    
    setTimeout(() => {
      const bridgeScore = Math.floor(Math.random() * 30) + 70;
      showNotification(`ブリッジング度: ${bridgeScore}% - 素晴らしい建設的提案です！`);
    }, 2000);
  };

  const showNotification = (message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const layer1Participants = [
    {
      name: '田中 良子',
      role: '市民代表・会社員',
      avatarText: '田',
      voteType: 'bridge' as const,
      participantType: 'citizen' as const
    },
    {
      name: '山田 健太',
      role: '自営業・IT関連',
      avatarText: '山',
      voteType: 'agree' as const,
      participantType: 'citizen' as const
    },
    {
      name: '佐藤 美穂',
      role: 'NPO職員',
      avatarText: '佐',
      voteType: 'bridge' as const,
      participantType: 'citizen' as const
    }
  ];

  const layer2Participants = [
    {
      name: '中村教授',
      role: '富山大学・AI専門',
      avatarText: '中',
      voteType: 'agree' as const,
      participantType: 'expert' as const
    },
    {
      name: '高橋氏',
      role: '公認会計士',
      avatarText: '高',
      voteType: 'bridge' as const,
      participantType: 'expert' as const
    }
  ];

  const layer3Participants = [
    {
      name: '富山県財政課',
      role: '予算査定担当',
      avatarText: '県',
      voteType: 'pending' as const,
      participantType: 'government' as const
    },
    {
      name: '監査委員会',
      role: '外部監査',
      avatarText: '監',
      voteType: 'bridge' as const,
      participantType: 'expert' as const
    }
  ];

  return (
    <>
      <DecisionContainer>
        <Sidebar onNavigateBack={() => window.history.back()} />
        
        <MainDecision>
          <Card>
            <DecisionHeader>
              <DecisionTitle>富山県AI・RPA導入事業：追加予算要求の是非</DecisionTitle>
              <DecisionMeta>
                <span>提案者: 富山テクノロジー株式会社</span>
                <span>期限: 2025/06/30</span>
                <span>影響範囲: 全県民</span>
              </DecisionMeta>
              <DecisionStatus>レビュー中</DecisionStatus>
            </DecisionHeader>

            <DecisionLayers>
              <DecisionLayer
                title="レイヤー1: 市民合意形成"
                icon="👥"
                status="completed"
                consensusRate={72}
                bridgeRate={84}
                participants={layer1Participants}
              >
                <div style={{ textAlign: 'center', marginTop: '15px', color: '#10b981', fontWeight: 600 }}>
                  ✅ 市民層での合意形成完了 (参加者: 1,234名)
                </div>
              </DecisionLayer>

              <DecisionLayer
                title="レイヤー2: 専門家レビュー"
                icon="🎓"
                status="completed"
                participants={layer2Participants}
              >
                <ExpertReview>
                  <ReviewGrid>
                    <ReviewItem>
                      <ReviewLabel>技術的実現性</ReviewLabel>
                      <ReviewScore>95%</ReviewScore>
                    </ReviewItem>
                    <ReviewItem>
                      <ReviewLabel>財務健全性</ReviewLabel>
                      <ReviewScore>87%</ReviewScore>
                    </ReviewItem>
                    <ReviewItem>
                      <ReviewLabel>法的適合性</ReviewLabel>
                      <ReviewScore>100%</ReviewScore>
                    </ReviewItem>
                    <ReviewItem>
                      <ReviewLabel>リスク評価</ReviewLabel>
                      <ReviewScore>78%</ReviewScore>
                    </ReviewItem>
                  </ReviewGrid>
                  
                  <div style={{ textAlign: 'center', marginTop: '15px', color: '#10b981', fontWeight: 600 }}>
                    ✅ 専門家レビュー完了 (8名中8名が承認)
                  </div>
                </ExpertReview>
              </DecisionLayer>

              <DecisionLayer
                title="レイヤー3: 追加評価レビュー"
                icon="🏛️"
                status="active"
                consensusRate={68}
                bridgeRate={85}
                participants={layer3Participants}
              />
            </DecisionLayers>
          </Card>
        </MainDecision>

        <VotingPanel 
          onVote={handleVote}
          onSubmitOpinion={handleSubmitOpinion}
        />
      </DecisionContainer>

      {/* Notifications */}
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(45deg, #10b981, #34d399)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '25px',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease',
            fontWeight: 600,
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
          }}
        >
          {notification.message}
        </div>
      ))}
    </>
  );
};

export default DecisionPage;