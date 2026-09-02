import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  Database,
  Wrench,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  ArrowRight,
} from "lucide-react";

/* ─────────── TYPEWRITER HOOK ─────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
        if (charIdx === current.length) {
          timeout = setTimeout(() => setDeleting(true), pause);
        }
      }, speed);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
        }
      }, speed / 2);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─────────── PARTICLE BACKGROUND ─────────── */
function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
  }));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orb 1 */}
      <motion.div
        animate={{ y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Orb 2 */}
      <motion.div
        animate={{ y: [0, 40, 0], scale: [1, 0.95, 1] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Orb 3 */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          position: "absolute",
          top: "60%",
          left: "40%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [`${p.y}%`, `${p.y - 15}%`, `${p.y}%`],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background:
              p.id % 3 === 0
                ? "#a78bfa"
                : p.id % 3 === 1
                  ? "#38bdf8"
                  : "#f472b6",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────── MOTION VARIANTS ─────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────── MAIN APP ─────────── */
function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const typeText = useTypewriter([
    "Full Stack Developer",
    "MERN Stack Expert",
    "React Specialist",
    "Problem Solver",
  ]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  const skills = {
    frontend: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Bootstrap",
      "Sass",
      "jQuery",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "JWT Auth",
      "RESTful APIs",
    ],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Vite", "Vercel", "Render"],
  };

  const projects = [
    {
      title: "Audit-Info CRM",
      description:
        "Cross-platform CRM & audit system for managing college operations — admissions, branches, leads, agents, expenses, and payments — with JWT auth and role-based dashboards.",
      tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
      category: "Full Stack",
      color: "#7c3aed",
      icon: "🏢",
    },
    {
      title: "ERP Software",
      description:
        "Comprehensive ERP system unifying business processes: products, customers, purchases, stock, sales, vendors, and warehouse management with real-time data access.",
      tech: ["MERN Stack", "RESTful APIs", "MySQL"],
      category: "Enterprise",
      color: "#06b6d4",
      icon: "⚙️",
    },
    {
      title: "Hospital Platform",
      description:
        "Hospital management system with online appointments, doctor listings, contact info, and a secure admin panel for comprehensive data management.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      category: "Healthcare",
      color: "#10b981",
      icon: "🏥",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-featured e-commerce site with product listings, shopping cart, secure checkout, and admin panel for inventory & order management.",
      tech: ["MERN Stack", "Redux", "JWT"],
      category: "E-Commerce",
      color: "#f43f5e",
      icon: "🛒",
    },
  ];

  const stats = [
    { label: "Projects Delivered", value: "10+" },
    { label: "Months Experience", value: "10+" },
    { label: "Technologies", value: "20+" },
    { label: "Certifications", value: "4" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020010",
        position: "relative",
      }}
    >
      <ParticleField />

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
          background: scrolled ? "rgba(2,0,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 700,
                background: "linear-gradient(135deg, #a78bfa, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &lt; / &gt;
            </span>
          </a>

          {/* Desktop Nav */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 36 }}
            className="hidden-mobile"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link${activeSection === item.toLowerCase() ? " active" : ""}`}
                onClick={() => setActiveSection(item.toLowerCase())}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "8px 10px",
              cursor: "pointer",
              color: "#e2e8f0",
              display: "none",
            }}
            className="show-mobile"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: "rgba(2,0,16,0.97)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "12px 24px 20px" }}>
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => {
                      setActiveSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "12px 0",
                      color: "#94a3b8",
                      textDecoration: "none",
                      fontSize: 15,
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "0 24px",
        }}
      >
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            textAlign: "center",
            maxWidth: 900,
            position: "relative",
            zIndex: 1,
          }}
        >

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
            }}
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: 20,
              letterSpacing: -2,
            }}
          >
            Hi, I'm <span className="gradient-text">Adnan</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.9rem)",
              fontWeight: 300,
              color: "#94a3b8",
              marginBottom: 24,
              height: "2.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#38bdf8",
              }}
            >
              {typeText}
            </span>
            <span className="cursor-blink" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "#64748b",
              maxWidth: 560,
              margin: "0 auto 48px",
              lineHeight: 1.75,
            }}
          >
            Specializing in MERN Stack — building fast, scalable, and
            user-focused web experiences that make a difference.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
              marginBottom: 64,
            }}
          >
            <a
              href="#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                borderRadius: 50,
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 30px rgba(124,58,237,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <span>View My Work</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 30px",
                border: "1px solid rgba(167,139,250,0.35)",
                borderRadius: 50,
                color: "#a78bfa",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(124,58,237,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "#a78bfa";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(167,139,250,0.35)";
              }}
            >
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            style={{ display: "flex", justifyContent: "center", gap: 16 }}
          >
            {[
              {
                icon: <Github size={20} />,
                href: "https://github.com/adnan-p-786",
                label: "GitHub",
                color: "#a78bfa",
              },
              {
                icon: <Linkedin size={20} />,
                href: "https://www.linkedin.com/in/mohd-adnan-p",
                label: "LinkedIn",
                color: "#38bdf8",
              },
              {
                icon: <Mail size={20} />,
                href: "mailto:mohdadnanp21@gmail.com",
                label: "Email",
                color: "#f472b6",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#94a3b8",
                  transition: "all 0.3s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = s.color;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${s.color}55`;
                  (e.currentTarget as HTMLElement).style.background =
                    `${s.color}15`;
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 16px ${s.color}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "#334155",
            animation: "scroll-bounce 2s ease-in-out infinite",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Scroll
          </span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ══════════════ ABOUT SECTION ══════════════ */}
      <section
        id="about"
        style={{ padding: "120px 24px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            style={{ textAlign: "center", marginBottom: 80 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              About Me
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: -1.5,
              }}
            >
              Crafting{" "}
              <span className="gradient-text">Digital Experiences</span>
            </motion.h2>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 20,
              marginBottom: 60,
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                style={{
                  textAlign: "center",
                  padding: "28px 20px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    background: "linear-gradient(135deg, #a78bfa, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 6,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{ fontSize: 13, color: "#64748b", letterSpacing: 0.5 }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* About Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {/* Summary */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card"
              style={{ padding: "36px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(124,58,237,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={22} color="#a78bfa" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Who I Am
                </h3>
              </div>
              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  marginBottom: 16,
                  fontSize: 15,
                }}
              >
                Passionate Full Stack Developer specializing in the MERN stack,
                with a strong focus on building fast, scalable, and user-focused
                web applications.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: 15 }}>
                I enjoy turning complex problems into clean, intuitive solutions
                — from crafting responsive UIs to optimizing backend
                performance. Always eager to collaborate and deliver impactful
                digital experiences.
              </p>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="glass-card"
              style={{ padding: "36px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(6,182,212,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Briefcase size={22} color="#38bdf8" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Experience
                </h3>
              </div>

              {/* Timeline */}
              <div style={{ position: "relative", paddingLeft: 36 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 8,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background:
                      "linear-gradient(to bottom, #7c3aed, #06b6d4, transparent)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    border: "3px solid #020010",
                    boxShadow: "0 0 12px rgba(124,58,237,0.6)",
                  }}
                />
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 10px",
                      background: "rgba(124,58,237,0.15)",
                      borderRadius: 20,
                      fontSize: 11,
                      color: "#a78bfa",
                      marginBottom: 8,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    Oct 2024 – Present
                  </span>
                  <h4
                    style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}
                  >
                    MERN Stack Intern
                  </h4>
                  <p
                    style={{ color: "#38bdf8", fontSize: 14, marginBottom: 8 }}
                  >
                    Rootsys International · Kottakkal
                  </p>
                  <p
                    style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}
                  >
                    Contributing to Audit-Info CRM, enhancing skills in
                    full-stack development and CRM solutions with real-world
                    client impact.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Education & Certifications */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="glass-card"
              style={{ padding: "36px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(244,63,94,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GraduationCap size={22} color="#fb7185" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Education
                </h3>
              </div>

              <div
                style={{
                  marginBottom: 28,
                  paddingBottom: 24,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  Bachelor of Business Administration
                </p>
                <p style={{ color: "#a78bfa", fontSize: 14, marginBottom: 4 }}>
                  Calicut University
                </p>
                <p style={{ color: "#64748b", fontSize: 13 }}>
                  MCAS, Vengara · 2024
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <Award size={16} color="#f59e0b" />
                  <p style={{ fontWeight: 600, fontSize: 14 }}>
                    Certifications
                  </p>
                </div>
                {[
                  "MERN Stack Development — Rootsys International",
                  "NETD Certification — Rootsys International",
                  "AI Appreciate — Intel",
                  "AI Aware — Intel",
                ].map((cert, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{ color: "#a78bfa", marginTop: 2, flexShrink: 0 }}
                    >
                      ▸
                    </span>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ SKILLS SECTION ══════════════ */}
      <section
        id="skills"
        style={{ padding: "120px 24px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ textAlign: "center", marginBottom: 80 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              Tech Stack
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: -1.5,
              }}
            >
              Skills & <span className="gradient-text">Technologies</span>
            </motion.h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {/* Frontend */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card"
              style={{ padding: "36px", cursor: "default" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(167,139,250,0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <Code2 size={24} color="#a78bfa" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                    Frontend
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748b" }}>
                    UI & Interaction
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.frontend.map((skill) => (
                  <span key={skill} className="skill-tag purple">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="glass-card"
              style={{ padding: "36px", cursor: "default" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(56,189,248,0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(6,182,212,0.2)",
                  }}
                >
                  <Database size={24} color="#38bdf8" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                    Backend
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748b" }}>
                    Server & Database
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.backend.map((skill) => (
                  <span key={skill} className="skill-tag cyan">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="glass-card"
              style={{ padding: "36px", cursor: "default" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(251,113,133,0.08))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(244,63,94,0.2)",
                  }}
                >
                  <Wrench size={24} color="#fb7185" />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                    Tools
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748b" }}>
                    Dev & Deployment
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.tools.map((skill) => (
                  <span key={skill} className="skill-tag pink">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ PROJECTS SECTION ══════════════ */}
      <section
        id="projects"
        style={{ padding: "120px 24px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ textAlign: "center", marginBottom: 80 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              Portfolio
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: -1.5,
              }}
            >
              Featured <span className="gradient-text">Projects</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ color: "#64748b", marginTop: 16, fontSize: 16 }}
            >
              Real-world applications built with modern technologies
            </motion.p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass-card project-card"
                style={{ padding: "32px", cursor: "default" }}
              >
                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <span style={{ fontSize: 28 }}>{project.icon}</span>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          marginBottom: 2,
                        }}
                      >
                        {project.title}
                      </h3>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          padding: "2px 8px",
                          borderRadius: 20,
                          background: `${project.color}18`,
                          color: project.color,
                          border: `1px solid ${project.color}35`,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={16} color="#334155" />
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 14,
                    lineHeight: 1.75,
                    marginBottom: 24,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "4px 11px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 20,
                        fontSize: 12,
                        color: "#94a3b8",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CONTACT SECTION ══════════════ */}
      <section
        id="contact"
        style={{ padding: "120px 24px 80px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              Contact
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: -1.5,
              }}
            >
              Let's <span className="gradient-text">Work Together</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                color: "#64748b",
                marginTop: 16,
                fontSize: 16,
                maxWidth: 500,
                margin: "16px auto 0",
              }}
            >
              I'm currently open to new opportunities and collaborations. Feel
              free to reach out!
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card"
            style={{ padding: "48px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 16,
              }}
            >
              <a href="mailto:mohdadnanp21@gmail.com" className="contact-card">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(124,58,237,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={22} color="#a78bfa" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                      marginBottom: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    EMAIL
                  </p>
                  <p style={{ fontWeight: 600, fontSize: 12 }}>
                    mohdadnanp21@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+916238285404" className="contact-card">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(6,182,212,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={22} color="#38bdf8" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                      marginBottom: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    PHONE
                  </p>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>
                    +91 6238285404
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/adnan-p-786"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(244,63,94,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Github size={22} color="#fb7185" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                      marginBottom: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    GITHUB
                  </p>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>adnan-p-786</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/mohd-adnan-p"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(56,189,248,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Linkedin size={22} color="#38bdf8" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                      marginBottom: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    LINKEDIN
                  </p>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>mohd-adnan-p</p>
                </div>
              </a>
            </div>

            <div
              style={{
                marginTop: 28,
                padding: "18px 24px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <MapPin size={18} color="#a78bfa" />
              <span style={{ color: "#94a3b8", fontSize: 14 }}>
                Malappuram, Kerala, India
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer
        style={{
          padding: "28px 24px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: "#334155",
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          © 2026 <span style={{ color: "#a78bfa" }}>Adnan</span>  All rights reserved.
        </p>
      </footer>

      {/* Mobile responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </div>
  );
}

export default App;
