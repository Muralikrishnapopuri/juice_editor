import { useRef, useEffect } from 'react';
import styles from './OutputPanel.module.css';

export default function OutputPanel({ output, isRunning, onClear }) {
  const outputRef = useRef(null);

  // Auto-scroll to bottom when new output arrives
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className={styles.outputPanel}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}>⚡</span>
          <span className={styles.headerTitle}>Output</span>
          {isRunning && (
            <span className={styles.runningBadge}>
              <span className={styles.runningDot} />
              Running...
            </span>
          )}
        </div>
        <button className={styles.clearBtn} onClick={onClear} title="Clear output">
          ✕
        </button>
      </div>

      <pre className={styles.output} ref={outputRef}>
        {output ? (
          <code>{output}</code>
        ) : (
          <span className={styles.placeholder}>
            {isRunning ? 'Executing...' : 'Run your code to see output here ↵'}
          </span>
        )}
      </pre>
    </div>
  );
}
