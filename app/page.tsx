"use client";
import { motion } from 'framer-motion';

const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const typewriterChar = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const TypewriterText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <motion.p 
      className={className}
      variants={typewriterContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {text.split(' ').map((word, index) => (
        <span key={index} style={{ display: 'inline-block', marginRight: '0.3em' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span key={charIndex} variants={typewriterChar} style={{ display: 'inline-block' }}>
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.p>
  );
};

export default function Home() {
  return (
    <div className="container">
        {/* SECTION 1: HERO / OUTCOMES */}
        <motion.div 
            className="section text-protect" 
            id="hero"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
        >
            <div className="block-group" style={{marginBottom: 0}}>

                <h2 className="modern-title" style={{ marginTop: '18rem' }}>
                    Where <span className="accent-text">Complexity</span><br/>
                    Becomes Clarity
                </h2>
                <p className="hero-subtitle" style={{textAlign: 'left'}}>
                    We automate the processes that drain your team&apos;s time and build the intelligence layer that makes<br/>your data worth having.
                </p>

            </div>

            {/* Cards pinned to bottom of hero section */}
            <div className="card-row text-protect">
                <div className="card">
                    <div className="card-icon">
                        <svg className="gear-icon" viewBox="0 0 24 24">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                        </svg>
                    </div>
                    <strong className="heading-text">Workflow automation</strong>
                    <span className="matter-text">Consistent, reliable, and fully automated.</span>
                </div>
                <div className="card">
                    <div className="card-icon">⟍</div>
                    <strong className="heading-text">Actionable intelligence</strong>
                    <span className="matter-text">Turn data into actionable decisions.</span>
                </div>
                <div className="card">
                    <div className="card-icon">⇄</div>
                    <strong className="heading-text">End-to-end continuity</strong>
                    <span className="matter-text">Connecting data precisely, source to output.</span>
                </div>
            </div>
        </motion.div>

        {/* SECTION 3: AUTOMATION */}
        <motion.div 
            className="section text-protect" 
            id="automation"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: 'spring' }}
        >
            <h2 className="section-title">AUTOMATION</h2>
            <TypewriterText 
                text="Automation transforms manual workflows into secure, automatic operations that scale. This instantly frees up your resources to drive faster, smarter decisions and continuous innovation." 
                className="section-subtitle" 
            />
            <div className="sleek-masonry">
                {[
                    { title: 'Standardize', desc: 'Make every process run exactly the same way every time.' },
                    { title: 'Accelerate', desc: 'Reduce the time it takes to finish daily operational tasks.' },
                    { title: 'Secure', desc: 'Enforce company policies automatically without manual checks.' },
                    { title: 'Scale', desc: 'Handle more workload easily as your business grows.' }
                ].map(({title, desc}) => (
                    <div className="sleek-item" key={title}>
                        <strong className="heading-text">{title}</strong>
                        <span className="matter-text">{desc}</span>
                    </div>
                ))}
            </div>
        </motion.div>

        {/* SECTION 4: BI */}
        <motion.div 
            className="section text-protect" 
            id="bi"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: 'spring' }}
        >
            <h2 className="section-title">BUSINESS INTELLIGENCE</h2>
            <TypewriterText 
                text="Business Intelligence provide actionable insights, helping teams make informed decisions and track real performance." 
                className="section-subtitle" 
            />
            <div className="sleek-masonry">
                {[
                    { title: 'Visibility', desc: 'See exactly how your department is performing in real-time.' },
                    { title: 'Analyze', desc: 'Find where delays happen and fix them before they grow.' },
                    { title: 'Predict', desc: 'Use your data to forecast trends and customer needs.' },
                    { title: 'Report', desc: 'Generate automatic summaries of your operations and transactions.' },
                    { title: 'Compare', desc: 'Measure your efficiency against your past records and industry standards.' }
                ].map(({title, desc}) => (
                    <div className="sleek-item" key={title}>
                        <strong className="heading-text">{title}</strong>
                        <span className="matter-text">{desc}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    </div>
  );
}
