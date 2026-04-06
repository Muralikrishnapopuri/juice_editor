import { useState } from 'react';
import { useEditorStore } from '../../../store/useEditorStore';
import { LANGUAGES, LANGUAGE_LIST } from '../../../utils/constants';
import styles from './Toolbar.module.css';

export default function Toolbar({ onRun, onExport, onShare, onNewTab }) {
  const { language, setLanguage, isRunning } = useEditorStore();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentLang = LANGUAGES[language];

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🧃</span>
          <span className={styles.logoText}>Juice</span>
        </div>

        <div className={styles.divider} />

        {/* Language selector */}
        <div className={styles.langSelector}>
          <button
            className={styles.langBtn}
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            <span>{currentLang?.icon}</span>
            <span>{currentLang?.label || language}</span>
            <span className={styles.chevron}>▾</span>
          </button>

          {showLangMenu && (
            <>
              <div className={styles.backdrop} onClick={() => setShowLangMenu(false)} />
              <div className={styles.langMenu}>
                {LANGUAGE_LIST.map((lang) => (
                  <button
                    key={lang.id}
                    className={`${styles.langMenuItem} ${lang.id === language ? styles.active : ''}`}
                    onClick={() => {
                      setLanguage(lang.id);
                      setShowLangMenu(false);
                    }}
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.label}</span>
                    {lang.runLocally && <span className={styles.localBadge}>local</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* New tab */}
        <button className={styles.iconBtn} onClick={onNewTab} title="New Tab (Ctrl+N)">
          +
        </button>
      </div>

      <div className={styles.right}>
        {/* Export */}
        <button className={styles.actionBtn} onClick={onExport} title="Export (Ctrl+E)">
          📤 Export
        </button>

        {/* Share */}
        <button className={styles.actionBtn} onClick={onShare} title="Share via Email">
          📧 Share
        </button>

        {/* Run button */}
        <button
          className={`${styles.runBtn} ${isRunning ? styles.running : ''}`}
          onClick={onRun}
          disabled={isRunning}
          title="Run Code (Ctrl+Enter)"
        >
          {isRunning ? (
            <>
              <span className={styles.spinner} /> Running...
            </>
          ) : (
            <>▶ Run</>
          )}
        </button>
      </div>
    </div>
  );
}
