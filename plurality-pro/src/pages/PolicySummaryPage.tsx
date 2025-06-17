import React, { useState } from 'react';
import styled from 'styled-components';
import { ConnectSidebar } from '../components/connect/ConnectSidebar';
import PolicyDocumentUploader from '../components/policy-summary/PolicyDocumentUploader';
import AISummaryDisplay from '../components/policy-summary/AISummaryDisplay';
import CitizenImpactSimulator from '../components/policy-summary/CitizenImpactSimulator';
import PolicyComparisonTable from '../components/policy-summary/PolicyComparisonTable';
import AdminDashboard from '../components/policy-summary/AdminDashboard';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.97) 0%, 
    rgba(30, 41, 59, 0.95) 40%, 
    rgba(51, 65, 85, 0.93) 100%);
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-areas: "sidebar main";
`;

const MainContent = styled.main`
  grid-area: main;
  padding: 20px;
  overflow-y: auto;
`;

const HeaderSection = styled.section`
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 25px;
`;

const PageTitle = styled.h1`
  color: #f1f5f9;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PageDescription = styled.p`
  color: #cbd5e1;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 25px 0;
`;

const PhaseIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 20px;
  padding: 8px 16px;
  width: fit-content;
`;

const PhaseText = styled.span`
  color: #06b6d4;
  font-size: 14px;
  font-weight: 600;
`;

const ViewModeToggle = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ModeButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const ContentGrid = styled.div<{ viewMode: string }>`
  display: grid;
  gap: 25px;
  
  ${props => {
    switch (props.viewMode) {
      case 'upload':
        return `
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
        `;
      case 'summary':
        return `
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
        `;
      case 'analysis':
        return `
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto;
        `;
      case 'admin':
        return `
          grid-template-columns: 1fr;
        `;
      default:
        return `
          grid-template-columns: 1fr;
        `;
    }
  }}
`;

const Section = styled.section`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  overflow: hidden;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  color: #cbd5e1;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
`;

// Mock data types
export interface PolicyDocument {
  id: string;
  title: string;
  municipality: string;
  department: string;
  documentType: 'policy' | 'ordinance' | 'plan' | 'report';
  uploadDate: Date;
  status: 'processing' | 'completed' | 'error';
  fileUrl?: string;
  originalFileName?: string;
  fileSize?: number;
  uploader: {
    id: string;
    name: string;
    role: 'admin' | 'official' | 'verified_citizen';
    trustLevel: number;
  };
  aiSummary?: {
    executiveSummary: string;
    keyPoints: string[];
    citizenImpact: string;
    estimatedCost: number;
    implementationTimeline: string;
    stakeholders: string[];
  };
  citizenImpactAnalysis?: {
    economicImpact: number;
    socialImpact: number;
    personalLifeImpact: number;
    regionalImpact: number;
  };
}

export interface CitizenProfile {
  age: number;
  occupation: string;
  region: string;
  householdIncome: number;
  householdSize: number;
}

const PolicySummaryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'upload' | 'summary' | 'analysis' | 'admin'>('upload');
  const [documents, setDocuments] = useState<PolicyDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<PolicyDocument | null>(null);
  const [userRole] = useState<'admin' | 'official' | 'verified_citizen'>('admin'); // Mock role

  // Mock data for demonstration
  const mockDocuments: PolicyDocument[] = [
    {
      id: '1',
      title: '富山市DX推進計画 2024-2026',
      municipality: '富山市',
      department: '企画管理部',
      documentType: 'plan',
      uploadDate: new Date('2024-01-15'),
      status: 'completed',
      uploader: {
        id: 'admin1',
        name: '山田太郎',
        role: 'admin',
        trustLevel: 100
      },
      aiSummary: {
        executiveSummary: '富山市のデジタル変革を推進し、市民サービスの向上と行政効率化を図る3か年計画。デジタル技術を活用した市民参加型の行政運営を目指す。',
        keyPoints: [
          'オンライン行政サービスの拡充',
          'デジタル人材の育成',
          'データ活用基盤の整備',
          '市民参加型デジタルプラットフォームの構築'
        ],
        citizenImpact: '行政手続きのオンライン化により、市役所への来庁回数が大幅に削減され、24時間いつでも手続きが可能になります。',
        estimatedCost: 1200000000,
        implementationTimeline: '2024年4月開始、2026年3月完了予定',
        stakeholders: ['市民', '行政職員', 'IT企業', '地域企業']
      },
      citizenImpactAnalysis: {
        economicImpact: 75,
        socialImpact: 85,
        personalLifeImpact: 90,
        regionalImpact: 80
      }
    },
    {
      id: '2',
      title: '地域循環経済促進条例',
      municipality: '富山市',
      department: '環境部',
      documentType: 'ordinance',
      uploadDate: new Date('2024-02-01'),
      status: 'processing',
      uploader: {
        id: 'official1',
        name: '佐藤花子',
        role: 'official',
        trustLevel: 95
      }
    }
  ];

  const handleDocumentUpload = (document: Partial<PolicyDocument>) => {
    const newDocument: PolicyDocument = {
      id: Date.now().toString(),
      title: document.title || '',
      municipality: document.municipality || '',
      department: document.department || '',
      documentType: document.documentType || 'policy',
      uploadDate: new Date(),
      status: 'processing',
      uploader: {
        id: 'current_user',
        name: '現在のユーザー',
        role: userRole,
        trustLevel: 90
      }
    };
    
    setDocuments(prev => [...prev, newDocument]);
    
    // Simulate AI processing
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === newDocument.id 
          ? { ...doc, status: 'completed' as const, aiSummary: mockDocuments[0].aiSummary }
          : doc
      ));
    }, 3000);
  };

  const handleDocumentSelect = (document: PolicyDocument) => {
    setSelectedDocument(document);
    setViewMode('summary');
  };

  return (
    <PageContainer>
      <ConnectSidebar />
      <MainContent>
        <HeaderSection>
          <PageTitle>
            📄 政策要約システム
          </PageTitle>
          <PageDescription>
            政策文書をAIが自動で要約し、市民への影響をわかりやすく説明します。
            段階的な品質管理により、信頼性の高い政策情報を提供します。
          </PageDescription>
          <PhaseIndicator>
            <span>🏗️</span>
            <PhaseText>Phase 1: 管理者・認証済みユーザー投稿システム</PhaseText>
          </PhaseIndicator>
          
          <ViewModeToggle>
            <ModeButton
              active={viewMode === 'upload'}
              onClick={() => setViewMode('upload')}
            >
              📤 文書アップロード
            </ModeButton>
            <ModeButton
              active={viewMode === 'summary'}
              onClick={() => setViewMode('summary')}
            >
              📋 AI要約表示
            </ModeButton>
            <ModeButton
              active={viewMode === 'analysis'}
              onClick={() => setViewMode('analysis')}
            >
              📊 影響分析
            </ModeButton>
            {userRole === 'admin' && (
              <ModeButton
                active={viewMode === 'admin'}
                onClick={() => setViewMode('admin')}
              >
                🛡️ 管理者画面
              </ModeButton>
            )}
          </ViewModeToggle>
        </HeaderSection>

        <ContentGrid viewMode={viewMode}>
          {viewMode === 'upload' && (
            <>
              <Section>
                <PolicyDocumentUploader 
                  onUpload={handleDocumentUpload}
                  userRole={userRole}
                />
              </Section>
              
              {documents.length > 0 ? (
                <Section>
                  <div style={{ padding: '25px' }}>
                    <h3 style={{ color: '#f1f5f9', margin: '0 0 20px 0' }}>
                      📚 アップロード済み文書
                    </h3>
                    {documents.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => handleDocumentSelect(doc)}
                        style={{
                          background: 'rgba(51, 65, 85, 0.4)',
                          border: '1px solid rgba(71, 85, 105, 0.3)',
                          borderRadius: '12px',
                          padding: '16px',
                          marginBottom: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ color: '#f1f5f9', fontWeight: '600', marginBottom: '8px' }}>
                          {doc.title}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>
                          {doc.municipality} {doc.department} • {doc.documentType}
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px',
                          fontSize: '12px'
                        }}>
                          <span style={{ 
                            color: doc.status === 'completed' ? '#10b981' : 
                                   doc.status === 'processing' ? '#f59e0b' : '#ef4444'
                          }}>
                            {doc.status === 'completed' ? '✅ 処理完了' :
                             doc.status === 'processing' ? '🔄 処理中' : '❌ エラー'}
                          </span>
                          <span style={{ color: '#64748b' }}>
                            {doc.uploadDate.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              ) : (
                <Section>
                  <EmptyState>
                    <EmptyIcon>📄</EmptyIcon>
                    <EmptyTitle>まだ文書がアップロードされていません</EmptyTitle>
                    <EmptyDescription>
                      上記のフォームから政策文書をアップロードしてください
                    </EmptyDescription>
                  </EmptyState>
                </Section>
              )}
            </>
          )}

          {viewMode === 'summary' && (
            <>
              <Section>
                {selectedDocument && selectedDocument.aiSummary ? (
                  <AISummaryDisplay 
                    document={selectedDocument}
                    summary={selectedDocument.aiSummary}
                  />
                ) : (
                  <EmptyState>
                    <EmptyIcon>🤖</EmptyIcon>
                    <EmptyTitle>文書を選択してください</EmptyTitle>
                    <EmptyDescription>
                      左側から文書を選択するか、新しい文書をアップロードしてください
                    </EmptyDescription>
                  </EmptyState>
                )}
              </Section>
              
              <Section>
                {selectedDocument && selectedDocument.citizenImpactAnalysis ? (
                  <CitizenImpactSimulator 
                    document={selectedDocument}
                    impactData={selectedDocument.citizenImpactAnalysis}
                  />
                ) : (
                  <EmptyState>
                    <EmptyIcon>📊</EmptyIcon>
                    <EmptyTitle>影響分析データがありません</EmptyTitle>
                    <EmptyDescription>
                      AI処理が完了すると影響分析が表示されます
                    </EmptyDescription>
                  </EmptyState>
                )}
              </Section>
            </>
          )}

          {viewMode === 'analysis' && (
            <Section>
              {documents.filter(doc => doc.status === 'completed').length > 0 ? (
                <PolicyComparisonTable 
                  documents={documents.filter(doc => doc.status === 'completed')}
                />
              ) : (
                <EmptyState>
                  <EmptyIcon>⚖️</EmptyIcon>
                  <EmptyTitle>比較する政策がありません</EmptyTitle>
                  <EmptyDescription>
                    複数の政策文書をアップロードすると比較分析が可能になります
                  </EmptyDescription>
                </EmptyState>
              )}
            </Section>
          )}

          {viewMode === 'admin' && userRole === 'admin' && (
            <Section>
              <AdminDashboard 
                documents={[...documents, ...mockDocuments]}
              />
            </Section>
          )}
        </ContentGrid>
      </MainContent>
    </PageContainer>
  );
};

export default PolicySummaryPage;