// src/App.tsx
import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import HowToPlay from './components/HowToPlay';
import Footer from './components/Footer';

export type GameMode = 'etre' | 'avoir' | 'identical';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Settings {
  mode: GameMode;
  difficulty: Difficulty;
  sound: boolean;
  animations: boolean;
}

export interface GameResult {
  matches: number;
  attempts: number;
  score: number;
  difficulty: string;
  mode: string;
  elapsedSeconds: number;
}

const defaultSettings: Settings = {
  mode: 'etre',
  difficulty: 'medium', // 6 pairs = 12 cards
  sound: true,
  animations: true,
};

function App() {
  const [view, setView] = useState<'home' | 'game' | 'results' | 'howto'>('home');
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const startGame = (newSettings: Settings) => {
    setSettings(newSettings);
    setView('game');
  };

  const finishGame = (result: GameResult) => {
    setGameResult(result);
    setView('results');
  };

  return (
    <div id="root">
      <Header onHome={() => setView('home')} onHowTo={() => setView('howto')} />
      <main className="main-content">
        {view === 'home' && <Dashboard defaultSettings={defaultSettings} onStart={startGame} />}
        {view === 'game' && <GameScreen key={Date.now()} settings={settings} onFinish={finishGame} />}
        {view === 'results' && <ResultsScreen result={gameResult} onPlayAgain={() => setView('game')} onHome={() => setView('home')} />}
        {view === 'howto' && <HowToPlay onBack={() => setView('home')} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
