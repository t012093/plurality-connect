import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import ConnectPage from './pages/ConnectPage';
import ProjectDiscoveryPage from './pages/ProjectDiscoveryPage';
import SkillMatchingPage from './pages/SkillMatchingPage';
import NetworkVisualizationPage from './pages/NetworkVisualizationPage';
import FundingFlowPage from './pages/FundingFlowPage';
import PolicyKnowledgePage from './pages/PolicyKnowledgePage';
import PolicySummaryPage from './pages/PolicySummaryPage';
import DecisionPage from './pages/DecisionPage';
import GuidePage from './pages/GuidePage';
import './App.css';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ConnectPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/projects" element={<ProjectDiscoveryPage />} />
            <Route path="/skills" element={<SkillMatchingPage />} />
            <Route path="/network" element={<NetworkVisualizationPage />} />
            <Route path="/funding" element={<FundingFlowPage />} />
            <Route path="/policy" element={<PolicyKnowledgePage />} />
            <Route path="/policy-summary" element={<PolicySummaryPage />} />
            <Route path="/decision" element={<DecisionPage />} />
            <Route path="/guide" element={<GuidePage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
