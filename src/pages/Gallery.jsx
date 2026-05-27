import React, { useEffect, useState } from 'react';
import { X, ZoomIn, Image, Camera, Triangle, Mic, PartyPopper, Zap, Users, Building2, Handshake } from 'lucide-react';
import { galleryItems as fallbackGallery } from '../data/index';
import { SectionHeader, Reveal } from '../components/ui/index';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../context/ThemeContext';

function TypeIcon({ type }) {
  const icons = { symposium: Triangle, seminar: Mic, event: PartyPopper, workshop: Zap, team: Users, facility: Building2, mentorship: Handshake };
  const Icon = icons[type] || Camera;
  return <Icon size={14} style={{ marginRight: 4 }} />;
}

export default function Gallery() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [items, setItems] = useState(() => {
    try { const raw = localStorage.getItem('bis-admin-gallery'); const d = raw ? JSON.parse(raw) : null; if (Array.isArray(d)) return d; } catch {}
    return fallbackGallery;
  });
  const [activeType, setActiveType] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handler = () => {
      try { const raw = localStorage.getItem('bis-admin-gallery'); const d = raw ? JSON.parse(raw) : null; if (Array.isArray(d)) setItems(d); } catch {}
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const types = ['All', ...new Set(items.map(i => i.type))];
  const filtered = activeType === 'All' ? items : items.filter(i => i.type === activeType);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{
        padding: '80px 0 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 60%), var(--bg-gallery-overlay, none), var(--bg-gallery, none) center/cover no-repeat, var(--navy-950)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-tag"><Image size={14} /> Gallery</div>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F0F4FF', lineHeight: 1.1, marginBottom: 20, maxWidth: 680 }}>
              Moments That <span className="gradient-text">Define Us</span>
            </h1>
            <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.75 }}>
              A visual journey through BIS Incubator's events, workshops, achievements, and community moments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: '40px 0 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                style={{
                  fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.85rem',
                  padding: '8px 18px', borderRadius: 10,
                  border: activeType === type
                    ? (isLight ? '1px solid rgba(46,123,196,0.4)' : '1px solid rgba(139,92,246,0.5)')
                    : (isLight ? '1px solid rgba(46,123,196,0.18)' : '1px solid rgba(255,255,255,0.1)'),
                  background: activeType === type
                    ? (isLight ? 'rgba(46,123,196,0.12)' : 'rgba(139,92,246,0.15)')
                    : (isLight ? 'rgba(46,123,196,0.04)' : 'rgba(255,255,255,0.04)'),
                  color: activeType === type
                    ? (isLight ? '#2E7BC4' : '#A78BFA')
                    : (isLight ? 'rgba(13,27,62,0.6)' : 'rgba(240,244,255,0.55)'),
                  cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize',
                }}
              >
                {type !== 'All' ? <><TypeIcon type={type} /> </> : null}{t(type === 'All' ? 'common.all' : `common.${type}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="gallery-grid"
            style={{
              display: 'grid',
              gridAutoRows: '220px',
              gap: 12,
            }}
          >
            {filtered.map((item, i) => (
              <div
                key={item.id}
                style={{
                  gridColumn: item.span?.includes('col-span-2') ? 'span 2' : 'span 1',
                  gridRow: item.span?.includes('row-span-2') ? 'span 2' : 'span 1',
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#1A2240',
                  transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
                className="hover:scale-[1.02]"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.3), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="hover:opacity-100"
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ZoomIn size={20} style={{ color: 'white' }} />
                  </div>
                </div>

                {/* Label */}
                <div className="gallery-img-overlay" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px 16px 16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                }}>
                  <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.85rem', color: 'white' }}>{item.title}</p>
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>
                    <TypeIcon type={item.type} /> {item.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '90vw', maxWidth: 900, maxHeight: '85vh',
              borderRadius: 20, overflow: 'hidden',
              background: 'rgba(26,34,64,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: 16, right: 16, zIndex: 10,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
              }}
            >
              <X size={18} />
            </button>

            <img
              src={lightbox.image}
              alt={lightbox.title}
              style={{
                width: '100%',
                maxHeight: '60vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div className="gallery-img-overlay" style={{ padding: '24px 28px' }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.2rem', color: '#F0F4FF', marginBottom: 6 }}>
                {lightbox.title}
              </h3>
              {lightbox.description && (
                <p style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,244,255,0.6)', marginBottom: 6, lineHeight: 1.6 }}>
                  {lightbox.description}
                </p>
              )}
              <p style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,244,255,0.5)', textTransform: 'capitalize' }}>
                <TypeIcon type={lightbox.type} /> {lightbox.type}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
