/**
 * Executes JavaScript code inside a sandboxed iframe.
 * Captures console.log/warn/error output and returns it.
 * Includes a timeout to prevent infinite loops.
 */
export function executeSandboxedJS(code, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.sandbox = 'allow-scripts';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const logs = [];
    let resolved = false;

    const handler = (event) => {
      if (event.source !== iframe.contentWindow) return;

      const { type, payload } = event.data;
      if (type === 'log')   logs.push(payload);
      if (type === 'warn')  logs.push(`⚠ ${payload}`);
      if (type === 'error') logs.push(`❌ ${payload}`);
      if (type === 'done') {
        cleanup();
        resolve(logs.join('\n'));
      }
    };

    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      window.removeEventListener('message', handler);
      clearTimeout(timer);
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    };

    window.addEventListener('message', handler);

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('⏱ Execution timed out (possible infinite loop)'));
    }, timeoutMs);

    const script = `
      <script>
        console.log   = (...args) => parent.postMessage({ type: 'log',   payload: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') }, '*');
        console.warn  = (...args) => parent.postMessage({ type: 'warn',  payload: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') }, '*');
        console.error = (...args) => parent.postMessage({ type: 'error', payload: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') }, '*');
        console.info  = console.log;
        console.table = (...args) => parent.postMessage({ type: 'log',   payload: JSON.stringify(args[0], null, 2) }, '*');

        try {
          ${code}
        } catch (e) {
          parent.postMessage({ type: 'error', payload: e.toString() }, '*');
        }

        parent.postMessage({ type: 'done' }, '*');
      <\/script>
    `;

    iframe.srcdoc = script;
  });
}
