import { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { LANGUAGES } from '../../utils/constants';
import toast from 'react-hot-toast';
import styles from './ShareModal.module.css';

export default function ShareModal({ onClose }) {
  const { code, language } = useEditorStore();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleMailto = () => {
    const lang = LANGUAGES[language]?.label || language;
    const subject = encodeURIComponent(`Juice Editor — ${lang} Code`);
    const body = encodeURIComponent(
      `Check out this code I wrote in Juice Editor!\n\nLanguage: ${lang}\n\n--- Code ---\n${code}\n--- End ---\n\nShared via Juice Editor 🧃`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    toast.success('Opening email client...');
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      // Encode code into a shareable URL hash
      const encoded = btoa(encodeURIComponent(code));
      const url = `${window.location.origin}/editor#code=${encoded}&lang=${language}`;

      if (url.length > 2000) {
        // If too long, just copy the code
        await navigator.clipboard.writeText(code);
        toast.success('Code copied to clipboard (too large for URL)');
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Shareable link copied!');
      }
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>📧 Share Code</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <p className={styles.desc}>
            Share your code snippet via email or a shareable link.
          </p>

          {/* Email option */}
          <label className={styles.label}>Recipient Email</label>
          <div className={styles.emailRow}>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="friend@example.com"
            />
            <button
              className={styles.sendBtn}
              onClick={handleMailto}
              disabled={!email}
            >
              Send →
            </button>
          </div>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          {/* Copy shareable link */}
          <button className={styles.linkBtn} onClick={handleCopyLink}>
            🔗 Copy Shareable Link
          </button>

          <p className={styles.note}>
            💡 The mailto: method opens your default email client. For automated sending, configure EmailJS with your own service ID.
          </p>
        </div>
      </div>
    </div>
  );
}
