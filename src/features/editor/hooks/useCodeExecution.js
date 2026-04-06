import { useCallback } from 'react';
import { useEditorStore } from '../../../store/useEditorStore';
import { executeSandboxedJS } from '../../../utils/sandboxEval';
import { executeWithPiston } from '../../../utils/pistonApi';
import { LANGUAGES } from '../../../utils/constants';

/**
 * Custom hook that handles code execution routing.
 * - JavaScript runs locally in a sandboxed iframe
 * - All other languages go through the Piston API
 */
export function useCodeExecution() {
  const { code, language, setOutput, clearOutput, setIsRunning } = useEditorStore();

  const runCode = useCallback(async () => {
    if (!code.trim()) {
      setOutput('⚠ No code to execute.');
      return;
    }

    clearOutput();
    setIsRunning(true);

    const startTime = performance.now();

    try {
      let result;

      if (language === 'javascript') {
        // Run JS locally in sandboxed iframe
        result = await executeSandboxedJS(code);
      } else {
        // Run via Piston API
        result = await executeWithPiston(language, code);
      }

      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      const langLabel = LANGUAGES[language]?.label || language;

      setOutput(
        `${result}\n\n─── ✅ Executed in ${elapsed}s (${langLabel}) ───`
      );
    } catch (error) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      setOutput(
        `❌ ${error.message}\n\n─── Failed after ${elapsed}s ───`
      );
    } finally {
      setIsRunning(false);
    }
  }, [code, language, setOutput, clearOutput, setIsRunning]);

  return { runCode };
}
