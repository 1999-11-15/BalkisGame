// src/components/HowToPlay.tsx
import React from 'react';

const HowToPlay: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="howto-container">
    <h2>🕹 Comment jouer</h2>

    <div className="howto-step">
      <div className="howto-step-num">1</div>
      <div className="howto-step-text">
        <h3>Retournez une première carte</h3>
        <p>Cliquez sur n'importe quel carré parmi les 12 cartes pour le révéler.</p>
      </div>
    </div>

    <div className="howto-step">
      <div className="howto-step-num">2</div>
      <div className="howto-step-text">
        <h3>Choisissez une deuxième carte</h3>
        <p>Essayez de trouver la carte correspondante (ex. <em>Je</em> ↔ <em>serai</em>).</p>
      </div>
    </div>

    <div className="howto-step">
      <div className="howto-step-num">3</div>
      <div className="howto-step-text">
        <h3>Trouvez les 6 paires pour gagner&nbsp;!</h3>
        <p>Si les deux cartes correspondent ✅, elles restent visibles. Sinon ❌ elles se retournent après 1 seconde.</p>
      </div>
    </div>

    <div className="howto-step">
      <div className="howto-step-num">4</div>
      <div className="howto-step-text">
        <h3>Conjugaison du verbe ÊTRE — Futur simple</h3>
        <p>
          Associez les 6 pronoms avec leur forme au futur simple :<br/>
          • <strong>Je</strong> ↔ <strong>serai</strong><br/>
          • <strong>Tu</strong> ↔ <strong>seras</strong><br/>
          • <strong>Il / Elle</strong> ↔ <strong>sera</strong><br/>
          • <strong>Nous</strong> ↔ <strong>serons</strong><br/>
          • <strong>Vous</strong> ↔ <strong>serez</strong><br/>
          • <strong>Ils / Elles</strong> ↔ <strong>seront</strong>
        </p>
      </div>
    </div>

    <div className="howto-actions">
      <button className="btn-secondary" onClick={onBack}>← Retour</button>
      <button className="btn-primary" onClick={onBack}>🎮 Jouer maintenant</button>
    </div>
  </div>
);

export default HowToPlay;
