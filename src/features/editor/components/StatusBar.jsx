import { useEditorStore } from '../../../store/useEditorStore';
import { LANGUAGES } from '../../../utils/constants';
import styles from './StatusBar.module.css';

export default function StatusBar() {
  const { code, language } = useEditorStore();
  const lang = LANGUAGES[language];

  const lineCount = code.split('\n').length;
  const charCount = code.length;

  return (
    <div className={styles.statusBar}>
      <div className={styles.left}>
        <span className={styles.item}>
          {lang?.icon} {lang?.label || language}
        </span>
        <span className={styles.item}>
          Ln {lineCount}, Ch {charCount}
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.item}>UTF-8</span>
        <span className={styles.item}>Spaces: 2</span>
        <span className={styles.juice}>Juice Editor 🧃</span>
      </div>
    </div>
  );
}
