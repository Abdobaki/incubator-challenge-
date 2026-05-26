import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ChevronDown, Sparkles, Newspaper, Clock, ExternalLink } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { newsArticles as fallbackNews } from '../../data/index';

function Particles() {
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: `${Math.random() * 15 + 10}s`,
    delay: `${Math.random() * 10}s`,
    color: ['#3B82F6', '#8B5CF6', '#00D4FF', '#10B981'][Math.floor(Math.random() * 4)],
  })), []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const wordsRef = useRef([
    t('hero.typed.innovation'),
    t('hero.typed.startups'),
    t('hero.typed.entrepreneurs'),
    t('hero.typed.future'),
  ]);

  const [displayed, setDisplayed] = useState('');
  const [newsItems] = useState(() => {
    try { const raw = localStorage.getItem('bis-admin-news'); const d = raw ? JSON.parse(raw) : null; if (Array.isArray(d)) return d; } catch {}
    return fallbackNews;
  });

  useEffect(() => {
    wordsRef.current = [
      t('hero.typed.innovation'),
      t('hero.typed.startups'),
      t('hero.typed.entrepreneurs'),
      t('hero.typed.future'),
    ];
  });

  useEffect(() => {
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let cancelled = false;

    const loop = () => {
      if (cancelled) return;
      const word = wordsRef.current[wordIdx];

      if (!deleting) {
        charIdx++;
        setDisplayed(word.slice(0, charIdx));
        if (charIdx >= word.length) {
          setTimeout(() => {
            if (cancelled) return;
            deleting = true;
            loop();
          }, 2200);
          return;
        }
        setTimeout(loop, 80);
      } else {
        charIdx--;
        setDisplayed(word.slice(0, charIdx));
        if (charIdx <= 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % wordsRef.current.length;
          charIdx = 0;
          setTimeout(loop, 400);
          return;
        }
        setTimeout(loop, 45);
      }
    };

    const t0 = setTimeout(loop, 500);
    return () => { cancelled = true; clearTimeout(t0); };
  }, []);

  return (
    <section
      className="hero-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72,
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-blue animate-float" style={{ width: 600, height: 600, top: '-200px', left: '-200px', opacity: 0.12 }} />
      <div className="orb orb-violet animate-float-delayed" style={{ width: 500, height: 500, top: '20%', right: '-150px', opacity: 0.1 }} />
      <div className="orb orb-cyan animate-float-slow" style={{ width: 400, height: 400, bottom: '-100px', left: '30%', opacity: 0.08 }} />

      {/* Particles */}
      <Particles />

      {/* Grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Tag */}
            <div
              className="section-tag"
              style={{
                animation: 'slideUp 0.6s ease-out 0.2s both',
              }}
            >
              <Sparkles size={12} />
              {t('hero.tag')}
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'Sora',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                color: '#F0F4FF',
                lineHeight: 1.1,
                marginBottom: 24,
                animation: 'slideUp 0.6s ease-out 0.4s both',
              }}
            >
              {t('hero.headline')}{' '}
              <span
                className="gradient-text-static"
                style={{ display: 'block' }}
              >
                {displayed}
                <span style={{
                  display: 'inline-block',
                  width: 3,
                  height: '0.85em',
                  background: '#3B82F6',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  borderRadius: 2,
                  animation: 'pulseGlow 1s ease-in-out infinite',
                }}>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: 'rgba(240,244,255,0.65)',
                fontSize: '1.15rem',
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 520,
                animation: 'slideUp 0.6s ease-out 0.6s both',
              }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: 'slideUp 0.6s ease-out 0.8s both' }}
            >
              <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '15px 34px' }}>
                {t('hero.cta')} <ArrowRight size={20} />
              </Link>
              <Link to="/startups" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '1rem' }}>
                <Play size={18} fill="currentColor" />
                {t('hero.viewStartups')}
              </Link>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap gap-6 mt-12"
              style={{ animation: 'slideUp 0.6s ease-out 1s both' }}
            >
              {[
                { value: '975+', label: t('hero.trust.startups') },
                { value: '8+', label: t('hero.trust.years') },
                { value: '50M+', label: t('hero.trust.raised') },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.1)' }} />
                  <div>
                    <p style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.3rem', color: '#F0F4FF', lineHeight: 1 }}>{value}</p>
                    <p style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,244,255,0.45)', marginTop: 2 }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mini News Feed */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              animation: 'fadeIn 0.8s ease-out 0.6s both',
            }}
          >
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: 440,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Panel header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 22px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'rgba(59,130,246,0.15)',
                    border: '1px solid rgba(59,130,246,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Newspaper size={14} style={{ color: '#60A5FA' }} />
                  </div>
                  <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    Latest Updates
                  </span>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>● Live</span>
              </div>

              {/* News items */}
              <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
                {[...newsItems]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 3)
                  .map((article, i) => (
                    <Link
                      key={article.id}
                      to="/news"
                      style={{
                        display: 'flex',
                        gap: 14,
                        padding: '14px 22px',
                        textDecoration: 'none',
                        borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        width: 64, height: 64, borderRadius: 10, overflow: 'hidden',
                        flexShrink: 0, background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}>
                        <img
                          src={article.image}
                          alt={article.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                          <span className={`badge ${article.categoryColor || 'badge-blue'}`} style={{ fontSize: '0.6rem', padding: '2px 7px' }}>
                            {article.category}
                          </span>
                        </div>
                        <p style={{
                          fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.82rem',
                          color: 'var(--text-primary)',
                          lineHeight: 1.35,
                          marginBottom: 6,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {article.title}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={10} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                            {new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Footer */}
              <div style={{
                padding: '12px 22px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Link
                  to="/news"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.8rem',
                    color: '#60A5FA', textDecoration: 'none',
                    transition: 'gap 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  View all news <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'fadeIn 1s ease-out 1.5s both',
        }}
      >
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'rgba(240,244,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {t('hero.scroll')}
        </p>
        <ChevronDown
          size={18}
          style={{ color: 'rgba(240,244,255,0.25)', animation: 'float 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}
