import React, { useState } from 'react';
import styled from 'styled-components';
import { PolicyDocument, CitizenProfile } from '../../pages/PolicySummaryPage';

const SimulatorContainer = styled.div`
  padding: 25px;
  height: 600px;
  overflow-y: auto;
`;

const SimulatorHeader = styled.div`
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
  margin: 0;
  line-height: 1.5;
`;

const ProfileForm = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h4`
  color: #06b6d4;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 600;
`;

const Select = styled.select`
  background: rgba(71, 85, 105, 0.5);
  border: 1px solid rgba(100, 116, 139, 0.5);
  color: #f1f5f9;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
  
  option {
    background: rgba(15, 23, 42, 0.95);
    color: #f1f5f9;
  }
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 8px 0;
  
  &[type="range"] {
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: rgba(71, 85, 105, 0.5);
    outline: none;
    
    &::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #06b6d4;
      cursor: pointer;
      border: 2px solid rgba(15, 23, 42, 0.8);
    }
    
    &::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #06b6d4;
      cursor: pointer;
      border: 2px solid rgba(15, 23, 42, 0.8);
    }
  }
`;

const RangeValue = styled.div`
  color: #06b6d4;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-top: 4px;
`;

const ImpactResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImpactCard = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 10px;
  padding: 16px;
`;

const ImpactTitle = styled.h5`
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ImpactBar = styled.div`
  background: rgba(71, 85, 105, 0.3);
  border-radius: 8px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ImpactFill = styled.div<{ percentage: number; color: string }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => props.color};
  border-radius: 8px;
  transition: width 0.6s ease;
`;

const ImpactValue = styled.div<{ color: string }>`
  color: ${props => props.color};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ImpactDescription = styled.div`
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.4;
`;

const SimulationSummary = styled.div`
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
`;

const SummaryTitle = styled.h4`
  color: #06b6d4;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SummaryContent = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
`;

const PersonalizedTips = styled.div`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 10px;
  padding: 16px;
  margin-top: 16px;
`;

const TipsTitle = styled.h5`
  color: #8b5cf6;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TipsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TipItem = styled.li`
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 6px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  
  &::before {
    content: '💡';
    margin-top: 1px;
  }
`;

interface CitizenImpactSimulatorProps {
  document: PolicyDocument;
  impactData: NonNullable<PolicyDocument['citizenImpactAnalysis']>;
}

const CitizenImpactSimulator: React.FC<CitizenImpactSimulatorProps> = ({
  document,
  impactData
}) => {
  const [citizenProfile, setCitizenProfile] = useState<CitizenProfile>({
    age: 35,
    occupation: 'office_worker',
    region: 'central',
    householdIncome: 600,
    householdSize: 3
  });

  const occupations = [
    { value: 'student', label: '学生' },
    { value: 'office_worker', label: '会社員' },
    { value: 'self_employed', label: '自営業' },
    { value: 'public_servant', label: '公務員' },
    { value: 'retired', label: '退職者' },
    { value: 'homemaker', label: '主婦・主夫' },
    { value: 'part_time', label: 'パート・アルバイト' }
  ];

  const regions = [
    { value: 'central', label: '中心部' },
    { value: 'suburban', label: '郊外' },
    { value: 'rural', label: '農村部' },
    { value: 'coastal', label: '沿岸部' },
    { value: 'mountain', label: '山間部' }
  ];

  const calculatePersonalizedImpact = () => {
    const baseImpact = impactData;
    const ageMultiplier = citizenProfile.age < 30 ? 1.2 : citizenProfile.age > 60 ? 1.1 : 1.0;
    const incomeMultiplier = citizenProfile.householdIncome < 400 ? 1.3 : 
                           citizenProfile.householdIncome > 800 ? 0.9 : 1.0;
    const householdMultiplier = citizenProfile.householdSize > 4 ? 1.1 : 1.0;

    return {
      economic: Math.min(100, Math.round(baseImpact.economicImpact * incomeMultiplier)),
      social: Math.min(100, Math.round(baseImpact.socialImpact * ageMultiplier)),
      personal: Math.min(100, Math.round(baseImpact.personalLifeImpact * householdMultiplier)),
      regional: Math.min(100, Math.round(baseImpact.regionalImpact * (citizenProfile.region === 'rural' ? 1.2 : 1.0)))
    };
  };

  const generatePersonalizedSummary = () => {
    const impact = calculatePersonalizedImpact();
    const profileData = citizenProfile;
    
    let summary = `あなたのプロフィール（${profileData.age}歳、${occupations.find(o => o.value === profileData.occupation)?.label}、${regions.find(r => r.value === profileData.region)?.label}在住）に基づく影響予測：\n\n`;
    
    if (impact.economic > 70) {
      summary += '💰 **経済面**: この政策はあなたの経済状況に大きなプラス効果をもたらすと予想されます。特に行政手続きの効率化により時間コストが大幅に削減されるでしょう。\n\n';
    } else if (impact.economic > 40) {
      summary += '💰 **経済面**: 適度な経済的メリットが期待できます。\n\n';
    } else {
      summary += '💰 **経済面**: 直接的な経済効果は限定的ですが、間接的なメリットが期待できます。\n\n';
    }
    
    if (impact.personal > 70) {
      summary += '🏠 **生活面**: 日常生活が大幅に便利になります。特にデジタルサービスの拡充により、外出機会を減らしながら必要な手続きを完了できるようになります。';
    } else {
      summary += '🏠 **生活面**: 生活の利便性が向上します。';
    }
    
    return summary;
  };

  const generatePersonalizedTips = () => {
    const tips = [];
    
    if (citizenProfile.age > 60) {
      tips.push('シニア向けのデジタル講習会が開催される予定です');
      tips.push('従来の窓口サービスも並行して継続されます');
    }
    
    if (citizenProfile.occupation === 'homemaker' || citizenProfile.householdSize > 3) {
      tips.push('子育て関連手続きのオンライン化で利便性が向上します');
      tips.push('24時間いつでも手続き可能になります');
    }
    
    if (citizenProfile.region === 'rural') {
      tips.push('遠隔地からでもアクセス可能なサービスが充実します');
      tips.push('交通費や移動時間の節約につながります');
    }
    
    if (citizenProfile.householdIncome < 400) {
      tips.push('多くのサービスが無料で利用できます');
      tips.push('申請手続きの簡素化により負担軽減が期待できます');
    }
    
    return tips;
  };

  const personalizedImpact = calculatePersonalizedImpact();

  return (
    <SimulatorContainer>
      <SimulatorHeader>
        <HeaderTitle>
          📊 市民影響シミュレーター
        </HeaderTitle>
        <HeaderDescription>
          あなたの状況に合わせて政策の影響を予測します
        </HeaderDescription>
      </SimulatorHeader>

      <ProfileForm>
        <FormTitle>
          👤 あなたのプロフィール
        </FormTitle>
        
        <FormGrid>
          <FormGroup>
            <Label>年齢</Label>
            <RangeInput
              type="range"
              min="18"
              max="80"
              value={citizenProfile.age}
              onChange={(e) => setCitizenProfile(prev => ({
                ...prev,
                age: parseInt(e.target.value)
              }))}
            />
            <RangeValue>{citizenProfile.age}歳</RangeValue>
          </FormGroup>

          <FormGroup>
            <Label>職業</Label>
            <Select
              value={citizenProfile.occupation}
              onChange={(e) => setCitizenProfile(prev => ({
                ...prev,
                occupation: e.target.value
              }))}
            >
              {occupations.map(occupation => (
                <option key={occupation.value} value={occupation.value}>
                  {occupation.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>居住地域</Label>
            <Select
              value={citizenProfile.region}
              onChange={(e) => setCitizenProfile(prev => ({
                ...prev,
                region: e.target.value
              }))}
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>世帯人数</Label>
            <RangeInput
              type="range"
              min="1"
              max="8"
              value={citizenProfile.householdSize}
              onChange={(e) => setCitizenProfile(prev => ({
                ...prev,
                householdSize: parseInt(e.target.value)
              }))}
            />
            <RangeValue>{citizenProfile.householdSize}人</RangeValue>
          </FormGroup>

          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>世帯年収</Label>
            <RangeInput
              type="range"
              min="200"
              max="1200"
              step="50"
              value={citizenProfile.householdIncome}
              onChange={(e) => setCitizenProfile(prev => ({
                ...prev,
                householdIncome: parseInt(e.target.value)
              }))}
            />
            <RangeValue>{citizenProfile.householdIncome}万円</RangeValue>
          </FormGroup>
        </FormGrid>
      </ProfileForm>

      <ImpactResults>
        <ImpactCard>
          <ImpactTitle>
            💰 経済的影響
          </ImpactTitle>
          <ImpactBar>
            <ImpactFill percentage={personalizedImpact.economic} color="#10b981" />
          </ImpactBar>
          <ImpactValue color="#10b981">{personalizedImpact.economic}%</ImpactValue>
          <ImpactDescription>
            行政手続きの効率化による時間・コスト削減効果
          </ImpactDescription>
        </ImpactCard>

        <ImpactCard>
          <ImpactTitle>
            👥 社会的影響
          </ImpactTitle>
          <ImpactBar>
            <ImpactFill percentage={personalizedImpact.social} color="#3b82f6" />
          </ImpactBar>
          <ImpactValue color="#3b82f6">{personalizedImpact.social}%</ImpactValue>
          <ImpactDescription>
            コミュニティ参加やサービスアクセスの改善度
          </ImpactDescription>
        </ImpactCard>

        <ImpactCard>
          <ImpactTitle>
            🏠 個人生活への影響
          </ImpactTitle>
          <ImpactBar>
            <ImpactFill percentage={personalizedImpact.personal} color="#8b5cf6" />
          </ImpactBar>
          <ImpactValue color="#8b5cf6">{personalizedImpact.personal}%</ImpactValue>
          <ImpactDescription>
            日常生活の利便性・快適性の向上度
          </ImpactDescription>
        </ImpactCard>

        <ImpactCard>
          <ImpactTitle>
            🗺️ 地域への影響
          </ImpactTitle>
          <ImpactBar>
            <ImpactFill percentage={personalizedImpact.regional} color="#f59e0b" />
          </ImpactBar>
          <ImpactValue color="#f59e0b">{personalizedImpact.regional}%</ImpactValue>
          <ImpactDescription>
            居住地域の発展・活性化への貢献度
          </ImpactDescription>
        </ImpactCard>
      </ImpactResults>

      <SimulationSummary>
        <SummaryTitle>
          📋 あなたへの影響予測
        </SummaryTitle>
        <SummaryContent>
          {generatePersonalizedSummary()}
        </SummaryContent>
      </SimulationSummary>

      <PersonalizedTips>
        <TipsTitle>
          💡 あなたへのおすすめ
        </TipsTitle>
        <TipsList>
          {generatePersonalizedTips().map((tip, index) => (
            <TipItem key={index}>{tip}</TipItem>
          ))}
        </TipsList>
      </PersonalizedTips>
    </SimulatorContainer>
  );
};

export default CitizenImpactSimulator;