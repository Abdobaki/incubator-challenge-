import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Search, ArrowRight, BookOpen } from 'lucide-react';
import { newsArticles } from '../data/index';
import { SectionHeader, Reveal } from '../components/ui/index';

const categories = ['All', 'Award', 'Funding', 'Program', 'Achievement', 'Partnership', 'Announcement'];

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = newsArticles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = newsArticles.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured || search || activeCategory !== 'All');

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const catEmoji = {
    Award: '🏆', Funding: '💰', Program: '🎯', Achievement: '🥇', Partnership: '🤝', Announcement: '📣'
  };

  return (
    <main style={{ paddingTop: 72 }}>
      <section style={{
        padding: '80px 0 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), var(--navy-950)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-tag">📰 News & Blog</div>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F0F4FF', lineHeight: 1.1, marginBottom: 20, maxWidth: 680 }}>
              Stories from the <span className="gradient-text">Innovation Frontier</span>
            </h1>
            <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.75 }}>
              The latest news, success stories, and insights from the BIS Incubator ecosystem.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Article */}
      {featured && activeCategory === 'All' && !search && (
        <section style={{ padding: '60px 0 0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div
                className="glass-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(109,40,217,0.08))',
                  border: '1px solid rgba(79,70,229,0.25)',
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image placeholder */}
                  <div style={{
                    minHeight: 280,
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(109,40,217,0.15))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div className="orb orb-blue" style={{ width: 300, height: 300, top: '-80px', left: '-60px', opacity: 0.25 }} />
                    🏆
                  </div>
                  {/* Content */}
                  <div style={{ padding: '40px 40px' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span style={{
                        fontFamily: 'JetBrains Mono',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: 'white',
                        background: 'linear-gradient(135deg, #3B82F6, #6D28D9)',
                        padding: '3px 10px',
                        borderRadius: 6,
                        letterSpacing: '0.08em',
                      }}>
                        FEATURED
                      </span>
                      <span className={`badge ${featured.categoryColor}`} style={{ fontSize: '0.68rem' }}>
                        {catEmoji[featured.category]} {featured.category}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#F0F4FF', marginBottom: 14, lineHeight: 1.3 }}>
                      {featured.title}
                    </h2>
                    <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 24 }}>
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={13} style={{ color: 'rgba(240,244,255,0.35)' }} />
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'rgba(240,244,255,0.4)' }}>{formatDate(featured.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={13} style={{ color: 'rgba(240,244,255,0.35)' }} />
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'rgba(240,244,255,0.4)' }}>{featured.readTime}</span>
                        </div>
                      </div>
                      <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                        Read Article <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section style={{ padding: '40px 0 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div style={{ position: 'relative', maxWidth: 300, width: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,244,255,0.3)' }} />
              <input
                className="input-glass"
                style={{ paddingLeft: 42 }}
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.82rem',
                    padding: '7px 14px', borderRadius: 10,
                    border: activeCategory === cat ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.1)',
                    background: activeCategory === cat ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                    color: activeCategory === cat ? '#60A5FA' : 'rgba(240,244,255,0.55)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {cat !== 'All' ? `${catEmoji[cat]} ` : ''}{cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <Reveal key={article.id} delay={i * 80} direction="up">
                <div className="glass-card" style={{ height: '100%', cursor: 'pointer' }}>
                  <div
                    className="rounded-xl mb-5"
                    style={{
                      height: 130,
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(109,40,217,0.08))',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '2.8rem',
                    }}
                  >
                    {catEmoji[article.category] || '📰'}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge ${article.categoryColor}`} style={{ fontSize: '0.68rem' }}>
                      {catEmoji[article.category]} {article.category}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(240,244,255,0.3)' }}>
                      {formatDate(article.date)}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.97rem', color: '#F0F4FF', lineHeight: 1.45, marginBottom: 10 }}>
                    {article.title}
                  </h3>
                  <p style={{
                    color: 'rgba(240,244,255,0.5)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 16,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,244,255,0.35)' }}>
                      {article.readTime} · {article.author}
                    </span>
                    <button style={{
                      color: '#60A5FA', fontSize: '0.82rem', fontWeight: 600, background: 'none', border: 'none',
                      cursor: 'pointer', fontFamily: 'Sora', display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      Read <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ fontSize: '3rem', marginBottom: 16 }}>📭</p>
              <p style={{ fontFamily: 'Sora', fontWeight: 600, color: 'rgba(240,244,255,0.5)', fontSize: '1.1rem' }}>No articles found</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
