// src/components/GameScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Settings, GameResult } from '../App';
import GameBoard from './GameBoard';
import GameTimer from './GameTimer';
import GameScore from './GameScore';

interface Props { settings: Settings; onFinish: (r: GameResult) => void; }

const MODE_TITLES: Record<string, string> = {
  etre:      'Conjugaison du verbe ÊTRE — Futur simple',
  avoir:     'Conjugaison du verbe AVOIR — Futur simple',
  identical: 'Jeu de mémoire — Cartes identiques',
};

const GameScreen: React.FC<Props> = ({ settings, onFinish }) => {
  const [matches,  setMatches]  = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [score,    setScore]    = useState(0);
  const elapsedRef              = useRef(0);

  // Pour les modes éducatifs, c'est toujours exactement 6 paires (12 cartes)
  const totalPairs = settings.mode === 'etre' || settings.mode === 'avoir' ? 6 : 6;
  const progress   = totalPairs > 0 ? Math.round((matches / totalPairs) * 100) : 0;

  const handleMatch = (matched: boolean) => {
    setAttempts(a => a + 1);
    if (matched) {
      setMatches(m => m + 1);
      setScore(s => s + 10);
    }
  };

  useEffect(() => {
    if (matches > 0 && matches === totalPairs) {
      setTimeout(() => {
        onFinish({
          matches,
          attempts,
          score,
          difficulty: settings.difficulty,
          mode: settings.mode,
          elapsedSeconds: elapsedRef.current,
        });
      }, 700);
    }
  }, [matches, totalPairs]);

  return (
    <div className="game-container">
      {/* Exercise Title Header */}
      <div className="exercise-title-banner">
        <h2>{MODE_TITLES[settings.mode] || MODE_TITLES.etre}</h2>
        <span className="exercise-subtitle">Trouvez les 6 paires correspondantes (12 cartes)</span>
      </div>

      {/* HUD bar */}
      <div className="game-hud">
        <GameTimer elapsedRef={elapsedRef} />

        <div className="hud-divider" />

        <GameScore score={score} />

        <div className="hud-divider" />

        <div className="hud-item">
          <span className="hud-label">🎯 Essais</span>
          <span className="hud-value">{attempts}</span>
        </div>

        <div className="hud-divider" />

        <div className="progress-bar-wrap">
          <span className="hud-label">✅ {matches}/{totalPairs} paires trouvées</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Card grid (12 cartes) */}
      <GameBoard settings={settings} onMatch={handleMatch} totalPairs={totalPairs} />
    </div>
  );
};

export default GameScreen;
