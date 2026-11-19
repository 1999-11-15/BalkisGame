// src/components/HowToPlay.tsx
import React from 'react';

const HowToPlay: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="howto-container">
    <h2>🕹 Comment jouer</h2>

    <div className="howto-step">
      <div className="howto-step-num">1</div>
      <div className="howto-step-text">
        <h3>Retournez une première carte</h3>
        <p>Cliquez sur n'importe quelle carte pour la révéler.</p>
      </div>
    </div>

    <div className="howto-step">
      <div className="howto-step-num">2</div>
      <div className="howto-step-text">
        <h3>Choisissez une deuxième carte</h3>
        <p>Essayez de trouver la carte correspondante parmi les autres.</p>
      </div>
    </div>

    <div className="howto-step">
      <div className="howto-step-num">3</div>
      <div className="howto-step-text">
        <h3>Trouvez toutes les paires pour gagner&nbsp;!</h3>
        <p>Si les deux cartes correspondent ✅, elles restent visibles. Sinon ❌ elles se retournent.</p>
      </div>
    </div>

    <div className="howto-step">
      <div className="howto-step-num">4</div>
      <div className="howto-step-text">
        <h3>Mode Éducatif — Verbe ÊTRE</h3>
        <p>Associez le pronom (Je, Tu, Il…) avec la bonne conjugaison (serai, seras, sera…).</p>
      </div>
    </div>

    <div className="howto-actions">
      <button className="btn-secondary" onClick={onBack}>← Retour</button>
      <button className="btn-primary" onClick={onBack}>🎮 Jouer maintenant</button>
    </div>
  </div>
);

export default HowToPlay;
