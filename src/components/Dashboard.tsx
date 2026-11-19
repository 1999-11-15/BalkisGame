// src/components/Dashboard.tsx
import React, { useState } from 'react';
import type { Settings, GameMode, Difficulty } from '../App';

interface Props {
  defaultSettings: Settings;
  onStart: (s: Settings) => void;
}

const Dashboard: React.FC<Props> = ({ defaultSettings, onStart }) => {
  const [mode, setMode]             = useState<GameMode>(defaultSettings.mode);
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultSettings.difficulty);
  const [sound, setSound]           = useState(defaultSettings.sound);
  const [animations, setAnimations] = useState(defaultSettings.animations);

  const previewLeft  = mode === 'identical' ? '🍎 Pomme' : 'Je';
  const previewRight = mode === 'identical' ? '🍎 Pomme' : mode === 'etre' ? 'serai' : 'aurai';
  const previewSubLeft = mode === 'identical' ? 'Paire' : 'Pronom';
  const previewSubRight = mode === 'identical' ? 'Paire' : 'Futur';

  return (
    <div className="dashboard">
      <div className="dashboard-logo">AM</div>

      <h1>Amir's Memory Game</h1>
      <p>Retournez les cartes et trouvez les bonnes paires&nbsp;!</p>

      {/* Cartes d'aperçu colorées */}
      <div className="card-preview">
        <div className="preview-card preview-card-back">
          <span>✦</span>
        </div>
        <div className="preview-match">↔</div>
        <div className="preview-card preview-box-colored preview-card-blue">
          <span className="preview-mini-badge">{previewSubLeft}</span>
          <span className="preview-card-text">{previewLeft}</span>
        </div>
        <div className="preview-match">✓</div>
        <div className="preview-card preview-box-colored preview-card-purple">
          <span className="preview-mini-badge">{previewSubRight}</span>
          <span className="preview-card-text">{previewRight}</span>
        </div>
      </div>

      {/* Sélection du Mode avec des boîtes colorées */}
      <div className="settings-section">
        <label className="section-title">Mode de jeu</label>
        <div className="option-boxes-grid">
          <button
            type="button"
            className={`option-box box-mode-identical ${mode === 'identical' ? 'active' : ''}`}
            onClick={() => setMode('identical')}
          >
            <span className="box-icon">🔤</span>
            <div className="box-details">
              <strong>Identiques</strong>
              <span>Images & fruits</span>
            </div>
            {mode === 'identical' && <span className="box-check">✓</span>}
          </button>

          <button
            type="button"
            className={`option-box box-mode-etre ${mode === 'etre' ? 'active' : ''}`}
            onClick={() => setMode('etre')}
          >
            <span className="box-icon">📗</span>
            <div className="box-details">
              <strong>Verbe ÊTRE</strong>
              <span>Futur simple</span>
            </div>
            {mode === 'etre' && <span className="box-check">✓</span>}
          </button>

          <button
            type="button"
            className={`option-box box-mode-avoir ${mode === 'avoir' ? 'active' : ''}`}
            onClick={() => setMode('avoir')}
          >
            <span className="box-icon">📘</span>
            <div className="box-details">
              <strong>Verbe AVOIR</strong>
              <span>Futur simple</span>
            </div>
            {mode === 'avoir' && <span className="box-check">✓</span>}
          </button>
        </div>
      </div>

      {/* Sélection de la Difficulté avec des boîtes colorées */}
      <div className="settings-section">
        <label className="section-title">Difficulté</label>
        <div className="option-boxes-grid grid-3">
          <button
            type="button"
            className={`option-box box-diff-easy ${difficulty === 'easy' ? 'active' : ''}`}
            onClick={() => setDifficulty('easy')}
          >
            <span className="box-icon">🟢</span>
            <div className="box-details">
              <strong>Facile</strong>
              <span>4 paires</span>
            </div>
            {difficulty === 'easy' && <span className="box-check">✓</span>}
          </button>

          <button
            type="button"
            className={`option-box box-diff-medium ${difficulty === 'medium' ? 'active' : ''}`}
            onClick={() => setDifficulty('medium')}
          >
            <span className="box-icon">🟡</span>
            <div className="box-details">
              <strong>Moyen</strong>
              <span>6 paires</span>
            </div>
            {difficulty === 'medium' && <span className="box-check">✓</span>}
          </button>

          <button
            type="button"
            className={`option-box box-diff-hard ${difficulty === 'hard' ? 'active' : ''}`}
            onClick={() => setDifficulty('hard')}
          >
            <span className="box-icon">🔴</span>
            <div className="box-details">
              <strong>Difficile</strong>
              <span>8 paires</span>
            </div>
            {difficulty === 'hard' && <span className="box-check">✓</span>}
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="settings-toggles">
        <label className="toggle-item">
          <input type="checkbox" checked={sound} onChange={() => setSound(!sound)} />
          🔊 Sons
        </label>
        <label className="toggle-item">
          <input type="checkbox" checked={animations} onChange={() => setAnimations(!animations)} />
          ✨ Animations
        </label>
      </div>

      <button className="btn-primary" onClick={() => onStart({ mode, difficulty, sound, animations })}>
        🎮 Commencer à jouer
      </button>
    </div>
  );
};

export default Dashboard;
