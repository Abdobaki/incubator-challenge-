import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ExternalLink, Users, Sprout, MessageSquare, Medal } from 'lucide-react';
import { startups, testimonials } from '../../data/index';
import { SectionHeader, Reveal } from '../ui/index';

// ═══════════════════════════════════════════════
// STARTUPS PREVIEW
// ═══════════════════════════════════════════════
export function StartupsPreview() {
  const featured = startups.slice(0, 3);

  return (
    <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <SectionHeader
            tag={<><Sprout size={14} /> Portfolio</>}
            title={<>Our <span className="gradient-text">Success Stories</span></>}
            subtitle="Meet the innovative startups that have graduated from BIS Incubator and are changing Algeria."
            align="left"
          />
          <Link to="/startups" className="btn-secondary flex-shrink-0" style={{ textDecoration: 'none' }}>
            All Startups <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((startup, i) => (
            <Reveal key={startup.id} delay={i * 120} direction="up">
              <div className="glass-card" style={{ height: '100%' }}>
                {/* Header */}
                <div
                  className="rounded-xl mb-5 flex items-center justify-center"
                  style={{
                    height: 100,
                    background: `linear-gradient(135deg, ${startup.color}20, ${startup.color}08)`,
                    border: `1px solid ${startup.color}25`,
                  }}
                >
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${startup.color}, ${startup.color}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Sora',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: 'white',
                    boxShadow: `0 8px 24px ${startup.color}40`,
                  }}>
                    {startup.initials}
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between mb-3">
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.05rem', color: '#F0F4FF' }}>
                    {startup.name}
                  </h3>
                  <div className="flex gap-2">
                    <span className={`badge ${startup.categoryColor}`} style={{ fontSize: '0.68rem' }}>{startup.category}</span>
                  </div>
                </div>

                <p style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'rgba(240,244,255,0.5)', marginBottom: 16, lineHeight: 1.6 }}>
                  {startup.tagline}
                </p>

                {/* Achievements */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {startup.achievements.slice(0, 2).map((a) => (
                    <span key={a} style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.68rem',
                      color: '#FCD34D',
                      background: 'rgba(245,158,11,0.1)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}>
                      <Medal size={12} style={{marginRight: 4}} /> {a}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={13} style={{ color: 'rgba(240,244,255,0.35)' }} />
                    <span style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'rgba(240,244,255,0.4)' }}>
                      {startup.team} people
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.75rem',
                    color: startup.color,
                    fontWeight: 600,
                  }}>
                    {startup.raised}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════
export function Testimonials() {
  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="orb orb-violet" style={{ width: 400, height: 400, top: '20%', right: '-100px', opacity: 0.1 }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag={<><MessageSquare size={14} /> Founder Stories</>}
          title={<>What Our <span className="gradient-text">Founders Say</span></>}
          subtitle="Real stories from real entrepreneurs who built their startups at BIS Incubator."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 150} direction="up">
              <div className="glass-card" style={{ height: '100%', position: 'relative' }}>
                {/* Quote mark */}
                <div style={{
                  position: 'absolute',
                  top: 20,
                  right: 24,
                  fontFamily: 'Sora',
                  fontSize: '5rem',
                  fontWeight: 800,
                  color: t.color,
                  opacity: 0.08,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}>
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                  ))}
                </div>

                <p style={{
                  fontFamily: 'Outfit',
                  fontSize: '0.95rem',
                  color: 'rgba(240,244,255,0.7)',
                  lineHeight: 1.75,
                  marginBottom: 24,
                  fontStyle: 'italic',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Sora',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'white',
                    flexShrink: 0,
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem', color: '#F0F4FF' }}>{t.name}</p>
                    <p style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,244,255,0.45)' }}>
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
