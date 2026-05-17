import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ChevronDown, Sparkles, Trophy, Rocket } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

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
      className="hero-bg grid-bg"
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

          {/* Right: Visual card stack */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              animation: 'fadeIn 0.8s ease-out 0.6s both',
            }}
          >
            {/* Main card */}
            <div
              className="glass-card animate-float"
              style={{
                width: '100%',
                maxWidth: 420,
                padding: 32,
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'rgba(240,244,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {t('hero.card.cohort')}
                  </p>
                  <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.1rem', color: '#F0F4FF', marginTop: 4 }}>
                    Spring 2025
                  </p>
                </div>
                <div className="badge badge-green">● {t('hero.card.live')}</div>
              </div>

              {/* Progress bars */}
              <div className="flex flex-col gap-4 mb-6">
                {[
                  { label: t('hero.card.incubated'), value: 85, color: '#3B82F6' },
                  { label: t('hero.card.mentors'), value: 72, color: '#8B5CF6' },
                  { label: t('hero.card.funding'), value: 60, color: '#10B981' },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)' }}>{label}</span>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color, fontWeight: 600 }}>{value}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${value}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}AA)`,
                        borderRadius: 3,
                        boxShadow: `0 0 10px ${color}80`,
                        animation: 'loadingProgress 2s ease-out',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Startup avatars */}
              <div className="flex items-center gap-3">
                <div className="flex" style={{ marginLeft: 0 }}>
                  {['AK', 'BY', 'CL', 'DM', 'EN'].map((initials, i) => (
                    <div
                      key={initials}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: `hsl(${i * 55 + 200}, 70%, 50%)`,
                        border: '2px solid rgba(10,18,69,0.8)',
                        marginLeft: i > 0 ? -8 : 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Sora',
                        fontWeight: 700,
                        fontSize: '0.6rem',
                        color: 'white',
                        zIndex: 5 - i,
                        position: 'relative',
                      }}
                    >
                      {initials}
                    </div>
                  ))}
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(79,70,229,0.3)',
                    border: '2px solid rgba(79,70,229,0.5)',
                    marginLeft: -8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.6rem',
                    color: '#A78BFA',
                    zIndex: 0,
                    position: 'relative',
                  }}>
                    +15
                  </div>
                </div>
                <p style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: 'rgba(240,244,255,0.5)' }}>
                  {t('hero.card.founders')}
                </p>
              </div>
            </div>

            {/* Floating badge cards */}
            <div
              className="glass animate-float-delayed"
              style={{
                position: 'absolute',
                top: -20,
                right: -20,
                padding: '12px 16px',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Trophy size={24} />
              <div>
                <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: '#F0F4FF' }}>{t('hero.badge.ranked')}</p>
                <p style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: 'rgba(240,244,255,0.45)' }}>{t('hero.badge.rankedSub')}</p>
              </div>
            </div>

            <div
              className="glass animate-float-slow"
              style={{
                position: 'absolute',
                bottom: 20,
                left: -30,
                padding: '12px 16px',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Rocket size={24} />
              <div>
                <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: '#F0F4FF' }}>{t('hero.badge.raised')}</p>
                <p style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: 'rgba(240,244,255,0.45)' }}>{t('hero.badge.raisedSub')}</p>
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
