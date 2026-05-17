import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Newspaper, Trophy, DollarSign, Target, Medal, Handshake, Megaphone } from 'lucide-react';
import { partners, newsArticles } from '../../data/index';
import { SectionHeader, Reveal } from '../ui/index';
import { useTranslation } from '../../hooks/useTranslation';

// ═══════════════════════════════════════════════
// PARTNERS MARQUEE
// ═══════════════════════════════════════════════
export function Partners() {
  const doubled = [...partners, ...partners]; // for seamless loop

  return (
    <section style={{ padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <p style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.75rem',
          color: 'rgba(240,244,255,0.3)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}>
          Trusted by industry leaders & government institutions
        </p>
      </div>

      {/* Marquee */}
      <div
        className="marquee-container"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="marquee-inner">
          {doubled.map((partner, i) => (
            <div
              key={i}
              className="glass"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '14px 28px',
                borderRadius: 12,
                margin: '0 8px',
                whiteSpace: 'nowrap',
                minWidth: 160,
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.9rem', color: 'rgba(240,244,255,0.7)' }}>
                {partner.name}
              </p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'rgba(240,244,255,0.3)', letterSpacing: '0.08em' }}>
                {partner.type.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// LATEST NEWS
// ═══════════════════════════════════════════════
export function LatestNews() {
  const { t, localeData, lang } = useTranslation();
  const latest = newsArticles.slice(0, 3);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const loc = lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-FR' : 'en-US';
    return d.toLocaleDateString(loc, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <SectionHeader
            tag={<><Newspaper size={14} /> Latest News</>}
            title={<>Incubator <span className="gradient-text">News & Updates</span></>}
            subtitle="Stay informed about the latest from our ecosystem."
            align="left"
          />
          <Link to="/news" className="btn-secondary flex-shrink-0" style={{ textDecoration: 'none' }}>
            All News <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article, i) => (
            <Reveal key={article.id} delay={i * 120} direction="up">
              <div className="glass-card" style={{ height: '100%', cursor: 'pointer' }}>
                {/* Thumbnail placeholder */}
                <div
                  className="rounded-xl mb-5"
                  style={{
                    height: 140,
                    background: `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(109,40,217,0.1))`,
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    overflow: 'hidden',
                  }}
                >
                  {article.category === 'Award' ? <Trophy size={24} style={{opacity: 0.5}} /> : 
                   article.category === 'Funding' ? <DollarSign size={24} style={{opacity: 0.5}} /> :
                   article.category === 'Program' ? <Target size={24} style={{opacity: 0.5}} /> :
                   article.category === 'Achievement' ? <Medal size={24} style={{opacity: 0.5}} /> :
                   article.category === 'Partnership' ? <Handshake size={24} style={{opacity: 0.5}} /> : <Megaphone size={24} style={{opacity: 0.5}} />}
                </div>

                {/* Category + date */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`badge ${article.categoryColor}`} style={{ fontSize: '0.68rem' }}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} style={{ color: 'rgba(240,244,255,0.3)' }} />
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'rgba(240,244,255,0.35)' }}>
                      {formatDate(article.date)}
                    </span>
                  </div>
                </div>

                <h3 style={{
                  fontFamily: 'Sora',
                  fontWeight: 700,
                  fontSize: '0.97rem',
                  color: '#F0F4FF',
                  lineHeight: 1.45,
                  marginBottom: 10,
                }}>
                  {localeData(article, 'title')}
                </h3>

                <p style={{
                  fontFamily: 'Outfit',
                  fontSize: '0.85rem',
                  color: 'rgba(240,244,255,0.5)',
                  lineHeight: 1.6,
                  marginBottom: 16,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {localeData(article, 'excerpt')}
                </p>

                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,244,255,0.35)' }}>
                    {article.readTime}
                  </span>
                  <Link
                    to="/news"
                    style={{
                      color: '#60A5FA',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontFamily: 'Sora',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'gap 0.2s',
                    }}
                    className="hover:gap-2"
                  >
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
