import React, { useState } from 'react';
import styled from 'styled-components';
import { PolicyDocument } from '../../pages/PolicySummaryPage';

const DashboardContainer = styled.div`
  padding: 25px;
  height: 600px;
  overflow-y: auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 25px;
`;

const HeaderTitle = styled.h3`
  color: #f1f5f9;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderDescription = styled.p`
  color: #94a3b8;
  font-size: 13px;
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 25px;
`;

const MetricCard = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const MetricValue = styled.div<{ color?: string }>`
  color: ${props => props.color || '#06b6d4'};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const MetricChange = styled.div<{ positive?: boolean }>`
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
`;

const TabButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.2)' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#06b6d4' : 'transparent'};
  color: ${props => props.active ? '#06b6d4' : '#94a3b8'};
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DocumentItem = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 10px;
  padding: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.1);
    border-color: rgba(6, 182, 212, 0.3);
  }
`;

const DocumentHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const DocumentTitle = styled.div`
  color: #f1f5f9;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const DocumentMeta = styled.div`
  color: #94a3b8;
  font-size: 12px;
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

const StatusBadge = styled.span<{ status: string }>`
  background: ${props => {
    switch (props.status) {
      case 'completed': return 'rgba(16, 185, 129, 0.2)';
      case 'processing': return 'rgba(245, 158, 11, 0.2)';
      case 'error': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const UploaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const UploaderAvatar = styled.div<{ role: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => {
    switch (props.role) {
      case 'admin': return 'linear-gradient(45deg, #ef4444, #dc2626)';
      case 'official': return 'linear-gradient(45deg, #06b6d4, #0891b2)';
      default: return 'linear-gradient(45deg, #6b7280, #4b5563)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const UploaderDetails = styled.div`
  font-size: 11px;
  color: #94a3b8;
`;

const TrustIndicator = styled.div<{ level: number }>`
  background: ${props => {
    if (props.level >= 90) return 'rgba(16, 185, 129, 0.1)';
    if (props.level >= 70) return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  }};
  border: 1px solid ${props => {
    if (props.level >= 90) return '#10b981';
    if (props.level >= 70) return '#f59e0b';
    return '#ef4444';
  }};
  color: ${props => {
    if (props.level >= 90) return '#10b981';
    if (props.level >= 70) return '#f59e0b';
    return '#ef4444';
  }};
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 600;
  margin-left: 8px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ActionButton = styled.button<{ variant?: 'approve' | 'reject' | 'review' }>`
  background: ${props => {
    switch (props.variant) {
      case 'approve': return 'rgba(16, 185, 129, 0.2)';
      case 'reject': return 'rgba(239, 68, 68, 0.2)';
      case 'review': return 'rgba(245, 158, 11, 0.2)';
      default: return 'rgba(51, 65, 85, 0.5)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'approve': return '#10b981';
      case 'reject': return '#ef4444';
      case 'review': return '#f59e0b';
      default: return 'rgba(71, 85, 105, 0.5)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'approve': return '#10b981';
      case 'reject': return '#ef4444';
      case 'review': return '#f59e0b';
      default: return '#cbd5e1';
    }
  }};
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SystemSettings = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 20px;
`;

const SettingsTitle = styled.h4`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(71, 85, 105, 0.2);

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 500;
`;

const SettingValue = styled.div`
  color: #06b6d4;
  font-size: 12px;
  font-weight: 600;
`;

const ToggleSwitch = styled.button<{ enabled?: boolean }>`
  width: 40px;
  height: 20px;
  border-radius: 10px;
  border: none;
  background: ${props => props.enabled ? '#10b981' : 'rgba(71, 85, 105, 0.5)'};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${props => props.enabled ? '22px' : '2px'};
    transition: all 0.3s ease;
  }
`;

interface AdminDashboardProps {
  documents: PolicyDocument[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ documents }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'users' | 'settings'>('overview');
  const [autoApproval, setAutoApproval] = useState(false);
  const [qualityThreshold, setQualityThreshold] = useState(85);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '処理完了';
      case 'processing': return '処理中';
      case 'error': return 'エラー';
      default: return status;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '管理者';
      case 'official': return '職員';
      case 'verified_citizen': return '認証市民';
      default: return '一般';
    }
  };

  const calculateMetrics = () => {
    const total = documents.length;
    const completed = documents.filter(doc => doc.status === 'completed').length;
    const processing = documents.filter(doc => doc.status === 'processing').length;
    const errors = documents.filter(doc => doc.status === 'error').length;
    
    return { total, completed, processing, errors };
  };

  const metrics = calculateMetrics();

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>
          🛡️ 管理者ダッシュボード
        </HeaderTitle>
        <HeaderDescription>
          システム全体の監視、品質管理、設定変更を行います
        </HeaderDescription>
      </DashboardHeader>

      <MetricsGrid>
        <MetricCard>
          <MetricValue color="#06b6d4">{metrics.total}</MetricValue>
          <MetricLabel>総文書数</MetricLabel>
          <MetricChange positive>
            📈 +12 (先月比)
          </MetricChange>
        </MetricCard>
        <MetricCard>
          <MetricValue color="#10b981">{metrics.completed}</MetricValue>
          <MetricLabel>処理完了</MetricLabel>
          <MetricChange positive>
            ✅ {Math.round((metrics.completed / metrics.total) * 100)}% 完了率
          </MetricChange>
        </MetricCard>
        <MetricCard>
          <MetricValue color="#f59e0b">{metrics.processing}</MetricValue>
          <MetricLabel>処理中</MetricLabel>
          <MetricChange>
            🔄 平均処理時間: 2.3分
          </MetricChange>
        </MetricCard>
        <MetricCard>
          <MetricValue color="#ef4444">{metrics.errors}</MetricValue>
          <MetricLabel>エラー</MetricLabel>
          <MetricChange positive={metrics.errors === 0}>
            {metrics.errors > 0 ? '⚠️' : '✅'} {metrics.errors === 0 ? '正常' : '要対応'}
          </MetricChange>
        </MetricCard>
      </MetricsGrid>

      <TabsContainer>
        <TabButton
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          📊 概要
        </TabButton>
        <TabButton
          active={activeTab === 'documents'}
          onClick={() => setActiveTab('documents')}
        >
          📄 文書管理
        </TabButton>
        <TabButton
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        >
          👥 ユーザー管理
        </TabButton>
        <TabButton
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ システム設定
        </TabButton>
      </TabsContainer>

      <ContentSection>
        {activeTab === 'overview' && (
          <DocumentList>
            <h4 style={{ color: '#f1f5f9', margin: '0 0 16px 0' }}>
              📋 最近の文書活動
            </h4>
            {documents.slice(0, 5).map(doc => (
              <DocumentItem key={doc.id}>
                <DocumentHeader>
                  <div style={{ flex: 1 }}>
                    <DocumentTitle>{doc.title}</DocumentTitle>
                    <DocumentMeta>
                      <span>🏛️ {doc.municipality}</span>
                      <span>📁 {doc.department}</span>
                      <span>📅 {doc.uploadDate.toLocaleDateString()}</span>
                    </DocumentMeta>
                  </div>
                  <StatusBadge status={doc.status}>
                    {getStatusLabel(doc.status)}
                  </StatusBadge>
                </DocumentHeader>
                
                <UploaderInfo>
                  <UploaderAvatar role={doc.uploader.role}>
                    {doc.uploader.name.charAt(0)}
                  </UploaderAvatar>
                  <UploaderDetails>
                    {doc.uploader.name} ({getRoleLabel(doc.uploader.role)})
                  </UploaderDetails>
                  <TrustIndicator level={doc.uploader.trustLevel}>
                    信頼度: {doc.uploader.trustLevel}%
                  </TrustIndicator>
                </UploaderInfo>
              </DocumentItem>
            ))}
          </DocumentList>
        )}

        {activeTab === 'documents' && (
          <DocumentList>
            <h4 style={{ color: '#f1f5f9', margin: '0 0 16px 0' }}>
              📄 全文書管理
            </h4>
            {documents.map(doc => (
              <DocumentItem key={doc.id}>
                <DocumentHeader>
                  <div style={{ flex: 1 }}>
                    <DocumentTitle>{doc.title}</DocumentTitle>
                    <DocumentMeta>
                      <span>🏛️ {doc.municipality}</span>
                      <span>📁 {doc.department}</span>
                      <span>📅 {doc.uploadDate.toLocaleDateString()}</span>
                    </DocumentMeta>
                  </div>
                  <StatusBadge status={doc.status}>
                    {getStatusLabel(doc.status)}
                  </StatusBadge>
                </DocumentHeader>
                
                <UploaderInfo>
                  <UploaderAvatar role={doc.uploader.role}>
                    {doc.uploader.name.charAt(0)}
                  </UploaderAvatar>
                  <UploaderDetails>
                    {doc.uploader.name} ({getRoleLabel(doc.uploader.role)})
                  </UploaderDetails>
                  <TrustIndicator level={doc.uploader.trustLevel}>
                    信頼度: {doc.uploader.trustLevel}%
                  </TrustIndicator>
                </UploaderInfo>

                <ActionButtons>
                  <ActionButton variant="review">
                    🔍 詳細確認
                  </ActionButton>
                  <ActionButton variant="approve">
                    ✅ 承認
                  </ActionButton>
                  <ActionButton variant="reject">
                    ❌ 削除
                  </ActionButton>
                </ActionButtons>
              </DocumentItem>
            ))}
          </DocumentList>
        )}

        {activeTab === 'users' && (
          <SystemSettings>
            <SettingsTitle>
              👥 ユーザー管理
            </SettingsTitle>
            <div style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '40px' }}>
              ユーザー管理機能は開発中です。<br />
              Phase 2で実装予定の機能です。
            </div>
          </SystemSettings>
        )}

        {activeTab === 'settings' && (
          <SystemSettings>
            <SettingsTitle>
              ⚙️ システム設定
            </SettingsTitle>
            <SettingsGrid>
              <div>
                <SettingItem>
                  <SettingLabel>自動承認</SettingLabel>
                  <ToggleSwitch 
                    enabled={autoApproval}
                    onClick={() => setAutoApproval(!autoApproval)}
                  />
                </SettingItem>
                <SettingItem>
                  <SettingLabel>品質閾値</SettingLabel>
                  <SettingValue>{qualityThreshold}%</SettingValue>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>AI処理エンジン</SettingLabel>
                  <SettingValue>GPT-4 Turbo</SettingValue>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>最大ファイルサイズ</SettingLabel>
                  <SettingValue>50MB</SettingValue>
                </SettingItem>
              </div>
              <div>
                <SettingItem>
                  <SettingLabel>バックアップ頻度</SettingLabel>
                  <SettingValue>毎日 3:00</SettingValue>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>ログ保持期間</SettingLabel>
                  <SettingValue>90日</SettingValue>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>通知設定</SettingLabel>
                  <SettingValue>メール + Slack</SettingValue>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>メンテナンスモード</SettingLabel>
                  <ToggleSwitch enabled={false} />
                </SettingItem>
              </div>
            </SettingsGrid>
          </SystemSettings>
        )}
      </ContentSection>
    </DashboardContainer>
  );
};

export default AdminDashboard;