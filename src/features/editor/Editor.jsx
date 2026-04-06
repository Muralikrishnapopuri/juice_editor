import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Split from 'react-split';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '../../store/useEditorStore';
import { LANGUAGES } from '../../utils/constants';
import { generateTabId } from '../../utils/fileHelpers';
import { useCodeExecution } from './hooks/useCodeExecution';
import Toolbar from './components/Toolbar';
import TabBar from './components/TabBar';
import EditorPanel from './components/EditorPanel';
import OutputPanel from './components/OutputPanel';
import StatusBar from './components/StatusBar';
import toast from 'react-hot-toast';
import styles from './Editor.module.css';

const ExportModal = lazy(() => import('../export/ExportModal'));
const ShareModal = lazy(() => import('../export/ShareModal'));

export default function Editor() {
  const navigate = useNavigate();
  const { output, isRunning, clearOutput, language, addTab, setCode, setLanguage } = useEditorStore();
  const { runCode } = useCodeExecution();

  const [showExport, setShowExport] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = (e) => {
      // Ctrl+Enter — Run
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      // Ctrl+S — Save (prevent default)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        toast.success('Code saved to browser storage');
      }
      // Ctrl+E — Export
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        setShowExport(true);
      }
      // Ctrl+N — New tab
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        handleNewTab();
      }
      // Escape — Close modals
      if (e.key === 'Escape') {
        setShowExport(false);
        setShowShare(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [runCode]);

  // ── Load shared code from URL hash ──
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('code=')) {
      try {
        const params = new URLSearchParams(hash.slice(1));
        const encodedCode = params.get('code');
        const lang = params.get('lang');
        if (encodedCode) {
          const decoded = decodeURIComponent(atob(encodedCode));
          setCode(decoded);
          if (lang && LANGUAGES[lang]) {
            setLanguage(lang);
          }
          toast.success('Loaded shared code!');
          // Clean hash
          window.history.replaceState(null, '', '/editor');
        }
      } catch {
        // Ignore invalid hash
      }
    }
  }, []);

  const handleNewTab = useCallback(() => {
    const lang = LANGUAGES[language];
    const id = generateTabId();
    addTab({
      id,
      name: `untitled${lang?.extension || '.js'}`,
      language,
      code: lang?.defaultCode || '',
    });
  }, [language, addTab]);

  return (
    <div className={styles.editor}>
      {/* Toolbar */}
      <Toolbar
        onRun={runCode}
        onExport={() => setShowExport(true)}
        onShare={() => setShowShare(true)}
        onNewTab={handleNewTab}
      />

      {/* Tab bar */}
      <TabBar />

      {/* Main workspace — split editor + output */}
      <div className={styles.workspace}>
        <Split
          className={styles.split}
          sizes={[65, 35]}
          minSize={[200, 120]}
          gutterSize={4}
          direction="vertical"
          cursor="row-resize"
          gutterStyle={() => ({
            backgroundColor: 'var(--color-border)',
            cursor: 'row-resize',
          })}
        >
          <div className={styles.editorPane}>
            <EditorPanel />
          </div>
          <div className={styles.outputPane}>
            <OutputPanel
              output={output}
              isRunning={isRunning}
              onClear={clearOutput}
            />
          </div>
        </Split>
      </div>

      {/* Status bar */}
      <StatusBar />

      {/* Modals */}
      <Suspense fallback={null}>
        {showExport && <ExportModal onClose={() => setShowExport(false)} />}
        {showShare && <ShareModal onClose={() => setShowShare(false)} />}
      </Suspense>
    </div>
  );
}
