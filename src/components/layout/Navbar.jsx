import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const navLinks = [
  { path: '/', label: 'Home', labelFr: 'Accueil', labelAr: 'الرئيسية' },
  { path: '/about', label: 'About', labelFr: 'À Propos', labelAr: 'عن الحاضنة' },
  { path: '/programs', label: 'Programs', labelFr: 'Programmes', labelAr: 'البرامج' },
  { path: '/startups', label: 'Startups', labelFr: 'Startups', labelAr: 'الشركات' },
  { path: '/events', label: 'Events', labelFr: 'Événements', labelAr: 'الفعاليات' },
  { path: '/news', label: 'News', labelFr: 'Actualités', labelAr: 'الأخبار' },
  { path: '/gallery', label: 'Gallery', labelFr: 'Galerie', labelAr: 'المعرض' },
  { path: '/contact', label: 'Contact', labelFr: 'Contact', labelAr: 'اتصل بنا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { lang, switchLang, languages } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const getLabel = (link) => {
    if (lang === 'fr') return link.labelFr;
    if (lang === 'ar') return link.labelAr;
    return link.label;
  };

  return (
    <>
      <nav
        className={`navbar-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}
        style={{ height: 72 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
            <img
              src={`${import.meta.env.BASE_URL}images/gallery/logo.png`}
              alt="BIS Incubator"
              style={{
                width: 42, height: 42, borderRadius: 12, objectFit: 'contain',
                flexShrink: 0,
              }}
              className="group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.95rem', color: '#F0F4FF', lineHeight: 1.2 }}>
                BIS Incubator
              </p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'rgba(240,244,255,0.4)', letterSpacing: '0.1em' }}>
                UNIV. M'SILA
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'active text-white bg-white/5'
                    : 'hover:bg-white/5'
                }`}
                style={{ textDecoration: 'none' }}
              >
                {getLabel(link)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass transition-all hover:bg-white/8"
                style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: 'rgba(240,244,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Globe size={14} />
                {languages[lang].label}
                <ChevronDown size={12} style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden"
                  style={{ minWidth: 140, border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                >
                  {Object.values(languages).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { switchLang(l.code); setLangOpen(false); }}
                      className="w-full text-left px-4 py-3 transition-colors hover:bg-white/8 flex items-center gap-3"
                      style={{
                        fontFamily: 'Outfit',
                        fontSize: '0.9rem',
                        color: lang === l.code ? '#60A5FA' : 'rgba(240,244,255,0.7)',
                        background: lang === l.code ? 'rgba(59,130,246,0.1)' : 'transparent',
                      }}
                    >
                      <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '0.75rem' }}>{l.label}</span>
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.85rem', textDecoration: 'none' }}>
              Apply Now →
            </Link>

            <Link
              to="/admin"
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.72rem',
                color: 'rgba(240,244,255,0.35)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              className="hover:text-white/60"
            >
              ADMIN
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg glass"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {mobileOpen ? <X size={22} color="rgba(240,244,255,0.9)" /> : <Menu size={22} color="rgba(240,244,255,0.9)" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: 'none',
                fontFamily: 'Sora',
                fontWeight: 600,
                fontSize: '1.4rem',
                color: location.pathname === link.path ? '#60A5FA' : 'rgba(240,244,255,0.8)',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s',
                transitionDelay: `${i * 50}ms`,
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
              }}
            >
              {getLabel(link)}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-4">
          {/* Language switcher mobile */}
          <div className="flex gap-2">
            {Object.values(languages).map((l) => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  color: lang === l.code ? '#60A5FA' : 'rgba(240,244,255,0.5)',
                  background: lang === l.code ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
                  border: lang === l.code ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Link to="/contact" className="btn-primary w-full text-center justify-center" style={{ textDecoration: 'none' }}>
            Apply Now →
          </Link>
        </div>
      </div>

      {/* Click outside to close lang dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </>
  );
}
