const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

const RUNTIMES = {
  python:     { language: 'python',     version: '3.10.0' },
  cpp:        { language: 'c++',        version: '10.2.0' },
  java:       { language: 'java',       version: '15.0.2' },
  go:         { language: 'go',         version: '1.16.2' },
  rust:       { language: 'rust',       version: '1.68.2' },
  typescript: { language: 'typescript', version: '5.0.3'  },
  csharp:     { language: 'csharp',     version: '6.12.0' },
  ruby:       { language: 'ruby',       version: '3.0.1'  },
  php:        { language: 'php',        version: '8.2.3'  },
};

/**
 * Execute code via the Piston API (free, no API key).
 * @param {string} language - e.g. 'python', 'cpp', 'java'
 * @param {string} code - source code
 * @returns {Promise<string>} - stdout + stderr
 */
export async function executeWithPiston(language, code) {
  const runtime = RUNTIMES[language];
  if (!runtime) throw new Error(`Unsupported language: ${language}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ content: code }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const { run } = data;

    return [run.stdout, run.stderr].filter(Boolean).join('\n') || '(no output)';
  } finally {
    clearTimeout(timeout);
  }
}

export function getSupportedLanguages() {
  return Object.keys(RUNTIMES);
}

export function isPistonLanguage(lang) {
  return lang in RUNTIMES;
}
