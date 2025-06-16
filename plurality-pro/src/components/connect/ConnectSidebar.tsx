import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  grid-area: sidebar;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(51, 65, 85, 0.3);
  padding: 20px;
  overflow-y: auto;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 25px;
  text-align: center;
`;

const UserProfile = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-right: 15px;
`;

const ProfileInfo = styled.div`
  h3 {
    color: #f1f5f9;
    font-weight: 600;
    margin-bottom: 5px;
  }
`;

const ProfileLocation = styled.div`
  color: #94a3b8;
  font-size: 14px;
`;

const TrustMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
`;

const TrustItem = styled.div`
  text-align: center;
  padding: 8px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 8px;
`;

const TrustValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #06b6d4;
`;

const TrustLabel = styled.div`
  font-size: 11px;
  color: #94a3b8;
`;

const NavSection = styled.div`
  margin-bottom: 25px;

  h4 {
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    padding-left: 8px;
  }
`;

const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;
  color: #cbd5e1;
  position: relative;

  &:hover {
    background: rgba(51, 65, 85, 0.6);
    transform: translateX(4px);
    color: #f1f5f9;
  }

  ${props => props.active && `
    background: linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2));
    color: #06b6d4;
    border: 1px solid rgba(6, 182, 212, 0.3);
  `}
`;

const NavIcon = styled.span`
  margin-right: 12px;
  font-size: 18px;
  width: 20px;
  text-align: center;
`;

const NotificationCount = styled.span`
  position: absolute;
  right: 8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

export const ConnectSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>🌐 Plurality Connect</Logo>
      
      {/* User Profile with Trust Metrics */}
      <UserProfile>
        <ProfileHeader>
          <ProfileAvatar>田</ProfileAvatar>
          <ProfileInfo>
            <h3>田中 太郎</h3>
            <ProfileLocation>富山県富山市 | IT専門</ProfileLocation>
          </ProfileInfo>
        </ProfileHeader>
        <TrustMetrics>
          <TrustItem>
            <TrustValue>92</TrustValue>
            <TrustLabel>信頼スコア</TrustLabel>
          </TrustItem>
          <TrustItem>
            <TrustValue>87%</TrustValue>
            <TrustLabel>協働率</TrustLabel>
          </TrustItem>
          <TrustItem>
            <TrustValue>156</TrustValue>
            <TrustLabel>ブリッジ度</TrustLabel>
          </TrustItem>
          <TrustItem>
            <TrustValue>1,247</TrustValue>
            <TrustLabel>トークン</TrustLabel>
          </TrustItem>
        </TrustMetrics>
      </UserProfile>
      
      {/* Navigation */}
      <NavSection>
        <h4>発見・参加</h4>
        <NavItem active>
          <NavIcon>🏠</NavIcon>
          ホーム
        </NavItem>
        <NavItem onClick={() => window.location.href = '/projects'}>
          <NavIcon>🔍</NavIcon>
          プロジェクト発見
        </NavItem>
        <NavItem onClick={() => window.location.href = '/skills'}>
          <NavIcon>🤝</NavIcon>
          スキルマッチング
          <NotificationCount>78</NotificationCount>
        </NavItem>
        <NavItem>
          <NavIcon>💡</NavIcon>
          政策ナレッジ
        </NavItem>
      </NavSection>

      <NavSection>
        <h4>協働・実行</h4>
        <NavItem>
          <NavIcon>📋</NavIcon>
          マイプロジェクト
        </NavItem>
        <NavItem>
          <NavIcon>💼</NavIcon>
          入札・プロボノ
          <NotificationCount>77</NotificationCount>
        </NavItem>
        <NavItem>
          <NavIcon>💬</NavIcon>
          協議スペース
        </NavItem>
        <NavItem>
          <NavIcon>📊</NavIcon>
          インパクト測定
        </NavItem>
      </NavSection>

      <NavSection>
        <h4>地域エコシステム</h4>
        <NavItem>
          <NavIcon>🏛️</NavIcon>
          行政連携
        </NavItem>
        <NavItem>
          <NavIcon>🏢</NavIcon>
          企業ネットワーク
        </NavItem>
        <NavItem>
          <NavIcon>🎯</NavIcon>
          NPO・市民団体
        </NavItem>
        <NavItem>
          <NavIcon>💰</NavIcon>
          資金フロー
        </NavItem>
      </NavSection>
    </SidebarContainer>
  );
};