import { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { LANGUAGES } from '../../utils/constants';
import { downloadCodeFile, exportCodeAsPDF, getExtension } from '../../utils/fileHelpers';
import toast from 'react-hot-toast';
import styles from './ExportModal.module.css';

export default function ExportModal({ onClose }) {
  const { code, language, tabs, activeTabId } = useEditorStore();
  const [filename, setFilename] = useState(() => {
    const tab = tabs.find((t) => t.id === activeTabId);
    return tab?.name || `code${getExtension(language)}`;
  });

  const handleDownloadFile = () => {
    try {
      downloadCodeFile(code, filename);
      toast.success(`Downloaded ${filename}`);
      onClose();
    } catch (err) {
      toast.error('Failed to download file');
    }
  };

  const handleExportPDF = () => {
    try {
      const pdfName = filename.replace(/\.[^.]+$/, '.pdf');
      exportCodeAsPDF(code, language, pdfName);
      toast.success(`Exported ${pdfName}`);
      onClose();
    } catch (err) {
      toast.error('Failed to export PDF');
    }
  };

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>📤 Export Code</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          {/* Filename input */}
          <label className={styles.label}>Filename</label>
          <input
            type="text"
            className={styles.input}
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="main.js"
          />

          <div className={styles.info}>
            <span>Language: {LANGUAGES[language]?.label || language}</span>
            <span>Lines: {code.split('\n').length}</span>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.actionCard} onClick={handleDownloadFile}>
              <span className={styles.actionIcon}>📄</span>
              <span className={styles.actionLabel}>Download File</span>
              <span className={styles.actionDesc}>Save as {getExtension(language)}</span>
            </button>

            <button className={styles.actionCard} onClick={handleExportPDF}>
              <span className={styles.actionIcon}>📕</span>
              <span className={styles.actionLabel}>Export PDF</span>
              <span className={styles.actionDesc}>Styled code document</span>
            </button>

            <button className={styles.actionCard} onClick={handleCopyClipboard}>
              <span className={styles.actionIcon}>📋</span>
              <span className={styles.actionLabel}>Copy to Clipboard</span>
              <span className={styles.actionDesc}>Quick copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
