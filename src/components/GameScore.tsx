// src/components/GameScore.tsx
import React from 'react';

const GameScore: React.FC<{ score: number }> = ({ score }) => (
  <div className="hud-item">
    <span className="hud-label">⭐ Score</span>
    <span className="hud-value">{score}</span>
  </div>
);

export default GameScore;
