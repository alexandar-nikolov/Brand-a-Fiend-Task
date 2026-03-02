import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ProjectModal } from './components/ProjectModal';
import { StatCounter } from './components/StatCounter';

interface Project {
  title: string;
  desc: string;
  category: string;
  details: string;
  challenge: string;
  approach: string;
  outcome: string;
}

const projects: Project[] = [
  {
    title: 'Project name',
    desc: 'Descriptions field',
    category: 'Category of project',
    details: 'details field',
    challenge:
      'challenges field',
    approach:
      'aprroaches section',
    outcome:
      'Outcome section',
  },
  {
        title: 'Project name',
    desc: 'Descriptions field',
    category: 'Category of project',
    details: 'details field',
    challenge:
      'challenges field',
    approach:
      'aprroaches section',
    outcome:
      'Outcome section',
  },
  {
        title: 'Project name',
    desc: 'Descriptions field',
    category: 'Category of project',
    details: 'details field',
    challenge:
      'challenges field',
    approach:
      'aprroaches section',
    outcome:
      'Outcome section',
  },
  {
        title: 'Project name',
    desc: 'Descriptions field',
    category: 'Category of project',
    details: 'details field',
    challenge:
      'challenges field',
    approach:
      'aprroaches section',
    outcome:
      'Outcome section',
  },
  {
        title: 'Project name',
    desc: 'Descriptions field',
    category: 'Category of project',
    details: 'details field',
    challenge:
      'challenges field',
    approach:
      'aprroaches section',
    outcome:
      'Outcome section',
  },
  {
        title: 'Project name',
    desc: 'Descriptions field',
    category: 'Category of project',
    details: 'details field',
    challenge:
      'challenges field',
    approach:
      'aprroaches section',
    outcome:
      'Outcome section',
  },
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
  {
    year: '2024–Present',
    title: 'Position',
    organization: 'organisation name',
    description: 'Description of work and position',
  },
  {
    year: '2024–Present',
    title: 'Position',
    organization: 'organisation name',
    description: 'Description of work and position',
  },
  {
    year: '2024–Present',
    title: 'Position',
    organization: 'organisation name',
    description: 'Description of work and position',
  },
  {
    year: '2024–Present',
    title: 'Position',
    organization: 'organisation name',
    description: 'Description of work and position',
  },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  const categories = ['all', 'filter 1', 'filter 2', 'filter 3'];

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#B10E3C' }}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={{
          backgroundColor: isScrolled ? 'rgba(177, 14, 60, 0.95)' : '#B10E3C',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          boxShadow: isScrolled ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="tracking-wide" style={{ color: '#FFFFFF', letterSpacing: '0.1em', fontWeight: 600 }}>
            Kaloyan
          </div>
          <nav className="flex gap-8">
            <button
              onClick={() => scrollToSection('approach')}
              className="lowercase transition-colors"
              style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
            >
              approach
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="lowercase transition-colors"
              style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
            >
              experience
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="lowercase transition-colors"
              style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
            >
              skills
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="lowercase transition-colors"
              style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
            >
              work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="lowercase transition-colors"
              style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
            >
              contact
            </button>
          </nav>
        </div>
        <div className="w-full h-[1px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}></div>
      </header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="pt-40 pb-32 px-8 relative overflow-hidden"
      >
        {/* Decorative red lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[15%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          ></div>
          <div
            className="absolute top-[45%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          ></div>
          <div
            className="absolute top-[75%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
          ></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-32 right-[10%] w-32 h-32 opacity-10">
          <div
            className="w-full h-full"
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0px, rgba(255, 255, 255, 0.3) 1px, transparent 1px, transparent 8px)',
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              className="mb-6 leading-relaxed"
              style={{
                fontFamily: 'Roboto Slab, serif',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: '1.4',
              }}
            >
              I believe in the <span style={{ color: '#FFFFFF', fontWeight: '600' }}>BASICS</span>. Execute them well.
              Everything else follows.
            </p>
            <p className="mt-8" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.125rem' }}>
              ICT professional, focused on structure and clarity.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 px-8 relative overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Decorative red lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[20%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: '#C8102E', opacity: 0.08 }}
          ></div>
          <div
            className="absolute bottom-[30%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: '#C8102E', opacity: 0.08 }}
          ></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-12">
            <StatCounter end={3} suffix="+" label="Years Experience" />
            <StatCounter end={20} suffix="+" label="Projects Delivered" />
            <StatCounter end={6} label="Clients had" />
            <StatCounter end={100} suffix="%" label="Satisfaction guaranteed" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="approach" className="py-24 px-8 relative overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Decorative red lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[25%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: '#C8102E', opacity: 0.1 }}
          ></div>
          <div
            className="absolute top-[60%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: '#C8102E', opacity: 0.12 }}
          ></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <h2
            className="mb-16"
            style={{
              fontFamily: 'Roboto Slab, serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#C8102E',
            }}
          >
            Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Structured',
                desc: 'I break down problems into clear steps.',
                icon: '01',
              },
              {
                title: 'Disciplined',
                desc: 'I follow through, consistently.',
                icon: '02',
              },
              {
                title: 'Basics‑first',
                desc: 'Master the fundamentals before adding complexity.',
                icon: '03',
              },
            ].map((principle, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: '-100px' });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div
                    className="p-8 bg-white transition-all duration-300 relative"
                    style={{
                      borderLeft: '2px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = '#C8102E';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderLeftColor = 'transparent';
                    }}
                  >
                    <div
                      className="absolute top-6 right-6 text-6xl opacity-5 group-hover:opacity-10 transition-opacity"
                      style={{ fontFamily: 'Roboto Slab, serif', color: '#C8102E' }}
                    >
                      {principle.icon}
                    </div>
                    <h3
                      className="mb-4 relative z-10"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: '#1E1E1E',
                      }}
                    >
                      {principle.title}
                    </h3>
                    <p
                      className="relative z-10"
                      style={{ color: '#6B6B6B', fontSize: '0.95rem', lineHeight: '1.7' }}
                    >
                      {principle.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-8" style={{ backgroundColor: '#B10E3C' }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="mb-16"
            style={{
              fontFamily: 'Roboto Slab, serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#FFFFFF',
            }}
          >
            Experience
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[1px]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            ></div>

            {timeline.map((item, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: '-50px' });

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-12 pb-16 group"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: '#B10E3C',
                      border: '2px solid #FFFFFF',
                    }}
                  ></div>

                  <div
                    className="mb-2 uppercase tracking-widest"
                    style={{ color: '#FFFFFF', fontSize: '0.75rem' }}
                  >
                    {item.year}
                  </div>
                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: '#FFFFFF',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div className="mb-3" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                    {item.organization}
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-8 relative overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Decorative red lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[18%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: '#C8102E', opacity: 0.09 }}
          ></div>
          <div
            className="absolute bottom-[15%] left-0 right-0 h-[1px]"
            style={{ backgroundColor: '#C8102E', opacity: 0.11 }}
          ></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <h2
            className="mb-16"
            style={{
              fontFamily: 'Roboto Slab, serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#C8102E',
            }}
          >
            Core Competencies
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {skills.map((skill, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: '-50px' });

              return (
                <div key={index} ref={ref}>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: '#1E1E1E', fontSize: '0.95rem' }}>{skill.name}</span>
                    <span style={{ color: '#6B6B6B', fontSize: '0.85rem' }}>{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-gray-200 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                      className="h-full"
                      style={{ backgroundColor: '#C8102E' }}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-8" style={{ backgroundColor: '#B10E3C' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="mb-12"
            style={{
              fontFamily: 'Roboto Slab, serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#FFFFFF',
            }}
          >
            Selected Work
          </h2>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className="px-4 py-2 transition-all duration-300 uppercase tracking-wider"
                style={{
                  fontSize: '0.75rem',
                  color: activeFilter === category ? '#C8102E' : 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: activeFilter === category ? '#FFFFFF' : 'transparent',
                  border: `1px solid ${activeFilter === category ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)'}`,
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group p-8 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className="mb-2 uppercase tracking-widest"
                  style={{ color: '#FFFFFF', fontSize: '0.65rem' }}
                >
                  {project.category}
                </div>
                <h3
                  className="mb-3 group-hover:underline group-hover:decoration-white transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#FFFFFF',
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>{project.desc}</p>
                <div className="mt-6 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                  <span style={{ fontSize: '0.85rem' }}>View details</span>
                  <span>→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-32 px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="w-full h-[1px] mb-12" style={{ backgroundColor: '#FFFFFF' }}></div>

          {/* Samo Cska Reference - Subtle striped element */}
          <div className="flex items-center justify-center mb-8">
            <div
              className="w-16 h-2"
              style={{
                background:
                  'repeating-linear-gradient(90deg, #FFFFFF 0px, #FFFFFF 4px, #C8102E 4px, #C8102E 8px)',
                opacity: 0.6,
              }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a
                href="mailto:name@example.com"
                className="transition-colors"
                style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
              >
                name@example.com
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>Kaloyan</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}