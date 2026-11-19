// src/components/GameScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Settings, GameResult } from '../App';
import GameBoard from './GameBoard';
import GameTimer from './GameTimer';
import GameScore from './GameScore';

interface Props { settings: Settings; onFinish: (r: GameResult) => void; }

// Easy=4, Medium=6, Hard=8 (8 covers all 8 pronoun pairs)
const TOTAL_PAIRS: Record<string, number> = { easy: 4, medium: 6, hard: 8 };

const MODE_LABELS: Record<string, string> = {
  identical: '🔤 Cartes identiques',
  etre:      '📗 Verbe ÊTRE au futur simple',
  avoir:     '📘 Verbe AVOIR au futur simple',
};

const GameScreen: React.FC<Props> = ({ settings, onFinish }) => {
  const [matches,  setMatches]  = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [score,    setScore]    = useState(0);
  const elapsedRef              = useRef(0);

  const totalPairs = TOTAL_PAIRS[settings.difficulty];
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
  }, [matches]);

  return (
    <div className="game-container">
      {/* HUD bar */}
      <div className="game-hud">
        <div className="hud-item" style={{ flex: 1 }}>
          <span className="hud-label">📌 Mode</span>
          <span className="hud-value" style={{ fontSize: 13 }}>{MODE_LABELS[settings.mode]}</span>
        </div>

        <div className="hud-divider" />

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
          <span className="hud-label">✅ {matches}/{totalPairs} paires</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Card grid */}
      <GameBoard settings={settings} onMatch={handleMatch} totalPairs={totalPairs} />
    </div>
  );
};

export default GameScreen;
