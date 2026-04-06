import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEditorStore = create(
  persist(
    (set, get) => ({
      // ── State ──
      code: '// Welcome to Juice Editor! 🧃\nconsole.log("Hello, World!");\n',
      language: 'javascript',
      output: '',
      isRunning: false,
      tabs: [
        { id: 'main', name: 'main.js', language: 'javascript', code: '// Welcome to Juice Editor! 🧃\nconsole.log("Hello, World!");\n' },
      ],
      activeTabId: 'main',

      // ── Actions ──
      setCode: (code) => {
        const { activeTabId, tabs } = get();
        set({
          code,
          tabs: tabs.map((t) =>
            t.id === activeTabId ? { ...t, code } : t
          ),
        });
      },

      setLanguage: (language) => set({ language }),
      setOutput: (output) => set({ output }),
      appendOutput: (line) => set((state) => ({ output: state.output + line + '\n' })),
      clearOutput: () => set({ output: '' }),
      setIsRunning: (isRunning) => set({ isRunning }),

      addTab: (tab) =>
        set((state) => ({
          tabs: [...state.tabs, tab],
          activeTabId: tab.id,
          code: tab.code || '',
          language: tab.language,
        })),

      closeTab: (id) =>
        set((state) => {
          const remaining = state.tabs.filter((t) => t.id !== id);
          if (remaining.length === 0) return state; // don't close last tab
          const needSwitch = state.activeTabId === id;
          const newActive = needSwitch
            ? remaining[remaining.length - 1]
            : remaining.find((t) => t.id === state.activeTabId);
          return {
            tabs: remaining,
            activeTabId: newActive.id,
            code: needSwitch ? newActive.code || '' : state.code,
            language: needSwitch ? newActive.language : state.language,
          };
        }),

      switchTab: (id) =>
        set((state) => {
          const tab = state.tabs.find((t) => t.id === id);
          if (!tab) return state;
          return {
            activeTabId: id,
            code: tab.code || '',
            language: tab.language,
          };
        }),
    }),
    {
      name: 'juice-editor-state',
      partialize: (state) => ({
        code: state.code,
        language: state.language,
        tabs: state.tabs,
        activeTabId: state.activeTabId,
      }),
    }
  )
);
