import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'vs-dark',
      fontSize: 15,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      minimap: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      tabSize: 2,

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleMinimap: () => set((s) => ({ minimap: !s.minimap })),
      toggleWordWrap: () => set((s) => ({ wordWrap: s.wordWrap === 'on' ? 'off' : 'on' })),
      setTabSize: (tabSize) => set({ tabSize }),
    }),
    {
      name: 'juice-editor-settings',
    }
  )
);
