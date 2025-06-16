import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';

const ConnectionsPanel = styled.div`
  grid-area: connections;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(51, 65, 85, 0.3);
  padding: 20px;
  overflow-y: auto;
`;

const ConnectionsHeader = styled.div`
  margin-bottom: 20px;
`;

const ConnectionsTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 10px;
`;

const NetworkViz = styled.div`
  height: 250px;
  background: rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(71, 85, 105, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #06b6d4;
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
  }
`;

const DataStream = styled.div<{ left: string; delay: string }>`
  position: absolute;
  left: ${props => props.left};
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, #06b6d4, transparent);
  animation: dataFlow 3s linear infinite;
  animation-delay: ${props => props.delay};
`;

const MoneyFlowSection = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const FlowTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
  }
`;

const FlowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);

  &:last-child {
    border-bottom: none;
  }
`;

const FlowLabel = styled.div`
  color: #cbd5e1;
  font-size: 14px;
`;

const FlowAmount = styled.div`
  color: #06b6d4;
  font-weight: 600;
`;

const ActiveProjects = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  margin-bottom: 25px;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 15px;
`;

const ProjectItem = styled.div`
  padding: 12px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(71, 85, 105, 0.5);
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProjectName = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 5px;
`;

const ProjectStatus = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;

const KnowledgeBase = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const KnowledgeItem = styled.div`
  padding: 12px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(71, 85, 105, 0.5);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const KnowledgeTitle = styled.div`
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 5px;
  font-size: 14px;
`;

const KnowledgeSummary = styled.div`
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
`;

export const NetworkPanel: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);

    // Create network nodes for different actor types
    const nodeGeometry = new THREE.SphereGeometry(0.08, 12, 12);
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];

    // Color schemes for different actor types
    const materials = {
      government: new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      business: new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      npo: new THREE.MeshBasicMaterial({ color: 0x10b981 }),
      citizen: new THREE.MeshBasicMaterial({ color: 0x8b5cf6 }),
      academic: new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    };

    // Create nodes
    const actorTypes = ['government', 'business', 'npo', 'citizen', 'academic'] as const;
    for (let i = 0; i < 25; i++) {
      const actorType = actorTypes[Math.floor(Math.random() * actorTypes.length)];
      const node = new THREE.Mesh(nodeGeometry, materials[actorType]);
      
      // Position nodes in a network layout
      const angle = (i / 25) * Math.PI * 2;
      const radius = 0.6 + Math.random() * 0.4;
      const layer = Math.floor(i / 5);
      
      node.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.6 + layer * 0.2 - 0.4,
        Math.sin(angle) * radius
      );
      
      nodes.push(node);
      scene.add(node);
    }

    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x06b6d4, 
      transparent: true, 
      opacity: 0.4 
    });

    for (let i = 0; i < 30; i++) {
      const node1 = nodes[Math.floor(Math.random() * nodes.length)];
      const node2 = nodes[Math.floor(Math.random() * nodes.length)];
      
      if (node1 !== node2) {
        const points = [node1.position, node2.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        connections.push(line);
        scene.add(line);
      }
    }

    // Add central hub (user)
    const centralGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const centralMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.9
    });
    const centralNode = new THREE.Mesh(centralGeometry, centralMaterial);
    centralNode.position.set(0, 0, 0);
    scene.add(centralNode);

    camera.position.z = 2;

    // Animation
    function animate() {
      requestAnimationFrame(animate);

      // Rotate the entire network
      scene.rotation.y += 0.003;

      // Pulse the central node
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
      centralNode.scale.setScalar(scale);

      // Animate node positions slightly
      nodes.forEach(node => {
        node.position.y += Math.sin(Date.now() * 0.002 + node.position.x) * 0.0005;
      });

      // Animate connection opacity
      connections.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.2 + Math.sin(Date.now() * 0.001 + index) * 0.2;
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  const projects = [
    { name: '高齢者見守りシステム', status: 'メンバー募集中 • 4/7名' },
    { name: '子育て支援アプリ', status: '開発中 • 進捗 78%' },
    { name: '商店街DX支援', status: '入札受付中 • 締切 6/30' },
    { name: '環境教育VR', status: '企画段階 • アイデア募集' }
  ];

  const knowledgeItems = [
    {
      title: '富山県DX推進計画 更新版',
      summary: '市民参加型スマートシティ構想の3つのポイントと15の協働機会をAIが要約'
    },
    {
      title: '地域包括ケア システム指針',
      summary: '高齢者支援におけるテクノロジー活用のベストプラクティス集'
    },
    {
      title: '中小企業DX支援 補助金ガイド',
      summary: '申請方法から活用事例まで、わかりやすい解説とチェックリスト'
    }
  ];

  return (
    <ConnectionsPanel>
      <ConnectionsHeader>
        <ConnectionsTitle>🕸️ ネットワーク可視化</ConnectionsTitle>
      </ConnectionsHeader>

      {/* Network Visualization */}
      <NetworkViz onClick={() => navigate('/network')}>
        <canvas 
          ref={canvasRef}
          style={{ width: '100%', height: '100%' }}
        />
        {/* Data streams */}
        <DataStream left="20%" delay="0s" />
        <DataStream left="50%" delay="1s" />
        <DataStream left="80%" delay="2s" />
      </NetworkViz>

      {/* Money Flow Section */}
      <MoneyFlowSection>
        <FlowTitle>
          <span>💰</span>
          リアルタイム資金フロー
        </FlowTitle>
        <FlowItem>
          <FlowLabel>今月の地域循環額</FlowLabel>
          <FlowAmount>¥207.3M</FlowAmount>
        </FlowItem>
        <FlowItem>
          <FlowLabel>プロボノ換算価値</FlowLabel>
          <FlowAmount>¥186.9M</FlowAmount>
        </FlowItem>
        <FlowItem>
          <FlowLabel>スキル提供総時間</FlowLabel>
          <FlowAmount>2,847h</FlowAmount>
        </FlowItem>
        <FlowItem>
          <FlowLabel>地域インパクト指数</FlowLabel>
          <FlowAmount>94.2</FlowAmount>
        </FlowItem>
      </MoneyFlowSection>

      {/* Active Projects */}
      <ActiveProjects>
        <SectionTitle>📋 アクティブプロジェクト</SectionTitle>
        {projects.map((project, index) => (
          <ProjectItem key={index}>
            <ProjectName>{project.name}</ProjectName>
            <ProjectStatus>{project.status}</ProjectStatus>
          </ProjectItem>
        ))}
      </ActiveProjects>

      {/* LLM Knowledge Base */}
      <KnowledgeBase>
        <SectionTitle>🧠 AIナレッジベース</SectionTitle>
        {knowledgeItems.map((item, index) => (
          <KnowledgeItem key={index}>
            <KnowledgeTitle>{item.title}</KnowledgeTitle>
            <KnowledgeSummary>{item.summary}</KnowledgeSummary>
          </KnowledgeItem>
        ))}
      </KnowledgeBase>
    </ConnectionsPanel>
  );
};