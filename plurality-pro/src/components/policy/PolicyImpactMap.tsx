import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PolicyData } from '../../pages/PolicyKnowledgePage';

const ImpactMapContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MapHeader = styled.div`
  padding: 20px 25px 15px 25px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
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
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

const MapContent = styled.div`
  flex: 1;
  position: relative;
  padding: 20px;
  overflow: hidden;
`;

const NetworkSvg = styled.svg`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%);
`;

const PolicyNode = styled.div<{ x: number; y: number; size: number; status: string }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => {
    switch (props.status) {
      case 'implemented': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'approved': return 'linear-gradient(135deg, #06b6d4, #0891b2)';
      case 'review': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'draft': return 'linear-gradient(135deg, #64748b, #475569)';
      default: return 'linear-gradient(135deg, #64748b, #475569)';
    }
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  border: 3px solid rgba(15, 23, 42, 0.8);
  box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 8px 30px rgba(6, 182, 212, 0.5);
    z-index: 10;
  }
`;

const NodeIcon = styled.div<{ size?: number }>`
  color: white;
  font-size: ${props => props.size || 16}px;
  font-weight: bold;
`;

const ConnectionLine = styled.line`
  stroke: rgba(6, 182, 212, 0.4);
  stroke-width: 2;
  stroke-dasharray: 5,5;
  animation: dash 2s linear infinite;
  
  @keyframes dash {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 10; }
  }
`;

const ImpactTooltip = styled.div<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 12px;
  padding: 16px;
  color: #f1f5f9;
  font-size: 13px;
  pointer-events: none;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;
  max-width: 280px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
`;

const TooltipTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #06b6d4;
`;

const TooltipCategory = styled.div`
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 12px;
`;

const ImpactMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
`;

const ImpactMetric = styled.div`
  background: rgba(51, 65, 85, 0.4);
  border-radius: 6px;
  padding: 8px;
  text-align: center;
`;

const MetricValue = styled.div`
  color: #06b6d4;
  font-weight: 600;
  font-size: 14px;
`;

const MetricLabel = styled.div`
  color: #94a3b8;
  font-size: 10px;
  margin-top: 2px;
`;

const LegendContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 12px;
  padding: 16px;
  z-index: 100;
`;

const LegendTitle = styled.div`
  color: #f1f5f9;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #cbd5e1;
`;

const LegendDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const FilterControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 8px;
  z-index: 100;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(15, 23, 42, 0.9)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(51, 65, 85, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

interface PolicyImpactMapProps {
  policies: PolicyData[];
}

const PolicyImpactMap: React.FC<PolicyImpactMapProps> = ({ policies }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    policy: PolicyData | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    policy: null
  });
  const [filter, setFilter] = useState<'all' | 'economic' | 'social' | 'environmental'>('all');

  const statusStyles = {
    implemented: { color: '#10b981', icon: '✓' },
    approved: { color: '#06b6d4', icon: '◉' },
    review: { color: '#f59e0b', icon: '◐' },
    draft: { color: '#64748b', icon: '○' }
  };

  const getNodeSize = (policy: PolicyData) => {
    // サイズを影響度と予算に基づいて計算
    const impactFactor = policy.impactScore / 100;
    const budgetFactor = Math.min(policy.budget.total / 500000000, 1);
    return Math.max(40, Math.min(80, 40 + (impactFactor + budgetFactor) * 20));
  };

  const getNodePosition = (index: number, total: number, containerWidth: number, containerHeight: number) => {
    // 円形レイアウトで配置
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const radius = Math.min(containerWidth, containerHeight) * 0.3;
    const angle = (index / total) * 2 * Math.PI;
    
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  const drawConnections = () => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Clear previous connections
    svg.innerHTML = '';

    // Draw connections between related policies
    policies.forEach((policy, index) => {
      const position1 = getNodePosition(index, policies.length, containerWidth, containerHeight);
      
      policy.relatedPolicies.forEach(relatedId => {
        const relatedIndex = policies.findIndex(p => p.id === relatedId);
        if (relatedIndex !== -1) {
          const position2 = getNodePosition(relatedIndex, policies.length, containerWidth, containerHeight);
          
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', position1.x.toString());
          line.setAttribute('y1', position1.y.toString());
          line.setAttribute('x2', position2.x.toString());
          line.setAttribute('y2', position2.y.toString());
          line.setAttribute('stroke', 'rgba(6, 182, 212, 0.4)');
          line.setAttribute('stroke-width', '2');
          line.setAttribute('stroke-dasharray', '5,5');
          line.style.animation = 'dash 2s linear infinite';
          
          svg.appendChild(line);
        }
      });
    });
  };

  const handleNodeHover = (policy: PolicyData, event: React.MouseEvent) => {
    setTooltip({
      visible: true,
      x: event.clientX - (containerRef.current?.getBoundingClientRect().left || 0),
      y: event.clientY - (containerRef.current?.getBoundingClientRect().top || 0),
      policy
    });
  };

  const handleNodeLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const getFilteredMetrics = (policy: PolicyData) => {
    switch (filter) {
      case 'economic':
        return { value: policy.metrics.economicImpact, label: '経済影響' };
      case 'social':
        return { value: policy.metrics.socialImpact, label: '社会影響' };
      case 'environmental':
        return { value: policy.metrics.environmentalImpact, label: '環境影響' };
      default:
        return { value: policy.impactScore, label: '総合影響' };
    }
  };

  useEffect(() => {
    drawConnections();
    
    const handleResize = () => {
      setTimeout(drawConnections, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [policies, filter]);

  return (
    <ImpactMapContainer>
      <MapHeader>
        <HeaderTitle>
          🗺️ 政策影響マップ
        </HeaderTitle>
        <HeaderDescription>
          政策間の関連性と影響範囲をネットワーク図で可視化
        </HeaderDescription>
      </MapHeader>
      
      <MapContent ref={containerRef}>
        {/* SVG for connections */}
        <NetworkSvg ref={svgRef} />
        
        {/* Policy nodes */}
        {policies.map((policy, index) => {
          const containerWidth = containerRef.current?.clientWidth || 800;
          const containerHeight = containerRef.current?.clientHeight || 600;
          const position = getNodePosition(index, policies.length, containerWidth, containerHeight);
          const nodeSize = getNodeSize(policy);
          
          return (
            <PolicyNode
              key={policy.id}
              x={position.x}
              y={position.y}
              size={nodeSize}
              status={policy.status}
              onMouseEnter={(e) => handleNodeHover(policy, e)}
              onMouseLeave={handleNodeLeave}
            >
              <NodeIcon size={nodeSize * 0.3}>
                {statusStyles[policy.status as keyof typeof statusStyles]?.icon}
              </NodeIcon>
            </PolicyNode>
          );
        })}

        {/* Tooltip */}
        <ImpactTooltip
          x={tooltip.x}
          y={tooltip.y}
          visible={tooltip.visible}
        >
          {tooltip.policy && (
            <>
              <TooltipTitle>{tooltip.policy.title}</TooltipTitle>
              <TooltipCategory>{tooltip.policy.category}</TooltipCategory>
              <div style={{ fontSize: '12px', lineHeight: 1.4, marginBottom: '8px' }}>
                {tooltip.policy.description}
              </div>
              <ImpactMetrics>
                <ImpactMetric>
                  <MetricValue>{tooltip.policy.metrics.economicImpact}%</MetricValue>
                  <MetricLabel>経済影響</MetricLabel>
                </ImpactMetric>
                <ImpactMetric>
                  <MetricValue>{tooltip.policy.metrics.socialImpact}%</MetricValue>
                  <MetricLabel>社会影響</MetricLabel>
                </ImpactMetric>
                <ImpactMetric>
                  <MetricValue>{tooltip.policy.metrics.environmentalImpact}%</MetricValue>
                  <MetricLabel>環境影響</MetricLabel>
                </ImpactMetric>
                <ImpactMetric>
                  <MetricValue>{tooltip.policy.metrics.citizenEngagement}%</MetricValue>
                  <MetricLabel>市民参加</MetricLabel>
                </ImpactMetric>
              </ImpactMetrics>
            </>
          )}
        </ImpactTooltip>

        {/* Legend */}
        <LegendContainer>
          <LegendTitle>ステータス</LegendTitle>
          <LegendItem>
            <LegendDot color="#10b981" />
            実装済み
          </LegendItem>
          <LegendItem>
            <LegendDot color="#06b6d4" />
            承認済み
          </LegendItem>
          <LegendItem>
            <LegendDot color="#f59e0b" />
            審査中
          </LegendItem>
          <LegendItem>
            <LegendDot color="#64748b" />
            草案
          </LegendItem>
        </LegendContainer>

        {/* Filter controls */}
        <FilterControls>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            全体
          </FilterButton>
          <FilterButton
            active={filter === 'economic'}
            onClick={() => setFilter('economic')}
          >
            経済
          </FilterButton>
          <FilterButton
            active={filter === 'social'}
            onClick={() => setFilter('social')}
          >
            社会
          </FilterButton>
          <FilterButton
            active={filter === 'environmental'}
            onClick={() => setFilter('environmental')}
          >
            環境
          </FilterButton>
        </FilterControls>
      </MapContent>
    </ImpactMapContainer>
  );
};

export default PolicyImpactMap;