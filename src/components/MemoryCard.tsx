// src/components/MemoryCard.tsx
import React from 'react';

export interface CardTheme {
  name: string;
  bg: string;
  border: string;
  text: string;
  glow: string;
  badgeBg: string;
}

export interface CardProps {
  id: number;
  content: string;
  subLabel?: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
  disableClick: boolean;
  theme?: CardTheme;
}

const MemoryCard: React.FC<CardProps> = ({
  id,
  content,
  subLabel,
  isFlipped,
  isMatched,
  onClick,
  disableClick,
  theme,
}) => {
  const handleClick = () => {
    if (!disableClick && !isFlipped && !isMatched) onClick(id);
  };

  const flipped = isFlipped || isMatched;

  // Default theme fallback
  const cardTheme = theme || {
    name: 'default',
    bg: 'linear-gradient(145deg, #ffffff 0%, #f3f4f6 100%)',
    border: '#6366f1',
    text: '#1e1b4b',
    glow: 'rgba(99, 102, 241, 0.35)',
    badgeBg: '#6366f1',
  };

  return (
    <div
      className={`card-wrapper${isMatched ? ' matched' : ''}${flipped ? ' flipped' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={flipped ? content : 'Carte retournée'}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        {/* Face cachée (dos de la carte) */}
        <div className="card-face card-back">
          <div className="card-back-pattern">
            <span className="card-back-icon">✦</span>
          </div>
        </div>

        {/* Face visible (contenu coloré) */}
        <div
          className="card-face card-front"
          style={{
            background: isMatched
              ? 'linear-gradient(145deg, #d1fae5 0%, #a7f3d0 100%)'
              : cardTheme.bg,
            borderColor: isMatched ? '#10b981' : cardTheme.border,
            boxShadow: isMatched
              ? '0 8px 24px rgba(16, 185, 129, 0.45)'
              : `0 8px 20px ${cardTheme.glow}`,
          }}
        >
          {subLabel && (
            <span
              className="card-sub-badge"
              style={{
                backgroundColor: isMatched ? '#10b981' : cardTheme.badgeBg,
              }}
            >
              {isMatched ? '✓ Trouvé' : subLabel}
            </span>
          )}

          <div
            className="card-text-content"
            style={{
              color: isMatched ? '#065f46' : cardTheme.text,
            }}
          >
            {content}
          </div>

          {isMatched && <span className="matched-sparkle">✨</span>}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
