import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === 'light';

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

  const textColor = isLight ? 'rgba(13,27,62,0.75)' : 'rgba(240,244,255,0.7)';
  const textPrimary = isLight ? '#0D1B3E' : '#F0F4FF';

  return (
    <>
      <nav
        className={`navbar-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}
        style={{ height: 72 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={`${import.meta.env.BASE_URL}images/gallery/logo.png`}
                alt="BIS Incubator"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: isLight
                    ? '2px solid rgba(46,123,196,0.35)'
                    : '2px solid rgba(255,255,255,0.12)',
                  boxShadow: isLight
                    ? '0 2px 12px rgba(46,123,196,0.18)'
                    : '0 2px 12px rgba(0,0,0,0.4)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  background: '#fff',
                }}
                className="group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <p style={{
                fontFamily: 'Sora',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: textPrimary,
                lineHeight: 1.2,
                transition: 'color 0.3s ease',
              }}>
                BIS Incubator
              </p>
              <p style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.7rem',
                color: isLight ? 'rgba(13,27,62,0.38)' : 'rgba(240,244,255,0.4)',
                letterSpacing: '0.1em',
                transition: 'color 0.3s ease',
              }}>
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
                    ? 'active'
                    : ''
                }`}
                style={{
                  textDecoration: 'none',
                  background: location.pathname === link.path
                    ? isLight ? 'rgba(46,123,196,0.08)' : 'rgba(255,255,255,0.05)'
                    : 'transparent',
                }}
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
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass transition-all"
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.78rem',
                  color: textColor,
                  border: isLight ? '1px solid rgba(46,123,196,0.18)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Globe size={14} />
                {languages[lang].label}
                <ChevronDown size={12} style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden"
                  style={{
                    minWidth: 140,
                    border: isLight ? '1px solid rgba(46,123,196,0.18)' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isLight ? '0 12px 40px rgba(46,123,196,0.12)' : '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                >
                  {Object.values(languages).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { switchLang(l.code); setLangOpen(false); }}
                      className="w-full text-left px-4 py-3 transition-colors flex items-center gap-3"
                      style={{
                        fontFamily: 'Outfit',
                        fontSize: '0.9rem',
                        color: lang === l.code
                          ? (isLight ? '#2E7BC4' : '#60A5FA')
                          : textColor,
                        background: lang === l.code
                          ? (isLight ? 'rgba(46,123,196,0.1)' : 'rgba(59,130,246,0.1)')
                          : 'transparent',
                      }}
                    >
                      <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '0.75rem' }}>{l.label}</span>
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              className="glass transition-all"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: isLight ? '1px solid rgba(46,123,196,0.2)' : '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isLight ? '#2E7BC4' : 'rgba(240,244,255,0.75)',
                transition: 'all 0.25s ease',
              }}
            >
              {isLight
                ? <Moon size={16} />
                : <Sun size={16} />
              }
            </button>

            <Link to="/contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.85rem', textDecoration: 'none' }}>
              Apply Now →
            </Link>

            <Link
              to="/admin"
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.72rem',
                color: isLight ? 'rgba(13,27,62,0.3)' : 'rgba(240,244,255,0.35)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              className="hover:text-white/60"
            >
              ADMIN
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              className="glass p-2 rounded-lg"
              style={{
                border: isLight ? '1px solid rgba(46,123,196,0.2)' : '1px solid rgba(255,255,255,0.08)',
                color: isLight ? '#2E7BC4' : 'rgba(240,244,255,0.9)',
              }}
            >
              {isLight ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              className="p-2 rounded-lg glass"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ border: isLight ? '1px solid rgba(46,123,196,0.2)' : '1px solid rgba(255,255,255,0.08)' }}
            >
              {mobileOpen
                ? <X size={22} color={isLight ? '#0D1B3E' : 'rgba(240,244,255,0.9)'} />
                : <Menu size={22} color={isLight ? '#0D1B3E' : 'rgba(240,244,255,0.9)'} />
              }
            </button>
          </div>
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
                color: location.pathname === link.path
                  ? (isLight ? '#2E7BC4' : '#60A5FA')
                  : (isLight ? 'rgba(13,27,62,0.8)' : 'rgba(240,244,255,0.8)'),
                padding: '12px 0',
                borderBottom: isLight ? '1px solid rgba(46,123,196,0.1)' : '1px solid rgba(255,255,255,0.05)',
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
                  color: lang === l.code
                    ? (isLight ? '#2E7BC4' : '#60A5FA')
                    : (isLight ? 'rgba(13,27,62,0.5)' : 'rgba(240,244,255,0.5)'),
                  background: lang === l.code
                    ? (isLight ? 'rgba(46,123,196,0.12)' : 'rgba(59,130,246,0.15)')
                    : (isLight ? 'rgba(46,123,196,0.04)' : 'rgba(255,255,255,0.05)'),
                  border: lang === l.code
                    ? (isLight ? '1px solid rgba(46,123,196,0.35)' : '1px solid rgba(59,130,246,0.4)')
                    : (isLight ? '1px solid rgba(46,123,196,0.12)' : '1px solid rgba(255,255,255,0.08)'),
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
