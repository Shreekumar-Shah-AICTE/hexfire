import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { Dashboard } from './components/Dashboard';

function App() {
  const [view, setView] = useState<'hero' | 'dashboard'>('hero');

  return (
    <div className="app hex-grid-bg hex-pattern" style={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>
      {view === 'hero' ? (
        <HeroSection onStart={() => setView('dashboard')} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
