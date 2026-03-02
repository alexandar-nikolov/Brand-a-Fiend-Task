import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ProjectModal } from './components/ProjectModal';
import { StatCounter } from './components/StatCounter';

// ── Strict 3-color palette ────────────────────────────────────────────────────
const BLACK   = '#0D0D0D';
const WHITE   = '#FFFFFF';
const CRIMSON = '#B10E3C';

// ── Data ──────────────────────────────────────────────────────────────────────
interface Project {
  title: string; desc: string; category: string;
  details: string; challenge: string; approach: string; outcome: string;
}

const projects: Project[] = [
  { title: 'Project name', desc: 'Descriptions field', category: 'filter 1', details: 'details field', challenge: 'challenges field', approach: 'approaches section', outcome: 'Outcome section' },
  { title: 'Project name', desc: 'Descriptions field', category: 'filter 2', details: 'details field', challenge: 'challenges field', approach: 'approaches section', outcome: 'Outcome section' },
  { title: 'Project name', desc: 'Descriptions field', category: 'filter 1', details: 'details field', challenge: 'challenges field', approach: 'approaches section', outcome: 'Outcome section' },
  { title: 'Project name', desc: 'Descriptions field', category: 'filter 3', details: 'details field', challenge: 'challenges field', approach: 'approaches section', outcome: 'Outcome section' },
  { title: 'Project name', desc: 'Descriptions field', category: 'filter 2', details: 'details field', challenge: 'challenges field', approach: 'approaches section', outcome: 'Outcome section' },
  { title: 'Project name', desc: 'Descriptions field', category: 'filter 3', details: 'details field', challenge: 'challenges field', approach: 'approaches section', outcome: 'Outcome section' },
];

const skills = [
  { name: 'Skill 1', level: 95 },
  { name: 'Skill 2', level: 92 },
  { name: 'Skill 3', level: 88 },
  { name: 'Skill 4', level: 90 },
  { name: 'Skill 5', level: 85 },
  { name: 'Skill 6', level: 87 },
];

const timeline = [
  { year: '2024–Present', title: 'Position', organization: 'Organisation name', description: 'Description of work and position' },
  { year: '2023–2024',    title: 'Position', organization: 'Organisation name', description: 'Description of work and position' },
  { year: '2022–2023',    title: 'Position', organization: 'Organisation name', description: 'Description of work and position' },
  { year: '2021–2022',    title: 'Position', organization: 'Organisation name', description: 'Description of work and position' },
];

const philosophy = [
  { title: 'Structured',   desc: 'I break down every problem into clear, actionable steps — removing ambiguity before execution begins.', icon: '01' },
  { title: 'Disciplined',  desc: 'Consistency beats inspiration. I follow through on every commitment, without exception.',               icon: '02' },
  { title: 'Basics‑first', desc: 'Master the fundamentals before layering complexity. Depth before breadth, always.',                   icon: '03' },
];

const marqueeItems = ['Structure', 'Clarity', 'Discipline', 'Results', 'Basics First', 'Consistency', 'Execution', 'Precision'];

// ── Shared layout helpers ──────────────────────────────────────────────────────

/** Dot-grid CSS background — uses only the 3 brand colors */
const dotGrid = (color: string) => ({
  backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
  backgroundSize: '26px 26px',
});

/** Animated section watermark with scroll-driven parallax */
function Watermark({
  children,
  color,
  size = 'clamp(10rem, 22vw, 22rem)',
  align = 'right',
  vAlign = 'top',
  rotate = 0,
}: {
  children: string;
  color: string;
  size?: string;
  align?: 'right' | 'left';
  vAlign?: 'top' | 'bottom';
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-35, 35]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
      <motion.div
        style={{
          y,
          position: 'absolute',
          [align]: '-2%',
          [vAlign]: 0,
          fontFamily: 'Roboto Slab, serif',
          fontSize: size,
          fontWeight: 900,
          color,
          lineHeight: 0.82,
          letterSpacing: '-0.03em',
          rotate,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Thin label row: ── LABEL TEXT */
function SectionLabel({ children, onDark = false }: { children: string; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-7 h-[2px]" style={{ backgroundColor: CRIMSON }} />
      <span style={{ color: onDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)', fontSize: '0.62rem', letterSpacing: '0.24em', fontWeight: 700, textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  );
}

// ── Animated sub-components ───────────────────────────────────────────────────

function PhilosophyCard({ principle, index }: { principle: typeof philosophy[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="p-8 relative h-full"
        style={{
          backgroundColor: WHITE,
          border: `1px solid ${hovered ? CRIMSON : 'rgba(0,0,0,0.08)'}`,
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hovered ? `0 20px 60px rgba(177,14,60,0.1)` : '0 2px 12px rgba(0,0,0,0.04)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Large number watermark */}
        <div
          className="absolute top-4 right-5 select-none pointer-events-none"
          style={{ fontFamily: 'Roboto Slab, serif', fontSize: '5rem', fontWeight: 800, color: hovered ? CRIMSON : BLACK, opacity: hovered ? 0.07 : 0.04, lineHeight: 1, transition: 'color 0.4s, opacity 0.4s' }}
        >
          {principle.icon}
        </div>
        {/* Animated crimson rule */}
        <motion.div
          animate={{ width: hovered ? '3rem' : '1.5rem' }}
          transition={{ duration: 0.35 }}
          className="h-[2px] mb-6"
          style={{ backgroundColor: CRIMSON }}
        />
        <h3 className="mb-3" style={{ fontSize: '0.88rem', fontWeight: 700, color: BLACK, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {principle.title}
        </h3>
        <p style={{ color: 'rgba(0,0,0,0.55)', fontSize: '0.875rem', lineHeight: '1.85' }}>
          {principle.desc}
        </p>
      </div>
    </motion.div>
  );
}

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12 pb-14 group"
    >
      {/* Crimson dot with pulse ring */}
      <div
        className="absolute left-[-6px] top-[6px] w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-125"
        style={{ backgroundColor: CRIMSON, boxShadow: `0 0 0 4px rgba(177,14,60,0.15)` }}
      />
      <div className="mb-1 uppercase tracking-widest" style={{ color: CRIMSON, fontSize: '0.65rem', fontWeight: 700 }}>
        {item.year}
      </div>
      <h3 className="mb-1" style={{ fontSize: '1.05rem', fontWeight: 600, color: WHITE }}>
        {item.title}
      </h3>
      <div className="mb-3" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
        {item.organization}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: '1.85' }}>
        {item.description}
      </p>
    </motion.div>
  );
}

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="flex justify-between mb-2 items-baseline">
        <span style={{ color: BLACK, fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</span>
        <span style={{ color: CRIMSON, fontSize: '0.75rem', fontWeight: 700 }}>{skill.level}%</span>
      </div>
      <div className="h-[2px] rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.4, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: CRIMSON }}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="p-8 h-full relative overflow-hidden"
        style={{
          backgroundColor: hovered ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.2)',
          borderTop: `1px solid ${hovered ? WHITE : 'rgba(255,255,255,0.12)'}`,
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Index decoration */}
        <div
          className="absolute top-3 right-5 select-none pointer-events-none font-mono"
          style={{ fontSize: '5rem', fontWeight: 800, color: WHITE, opacity: hovered ? 0.07 : 0.03, lineHeight: 1, transition: 'opacity 0.4s' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="mb-3 uppercase tracking-widest" style={{ color: hovered ? WHITE : 'rgba(255,255,255,0.4)', fontSize: '0.6rem', fontWeight: 700, transition: 'color 0.3s' }}>
          {project.category}
        </div>
        <h3 className="mb-3" style={{ fontSize: '1.05rem', fontWeight: 600, color: WHITE, lineHeight: '1.4' }}>
          {project.title}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: '1.75' }}>
          {project.desc}
        </p>
        <div
          className="mt-6 flex items-center gap-2"
          style={{ color: hovered ? WHITE : 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', transition: 'color 0.3s' }}
        >
          <span>View details</span>
          <motion.span animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
  const categories = ['all', 'filter 1', 'filter 2', 'filter 3'];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: BLACK }}>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? `rgba(177,14,60,0.97)` : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? `1px solid rgba(255,255,255,0.1)` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center text-xs font-black" style={{ backgroundColor: CRIMSON, color: WHITE }}>
              K
            </div>
            <span style={{ color: WHITE, fontWeight: 700, letterSpacing: '0.07em', fontSize: '0.875rem' }}>Kaloyan</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['approach', 'experience', 'skills', 'work', 'contact'].map(s => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="lowercase transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 500, fontSize: '0.875rem' }}
                onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO (BLACK) ────────────────────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex flex-col justify-center px-8 overflow-hidden"
      >
        {/* Crimson dot-grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={dotGrid('rgba(177,14,60,0.07)')} />

        {/* Giant "K" watermark — top right */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute', right: '-4%', top: '-5%',
              fontFamily: 'Roboto Slab, serif',
              fontSize: 'clamp(240px, 38vw, 520px)',
              fontWeight: 900, color: 'rgba(177,14,60,0.07)',
              lineHeight: 0.82, letterSpacing: '-0.04em',
            }}
          >
            K
          </motion.div>
        </div>

        {/* "KALOYAN" name — bleeds in from bottom, huge */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden" aria-hidden>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: 'Roboto Slab, serif',
              fontSize: 'clamp(5rem, 16vw, 18rem)',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.03)',
              lineHeight: 0.75,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              marginBottom: '-0.15em',
              paddingLeft: '2rem',
            }}
          >
            KALOYAN
          </motion.div>
        </div>

        {/* Crimson vertical rule */}
        <div className="absolute left-0 top-[25%] bottom-[25%] w-[3px]" style={{ background: `linear-gradient(to bottom, transparent, ${CRIMSON}, transparent)` }} />

        {/* Subtle horizontal lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-0 right-0 h-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />
          <div className="absolute top-[70%] left-0 right-0 h-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} />
        </div>

        <div className="max-w-5xl mx-auto w-full relative pt-24 pb-20">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CRIMSON }} />
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>
              ICT Professional
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'Roboto Slab, serif', fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 300, color: WHITE, lineHeight: 1.2, maxWidth: '780px', marginBottom: '1.5rem' }}
          >
            I believe in the{' '}
            <span style={{ color: CRIMSON, fontWeight: 700 }}>BASICS</span>
            . Execute them{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>well</em>
            .{' '}
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Everything else follows.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: '440px', lineHeight: '1.8', marginBottom: '2.5rem' }}
          >
            Focused on structure and clarity. Building systems that scale through disciplined execution.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <button
              onClick={() => scrollTo('work')}
              className="px-7 py-3 transition-all duration-300"
              style={{ backgroundColor: CRIMSON, color: WHITE, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#96092E'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = CRIMSON; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              View Work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="transition-all duration-300"
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.color = WHITE; e.currentTarget.style.borderBottomColor = WHITE; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.25)'; }}
            >
              Get in touch
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: CRIMSON, fontSize: '1rem' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── STATS (WHITE) ───────────────────────────────────────────────── */}
      <section
        className="py-20 px-8 relative overflow-hidden"
        style={{ backgroundColor: WHITE, ...dotGrid('rgba(0,0,0,0.045)') }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <StatCounter end={3}   suffix="+" label="Years Experience"   />
            <StatCounter end={20}  suffix="+" label="Projects Delivered" />
            <StatCounter end={6}            label="Clients"              />
            <StatCounter end={100} suffix="%" label="Satisfaction"       />
          </div>
        </div>
      </section>

      {/* ── MARQUEE (CRIMSON) ───────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-4"
        style={{ backgroundColor: CRIMSON, borderTop: `1px solid rgba(0,0,0,0.15)`, borderBottom: `1px solid rgba(0,0,0,0.15)` }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', letterSpacing: '0.24em', fontWeight: 700, textTransform: 'uppercase' }}>
                {item}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.4rem' }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── PHILOSOPHY (WHITE) ──────────────────────────────────────────── */}
      <section
        id="approach"
        className="py-28 px-8 relative overflow-hidden"
        style={{ backgroundColor: WHITE }}
      >
        <div className="absolute inset-0 pointer-events-none" style={dotGrid('rgba(0,0,0,0.03)')} />
        <Watermark color="rgba(0,0,0,0.04)" size="clamp(8rem, 18vw, 18rem)" rotate={-4} align="right" vAlign="top">THINK</Watermark>

        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <SectionLabel>Philosophy</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Roboto Slab, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: BLACK, marginBottom: '3.5rem', maxWidth: '520px', lineHeight: 1.25 }}
          >
            How I approach every problem.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5">
            {philosophy.map((p, i) => <PhilosophyCard key={i} principle={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE (BLACK) ──────────────────────────────────────────── */}
      <section
        id="experience"
        className="py-28 px-8 relative overflow-hidden"
        style={{ backgroundColor: BLACK, ...dotGrid('rgba(177,14,60,0.06)') }}
      >
        <Watermark color="rgba(255,255,255,0.028)" size="clamp(8rem, 16vw, 16rem)" align="right" vAlign="top">DRIVEN</Watermark>

        <div className="max-w-4xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <SectionLabel onDark>Experience</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Roboto Slab, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: WHITE, marginBottom: '4rem', maxWidth: '480px', lineHeight: 1.25 }}
          >
            A track record of results.
          </motion.h2>

          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-[1px]"
              style={{ background: `linear-gradient(to bottom, ${CRIMSON}80, ${CRIMSON}30, transparent)` }}
            />
            {timeline.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── SKILLS (WHITE) ──────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-28 px-8 relative overflow-hidden"
        style={{ backgroundColor: WHITE, ...dotGrid('rgba(0,0,0,0.04)') }}
      >
        <Watermark color="rgba(0,0,0,0.04)" size="clamp(8rem, 18vw, 18rem)" align="left" vAlign="bottom" rotate={3}>CRAFT</Watermark>
        <div className="max-w-4xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <SectionLabel>Core Competencies</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Roboto Slab, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: BLACK, marginBottom: '3.5rem', maxWidth: '480px', lineHeight: 1.25 }}
          >
            Technical depth across the stack.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {skills.map((s, i) => <SkillBar key={i} skill={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WORK (CRIMSON) ──────────────────────────────────────────────── */}
      <section
        id="work"
        className="py-28 px-8 relative overflow-hidden"
        style={{ backgroundColor: CRIMSON, ...dotGrid('rgba(255,255,255,0.05)') }}
      >
        <Watermark color="rgba(0,0,0,0.1)" size="clamp(9rem, 20vw, 20rem)" align="right" vAlign="top">MADE</Watermark>

        <div className="max-w-6xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <SectionLabel onDark>Selected Work</SectionLabel>
          </motion.div>

          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: 'Roboto Slab, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: WHITE, maxWidth: '420px', lineHeight: 1.25 }}
            >
              Projects that speak for themselves.
            </motion.h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-2 transition-all duration-300 uppercase tracking-wider"
                  style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
                    color: activeFilter === cat ? CRIMSON : 'rgba(255,255,255,0.6)',
                    backgroundColor: activeFilter === cat ? WHITE : 'transparent',
                    border: `1px solid ${activeFilter === cat ? WHITE : 'rgba(255,255,255,0.25)'}`,
                  }}
                  onMouseEnter={e => { if (activeFilter !== cat) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = WHITE; } }}
                  onMouseLeave={e => { if (activeFilter !== cat) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; } }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={`${project.category}-${i}`} project={project} index={i} onClick={() => setSelectedProject(project)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT (BLACK) ─────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 px-8 relative overflow-hidden"
        style={{ backgroundColor: BLACK, ...dotGrid('rgba(177,14,60,0.06)') }}
      >
        <Watermark color="rgba(177,14,60,0.09)" size="clamp(9rem, 20vw, 20rem)" align="left" vAlign="bottom" rotate={-2}>HEY.</Watermark>

        <div className="max-w-4xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <SectionLabel onDark>Contact</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'Roboto Slab, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: WHITE, lineHeight: 1.15, marginBottom: '1.5rem' }}
          >
            Let's work{' '}
            <span style={{ color: CRIMSON }}>together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: '1.85', maxWidth: '460px', marginBottom: '3.5rem' }}
          >
            Open to new opportunities, collaborations, and interesting problems. Reach out and let's see what we can build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="mailto:name@example.com"
              className="px-7 py-3 transition-all duration-300 inline-block"
              style={{ backgroundColor: CRIMSON, color: WHITE, fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#96092E'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = CRIMSON; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              name@example.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 pb-1 transition-all duration-300"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.18)' }}
              onMouseEnter={e => { e.currentTarget.style.color = WHITE; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = WHITE; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(255,255,255,0.18)'; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="px-8 py-6" style={{ backgroundColor: '#080808', borderTop: `1px solid rgba(255,255,255,0.05)` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center text-xs font-black" style={{ backgroundColor: CRIMSON, color: WHITE }}>K</div>
            <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.75rem', letterSpacing: '0.06em' }}>Kaloyan</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', letterSpacing: '0.06em' }}>
            Focused on structure. Built on basics.
          </p>
        </div>
      </footer>

      {/* ── MODAL ───────────────────────────────────────────────────────── */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
