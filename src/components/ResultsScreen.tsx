// src/components/ResultsScreen.tsx
import React from 'react';
import type { GameResult } from '../App';

interface Props {
  result: GameResult | null;
  onPlayAgain: () => void;
  onHome: () => void;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' + sec : sec}`;
}

const ResultsScreen: React.FC<Props> = ({ result, onPlayAgain, onHome }) => {
  if (!result) return null;
  const accuracy = result.attempts ? ((result.matches / result.attempts) * 100).toFixed(0) : '0';

  return (
    <div className="results-container">
      <span className="confetti-emoji">🎉</span>
      <div className="results-title">Bravo&nbsp;!</div>
      <p className="results-subtitle">Vous avez trouvé toutes les paires&nbsp;!</p>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">⭐ Score</span>
          <span className="stat-value">{result.score}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">⏱ Temps</span>
          <span className="stat-value">{fmt(result.elapsedSeconds)}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">🎯 Essais</span>
          <span className="stat-value">{result.attempts}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">✅ Précision</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onPlayAgain}>🔄 Rejouer</button>
        <button className="btn-secondary" onClick={onHome}>🏠 Accueil</button>
      </div>
    </div>
  );
};

export default ResultsScreen;
