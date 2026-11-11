import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const projects = [
  { number: "01 / COMPLETED PROTOTYPE", title: "CrackSense", category: "Working UAV-assisted crack inspection with deep-learning segmentation.", description: "A completed drone-deployed prototype that streams camera video and flight telemetry from a Raspberry Pi-equipped quadcopter to a laptop, where SegFormer predicts crack masks for human review.", stack: ["SegFormer B2", "PyTorch", "Raspberry Pi 5", "IMX219", "TFmini-S"], status: "Completed — deployed and working on drone", href: "https://github.com/ManasD2011/CrackSense" },
  { number: "02 / COMPUTER VISION", title: "Object Detection System", category: "Real-time detection, tracking and movement analysis.", description: "A multi-service CCTV intelligence pipeline for detection, tracking, people counting, line crossing and live streaming, orchestrated through a web dashboard.", stack: ["YOLOv8", "OpenCV", "Python", "FastAPI"], href: "https://github.com/ManasD2011/Object-Detection-Project" },
  { number: "03 / MEDICAL COMPUTER VISION", title: "Brain Tumor Detection", category: "MRI segmentation and tumour-mask visualization.", description: "A 2D U-Net segmentation workflow trained on BraTS 2021 MRI data, including preprocessing and a FastAPI endpoint for overlay outputs.", stack: ["U-Net", "TensorFlow", "NIfTI", "FastAPI"], href: "https://github.com/ManasD2011/Brain_Tumour_Detection" },
];

const jobs = [{
  company: "Trinetri Quantum Pvt. Ltd.",
  role: "AI/ML Intern",
  dates: "Mar 2026 — Apr 2026",
  project: "PELS — Prompt Evaluation & Learning System",
  bullets: [
    "Built the initial Jupyter RAG prototype for a six-criterion prompt-evaluation engine.",
    "Unified 265+ annotated prompts in ChromaDB using all-MiniLM-L6-v2 embeddings and refined the scoring pipeline.",
    "Contributed technical documentation and stakeholder presentations for the FastAPI + Claude Haiku deployment, shipped via Docker to Hugging Face Spaces.",
  ],
  stack: ["RAG", "ChromaDB", "SentenceTransformer", "FastAPI", "Docker"],
}];

function ThemeToggle({ theme, setTheme }) {
  return <div className="theme-toggle" role="group" aria-label="Color theme">
    <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")} aria-pressed={theme === "light"}><Sun size={14} /> Light</button>
    <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")} aria-pressed={theme === "dark"}><Moon size={14} /> Dark</button>
  </div>;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef(null);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("theme", theme); }, [theme]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { const move = (event) => { if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; }; window.addEventListener("pointermove", move); return () => window.removeEventListener("pointermove", move); }, []);
  const closeMenu = () => setMenuOpen(false);

  return <><span ref={cursorRef} className="custom-cursor" aria-hidden="true" />
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}><div className="container nav-inner"><a className="logo logo-full" href="#top" aria-label="Manas Deshpande home">Manas Deshpande/</a><nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation"><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href={`${import.meta.env.BASE_URL}Manas_Deshpande_Resume.pdf`} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={13} /></a></nav><div className="nav-actions"><ThemeToggle theme={theme} setTheme={setTheme} /><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></div></header>
    <main id="top">
      <section className="hero container"><div className="hero-main"><p className="eyebrow">MANAS DESHPANDE</p><h1>AI/ML<br />Engineer.</h1><p className="hero-copy">I build machine-learning systems from model development to deployment.</p><div className="hero-actions"><a className="button" href="#work">View work <ArrowDown size={15} /></a><a className="text-link" href="https://github.com/ManasD2011" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a></div></div><aside className="current"><p className="eyebrow">PROJECT SPOTLIGHT</p><h2>CrackSense</h2><p>UAV inspection<br />Completed prototype</p><div className="project-status">Deployed and working</div><a className="arrow-link" href="#cracksense">Project details <ArrowDown size={14} /></a></aside><a className="scroll-prompt" href="#work"><ArrowDown size={15} /> Scroll to explore</a></section>
      <section id="work" className="section container"><div className="project-list">{projects.map((project, index) => <article id={index === 0 ? "cracksense" : undefined} className="project" key={project.title}><p className="project-index">0{index + 1}</p><div className="project-copy"><p className="eyebrow">{project.number}</p><h3>{project.title}</h3></div><div className="project-detail"><p className="project-category">{project.category}</p><p className="project-description">{project.description}</p><div className="tag-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div>{project.status && <p className="project-status">{project.status}</p>}<a className="arrow-link" href={project.href} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a></div></article>)}</div></section>
      <section id="cracksense-details" className="section container project-overview"><div><p className="eyebrow">CRACKSENSE / PROJECT OVERVIEW</p><h2>Drone-assisted inspection, with human-reviewed crack predictions.</h2><p className="overview-intro">The completed prototype is deployed and working on an F450 quadcopter. It captures imagery and telemetry, then sends them to a ground-station laptop for crack segmentation. The pilot controls the aircraft; model predictions support inspection and do not control flight.</p><a className="arrow-link" href="https://github.com/ManasD2011/CrackSense" target="_blank" rel="noreferrer">Explore the repository <ArrowUpRight size={14} /></a></div><div className="overview-facts"><article><h3>Hardware</h3><p>F450 quadcopter with 920 KV motors, Raspberry Pi 5, IMX219 camera, Pixhawk and dual TFmini-S lidar sensors.</p></article><article><h3>Processing</h3><p>Video and telemetry stream over Wi-Fi to a laptop running SegFormer. The dashboard shows the camera image, predicted crack mask and available distance readings.</p></article><article><h3>Model result</h3><p>SegFormer B2 recorded a 0.7910 validation Dice score. This is a validation result, not test accuracy.</p></article><article><h3>Status and limitations</h3><p>Completed and operational as a research prototype. Predictions can be affected by thin cracks, surface texture and image conditions; qualified inspectors remain responsible for structural assessment.</p></article></div></section>
      <section className="section container engineering"><div className="section-intro"><p className="eyebrow">ENGINEERING</p><h2>Tools and capabilities I use to take systems beyond a notebook.</h2></div><div className="capabilities">{[["Machine Learning", "PyTorch · Transformers · Computer Vision · Semantic Segmentation · Object Detection · NLP"], ["Backend", "Python · FastAPI · REST APIs · PostgreSQL"], ["Frontend", "React · TypeScript · Tailwind CSS"], ["Deployment", "Linux · Docker · Git · Raspberry Pi · Edge AI"]].map(([name, items], i) => <div className="capability" key={name}><span>0{i + 1}</span><h3>{name}</h3><p>{items}</p></div>)}</div></section>
      <section className="section container experience"><div className="section-intro"><p className="eyebrow">EXPERIENCE</p><h2>Learning through systems work.</h2></div><div className="job-list">{jobs.map(job => <article className="job" key={job.company}><div className="job-head"><div><h3>{job.company}</h3><p className="job-role">{job.role}</p></div><p className="job-dates">{job.dates}</p></div><p className="job-project">{job.project}</p><ul className="job-bullets">{job.bullets.map(b => <li key={b}>{b}</li>)}</ul><div className="tag-list">{job.stack.map(item => <span key={item}>{item}</span>)}</div></article>)}</div><div className="education"><div><span>EDUCATION</span><h3>B.Tech, Electronics &amp; Computer Science</h3><p>VIT Mumbai · 2023 — 2027</p></div></div></section>
      <section id="about" className="section container about"><p className="eyebrow">ABOUT</p><div><h2>I’m Manas, an AI/ML engineer interested in practical machine-learning systems.</h2><p>My work sits at the intersection of machine learning, computer vision and software engineering. I enjoy building the inference pipeline, measuring it, optimizing it and putting it on real hardware.</p></div></section>
      <section id="contact" className="contact"><div className="container"><p className="eyebrow">CONTACT</p><h2>Let’s build something.</h2><p>I’m interested in opportunities involving machine learning, computer vision and backend systems.</p><div className="contact-links"><a href="mailto:manasdeshpande51@gmail.com">Email <ArrowUpRight size={15} /></a><a href="https://github.com/ManasD2011" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href="https://linkedin.com/in/manas-deshpande21" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a href={`${import.meta.env.BASE_URL}Manas_Deshpande_Resume.pdf`} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} /></a></div></div></section>
    </main>
  </>;
}
