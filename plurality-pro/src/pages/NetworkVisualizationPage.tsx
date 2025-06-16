import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  overflow: hidden;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 100;
`;

const BackButton = styled.button`
  background: rgba(6, 182, 212, 0.2);
  border: 1px solid #06b6d4;
  color: #06b6d4;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(6, 182, 212, 0.3);
    transform: translateY(-1px);
  }
`;

const Title = styled.h1`
  color: #f1f5f9;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 200px;
  overflow: hidden;
`;

const BottomPanel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(51, 65, 85, 0.3);
  padding: 20px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
`;

const PanelSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PanelTitle = styled.h3`
  color: #f1f5f9;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterTag = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(16, 185, 129, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#10b981' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#10b981' : '#cbd5e1'};
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
    border-color: #10b981;
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);

  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: #cbd5e1;
  font-size: 14px;
`;

const StatValue = styled.span`
  color: #06b6d4;
  font-weight: 600;
  font-size: 14px;
`;

const Tooltip = styled.div<{ x: number; y: number; visible: boolean }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 12px;
  padding: 15px;
  color: #f1f5f9;
  font-size: 14px;
  pointer-events: none;
  z-index: 1000;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;
  max-width: 250px;
`;

const TooltipTitle = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: #06b6d4;
`;

const TooltipContent = styled.div`
  font-size: 12px;
  color: #cbd5e1;
  line-height: 1.4;
`;

interface NodeData {
  id: string;
  name: string;
  type: 'government' | 'business' | 'npo' | 'citizen' | 'academic';
  description: string;
  connections: number;
  position: THREE.Vector3;
}

const NetworkVisualizationPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodesRef = useRef<{ mesh: THREE.Mesh; data: NodeData }[]>([]);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilters, setActiveFilters] = useState<string[]>(['government', 'business', 'npo', 'citizen', 'academic']);
  const [isPaused, setIsPaused] = useState(false);

  const nodeTypes = [
    { key: 'government', label: '自治体', color: '#ef4444', count: 8 },
    { key: 'business', label: '企業', color: '#3b82f6', count: 12 },
    { key: 'npo', label: 'NPO', color: '#10b981', count: 6 },
    { key: 'citizen', label: '市民', color: '#8b5cf6', count: 15 },
    { key: 'academic', label: '学術機関', color: '#f59e0b', count: 4 }
  ];

  const generateNodeData = useCallback((): NodeData[] => {
    const data: NodeData[] = [];
    nodeTypes.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1 + Math.random() * 1.5;
        const height = (Math.random() - 0.5) * 1.2;
        
        data.push({
          id: `${type.key}-${i}`,
          name: `${type.label}${i + 1}`,
          type: type.key as any,
          description: `${type.label}の詳細情報です。現在${Math.floor(Math.random() * 20) + 5}のプロジェクトに参加中。`,
          connections: Math.floor(Math.random() * 15) + 3,
          position: new THREE.Vector3(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
          )
        });
      }
    });
    return data;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Generate node data
    const nodeData = generateNodeData();
    const nodes: { mesh: THREE.Mesh; data: NodeData }[] = [];
    const connections: THREE.Line[] = [];

    // Create materials for each node type
    const materials = Object.fromEntries(
      nodeTypes.map(type => [
        type.key,
        new THREE.MeshBasicMaterial({ 
          color: type.color,
          transparent: true,
          opacity: 0.8
        })
      ])
    );

    // Create nodes
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    nodeData.forEach(data => {
      const node = new THREE.Mesh(nodeGeometry, materials[data.type]);
      node.position.copy(data.position);
      nodes.push({ mesh: node, data });
      scene.add(node);
    });

    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x06b6d4, 
      transparent: true, 
      opacity: 0.3 
    });

    for (let i = 0; i < 40; i++) {
      const node1 = nodes[Math.floor(Math.random() * nodes.length)];
      const node2 = nodes[Math.floor(Math.random() * nodes.length)];
      
      if (node1 !== node2) {
        const points = [node1.mesh.position, node2.mesh.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        connections.push(line);
        scene.add(line);
      }
    }

    // Central hub
    const centralGeometry = new THREE.SphereGeometry(0.15, 20, 20);
    const centralMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.9
    });
    const centralNode = new THREE.Mesh(centralGeometry, centralMaterial);
    centralNode.position.set(0, 0, 0);
    scene.add(centralNode);

    nodesRef.current = nodes;

    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);

    // Mouse controls
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });

      if (isDragging) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        
        const spherical = new THREE.Spherical();
        spherical.setFromVector3(camera.position);
        spherical.theta -= deltaX * 0.01;
        spherical.phi += deltaY * 0.01;
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
        
        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);
        
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
      } else {
        // Raycasting for hover detection
        const rect = canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(nodes.map(n => n.mesh));
        
        if (intersects.length > 0) {
          const intersectedNode = nodes.find(n => n.mesh === intersects[0].object);
          if (intersectedNode) {
            setHoveredNode(intersectedNode.data);
          }
        } else {
          setHoveredNode(null);
        }
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoom = event.deltaY * 0.001;
      camera.position.multiplyScalar(1 + zoom);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    // Animation loop
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);

      if (!isPaused) {
        // Rotate the network
        scene.rotation.y += 0.002;

        // Pulse central node
        const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
        centralNode.scale.setScalar(scale);

        // Animate connections
        connections.forEach((line, index) => {
          const material = line.material as THREE.LineBasicMaterial;
          material.opacity = 0.2 + Math.sin(Date.now() * 0.001 + index) * 0.15;
        });

        // Filter visibility
        nodes.forEach(({ mesh, data }) => {
          mesh.visible = activeFilters.includes(data.type);
        });
      }

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
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
    };
  }, [generateNodeData, activeFilters, isPaused]);

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const getVisibleNodeCount = () => {
    return nodeTypes.reduce((total, type) => {
      return total + (activeFilters.includes(type.key) ? type.count : 0);
    }, 0);
  };

  const getTotalConnections = () => {
    return nodesRef.current
      .filter(({ data }) => activeFilters.includes(data.type))
      .reduce((total, { data }) => total + data.connections, 0);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/connect')}>
          ← ダッシュボードに戻る
        </BackButton>
        <Title>
          🕸️ ネットワーク可視化
        </Title>
        <Controls>
          <ControlButton 
            active={!isPaused} 
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? '▶️ 再生' : '⏸️ 一時停止'}
          </ControlButton>
          <ControlButton onClick={() => setActiveFilters(nodeTypes.map(t => t.key))}>
            全表示
          </ControlButton>
          <ControlButton onClick={() => setActiveFilters([])}>
            全非表示
          </ControlButton>
        </Controls>
      </Header>

      <CanvasContainer>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </CanvasContainer>

      <BottomPanel>
        <PanelSection>
          <PanelTitle>🎛️ フィルター</PanelTitle>
          <FilterGroup>
            {nodeTypes.map(type => (
              <FilterTag
                key={type.key}
                active={activeFilters.includes(type.key)}
                onClick={() => toggleFilter(type.key)}
              >
                {type.label} ({type.count})
              </FilterTag>
            ))}
          </FilterGroup>
        </PanelSection>

        <PanelSection>
          <PanelTitle>📊 統計情報</PanelTitle>
          <StatItem>
            <StatLabel>表示中ノード</StatLabel>
            <StatValue>{getVisibleNodeCount()}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>総接続数</StatLabel>
            <StatValue>{getTotalConnections()}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>ネットワーク密度</StatLabel>
            <StatValue>87.3%</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>アクティブプロジェクト</StatLabel>
            <StatValue>24</StatValue>
          </StatItem>
        </PanelSection>

        <PanelSection>
          <PanelTitle>💡 操作ヒント</PanelTitle>
          <div style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.6' }}>
            • <strong>ドラッグ</strong>: 視点を回転<br/>
            • <strong>スクロール</strong>: ズームイン/アウト<br/>
            • <strong>ホバー</strong>: ノード詳細を表示<br/>
            • <strong>フィルター</strong>: 表示するノードタイプを選択
          </div>
        </PanelSection>
      </BottomPanel>

      <Tooltip 
        x={mousePosition.x + 15} 
        y={mousePosition.y - 60} 
        visible={!!hoveredNode}
      >
        {hoveredNode && (
          <>
            <TooltipTitle>{hoveredNode.name}</TooltipTitle>
            <TooltipContent>
              {hoveredNode.description}<br/>
              接続数: {hoveredNode.connections}
            </TooltipContent>
          </>
        )}
      </Tooltip>
    </Container>
  );
};

export default NetworkVisualizationPage;