// src/components/GameBoard.tsx
import React, { useState, useEffect } from 'react';
import type { Settings } from '../App';
import MemoryCard, { type CardTheme } from './MemoryCard';

interface Props {
  settings: Settings;
  onMatch: (matched: boolean) => void;
  totalPairs: number;
}

interface CardData {
  uuid: string;
  id: number;
  content: string;
  pairId: number;
  subLabel?: string;
  theme: CardTheme;
}

// 6 magnifiques thèmes distincts pour chacune des 6 paires
export const COLOR_THEMES: CardTheme[] = [
  {
    name: 'bleu-royal',
    bg: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#3b82f6',
    text: '#1e40af',
    glow: 'rgba(59, 130, 246, 0.35)',
    badgeBg: '#3b82f6',
  },
  {
    name: 'violet-améthyste',
    bg: 'linear-gradient(145deg, #faf5ff 0%, #ede9fe 100%)',
    border: '#8b5cf6',
    text: '#6d28d9',
    glow: 'rgba(139, 92, 246, 0.35)',
    badgeBg: '#8b5cf6',
  },
  {
    name: 'émeraude',
    bg: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '#10b981',
    text: '#047857',
    glow: 'rgba(16, 185, 129, 0.35)',
    badgeBg: '#10b981',
  },
  {
    name: 'ambre-or',
    bg: 'linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)',
    border: '#f59e0b',
    text: '#b45309',
    glow: 'rgba(245, 158, 11, 0.35)',
    badgeBg: '#f59e0b',
  },
  {
    name: 'rose-framboise',
    bg: 'linear-gradient(145deg, #fff1f2 0%, #ffe4e6 100%)',
    border: '#f43f5e',
    text: '#be123c',
    glow: 'rgba(244, 63, 94, 0.35)',
    badgeBg: '#f43f5e',
  },
  {
    name: 'turquoise-cyan',
    bg: 'linear-gradient(145deg, #f0fdfa 0%, #ccfbf1 100%)',
    border: '#06b6d4',
    text: '#0e7490',
    glow: 'rgba(6, 182, 212, 0.35)',
    badgeBg: '#06b6d4',
  },
];

// Verbe ÊTRE au futur simple — EXACTEMENT LES 6 PAIRES (12 CARTES)
const ETRE_PAIRS = [
  ['Je',          'serai'],
  ['Tu',          'seras'],
  ['Il / Elle',   'sera'],
  ['Nous',        'serons'],
  ['Vous',        'serez'],
  ['Ils / Elles', 'seront'],
];

// Verbe AVOIR au futur simple — EXACTEMENT LES 6 PAIRES (12 CARTES)
const AVOIR_PAIRS = [
  ['Je',          'aurai'],
  ['Tu',          'auras'],
  ['Il / Elle',   'aura'],
  ['Nous',        'aurons'],
  ['Vous',        'aurez'],
  ['Ils / Elles', 'auront'],
];

// Cartes identiques
const WORDS = [
  '🍎 Pomme',
  '🍌 Banane',
  '🍒 Cerise',
  '🥭 Mangue',
  '🍊 Orange',
  '🍑 Pêche',
  '🍇 Raisin',
  '🍋 Citron',
];

function buildIdentical(count: number): CardData[] {
  const items: CardData[] = [];
  for (let i = 0; i < count; i++) {
    const label = WORDS[i % WORDS.length];
    const theme = COLOR_THEMES[i % COLOR_THEMES.length];
    items.push({
      uuid: `id-${i}-a`,
      id: i * 2,
      content: label,
      pairId: i,
      subLabel: 'Paire',
      theme,
    });
    items.push({
      uuid: `id-${i}-b`,
      id: i * 2 + 1,
      content: label,
      pairId: i,
      subLabel: 'Paire',
      theme,
    });
  }
  return items;
}

function buildPronounPairs(source: string[][]): CardData[] {
  const items: CardData[] = [];
  source.forEach(([pronoun, conjugation], idx) => {
    const theme = COLOR_THEMES[idx % COLOR_THEMES.length];
    items.push({
      uuid: `${idx}-p`,
      id: idx * 2,
      content: pronoun,
      pairId: idx,
      subLabel: 'Pronom',
      theme,
    });
    items.push({
      uuid: `${idx}-c`,
      id: idx * 2 + 1,
      content: conjugation,
      pairId: idx,
      subLabel: 'Futur',
      theme,
    });
  });
  return items;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GameBoard: React.FC<Props> = ({ settings, onMatch, totalPairs }) => {
  const [cards, setCards]     = useState<CardData[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [locked, setLocked]   = useState(false);

  useEffect(() => {
    let raw: CardData[];
    if (settings.mode === 'etre') {
      raw = buildPronounPairs(ETRE_PAIRS); // Exactement 12 cartes
    } else if (settings.mode === 'avoir') {
      raw = buildPronounPairs(AVOIR_PAIRS); // Exactement 12 cartes
    } else {
      raw = buildIdentical(totalPairs);
    }
    // Mélange aléatoire des 12 cartes
    setCards(shuffle(raw));
    setFlipped([]);
    setMatched(new Set());
    setLocked(false);
  }, [settings, totalPairs]);

  const handleClick = (id: number) => {
    if (locked || flipped.includes(id) || matched.has(id)) return;

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      const [a, b] = next;
      const ca = cards.find(c => c.id === a)!;
      const cb = cards.find(c => c.id === b)!;
      const isMatch = ca.pairId === cb.pairId;

      setTimeout(() => {
        if (isMatch) setMatched(prev => new Set(prev).add(a).add(b));
        setFlipped([]);
        setLocked(false);
        onMatch(isMatch);
      }, settings.animations ? 1000 : 300);
    }
  };

  return (
    <div className="game-board-container">
      <div className="game-board grid-12-cards">
        {cards.map(card => (
          <MemoryCard
            key={card.uuid}
            id={card.id}
            content={card.content}
            subLabel={card.subLabel}
            theme={card.theme}
            isFlipped={flipped.includes(card.id)}
            isMatched={matched.has(card.id)}
            onClick={handleClick}
            disableClick={locked}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
