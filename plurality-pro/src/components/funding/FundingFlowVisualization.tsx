import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FundingFlowData } from '../../pages/FundingFlowPage';

const VisualizationContainer = styled.div`
  background: rgba(15, 23, 42, 0.6);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ViewModeToggle = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const ModeButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 8px 12px;
  border-radius: 8px;
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

const SankeyContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const FlowChart = styled.svg`
  width: 100%;
  height: 100%;
`;

const TooltipContainer = styled.div<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 12px;
  padding: 12px;
  color: #f1f5f9;
  font-size: 13px;
  pointer-events: none;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;
  max-width: 250px;
`;

const NetworkContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: radial-gradient(circle at center, rgba(6, 182, 212, 0.05) 0%, rgba(15, 23, 42, 0.8) 70%);
`;

const TimelineContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 40px;
`;

const TimelineAxis = styled.div`
  position: absolute;
  bottom: 100px;
  left: 40px;
  right: 40px;
  height: 2px;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  border-radius: 1px;
`;

const TimelineMarker = styled.div<{ position: number }>`
  position: absolute;
  left: ${props => props.position}%;
  top: -20px;
  width: 8px;
  height: 8px;
  background: #06b6d4;
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.8);
`;

const ProjectTimelineItem = styled.div<{ startPos: number; width: number; color: string }>`
  position: absolute;
  left: ${props => props.startPos}%;
  width: ${props => props.width}%;
  height: 40px;
  background: linear-gradient(90deg, ${props => props.color}40, ${props => props.color}80);
  border: 1px solid ${props => props.color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: #f1f5f9;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px ${props => props.color}30;
  }
`;

interface FundingFlowVisualizationProps {
  data: FundingFlowData;
  viewMode: 'flow' | 'network' | 'timeline';
  period: 'month' | 'quarter' | 'year';
}

interface SankeyNode {
  id: string;
  name: string;
  type: 'source' | 'project' | 'expense';
  value: number;
  color: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color: string;
}

const FundingFlowVisualization: React.FC<FundingFlowVisualizationProps> = ({
  data,
  viewMode,
  period
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: ''
  });

  const sourceTypeColors = {
    government: '#10b981',
    private: '#3b82f6',
    crowdfunding: '#8b5cf6',
    corporate: '#f59e0b',
    revenue: '#ef4444'
  };

  const projectColors = ['#06b6d4', '#34d399', '#60a5fa', '#a78bfa', '#fbbf24'];

  // Sankey diagram data preparation
  const prepareSankeyData = (): { nodes: SankeyNode[]; links: SankeyLink[] } => {
    const nodes: SankeyNode[] = [];
    const links: SankeyLink[] = [];

    // Add source nodes
    const sourceTotals = new Map<string, number>();
    data.projects.forEach(project => {
      project.fundingSources.forEach(source => {
        const current = sourceTotals.get(source.type) || 0;
        sourceTotals.set(source.type, current + source.amount);
      });
    });

    sourceTotals.forEach((total, type) => {
      nodes.push({
        id: `source-${type}`,
        name: getSourceTypeName(type),
        type: 'source',
        value: total,
        color: sourceTypeColors[type as keyof typeof sourceTypeColors]
      });
    });

    // Add project nodes
    data.projects.forEach((project, index) => {
      nodes.push({
        id: `project-${project.id}`,
        name: project.name,
        type: 'project',
        value: project.raisedAmount,
        color: projectColors[index % projectColors.length]
      });

      // Add links from sources to projects
      project.fundingSources.forEach(source => {
        links.push({
          source: `source-${source.type}`,
          target: `project-${project.id}`,
          value: source.amount,
          color: sourceTypeColors[source.type as keyof typeof sourceTypeColors]
        });
      });

      // Add expense node and link
      if (project.spentAmount > 0) {
        const expenseNodeId = `expense-${project.id}`;
        nodes.push({
          id: expenseNodeId,
          name: `${project.name} 支出`,
          type: 'expense',
          value: project.spentAmount,
          color: '#ef4444'
        });

        links.push({
          source: `project-${project.id}`,
          target: expenseNodeId,
          value: project.spentAmount,
          color: projectColors[index % projectColors.length]
        });
      }
    });

    return { nodes, links };
  };

  const getSourceTypeName = (type: string): string => {
    const names = {
      government: '補助金・交付金',
      private: '民間投資・寄付',
      crowdfunding: 'クラウドファンディング',
      corporate: '企業協賛',
      revenue: '事業収益'
    };
    return names[type as keyof typeof names] || type;
  };

  // Render Sankey diagram
  const renderSankeyDiagram = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    
    // Clear previous content
    svgElement.innerHTML = '';

    const { nodes, links } = prepareSankeyData();
    const width = svgElement.clientWidth;
    const height = svgElement.clientHeight;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    // Create SVG elements using vanilla JS instead of D3
    const createSVGElement = (tag: string, attributes: Record<string, any>) => {
      const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value.toString());
      });
      return element;
    };

    // Simple manual layout for demonstration
    const sourceX = margin.left + 100;
    const projectX = width / 2;
    const expenseX = width - margin.right - 100;

    // Position nodes
    const sourceNodes = nodes.filter(n => n.type === 'source');
    const projectNodes = nodes.filter(n => n.type === 'project');
    const expenseNodes = nodes.filter(n => n.type === 'expense');

    const nodeHeight = 30;
    const nodeSpacing = 60;

    sourceNodes.forEach((node, i) => {
      const y = margin.top + i * nodeSpacing + 50;
      
      // Create rectangle
      const rect = createSVGElement('rect', {
        x: sourceX - 80,
        y: y,
        width: 160,
        height: nodeHeight,
        rx: 6,
        fill: node.color + '40',
        stroke: node.color,
        'stroke-width': 2
      });
      svgElement.appendChild(rect);

      // Create text for name
      const text = createSVGElement('text', {
        x: sourceX,
        y: y + nodeHeight / 2 + 5,
        'text-anchor': 'middle',
        fill: '#f1f5f9',
        'font-size': '13px',
        'font-weight': '600'
      });
      text.textContent = node.name;
      svgElement.appendChild(text);

      // Create text for amount
      const amountText = createSVGElement('text', {
        x: sourceX,
        y: y + nodeHeight + 16,
        'text-anchor': 'middle',
        fill: '#06b6d4',
        'font-size': '11px',
        'font-weight': '600'
      });
      amountText.textContent = `¥${(node.value / 1000000).toFixed(1)}M`;
      svgElement.appendChild(amountText);
    });

    projectNodes.forEach((node, i) => {
      const y = margin.top + i * nodeSpacing + 50;
      
      // Create rectangle
      const rect = createSVGElement('rect', {
        x: projectX - 100,
        y: y,
        width: 200,
        height: nodeHeight,
        rx: 6,
        fill: node.color + '40',
        stroke: node.color,
        'stroke-width': 2
      });
      svgElement.appendChild(rect);

      // Create text for name
      const text = createSVGElement('text', {
        x: projectX,
        y: y + nodeHeight / 2 + 5,
        'text-anchor': 'middle',
        fill: '#f1f5f9',
        'font-size': '13px',
        'font-weight': '600'
      });
      text.textContent = node.name.length > 20 ? node.name.substring(0, 18) + '...' : node.name;
      svgElement.appendChild(text);

      // Create text for amount
      const amountText = createSVGElement('text', {
        x: projectX,
        y: y + nodeHeight + 16,
        'text-anchor': 'middle',
        fill: '#06b6d4',
        'font-size': '11px',
        'font-weight': '600'
      });
      amountText.textContent = `¥${(node.value / 1000000).toFixed(1)}M`;
      svgElement.appendChild(amountText);
    });

    // Add flowing connections
    const drawFlowingLine = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      const line = createSVGElement('line', {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: color + '60',
        'stroke-width': 3,
        'stroke-dasharray': '5,5'
      });

      // Add CSS animation
      line.style.animation = 'dash 1s linear infinite';
      svgElement.appendChild(line);
    };

    // Add CSS keyframes for dash animation
    if (!document.querySelector('#dash-animation-style')) {
      const style = document.createElement('style');
      style.id = 'dash-animation-style';
      style.textContent = `
        @keyframes dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 10; }
        }
      `;
      document.head.appendChild(style);
    }

    // Draw flow lines based on actual funding relationships
    data.projects.forEach((project, projectIndex) => {
      if (!projectNodes[projectIndex]) return;
      
      const py = margin.top + projectIndex * nodeSpacing + 50 + nodeHeight / 2;
      
      // Draw lines from funding sources to this project
      project.fundingSources.forEach((source) => {
        const sourceIndex = sourceNodes.findIndex(node => node.id === `source-${source.type}`);
        if (sourceIndex >= 0) {
          const sy = margin.top + sourceIndex * nodeSpacing + 50 + nodeHeight / 2;
          drawFlowingLine(sourceX + 80, sy, projectX - 100, py, sourceNodes[sourceIndex].color);
        }
      });
      
      // Draw line from project to expenses (if project has spending)
      if (project.spentAmount > 0) {
        drawFlowingLine(projectX + 100, py, expenseX - 80, py, projectColors[projectIndex % projectColors.length]);
      }
    });
  };

  // Render network view
  const renderNetworkView = () => {
    if (!networkRef.current) return;

    // This would be a simplified network representation
    // In a real implementation, you'd use D3 force simulation or similar
  };

  // Render timeline view
  const renderTimelineView = () => {
    // Timeline implementation would go here
  };

  useEffect(() => {
    if (viewMode === 'flow') {
      renderSankeyDiagram();
    } else if (viewMode === 'network') {
      renderNetworkView();
    } else if (viewMode === 'timeline') {
      renderTimelineView();
    }
  }, [data, viewMode, period]);

  const handleMouseMove = (event: React.MouseEvent) => {
    // Handle tooltip positioning
  };

  return (
    <VisualizationContainer onMouseMove={handleMouseMove}>
      {viewMode === 'flow' && (
        <SankeyContainer>
          <FlowChart ref={svgRef} />
        </SankeyContainer>
      )}

      {viewMode === 'network' && (
        <NetworkContainer ref={networkRef}>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: '#cbd5e1',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🕸️</div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
              ネットワーク可視化
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              ステークホルダー間の資金ネットワークを3Dで表示
            </div>
          </div>
        </NetworkContainer>
      )}

      {viewMode === 'timeline' && (
        <TimelineContainer>
          <div style={{ 
            color: '#f1f5f9', 
            fontSize: '18px', 
            fontWeight: '600',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            📅 プロジェクト資金タイムライン
          </div>
          
          <div style={{ position: 'relative', height: '300px', marginBottom: '40px' }}>
            {data.projects.map((project, index) => (
              <ProjectTimelineItem
                key={project.id}
                startPos={10 + index * 15}
                width={Math.max(20, (project.progressRate / 100) * 30)}
                color={projectColors[index % projectColors.length]}
                style={{ top: `${index * 50}px` }}
              >
                {project.name}
              </ProjectTimelineItem>
            ))}
          </div>

          <TimelineAxis>
            {[0, 25, 50, 75, 100].map(pos => (
              <TimelineMarker key={pos} position={pos} />
            ))}
          </TimelineAxis>
        </TimelineContainer>
      )}

      <TooltipContainer
        x={tooltip.x}
        y={tooltip.y}
        visible={tooltip.visible}
      >
        {tooltip.content}
      </TooltipContainer>
    </VisualizationContainer>
  );
};

export default FundingFlowVisualization;