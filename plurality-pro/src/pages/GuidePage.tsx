import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  padding: 60px 0;
  color: white;
`;

const Logo = styled.div`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
  opacity: 0.9;
`;

const Description = styled.div`
  font-size: 18px;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const MainContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const TOC = styled.div`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  border-left: 4px solid #6366f1;
`;

const TOCTitle = styled.h2`
  color: #6366f1;
  margin-bottom: 20px;
  font-size: 24px;
`;

const TOCList = styled.ul`
  list-style: none;
`;

const TOCItem = styled.li`
  margin: 12px 0;
`;

const TOCLink = styled.a`
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
    transform: translateX(8px);
  }
`;

const TOCIcon = styled.span`
  margin-right: 12px;
  font-size: 20px;
`;

const Section = styled.section`
  margin-bottom: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  color: #1a202c;
  font-size: 32px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const SectionIcon = styled.span`
  margin-right: 15px;
  font-size: 36px;
`;

const ConceptVisual = styled.div`
  background: radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  margin: 30px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border: 2px dashed #6366f1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.3;
    animation: rotate 20s linear infinite;
  }
`;

const ConceptTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
`;

const ConceptDescription = styled.div`
  font-size: 18px;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 25px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

const FeatureIcon = styled.span`
  font-size: 48px;
  margin-bottom: 15px;
  display: block;
`;

const FeatureTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1a202c;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  margin-top: 50px;
`;

const CTATitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const CTADescription = styled.div`
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const CTAButton = styled(Button)`
  background: white;
  color: #6366f1;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const GuidePage: React.FC = () => {
  return (
    <Container>
      <Header>
        <Logo>🏛️ Plurality Pro</Logo>
        <Subtitle>官民連携・プロジェクト管理プラットフォーム</Subtitle>
        <Description>
          プロソーシャル合意形成から実行管理まで - デジタル民主主義による新しい社会実装
        </Description>
      </Header>

      <MainContent>
        <TOC>
          <TOCTitle>📋 目次</TOCTitle>
          <TOCList>
            <TOCItem>
              <TOCLink href="#intro">
                <TOCIcon>🏛️</TOCIcon>Plurality Proとは
              </TOCLink>
            </TOCItem>
            <TOCItem>
              <TOCLink href="#features">
                <TOCIcon>✨</TOCIcon>統合プラットフォーム機能
              </TOCLink>
            </TOCItem>
            <TOCItem>
              <TOCLink href="#stakeholder">
                <TOCIcon>👥</TOCIcon>ステークホルダー管理
              </TOCLink>
            </TOCItem>
            <TOCItem>
              <TOCLink href="#bridging">
                <TOCIcon>🌉</TOCIcon>ブリッジング機能の詳細
              </TOCLink>
            </TOCItem>
            <TOCItem>
              <TOCLink href="#getting-started">
                <TOCIcon>🚀</TOCIcon>導入ガイド
              </TOCLink>
            </TOCItem>
          </TOCList>
        </TOC>

        <Section id="intro">
          <SectionTitle>
            <SectionIcon>🏛️</SectionIcon>Plurality Proとは
          </SectionTitle>
          
          <ConceptVisual>
            <ConceptTitle>官民連携の新しいパラダイム</ConceptTitle>
            <ConceptDescription>
              プロソーシャル合意形成から実行管理まで - <br />
              デジタル民主主義による統合プロジェクト管理プラットフォーム
            </ConceptDescription>
          </ConceptVisual>

          <p>
            Plurality Proは、台湾のオードリー・タンが提唱するデジタル民主主義の理念を
            <strong>実際の官民連携プロジェクト</strong>に適用した革新的な統合プラットフォームです。
            単なる議論ツールを超え、<strong>合意形成から実行管理、成果測定まで</strong>を一貫してサポートします。
          </p>
        </Section>

        <Section id="features">
          <SectionTitle>
            <SectionIcon>✨</SectionIcon>統合プラットフォーム機能
          </SectionTitle>
          
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>👥</FeatureIcon>
              <FeatureTitle>ステークホルダー管理</FeatureTitle>
              <p>官・民・学・市民の組織階層とロール管理。RACIマトリックスによる責任の明確化と透明な意思決定。</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>プロジェクトライフサイクル</FeatureTitle>
              <p>企画から評価まで全工程を管理。リアルタイム進捗追跡とリスク管理で確実な実行を保証。</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🗳️</FeatureIcon>
              <FeatureTitle>多層意思決定ワークフロー</FeatureTitle>
              <p>市民合意→専門家レビュー→意思決定者承認の段階的プロセス。透明性と効率性を両立。</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>💰</FeatureIcon>
              <FeatureTitle>予算・契約管理</FeatureTitle>
              <p>スマートコントラクトと連携した透明な予算執行。パフォーマンス連動支払いで成果を保証。</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🌉</FeatureIcon>
              <FeatureTitle>プロソーシャル合意形成</FeatureTitle>
              <p>ブリッジング機能による建設的議論。対立を協働に変換する革新的アルゴリズム。</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🔗</FeatureIcon>
              <FeatureTitle>既存システム統合</FeatureTitle>
              <p>政府調達システム、民間ERP、学術データベースとAPI連携。シームレスな情報共有。</p>
            </FeatureCard>
          </FeatureGrid>
        </Section>

        <Section id="stakeholder">
          <SectionTitle>
            <SectionIcon>👥</SectionIcon>ステークホルダー管理
          </SectionTitle>
          
          <p>
            Plurality Proの核心機能の一つは、<strong>複雑な官民連携プロジェクトにおけるステークホルダーの効率的管理</strong>です。
          </p>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>🏛️</FeatureIcon>
              <FeatureTitle>政府機関</FeatureTitle>
              <p><strong>役割</strong>: 政策決定、予算承認、規制遵守<br/><strong>権限</strong>: 拒否権、最終承認権</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🏢</FeatureIcon>
              <FeatureTitle>民間企業</FeatureTitle>
              <p><strong>役割</strong>: 技術実装、運営効率化<br/><strong>権限</strong>: 実行権、技術選択権</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🎓</FeatureIcon>
              <FeatureTitle>学術機関</FeatureTitle>
              <p><strong>役割</strong>: 中立的評価、技術監修<br/><strong>権限</strong>: 専門的助言権</p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>👥</FeatureIcon>
              <FeatureTitle>市民・NGO</FeatureTitle>
              <p><strong>役割</strong>: 受益者代表、社会的監視<br/><strong>権限</strong>: 参加権、意見表明権</p>
            </FeatureCard>
          </FeatureGrid>
        </Section>

        <Section id="bridging">
          <SectionTitle>
            <SectionIcon>🌉</SectionIcon>ブリッジング機能の詳細
          </SectionTitle>
          
          <p>
            ブリッジング機能は、Pluralityの最も革新的な特徴です。この機能により、
            <strong>極端な意見ではなく、異なるグループを繋ぐ意見がバイラル化</strong>します。
          </p>

          <Card variant="gradient">
            <h4 style={{ marginBottom: '15px', color: '#6366f1' }}>🔧 仕組み</h4>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>意見クラスターの形成</strong>: AIが投稿内容を分析し、似た意見を持つユーザーをグループ化</li>
              <li><strong>クロスクラスター評価</strong>: 異なるクラスターのユーザーから「同意」を得た投稿を特定</li>
              <li><strong>ブリッジスコア計算</strong>: クラスター間の同意度に基づいてスコアを算出し、高スコアの投稿を優先表示</li>
            </ol>
          </Card>
        </Section>

        <Section id="getting-started">
          <SectionTitle>
            <SectionIcon>🚀</SectionIcon>はじめ方
          </SectionTitle>
          
          <Card variant="gradient">
            <h4 style={{ marginBottom: '15px', color: '#6366f1' }}>1️⃣ アカウント作成</h4>
            <p>マイナンバーカード（日本）と連携してアカウントを作成します。</p>
          </Card>

          <Card variant="gradient" style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '15px', color: '#6366f1' }}>2️⃣ 属性設定</h4>
            <p>年代、居住地域、職業分野など、開示したい属性を選択します。いつでも変更可能です。</p>
          </Card>

          <Card variant="gradient" style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '15px', color: '#6366f1' }}>3️⃣ 興味のあるトピック選択</h4>
            <p>関心のある政策分野や社会課題を選択し、関連する議論にアクセスできるようにします。</p>
          </Card>
        </Section>
      </MainContent>

      <CTASection>
        <CTATitle>一緒に新しい民主主義を創りませんか？</CTATitle>
        <CTADescription>
          Pluralityで、建設的な議論と真の合意形成を体験してください
        </CTADescription>
        <CTAButton onClick={() => window.location.href = '/decision'}>
          Pluralityを体験する
        </CTAButton>
      </CTASection>
    </Container>
  );
};

export default GuidePage;