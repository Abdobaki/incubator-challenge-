import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Tag, Rocket, Zap, Trophy, Handshake, Globe, MailX, Archive } from 'lucide-react';
import { events as fallbackEvents } from '../data/index';
import { SectionHeader, Reveal } from '../components/ui/index';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../context/ThemeContext';

const typeColors = {
  'Demo Day': 'badge-blue',
  'Bootcamp': 'badge-violet',
  'Competition': 'badge-amber',
  'Forum': 'badge-green',
  'Summit': 'badge-red',
};

function TypeIcon({ type }) {
  const icons = { 'Demo Day': Rocket, 'Bootcamp': Zap, 'Competition': Trophy, 'Forum': Handshake, 'Summit': Globe };
  const Icon = icons[type];
  return <Icon size={14} style={{ marginRight: 4 }} />;
}

function EventCard({ event, i, localeData, lang = 'en', isLight = false }) {
  const isPast = event.status === 'past';
  const pct = Math.round((event.registered / event.capacity) * 100);

  const formatDate = (d) => {
    if (!d) return '';
    try {
      const dt = new Date(d);
      const loc = lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-FR' : 'en-US';
      return dt.toLocaleDateString(loc, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return d; }
  };

  return (
    <Reveal delay={i * 100} direction="up">
      <div
        className="glass-card"
        style={{
          opacity: isPast ? 0.75 : 1,
          borderColor: event.featured ? 'rgba(79,70,229,0.35)' : undefined,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {event.featured && !isPast && (
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'linear-gradient(135deg, #3B82F6, #6D28D9)',
            color: 'white',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 6,
            letterSpacing: '0.08em',
          }}>
            FEATURED
          </div>
        )}

        <div className="flex items-start gap-5">
          {/* Date block */}
          <div
            className="flex flex-col items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: 72,
              height: 72,
              background: isPast
                ? (isLight ? 'rgba(13,27,62,0.05)' : 'rgba(255,255,255,0.04)')
                : (isLight ? 'linear-gradient(135deg, rgba(46,123,196,0.15), rgba(26,58,143,0.1))' : 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(109,40,217,0.2))'),
              border: `1px solid ${isPast
                ? (isLight ? 'rgba(13,27,62,0.12)' : 'rgba(255,255,255,0.08)')
                : (isLight ? 'rgba(46,123,196,0.25)' : 'rgba(79,70,229,0.3)')}`,
            }}
          >
            <p style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '1.4rem', color: isPast ? (isLight ? 'rgba(13,27,62,0.35)' : 'rgba(240,244,255,0.4)') : (isLight ? '#2E7BC4' : '#60A5FA'), lineHeight: 1 }}>
              {event.date ? new Date(event.date).getDate() : '--'}
            </p>
            <p style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: 'rgba(240,244,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {event.date ? new Date(event.date).toLocaleString(lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short' }) : '---'}
            </p>
          </div>

          <div style={{ flex: 1 }}>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`badge ${typeColors[event.type] || 'badge-blue'}`} style={{ fontSize: '0.68rem' }}>
                <TypeIcon type={event.type} /> {event.type}
              </span>
              {isPast && (
                <span className="badge" style={{ background: isLight ? 'rgba(13,27,62,0.05)' : 'rgba(255,255,255,0.06)', border: isLight ? '1px solid rgba(13,27,62,0.12)' : '1px solid rgba(255,255,255,0.1)', color: isLight ? 'rgba(13,27,62,0.45)' : 'rgba(240,244,255,0.35)', fontSize: '0.66rem' }}>
                  Past Event
                </span>
              )}
            </div>

            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 8 }}>
              {localeData(event, 'title')}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 14 }}>
              {event.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-4">
              {[
                { icon: Calendar, text: formatDate(event.date) },
                { icon: Clock, text: event.time },
                { icon: MapPin, text: event.location },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1">
                  <Icon size={13} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Registration progress */}
            {!isPast && (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Users size={12} style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {event.registered} / {event.capacity} registered
                    </span>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: pct > 80 ? '#F87171' : '#4ADE80' }}>
                    {pct}%
                  </span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: pct > 80 ? 'linear-gradient(90deg, #F87171, #EF4444)' : 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                    borderRadius: 2,
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.66rem',
                  color: isLight ? 'rgba(13,27,62,0.55)' : 'var(--text-secondary)',
                  background: isLight ? 'rgba(46,123,196,0.06)' : 'rgba(255,255,255,0.04)',
                  border: isLight ? '1px solid rgba(46,123,196,0.15)' : '1px solid rgba(255,255,255,0.08)',
                  padding: '2px 8px',
                  borderRadius: 6,
                }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            {!isPast && (
              <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 24px' }}>
                Register <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Events() {
  const { t, localeData, lang } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [tab, setTab] = useState('upcoming');
  const [items, setItems] = useState(() => {
    try { const raw = localStorage.getItem('bis-admin-events'); const d = raw ? JSON.parse(raw) : null; if (Array.isArray(d) && d.length > 0) return d; } catch {}
    return fallbackEvents;
  });
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handler = () => {
      try { const raw = localStorage.getItem('bis-admin-events'); const d = raw ? JSON.parse(raw) : null; if (Array.isArray(d) && d.length > 0) setItems(d); } catch {}
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const filtered = items.filter(e => e.status === tab);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{
        padding: '80px 0 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 60%), var(--bg-events-overlay, none), var(--bg-events, none) center/cover no-repeat, var(--navy-950)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: '-150px', right: '-80px', opacity: 0.08 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-tag"><Calendar size={14} /> Events</div>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20, maxWidth: 680 }}>
              Where Founders <span className="gradient-text">Connect & Grow</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.75 }}>
              From demo days to hackathons — our events are where Algeria's entrepreneurship ecosystem comes to life.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '60px 0 100px' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-10"
            style={{
              background: isLight ? 'rgba(46,123,196,0.05)' : 'rgba(255,255,255,0.03)',
              border: isLight ? '1px solid rgba(46,123,196,0.15)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: 4,
              display: 'inline-flex',
              flexWrap: 'wrap',
            }}
          >
            {['upcoming', 'past'].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                style={{
                  fontFamily: 'Sora',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  padding: '10px 24px',
                  borderRadius: 10,
                  border: 'none',
                  background: tab === tabKey ? 'linear-gradient(135deg, #3B82F6, #6D28D9)' : 'transparent',
                  color: tab === tabKey ? 'white' : (isLight ? 'rgba(13,27,62,0.55)' : 'var(--text-secondary)'),
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textTransform: 'capitalize',
                  boxShadow: tab === tabKey ? '0 4px 20px rgba(59,130,246,0.3)' : 'none',
                }}
              >
                {tabKey === 'upcoming' ? <><Calendar size={14} /> {t('common.upcoming')}</> : <><Archive size={14} /> {t('common.past')}</>}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div style={{ marginBottom: 16 }}><MailX size={48} style={{ color: 'var(--text-secondary)' }} /></div>
                <p style={{ fontFamily: 'Sora', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  No {tab} events found
                </p>
              </div>
            ) : (
              filtered.map((event, i) => (
                <EventCard key={event.id} event={event} i={i} localeData={localeData} lang={lang} isLight={isLight} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
