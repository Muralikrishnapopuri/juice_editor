import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Landing = lazy(() => import('./features/landing/Landing'));
const Editor = lazy(() => import('./features/editor/Editor'));

function LoadingScreen() {
  return (
    <div className="loader">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{
          fontSize: '3rem',
          animation: 'float 2s ease-in-out infinite',
        }}>
          🧃
        </div>
        <span style={{ color: 'var(--color-text-muted)' }}>Loading Juice Editor...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
          },
        }}
      />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
