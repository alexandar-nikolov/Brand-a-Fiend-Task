import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Project {
  title: string;
  desc: string;
  category: string;
  details: string;
  challenge: string;
  approach: string;
  outcome: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white max-w-3xl w-full max-h-[80vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 transition-colors hover:bg-gray-100"
            style={{ color: '#6B6B6B' }}
          >
            <X size={24} />
          </button>

          <div className="p-12">
            <div className="mb-2 uppercase tracking-widest" style={{ color: '#C8102E', fontSize: '0.75rem' }}>
              {project.category}
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'Roboto Slab, serif',
                fontSize: '2rem',
                fontWeight: 300,
                color: '#1E1E1E',
              }}
            >
              {project.title}
            </h2>
            <p className="mb-12" style={{ color: '#6B6B6B', fontSize: '1.125rem' }}>
              {project.desc}
            </p>

            <div className="space-y-8">
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#1E1E1E',
                    letterSpacing: '0.05em',
                  }}
                >
                  THE CHALLENGE
                </h3>
                <div
                  className="w-12 h-[1px] mb-4"
                  style={{ backgroundColor: '#C8102E' }}
                ></div>
                <p style={{ color: '#6B6B6B', lineHeight: '1.8' }}>{project.challenge}</p>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#1E1E1E',
                    letterSpacing: '0.05em',
                  }}
                >
                  THE APPROACH
                </h3>
                <div
                  className="w-12 h-[1px] mb-4"
                  style={{ backgroundColor: '#C8102E' }}
                ></div>
                <p style={{ color: '#6B6B6B', lineHeight: '1.8' }}>{project.approach}</p>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#1E1E1E',
                    letterSpacing: '0.05em',
                  }}
                >
                  THE OUTCOME
                </h3>
                <div
                  className="w-12 h-[1px] mb-4"
                  style={{ backgroundColor: '#C8102E' }}
                ></div>
                <p style={{ color: '#6B6B6B', lineHeight: '1.8' }}>{project.outcome}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
