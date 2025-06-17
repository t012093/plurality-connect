import React, { useState } from 'react';
import styled from 'styled-components';
import { Project } from '../../pages/FundingFlowPage';

const TableContainer = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border-top: 1px solid rgba(51, 65, 85, 0.3);
  padding: 30px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TableTitle = styled.h3`
  color: #f1f5f9;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TableControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchInput = styled.input`
  background: rgba(51, 65, 85, 0.5);
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #cbd5e1;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  width: 200px;
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
  
  &::placeholder {
    color: #64748b;
  }
`;

const SortButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const Table = styled.div`
  background: rgba(51, 65, 85, 0.3);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(71, 85, 105, 0.3);
`;

const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 120px;
  gap: 20px;
  padding: 16px 20px;
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
`;

const TableHeaderCell = styled.div`
  color: #f1f5f9;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableRow = styled.div<{ clickable?: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 120px;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid rgba(71, 85, 105, 0.2);
  transition: all 0.3s ease;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:hover {
    background: rgba(51, 65, 85, 0.4);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProjectName = styled.div`
  color: #f1f5f9;
  font-size: 15px;
  font-weight: 600;
`;

const ProjectCategory = styled.div`
  color: #64748b;
  font-size: 13px;
`;

const ProjectStakeholders = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

const StakeholderBadge = styled.div<{ color: string }>`
  background: ${props => props.color}20;
  color: ${props => props.color};
  border: 1px solid ${props => props.color}40;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
`;

const AmountCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Amount = styled.div`
  color: #f1f5f9;
  font-size: 15px;
  font-weight: 600;
`;

const AmountLabel = styled.div`
  color: #64748b;
  font-size: 11px;
`;

const ProgressCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(71, 85, 105, 0.3);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percentage: number; color: string }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => props.color};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 600;
`;

const StatusBadge = styled.div<{ status: 'active' | 'warning' | 'completed' | 'paused' }>`
  background: ${props => {
    switch (props.status) {
      case 'active': return 'rgba(16, 185, 129, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      case 'completed': return 'rgba(6, 182, 212, 0.2)';
      case 'paused': return 'rgba(100, 116, 139, 0.2)';
      default: return 'rgba(51, 65, 85, 0.3)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'completed': return '#06b6d4';
      case 'paused': return '#64748b';
      default: return '#cbd5e1';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'active': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'completed': return '#06b6d4';
      case 'paused': return '#64748b';
      default: return 'rgba(71, 85, 105, 0.5)';
    }
  }};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid rgba(71, 85, 105, 0.5);
  color: #cbd5e1;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(71, 85, 105, 0.3);
`;

const PaginationInfo = styled.div`
  color: #64748b;
  font-size: 14px;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
`;

const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'rgba(51, 65, 85, 0.5)'};
  border: 1px solid ${props => props.active ? '#06b6d4' : 'rgba(71, 85, 105, 0.5)'};
  color: ${props => props.disabled ? '#64748b' : props.active ? '#06b6d4' : '#cbd5e1'};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(6, 182, 212, 0.2);
    color: #06b6d4;
    border-color: #06b6d4;
  }
`;

interface ProjectFundingTableProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectFundingTable: React.FC<ProjectFundingTableProps> = ({
  projects,
  onProjectClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'amount' | 'progress' | 'status'>('progress');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const stakeholderColors = {
    government: '#ef4444',
    business: '#3b82f6',
    npo: '#10b981',
    citizen: '#8b5cf6',
    academic: '#f59e0b'
  };

  const stakeholderLabels = {
    government: '自治体',
    business: '企業',
    npo: 'NPO',
    citizen: '市民',
    academic: '学術'
  };

  const statusLabels = {
    active: '🟢 順調',
    warning: '🟡 要注意',
    completed: '🔵 完了',
    paused: '⚪ 一時停止'
  };

  const formatCurrency = (amount: number) => {
    return `¥${(amount / 1000000).toFixed(1)}M`;
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let valueA: any, valueB: any;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'amount':
        valueA = a.targetAmount;
        valueB = b.targetAmount;
        break;
      case 'progress':
        valueA = a.progressRate;
        valueB = b.progressRate;
        break;
      case 'status':
        valueA = a.status;
        valueB = b.status;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = sortedProjects.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: typeof sortBy) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>
          💼 プロジェクト別資金状況
        </TableTitle>
        <TableControls>
          <SearchInput
            type="text"
            placeholder="プロジェクト検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SortButton 
            active={sortBy === 'progress'} 
            onClick={() => handleSort('progress')}
          >
            進捗順
          </SortButton>
          <SortButton 
            active={sortBy === 'amount'} 
            onClick={() => handleSort('amount')}
          >
            金額順
          </SortButton>
        </TableControls>
      </TableHeader>

      <Table>
        <TableHeaderRow>
          <TableHeaderCell>プロジェクト情報</TableHeaderCell>
          <TableHeaderCell>調達額</TableHeaderCell>
          <TableHeaderCell>支出額</TableHeaderCell>
          <TableHeaderCell>進捗率</TableHeaderCell>
          <TableHeaderCell>ステータス</TableHeaderCell>
          <TableHeaderCell>操作</TableHeaderCell>
        </TableHeaderRow>

        {paginatedProjects.map((project) => (
          <TableRow key={project.id} clickable onClick={() => onProjectClick(project)}>
            <ProjectInfo>
              <ProjectName>{project.name}</ProjectName>
              <ProjectCategory>{project.category}</ProjectCategory>
              <ProjectStakeholders>
                {project.stakeholders.map(stakeholder => (
                  <StakeholderBadge
                    key={stakeholder}
                    color={stakeholderColors[stakeholder as keyof typeof stakeholderColors]}
                  >
                    {stakeholderLabels[stakeholder as keyof typeof stakeholderLabels]}
                  </StakeholderBadge>
                ))}
              </ProjectStakeholders>
            </ProjectInfo>

            <AmountCell>
              <Amount>{formatCurrency(project.raisedAmount)}</Amount>
              <AmountLabel>目標: {formatCurrency(project.targetAmount)}</AmountLabel>
            </AmountCell>

            <AmountCell>
              <Amount>{formatCurrency(project.spentAmount)}</Amount>
              <AmountLabel>残高: {formatCurrency(project.raisedAmount - project.spentAmount)}</AmountLabel>
            </AmountCell>

            <ProgressCell>
              <ProgressBar>
                <ProgressFill 
                  percentage={project.progressRate} 
                  color={project.status === 'warning' ? '#f59e0b' : '#10b981'}
                />
              </ProgressBar>
              <ProgressText>{project.progressRate}%</ProgressText>
            </ProgressCell>

            <StatusBadge status={project.status}>
              {statusLabels[project.status]}
            </StatusBadge>

            <ActionButton onClick={(e) => {
              e.stopPropagation();
              console.log('View details for', project.name);
            }}>
              📋
            </ActionButton>
          </TableRow>
        ))}
      </Table>

      <PaginationContainer>
        <PaginationInfo>
          {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedProjects.length)} / {sortedProjects.length} 件のプロジェクト
        </PaginationInfo>
        <PaginationControls>
          <PaginationButton 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← 前へ
          </PaginationButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PaginationButton
              key={page}
              active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationButton>
          ))}
          <PaginationButton 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            次へ →
          </PaginationButton>
        </PaginationControls>
      </PaginationContainer>
    </TableContainer>
  );
};

export default ProjectFundingTable;