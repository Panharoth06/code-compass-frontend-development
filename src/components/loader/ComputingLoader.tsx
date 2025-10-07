import React from 'react';
import styled from 'styled-components';

const ComputingLoader = () => {
  const digits = Array.from({ length: 36 }, () => Math.round(Math.random()));

  return (
    <StyledWrapper>
      <div className="ai-matrix-loader">
        {digits.map((digit, index) => (
          <div
            className="digit"
            key={index}
            style={{
              animationDelay: `${Math.random() * 2}s`, // random delay
              animationDuration: `${1.5 + Math.random() * 2}s` // random speed
            }}
          >
            {digit}
          </div>
        ))}
        <div className="glow" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ai-matrix-loader {
    width: 240px;
    height: 220px;
    margin: 30px auto;
    position: relative;
    perspective: 800px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 5px;
  }

  .digit {
    color: #00ff88;
    font-family: monospace;
    font-size: 18px;
    text-align: center;
    text-shadow: 0 0 5px #00ff88;
    animation: matrix-fall linear infinite, matrix-flicker 0.5s infinite;
    opacity: 0;
  }

  .glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
    animation: matrix-pulse 2s infinite;
  }

  @keyframes matrix-fall {
    0% {
      transform: translateY(-50px) rotateX(90deg);
      opacity: 0;
    }
    20%,
    80% {
      transform: translateY(0) rotateX(0deg);
      opacity: 0.8;
    }
    100% {
      transform: translateY(50px) rotateX(-90deg);
      opacity: 0;
    }
  }

  @keyframes matrix-flicker {
    0%, 19%, 21%, 100% { opacity: 0.8; }
    20% { opacity: 0.2; }
  }

  @keyframes matrix-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }
`;

export default ComputingLoader;
