// src/components/Header.tsx
import React from 'react';

const Header: React.FC<{ onHome: () => void; onHowTo: () => void }> = ({ onHome, onHowTo }) => (
  <header className="header">
    <div className="header-logo" onClick={onHome}>
      <div className="header-logo-icon">AM</div>
      <span className="header-title">Amir's Memory Game</span>
    </div>
    <nav className="header-nav">
      <button onClick={onHome}>Accueil</button>
      <button onClick={onHowTo}>Comment jouer</button>
    </nav>
  </header>
);

export default Header;
