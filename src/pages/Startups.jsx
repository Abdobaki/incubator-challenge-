import React, { useEffect, useState } from 'react';
import { ExternalLink, Users, Calendar, Search, Filter, Sprout, Medal } from 'lucide-react';
import { startups } from '../data/index';
import { SectionHeader, Reveal } from '../components/ui/index';

const categories = ['All', 'AgriTech', 'EdTech', 'HealthTech', 'CleanTech', 'LogisTech', 'FinTech'];

export default function Startups() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = startups.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{
        padding: '80px 0 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.1) 0%, transparent 60%), var(--bg-startups-overlay, none), var(--bg-startups, none) center/cover no-repeat, var(--navy-950)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb orb-cyan" style={{ width: 500, height: 500, top: '-200px', right: '-100px', opacity: 0.08 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-tag"><Sprout size={14} /> Startup Portfolio</div>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F0F4FF', lineHeight: 1.1, marginBottom: 20, maxWidth: 680 }}>
              Meet the <span className="gradient-text">Innovators</span> We've Built
            </h1>
            <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.75 }}>
              120+ startups have graduated from BIS Incubator. Here are some of the companies redefining industries across Algeria and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '40px 0 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div style={{ position: 'relative', maxWidth: 320, width: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,244,255,0.3)' }} />
              <input
                className="input-glass"
                style={{ paddingLeft: 42 }}
                placeholder="Search startups..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: 'Outfit',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    padding: '7px 16px',
                    borderRadius: 10,
                    border: activeCategory === cat ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    background: activeCategory === cat ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                    color: activeCategory === cat ? '#60A5FA' : 'rgba(240,244,255,0.55)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Startups Grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div style={{ marginBottom: 16 }}><Search size={48} style={{ color: 'rgba(240,244,255,0.3)' }} /></div>
              <p style={{ fontFamily: 'Sora', fontWeight: 600, color: 'rgba(240,244,255,0.5)', fontSize: '1.1rem' }}>No startups found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((startup, i) => (
                <Reveal key={startup.id} delay={i * 80} direction="up">
                  <div className="glass-card" style={{ height: '100%' }}>
                    {/* Header banner */}
                    <div
                      className="rounded-xl mb-5"
                      style={{
                        height: 120,
                        background: `linear-gradient(135deg, ${startup.color}22, ${startup.color}08)`,
                        border: `1px solid ${startup.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%',
                        background: `radial-gradient(circle, ${startup.color}30, transparent)`,
                      }} />
                      <div style={{
                        width: 64,
                        height: 64,
                        borderRadius: 18,
                        background: `linear-gradient(135deg, ${startup.color}, ${startup.color}AA)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Sora',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        color: 'white',
                        boxShadow: `0 8px 24px ${startup.color}50`,
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        {startup.initials}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`badge ${startup.categoryColor}`} style={{ fontSize: '0.68rem' }}>{startup.category}</span>
                      <span className={`badge ${startup.stageColor}`} style={{ fontSize: '0.68rem' }}>{startup.stage}</span>
                    </div>

                    <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.1rem', color: '#F0F4FF', marginBottom: 6 }}>
                      {startup.name}
                    </h3>
                    <p style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: startup.color, marginBottom: 10, fontWeight: 500 }}>
                      {startup.tagline}
                    </p>
                    <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 16 }}>
                      {startup.description}
                    </p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {startup.achievements.map(a => (
                        <span key={a} style={{
                          fontFamily: 'JetBrains Mono',
                          fontSize: '0.66rem',
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
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <Users size={12} style={{ color: 'rgba(240,244,255,0.35)' }} />
                          <span style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,244,255,0.4)' }}>{startup.team} people</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} style={{ color: 'rgba(240,244,255,0.35)' }} />
                          <span style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,244,255,0.4)' }}>{startup.founded}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: startup.color, fontWeight: 600 }}>
                          {startup.raised} raised
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
