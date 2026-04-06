import { useRef, useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditorStore } from '../../../store/useEditorStore';
import { useSettingsStore } from '../../../store/useSettingsStore';

export default function EditorPanel() {
  const editorRef = useRef(null);
  const { code, language, setCode } = useEditorStore();
  const { theme, fontSize, fontFamily, minimap, wordWrap, lineNumbers, tabSize } = useSettingsStore();

  const handleEditorDidMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Register custom JavaScript completions
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [
          {
            label: 'console.log',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'console.log(${1:value});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Log output to console',
            detail: 'console',
            range,
          },
          {
            label: 'console.error',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'console.error(${1:error});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Log error to console',
            detail: 'console',
            range,
          },
          {
            label: 'arrow-function',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'const ${1:name} = (${2:params}) => {',
              '\t${3:// body}',
              '};',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'ES6 Arrow Function',
            detail: 'snippet',
            range,
          },
          {
            label: 'async-function',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'const ${1:name} = async (${2:params}) => {',
              '\ttry {',
              '\t\t${3:// body}',
              '\t} catch (error) {',
              '\t\tconsole.error(error);',
              '\t}',
              '};',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Async Function with try/catch',
            detail: 'snippet',
            range,
          },
          {
            label: 'fetch-async',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'const ${1:fetchData} = async () => {',
              '\ttry {',
              "\t\tconst response = await fetch('${2:url}');",
              '\t\tconst data = await response.json();',
              '\t\treturn data;',
              '\t} catch (error) {',
              '\t\tconsole.error(error);',
              '\t}',
              '};',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Async fetch with error handling',
            detail: 'snippet',
            range,
          },
          {
            label: 'for-of',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'for (const ${1:item} of ${2:iterable}) {',
              '\t${3:// body}',
              '}',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'For...of loop',
            detail: 'snippet',
            range,
          },
          {
            label: 'map',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '${1:array}.map((${2:item}) => ${3:item});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Array.map()',
            detail: 'array method',
            range,
          },
          {
            label: 'filter',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '${1:array}.filter((${2:item}) => ${3:condition});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Array.filter()',
            detail: 'array method',
            range,
          },
          {
            label: 'reduce',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '${1:array}.reduce((${2:acc}, ${3:item}) => {\n\t${4:// body}\n\treturn ${2:acc};\n}, ${5:initialValue});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Array.reduce()',
            detail: 'array method',
            range,
          },
          {
            label: 'class',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'class ${1:ClassName} {',
              '\tconstructor(${2:params}) {',
              '\t\t${3:// initialize}',
              '\t}',
              '',
              '\t${4:method}() {',
              '\t\t${5:// body}',
              '\t}',
              '}',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'ES6 Class',
            detail: 'snippet',
            range,
          },
          {
            label: 'promise',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'new Promise((resolve, reject) => {',
              '\t${1:// body}',
              '});',
            ].join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Create a new Promise',
            detail: 'snippet',
            range,
          },
          {
            label: 'setInterval',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'setInterval(() => {\n\t${1:// body}\n}, ${2:1000});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Set an interval',
            detail: 'timer',
            range,
          },
          {
            label: 'setTimeout',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'setTimeout(() => {\n\t${1:// body}\n}, ${2:1000});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Set a timeout',
            detail: 'timer',
            range,
          },
        ];

        return { suggestions };
      },
    });

    editor.focus();
  }, []);

  const monacoLanguageMap = {
    javascript: 'javascript',
    python: 'python',
    cpp: 'cpp',
    java: 'java',
    typescript: 'typescript',
    go: 'go',
    rust: 'rust',
    ruby: 'ruby',
    php: 'php',
    csharp: 'csharp',
  };

  return (
    <MonacoEditor
      height="100%"
      language={monacoLanguageMap[language] || 'javascript'}
      value={code}
      theme={theme}
      onChange={(value) => setCode(value || '')}
      onMount={handleEditorDidMount}
      options={{
        fontSize,
        fontFamily,
        fontLigatures: true,
        minimap: { enabled: minimap, scale: 2 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: 'always',
        formatOnPaste: true,
        suggestOnTriggerCharacters: true,
        wordWrap,
        padding: { top: 16 },
        lineNumbers,
        renderLineHighlight: 'all',
        tabSize,
        automaticLayout: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
      loading={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-sm)',
        }}>
          Loading editor...
        </div>
      }
    />
  );
}
