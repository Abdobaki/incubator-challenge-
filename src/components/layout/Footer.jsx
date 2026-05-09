import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram, ArrowRight, ExternalLink } from 'lucide-react';

const footerLinks = {
  'Incubator': [
    { label: 'About Us', path: '/about' },
    { label: 'Our Programs', path: '/programs' },
    { label: 'Startups Portfolio', path: '/startups' },
    { label: 'Events', path: '/events' },
  ],
  'Resources': [
    { label: 'News & Blog', path: '/news' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Apply Now', path: '/contact' },
    { label: 'FAQ', path: '/contact' },
  ],
  'Legal': [
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Use', path: '#' },
    { label: 'Cookie Policy', path: '#' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(to top, #03061A, #050B2E)', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 80 }}>
      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="rounded-2xl p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(109,40,217,0.15) 100%)',
            border: '1px solid rgba(79,70,229,0.3)',
          }}
        >
          <div className="orb orb-blue" style={{ width: 300, height: 300, top: '-100px', left: '-50px', opacity: 0.2 }} />
          <div className="orb orb-violet" style={{ width: 250, height: 250, bottom: '-80px', right: '-30px', opacity: 0.2 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p className="section-tag mx-auto" style={{ display: 'inline-flex' }}>🚀 Applications Open</p>
            <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: 16, color: '#F0F4FF' }}>
              Ready to Launch Your Startup?
            </h2>
            <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: '1.1rem', marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
              Join Algeria's #1 university incubator and get access to mentorship, funding, workspace, and a global network.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
                Apply for Incubation <ArrowRight size={18} />
              </Link>
              <Link to="/programs" className="btn-secondary" style={{ textDecoration: 'none' }}>
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #3B82F6, #6D28D9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Sora',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'white',
                boxShadow: '0 0 20px rgba(59,130,246,0.3)',
              }}>
                BIS
              </div>
              <div>
                <p style={{ fontFamily: 'Sora', fontWeight: 700, color: '#F0F4FF', fontSize: '1.05rem' }}>BIS Incubator</p>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'rgba(240,244,255,0.35)', letterSpacing: '0.1em' }}>UNIVERSITY OF M'SILA</p>
              </div>
            </div>
            <p style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
              Algeria's premier university startup incubator, empowering the next generation of entrepreneurs to build world-class companies.
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {[
                { icon: MapPin, text: 'Université de M\'sila, BP 166, 28000, M\'sila, Algérie' },
                { icon: Mail, text: 'contact@bis.univ-msila.dz' },
                { icon: Phone, text: '+213 35 00 00 00' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon size={16} style={{ color: '#60A5FA', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.88rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.85rem', color: '#F0F4FF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      style={{
                        color: 'rgba(240,244,255,0.5)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontFamily: 'Outfit',
                        transition: 'color 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                      className="hover:text-blue-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'rgba(240,244,255,0.35)' }}>
            © {new Date().getFullYear()} Bureau d'Innovation & Startup — University of M'sila. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100057652890846', label: 'Facebook' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Instagram, href: '#', label: 'Instagram' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(240,244,255,0.45)',
                  transition: 'all 0.2s ease',
                }}
                className="hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
