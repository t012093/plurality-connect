import React from 'react';
import styled from 'styled-components';
import { Card } from '../shared/Card';

const SidebarContainer = styled.div`
  height: fit-content;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  text-align: center;
`;

const NavBack = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }
`;

const DecisionItem = styled.div<{ isActive?: boolean }>`
  background: ${props => props.isActive ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)'};
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  border-left: 3px solid ${props => props.isActive ? '#f59e0b' : 'transparent'};
  position: relative;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
`;

const TimelineContainer = styled.div`
  margin-top: 30px;
`;

const TimelineTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 20px;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 35px;
    bottom: -15px;
    width: 2px;
    background: #e5e7eb;
  }

  &:last-child::before {
    display: none;
  }
`;

const TimelineDot = styled.div<{ status: 'completed' | 'active' | 'pending' }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  z-index: 2;
  position: relative;
  color: white;
  font-size: 12px;

  ${props => {
    switch (props.status) {
      case 'completed':
        return 'background: #10b981;';
      case 'active':
        return 'background: #f59e0b; animation: pulse 2s infinite;';
      case 'pending':
        return 'background: #e5e7eb; color: #6b7280;';
    }
  }}
`;

const TimelineContent = styled.div`
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const TimelineStep = styled.div`
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 5px;
`;

const TimelineDesc = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

interface SidebarProps {
  onNavigateBack?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigateBack }) => {
  return (
    <SidebarContainer>
      <Card>
        <Logo>🏛️ Plurality Pro</Logo>
        
        <NavBack href="#" onClick={onNavigateBack}>
          <span style={{ marginRight: '8px' }}>←</span>
          ダッシュボードに戻る
        </NavBack>
        
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>
            進行中の決定事項
          </h4>
          
          <DecisionItem isActive>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a202c', marginBottom: '5px' }}>
              追加予算要求の是非
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              富山県AI導入事業
            </div>
            <NotificationBadge />
          </DecisionItem>
          
          <DecisionItem>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a202c', marginBottom: '5px' }}>
              技術仕様変更提案
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              スマートシティ計画
            </div>
          </DecisionItem>
          
          <DecisionItem>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a202c', marginBottom: '5px' }}>
              環境評価基準見直し
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              再エネ導入プロジェクト
            </div>
          </DecisionItem>
        </div>

        <TimelineContainer>
          <TimelineTitle>📅 意思決定プロセス</TimelineTitle>
          
          <TimelineItem>
            <TimelineDot status="completed">✓</TimelineDot>
            <TimelineContent>
              <TimelineStep>1. 市民合意形成</TimelineStep>
              <TimelineDesc>完了 (89% 合意)</TimelineDesc>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDot status="completed">✓</TimelineDot>
            <TimelineContent>
              <TimelineStep>2. 専門家レビュー</TimelineStep>
              <TimelineDesc>完了 (100% 承認)</TimelineDesc>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDot status="active">⏳</TimelineDot>
            <TimelineContent>
              <TimelineStep>3. 追加評価</TimelineStep>
              <TimelineDesc>進行中 (72% 合意)</TimelineDesc>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineDot status="pending">4</TimelineDot>
            <TimelineContent>
              <TimelineStep>4. 最終承認</TimelineStep>
              <TimelineDesc>待機中</TimelineDesc>
            </TimelineContent>
          </TimelineItem>
        </TimelineContainer>
      </Card>
    </SidebarContainer>
  );
};