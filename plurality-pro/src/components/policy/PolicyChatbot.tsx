import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PolicyData, ChatMessage } from '../../pages/PolicyKnowledgePage';

const ChatbotContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.8);
`;

const ChatbotHeader = styled.div`
  padding: 20px 25px 15px 25px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  background: rgba(15, 23, 42, 0.9);
`;

const HeaderTitle = styled.h3`
  color: #f1f5f9;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderDescription = styled.p`
  color: #94a3b8;
  font-size: 13px;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

const StatusIndicator = styled.div<{ online: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${props => props.online ? '#10b981' : '#64748b'};
`;

const StatusDot = styled.div<{ online: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.online ? '#10b981' : '#64748b'};
  animation: ${props => props.online ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageBubble = styled.div<{ type: 'user' | 'bot' }>`
  max-width: 85%;
  align-self: ${props => props.type === 'user' ? 'flex-end' : 'flex-start'};
  background: ${props => props.type === 'user' 
    ? 'linear-gradient(135deg, #06b6d4, #0891b2)' 
    : 'rgba(51, 65, 85, 0.6)'};
  color: #f1f5f9;
  padding: 12px 16px;
  border-radius: ${props => props.type === 'user' 
    ? '18px 18px 4px 18px' 
    : '18px 18px 18px 4px'};
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid ${props => props.type === 'user' 
    ? 'rgba(6, 182, 212, 0.3)' 
    : 'rgba(71, 85, 105, 0.3)'};
  backdrop-filter: blur(10px);
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
  text-align: right;
`;

const PolicyReference = styled.div`
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 8px;
  font-size: 12px;
  color: #06b6d4;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(6, 182, 212, 0.2);
    border-color: #06b6d4;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 13px;
  font-style: italic;
  margin-left: 16px;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 4px;
  
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #94a3b8;
    animation: typing 1.4s infinite ease-in-out;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
  
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
  }
`;

const InputSection = styled.div`
  padding: 16px 20px;
  border-top: 1px solid rgba(51, 65, 85, 0.3);
  background: rgba(15, 23, 42, 0.9);
`;

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const QuickActionButton = styled.button`
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #cbd5e1;
  padding: 6px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #f1f5f9;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
  
  &::placeholder {
    color: #64748b;
  }
`;

const SendButton = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled 
    ? 'rgba(51, 65, 85, 0.5)' 
    : 'linear-gradient(135deg, #06b6d4, #0891b2)'};
  border: 1px solid ${props => props.disabled 
    ? 'rgba(71, 85, 105, 0.5)' 
    : '#06b6d4'};
  color: ${props => props.disabled ? '#64748b' : '#f1f5f9'};
  padding: 12px 16px;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
  }
`;

interface PolicyChatbotProps {
  policies: PolicyData[];
}

const PolicyChatbot: React.FC<PolicyChatbotProps> = ({ policies }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'こんにちは！政策AIアシスタントです。政策に関するご質問や分析をお手伝いします。どのようなことをお聞きになりたいですか？',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    '政策の影響度を比較',
    '予算配分を確認',
    '関連政策を表示',
    '実装状況を教えて',
    'ステークホルダー分析'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('影響度') || message.includes('比較')) {
      const sortedPolicies = [...policies].sort((a, b) => b.impactScore - a.impactScore);
      return `影響度の高い政策は以下の通りです：\n\n1. ${sortedPolicies[0]?.title} (影響度: ${sortedPolicies[0]?.impactScore})\n2. ${sortedPolicies[1]?.title} (影響度: ${sortedPolicies[1]?.impactScore})\n3. ${sortedPolicies[2]?.title} (影響度: ${sortedPolicies[2]?.impactScore})\n\n詳細な分析をご希望でしたら、特定の政策名をお聞かせください。`;
    }
    
    if (message.includes('予算') || message.includes('配分')) {
      const totalBudget = policies.reduce((sum, policy) => sum + policy.budget.total, 0);
      const avgBudget = totalBudget / policies.length;
      return `現在の政策予算状況：\n\n• 総予算: ¥${(totalBudget / 1000000).toFixed(0)}M\n• 平均予算: ¥${(avgBudget / 1000000).toFixed(1)}M\n• 最大予算: ${policies.reduce((max, p) => p.budget.total > max.budget.total ? p : max).title}\n\n具体的な予算内訳や使用状況についてもお答えできます。`;
    }
    
    if (message.includes('関連') || message.includes('関係')) {
      const connectionsCount = policies.reduce((sum, policy) => sum + policy.relatedPolicies.length, 0);
      return `政策間の関連性分析：\n\n• 総関連数: ${connectionsCount}\n• 最も関連の多い政策: ${policies.reduce((max, p) => p.relatedPolicies.length > max.relatedPolicies.length ? p : max).title}\n\n政策間の相互作用や依存関係について詳しく知りたい場合は、具体的な政策名をお聞かせください。`;
    }
    
    if (message.includes('実装') || message.includes('状況') || message.includes('進捗')) {
      const implemented = policies.filter(p => p.status === 'implemented').length;
      const approved = policies.filter(p => p.status === 'approved').length;
      const review = policies.filter(p => p.status === 'review').length;
      const draft = policies.filter(p => p.status === 'draft').length;
      
      return `政策実装状況の概要：\n\n✅ 実装済み: ${implemented}件\n🔵 承認済み: ${approved}件\n🟡 審査中: ${review}件\n⚪ 草案: ${draft}件\n\n各政策の詳細な進捗状況についてもお聞かせできます。`;
    }
    
    if (message.includes('ステークホルダー') || message.includes('関係者')) {
      const allStakeholders = new Set(policies.flatMap(p => p.stakeholders));
      return `主なステークホルダー分析：\n\n参加組織数: ${allStakeholders.size}\n主要な関係者: ${Array.from(allStakeholders).slice(0, 5).join(', ')}\n\n特定の政策におけるステークホルダーの役割や影響についても詳しく説明できます。`;
    }
    
    // デフォルト応答
    return `ご質問ありがとうございます。政策データベースから関連情報を検索しています。\n\n以下のような分析が可能です：\n• 政策の影響度分析\n• 予算配分の最適化提案\n• ステークホルダー分析\n• 実装ロードマップの作成\n\nより具体的なご質問をいただければ、詳細な分析結果をご提供いたします。`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date(),
        policyReferences: inputMessage.toLowerCase().includes('政策') ? ['1', '2'] : undefined
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer>
      <ChatbotHeader>
        <HeaderTitle>
          🤖 政策AIアシスタント
        </HeaderTitle>
        <HeaderDescription>
          政策データの分析・比較・提案をAIがサポートします
        </HeaderDescription>
        <StatusIndicator online={isOnline}>
          <StatusDot online={isOnline} />
          {isOnline ? 'オンライン' : 'オフライン'}
        </StatusIndicator>
      </ChatbotHeader>

      <ChatMessages>
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble type={message.type}>
              {message.content}
              {message.policyReferences && (
                <div>
                  {message.policyReferences.map(refId => {
                    const policy = policies.find(p => p.id === refId);
                    return policy ? (
                      <PolicyReference key={refId}>
                        📋 {policy.title}
                      </PolicyReference>
                    ) : null;
                  })}
                </div>
              )}
              <MessageTime>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </MessageTime>
            </MessageBubble>
          </div>
        ))}
        
        {isTyping && (
          <TypingIndicator>
            <TypingDots>
              <span />
              <span />
              <span />
            </TypingDots>
            AIが回答を生成中...
          </TypingIndicator>
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <InputSection>
        <QuickActions>
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </QuickActionButton>
          ))}
        </QuickActions>
        
        <InputContainer>
          <MessageInput
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="政策について質問してください..."
            rows={1}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
          >
            {isTyping ? '⏳' : '📤'}
          </SendButton>
        </InputContainer>
      </InputSection>
    </ChatbotContainer>
  );
};

export default PolicyChatbot;