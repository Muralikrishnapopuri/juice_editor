import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { LANGUAGES } from './constants';

/**
 * Detect language from file extension
 */
export function detectLanguage(filename) {
  const ext = '.' + filename.split('.').pop().toLowerCase();
  return Object.values(LANGUAGES).find((l) => l.extension === ext)?.id || 'javascript';
}

/**
 * Get file extension for a language
 */
export function getExtension(language) {
  return LANGUAGES[language]?.extension || '.txt';
}

/**
 * Download code as a raw file
 */
export function downloadCodeFile(code, filename) {
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
}

/**
 * Export code as a styled PDF
 */
export function exportCodeAsPDF(code, language, filename = 'code.pdf') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const lang = LANGUAGES[language];
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const maxWidth = pageWidth - margin * 2;

  // Header
  doc.setFillColor(10, 10, 15);
  doc.rect(0, 0, pageWidth, 25, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(0, 255, 136);
  doc.text('Juice Editor 🧃', margin, 12);

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`${lang?.label || language} | ${new Date().toLocaleDateString()}`, margin, 20);

  // Code body
  doc.setFont('courier', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);

  const lines = code.split('\n');
  let y = 35;
  const lineHeight = 5;

  lines.forEach((line, i) => {
    if (y > 280) {
      doc.addPage();
      y = 15;
    }

    // Line number
    doc.setTextColor(160, 160, 160);
    doc.text(String(i + 1).padStart(4, ' '), margin, y);

    // Code
    doc.setTextColor(30, 30, 30);
    const textLines = doc.splitTextToSize(line || ' ', maxWidth - 15);
    textLines.forEach((tl) => {
      if (y > 280) {
        doc.addPage();
        y = 15;
      }
      doc.text(tl, margin + 15, y);
      y += lineHeight;
    });
  });

  doc.save(filename);
}

/**
 * Generate a unique tab ID
 */
export function generateTabId() {
  return `tab_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
