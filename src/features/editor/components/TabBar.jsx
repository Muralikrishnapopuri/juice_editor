import { useEditorStore } from '../../../store/useEditorStore';
import styles from './TabBar.module.css';

export default function TabBar() {
  const { tabs, activeTabId, switchTab, closeTab } = useEditorStore();

  return (
    <div className={styles.tabBar}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTabId ? styles.active : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            <span className={styles.tabName}>{tab.name}</span>
            {tabs.length > 1 && (
              <button
                className={styles.closeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                title="Close tab"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
