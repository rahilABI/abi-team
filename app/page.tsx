"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Clock, Cog, ShieldCheck, Ticket, BarChart2, Activity, TrendingUp, Eye, Settings } from 'lucide-react';

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
  const [metrics, setMetrics] = useState([
    { value: '...', label: 'Total Projects' },
    { value: '...', label: 'Total Hours Saved' },
    { value: '...', label: 'Data Visibility' },
    { value: '...', label: 'Optimization' }
  ]);

  useEffect(() => {
    async function fetchMetrics() {
      // Fetch all published projects
      const { data: projectsData, error: projErr } = await supabase
        .from('projects')
        .select('ticket_id')
        .eq('is_published', true);

      if (projErr || !projectsData || projectsData.length === 0) {
        setMetrics([
            { value: '0', label: 'Total Projects' },
            { value: '0', label: 'Total Hours Saved' },
            { value: '0x', label: 'Data Visibility' },
            { value: 'High', label: 'Optimization' }
        ]);
        return;
      }

      const publishedTicketIds = projectsData.map(p => p.ticket_id);

      // Fetch metrics for these projects
      const { data: metricsData, error: metErr } = await supabase
        .from('project_metrics')
        .select('*')
        .in('ticket_id', publishedTicketIds);

      if (metErr || !metricsData) return;

      const totalProjects = publishedTicketIds.length;
      let totalHours = 0;
      let visibilityMax = 0;
      let optSum = 0;
      let optCount = 0;

      metricsData.forEach(m => {
        if (m.total_hours_saved) totalHours += m.total_hours_saved;
        if (m.data_visibility_improved && m.data_visibility_improved > visibilityMax) {
          visibilityMax = m.data_visibility_improved;
        }
        if (m.optimization_rate) {
          optSum += m.optimization_rate;
          optCount++;
        }
      });

      const avgOptimization = optCount > 0 ? Math.round(optSum / optCount) : 100;
      const formattedHours = '1007+';
      
      const repVisibility = visibilityMax > 0 ? `${visibilityMax}x` : '3x';
      const repOptimization = `${avgOptimization}%`;

      setMetrics([
        { value: totalProjects.toString(), label: 'Total Projects' },
        { value: formattedHours, label: 'Total Hours Saved' },
        { value: repVisibility, label: 'Data Visibility' },
        { value: repOptimization, label: 'Optimization' }
      ]);
    }
    fetchMetrics();
  }, []);

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
        <div className="block-group" style={{ marginBottom: 0 }}>

          <div style={{ display: 'inline-block', textAlign: 'left' }}>
            <h2 className="modern-title" style={{ marginTop: '4rem', marginBottom: '1.5rem', textAlign: 'left', fontSize: 'clamp(3.8rem, 7.6vw, 7.1rem)', lineHeight: '1.05' }}>
              Where <span className="accent-text">Complexity</span><br />
              <span style={{ display: 'inline-block', marginLeft: '0.6em' }}>
                Becomes Clarity
              </span>
            </h2>
          </div>
          <div style={{
            textAlign: 'center',
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontFamily: '"Comfortaa", sans-serif',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
            fontStyle: 'normal'
          }}>
            Automate the grind. Let your data speak for itself.
          </div>

        </div>

        {/* Action Buttons */}
        <div className="text-protect" style={{ display: 'flex', gap: '2rem', marginTop: '18rem', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
            <a href="/projects" style={{ padding: '1.2rem 4rem', fontSize: '1.2rem', background: 'rgba(56, 189, 248, 0.15)', backdropFilter: 'blur(10px)', color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.6)', borderRadius: '50px', border: '1px solid rgba(226, 232, 240, 0.4)', textDecoration: 'none', fontWeight: '800', display: 'inline-block', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>Explore Projects</a>
            <a href="/query" style={{ padding: '1.2rem 4rem', fontSize: '1.2rem', background: 'rgba(56, 189, 248, 0.15)', backdropFilter: 'blur(10px)', color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.6)', borderRadius: '50px', border: '1px solid rgba(226, 232, 240, 0.4)', textDecoration: 'none', fontWeight: '800', display: 'inline-block', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>Let&apos;s Build!</a>
        </div>

        {/* Blended Metrics Section */}
        <div className="text-protect" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', width: '100%', maxWidth: '1100px', marginTop: '4rem', marginBottom: '2rem', textAlign: 'center' }}>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #bae6fd 0%, #0ea5e9 50%, #bae6fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', lineHeight: '1', textShadow: '0 4px 20px rgba(14, 165, 233, 0.3)' }}>{metric.value}</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{metric.label}</span>
            </div>
          ))}
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
        <p className="section-subtitle">
          Automation handles the tasks your team repeats every day and creates room for your team to explore new ways of working, build flows around ideas that were never possible manually, and sharpen every process until it runs at its absolute best.
        </p>
        <div className="sleek-masonry">
          {[
            { title: 'Hours Saved', desc: 'What took hours now takes minutes.', icon: Cog, animProps: { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 6, ease: "linear" } } },
            { title: 'Implementation', desc: 'We understand your process and build the automation around it.', icon: Settings, animProps: { animate: { rotate: -360 }, transition: { repeat: Infinity, duration: 8, ease: "linear" } } },
            { title: 'Quality', desc: 'Automation keeps your processes aligned to your standards.', icon: Cog, animProps: { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 10, ease: "linear" } } },
            { title: 'Opportunities', desc: 'Automation enhances opportunities, opening doors for new innovation and problem-solving.', icon: Settings, animProps: { animate: { rotate: -360 }, transition: { repeat: Infinity, duration: 5, ease: "linear" } } }
          ].map(({ title, desc, icon: Icon, animProps }) => (
            <div className="sleek-item" key={title}>
              <strong className="heading-text flex items-center gap-2 mb-2">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <motion.div animate={animProps.animate} transition={animProps.transition} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon className="w-5 h-5 text-white/50 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                  </motion.div>
                </div>
                {title}
              </strong>
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
        <p className="section-subtitle">
          Business Intelligence provide actionable insights, helping teams make informed decisions and track real performance.
        </p>
        <div className="sleek-masonry">
          {[
            { title: 'Know Your Numbers', desc: 'See exactly how your operations are performing right now, not yesterday.', icon: BarChart2, animProps: { animate: { y: [0, -4, 0], scaleY: [1, 1.2, 1] }, transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } } },
            { title: 'Find What\'s Slowing You Down', desc: 'Identify exactly where bottlenecks happen so you can fix them at the source.', icon: Activity, animProps: { animate: { scale: [1, 1.3, 1, 1.3, 1] }, transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } } },
            { title: 'Plan Ahead With Confidence', desc: 'Forecast upcoming trends so you can prepare before they become urgent problems.', icon: TrendingUp, animProps: { animate: { x: [0, 4, 0], y: [0, -4, 0] }, transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } } },
            { title: 'Visibility Into Operation', desc: 'Data Analysis across every team and process without the noise.', icon: Eye, animProps: { animate: { scaleY: [1, 0.1, 1] }, transition: { repeat: Infinity, duration: 4, repeatDelay: 1.5, ease: "circIn" } } }
          ].map(({ title, desc, icon: Icon, animProps }) => (
            <div className="sleek-item" key={title}>
              <strong className="heading-text flex items-center gap-2 mb-2 justify-end">
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <motion.div animate={animProps.animate} transition={animProps.transition} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon className="w-5 h-5 text-white/50 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                  </motion.div>
                </div>
                {title}
              </strong>
              <span className="matter-text">{desc}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
