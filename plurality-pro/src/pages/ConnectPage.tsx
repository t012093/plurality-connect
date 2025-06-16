import React, { useState } from 'react';
import styled from 'styled-components';
import { ConnectSidebar } from '../components/connect/ConnectSidebar';
import { AIInsights } from '../components/connect/AIInsights';
import { ProSocialFeed } from '../components/connect/ProSocialFeed';
import { NetworkPanel } from '../components/connect/NetworkPanel';
import { FloatingActionButton } from '../components/connect/FloatingActionButton';

const AppContainer = styled.div`
  display: grid;
  grid-template-areas: 
    "sidebar main connections"
    "sidebar main connections";
  grid-template-columns: 280px 1fr 380px;
  grid-template-rows: 1fr;
  min-height: 100vh;
  gap: 0;

  @media (max-width: 1200px) {
    grid-template-areas: 
      "sidebar"
      "main"
      "connections";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
`;

const MainContent = styled.div`
  grid-area: main;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  padding: 25px;
  overflow-y: auto;
  position: relative;
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #f1f5f9;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ variant?: 'project' | 'bridge' }>`
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

interface ConnectPageProps {}

const ConnectPage: React.FC<ConnectPageProps> = () => {
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);

  const showNotification = (message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleCreateNew = () => {
    showNotification('新規作成メニューを表示中...');
  };

  const handlePost = (content: string, type: 'bridge' | 'project') => {
    showNotification(`${type === 'bridge' ? 'ブリッジング' : 'プロジェクト'}投稿を作成しました！`);
  };

  const handleEngagement = (action: string) => {
    showNotification(`${action}しました！`);
  };

  return (
    <>
      <AppContainer>
        <ConnectSidebar />
        
        <MainContent>
          <MainHeader>
            <PageTitle>統合ダッシュボード</PageTitle>
            <HeaderActions>
              <ActionButton variant="project">新規提案</ActionButton>
              <ActionButton variant="bridge">🌉 ブリッジング</ActionButton>
            </HeaderActions>
          </MainHeader>

          <AIInsights />
          <ProSocialFeed onPost={handlePost} onEngagement={handleEngagement} />
        </MainContent>

        <NetworkPanel />
      </AppContainer>

      <FloatingActionButton onClick={handleCreateNew} />

      {/* Notifications */}
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '25px',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease',
            fontWeight: 600,
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
          }}
        >
          {notification.message}
        </div>
      ))}
    </>
  );
};

export default ConnectPage;