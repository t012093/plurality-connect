import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    min-height: 100vh;
    color: #f1f5f9;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
  }

  .App {
    min-height: 100vh;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }

  @keyframes bridgePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
    50% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes pulse-line {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @keyframes dataFlow {
    0% { transform: translateY(-100px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(300px); opacity: 0; }
  }
`;