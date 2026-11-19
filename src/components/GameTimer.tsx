// src/components/GameTimer.tsx
import React, { useState, useEffect } from 'react';

interface Props {
  onTick?: (s: number) => void;
  elapsedRef?: React.MutableRefObject<number>;
}

const GameTimer: React.FC<Props> = ({ onTick, elapsedRef }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => {
        const next = s + 1;
        if (elapsedRef) elapsedRef.current = next;
        if (onTick) onTick(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return (
    <div className="hud-item">
      <span className="hud-label">⏱ Temps</span>
      <span className="hud-value">{m}:{s < 10 ? `0${s}` : s}</span>
    </div>
  );
};

export default GameTimer;
