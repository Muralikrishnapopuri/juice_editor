import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Stars, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

/* ─── 3D Scene ─── */
function CodingWorldScene() {
  return (
    <>
      <Stars radius={120} depth={80} count={4000} factor={4} fade speed={1.2} />

      {/* Floating code-themed 3D objects */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[0, 1.5, 0]}>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.4} wireframe />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2} position={[3.5, -0.5, -2]}>
        <mesh>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} wireframe />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8} position={[-3.5, 0.5, -3]}>
        <mesh>
          <torusKnotGeometry args={[0.4, 0.15, 100, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1} position={[-2, -2, -1]}>
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.3} wireframe />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6} position={[2.5, 2, -4]}>
        <mesh>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} wireframe />
        </mesh>
      </Float>

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#06b6d4" />
    </>
  );
}

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

/* ─── Feature data ─── */
const FEATURES = [
  {
    icon: '⚡',
    title: 'Instant Execution',
    desc: 'Run JavaScript in-browser instantly. Python, C++, Java, and more via cloud APIs.',
    gradient: 'linear-gradient(135deg, #00ff88, #06b6d4)',
  },
  {
    icon: '🎨',
    title: 'Rich IntelliSense',
    desc: 'VS Code-grade autocomplete, syntax highlighting, and bracket colorization.',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    icon: '📤',
    title: 'Export Anywhere',
    desc: 'Download as PDF or raw files. Share code snippets directly via email.',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  {
    icon: '🌐',
    title: '10+ Languages',
    desc: 'JavaScript, Python, C++, Java, Go, Rust, TypeScript, Ruby, PHP, and C#.',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
  {
    icon: '💾',
    title: 'Auto-Save',
    desc: 'Your code persists in the browser. No backend, no sign-up needed.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    icon: '🎯',
    title: 'Student-Focused',
    desc: 'Distraction-free workspace designed for learning and practice.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  },
];

/* ─── Supported languages ─── */
const LANG_BADGES = ['JavaScript', 'Python', 'C++', 'Java', 'TypeScript', 'Go', 'Rust', 'Ruby', 'PHP', 'C#'];

/* ─── Landing Component ─── */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.landing}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        className={styles.canvas}
        dpr={[1, 1.5]}
      >
        <ScrollControls pages={4} damping={0.2}>
          <Scroll>
            <CodingWorldScene />
          </Scroll>

          <Scroll html style={{ width: '100%' }}>
            {/* ── Section 1: Hero ── */}
            <section className={styles.hero}>
              <motion.div
                className={styles.badge}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                <span className={styles.badgeDot} />
                Open Source & Free Forever
              </motion.div>

              <motion.h1
                className={styles.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                Juice Editor{' '}
                <span className={styles.emoji}>🧃</span>
              </motion.h1>

              <motion.p
                className={styles.subtitle}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                Code. Compile. Create. — A breathtaking browser IDE built for
                students who want to master programming.
              </motion.p>

              <motion.div
                className={styles.heroCtas}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
              >
                <motion.button
                  className={styles.ctaPrimary}
                  onClick={() => navigate('/editor')}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Launch Editor →
                </motion.button>
                <motion.a
                  className={styles.ctaSecondary}
                  href="#features"
                  whileHover={{ scale: 1.04 }}
                >
                  See Features ↓
                </motion.a>
              </motion.div>

              {/* Language badges */}
              <motion.div
                className={styles.langBadges}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                {LANG_BADGES.map((lang) => (
                  <span key={lang} className={styles.langBadge}>
                    {lang}
                  </span>
                ))}
              </motion.div>
            </section>

            {/* ── Section 2: Features ── */}
            <section className={styles.featuresSection} id="features">
              <motion.h2
                className={styles.sectionTitle}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Everything you need to code
              </motion.h2>
              <motion.p
                className={styles.sectionSubtitle}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                A fully-featured IDE that runs entirely in your browser.
              </motion.p>

              <div className={styles.featuresGrid}>
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f.title}
                    className={styles.featureCard}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    custom={i}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  >
                    <div
                      className={styles.featureIconWrap}
                      style={{ background: f.gradient }}
                    >
                      <span className={styles.featureIcon}>{f.icon}</span>
                    </div>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Section 3: Code Preview ── */}
            <section className={styles.previewSection}>
              <motion.h2
                className={styles.sectionTitle}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Write code like a pro
              </motion.h2>
              <motion.div
                className={styles.codePreview}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.codeHeader}>
                  <div className={styles.dots}>
                    <span style={{ background: '#ff5f56' }} />
                    <span style={{ background: '#ffbd2e' }} />
                    <span style={{ background: '#27c93f' }} />
                  </div>
                  <span className={styles.codeFilename}>main.js</span>
                </div>
                <pre className={styles.codeBlock}>
                  <code>
{`// Welcome to Juice Editor 🧃
const greet = (name) => {
  return \`Hello, \${name}! 🚀\`;
};

const languages = [
  "JavaScript", "Python", "C++",
  "Java", "Go", "Rust"
];

languages.forEach((lang) => {
  console.log(greet(lang));
});`}
                  </code>
                </pre>
              </motion.div>
            </section>

            {/* ── Section 4: Final CTA ── */}
            <section className={styles.finalSection}>
              <motion.h2
                className={styles.finalTitle}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Ready to start coding?
              </motion.h2>
              <motion.p
                className={styles.finalSubtitle}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
              >
                No sign-up. No installation. Just open and code.
              </motion.p>
              <motion.button
                className={styles.ctaPrimary}
                onClick={() => navigate('/editor')}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
              >
                Open Juice Editor →
              </motion.button>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
