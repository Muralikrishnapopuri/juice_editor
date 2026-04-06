<p align="center">
  <span style="font-size: 4rem;">🧃</span>
</p>

<h1 align="center">Juice Editor</h1>

<p align="center">
  <strong>Code. Compile. Create.</strong><br/>
  A blazing-fast, browser-based IDE for students — no sign-up, no install, just code.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Monaco-Editor-007acc?logo=visualstudiocode&logoColor=white" alt="Monaco" />
  <img src="https://img.shields.io/badge/Three.js-0.160-000?logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/License-Private-grey" alt="License" />
</p>

---

## ✨ What is Juice Editor?

Juice Editor is a **feature-rich, browser-based code editor and compiler** designed specifically for students. It lets you write, execute, and share code in **10+ programming languages** — all from your browser, with zero setup.

Whether you're learning your first `Hello, World!` or practicing data structures in C++, Juice Editor gives you a professional-grade coding environment without the friction of installing compilers, IDEs, or runtimes.

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🖥️ **Monaco Editor** | VS Code's editing engine with syntax highlighting, IntelliSense, and minimap |
| 🌍 **10+ Languages** | JavaScript, Python, C++, Java, TypeScript, Go, Rust, Ruby, PHP, C# |
| ⚡ **Instant Execution** | Run JS client-side in a sandboxed iframe; other languages via the Piston API |
| 📑 **Multi-Tab Editing** | Work on multiple files simultaneously with a tabbed interface |
| 🎨 **3D Landing Page** | Immersive Three.js-powered landing page with animated particles |
| 📤 **Export & Share** | Download source files, export styled PDFs, or generate shareable links |
| ⌨️ **Keyboard Shortcuts** | `Ctrl+Enter` to run, `Ctrl+S` to save, `Ctrl+E` to export, and more |
| 🔔 **Toast Notifications** | Real-time feedback on actions via `react-hot-toast` |
| 📱 **Responsive Design** | Resizable split panels and a layout that works on various screen sizes |
| 🧩 **Zero Config** | No accounts, no API keys — just open and start coding |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev) + [Vite 5](https://vitejs.dev) |
| **Code Editor** | [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react) (Monaco Editor) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **3D Graphics** | [Three.js](https://threejs.org) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) |
| **Code Execution** | [Piston API](https://emkc.org/api/v2/piston) (remote) + Sandboxed iframe (local JS) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Routing** | [React Router v7](https://reactrouter.com) |
| **Export** | [jsPDF](https://github.com/parallax/jsPDF) + [FileSaver.js](https://github.com/eligrey/FileSaver.js) |
| **Icons** | [@iconify/react](https://iconify.design/) |
| **Notifications** | [react-hot-toast](https://react-hot-toast.com/) |

---

## 📂 Project Structure

```
juice-editor/
├── public/                  # Static assets (favicon, etc.)
├── src/
│   ├── App.jsx              # Root component with routing & lazy loading
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles & design tokens
│   ├── features/
│   │   ├── landing/         # 3D landing page (Three.js scene)
│   │   │   ├── Landing.jsx
│   │   │   └── Landing.module.css
│   │   ├── editor/          # Core IDE experience
│   │   │   ├── Editor.jsx
│   │   │   ├── Editor.module.css
│   │   │   ├── components/
│   │   │   │   ├── EditorPanel.jsx    # Monaco editor wrapper
│   │   │   │   ├── Toolbar.jsx        # Language selector, run & export buttons
│   │   │   │   ├── TabBar.jsx         # Multi-tab file management
│   │   │   │   ├── OutputPanel.jsx    # Code execution output display
│   │   │   │   └── StatusBar.jsx      # Language & cursor info
│   │   │   └── hooks/
│   │   │       └── useCodeExecution.js  # Run logic (local + Piston)
│   │   └── export/          # Export & share modals
│   │       ├── ExportModal.jsx
│   │       ├── ShareModal.jsx
│   │       └── *.module.css
│   ├── store/
│   │   ├── useEditorStore.js    # Editor state (tabs, code, output)
│   │   └── useSettingsStore.js  # User preferences (theme, font size)
│   └── utils/
│       ├── constants.js       # Language definitions & keyboard shortcuts
│       ├── pistonApi.js       # Piston API integration
│       ├── sandboxEval.js     # Sandboxed JS execution via iframe
│       └── fileHelpers.js     # File download, PDF export, utilities
├── index.html               # HTML entry with SEO meta tags
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/juice-editor.git
cd juice-editor

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`**.

### Other Commands

```bash
npm run build     # Build for production
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

---

## 🌐 How Code Execution Works

Juice Editor uses a **dual execution strategy**:

### 🟢 JavaScript (Client-Side)
JavaScript code runs **locally in the browser** inside a sandboxed `<iframe>` with `allow-scripts` only. Console methods (`log`, `warn`, `error`, `table`) are intercepted and streamed back to the output panel via `postMessage`. A configurable timeout (default: 5 seconds) prevents infinite loops.

### 🔵 Other Languages (Piston API)
Languages like Python, C++, Java, Go, Rust, TypeScript, C#, Ruby, and PHP are executed remotely using the **[Piston API](https://github.com/engineer-man/piston)** — a free, open-source code execution engine. No API key is required. Requests have a 15-second timeout.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Run code |
| `Ctrl + S` | Save / download file |
| `Ctrl + E` | Open export modal |
| `Ctrl + N` | New tab |
| `Ctrl + W` | Close current tab |
| `Ctrl + `` ` `` | Toggle output panel |

---

## 📤 Export Options

- **📄 Source File** — Download your code as a `.js`, `.py`, `.cpp`, etc. file
- **📑 Styled PDF** — Export a beautifully formatted PDF with line numbers, syntax info, and Juice Editor branding
- **🔗 Shareable Link** — Generate a link to share your code with others

---

## 🎨 Design Highlights

- **Dark-first theme** with carefully chosen CSS custom properties
- **Glassmorphism UI** elements with subtle backdrop-filter effects
- **Animated 3D landing page** with floating particles using Three.js and React Three Fiber
- **Smooth page transitions** powered by Framer Motion
- **CSS Modules** for component-scoped styling — zero class name conflicts
- **Resizable split panes** between editor and output panels

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📜 License

This project is privately licensed. See the repository for details.

---

<p align="center">
  Built with ❤️ and 🧃 for students everywhere.
</p>
