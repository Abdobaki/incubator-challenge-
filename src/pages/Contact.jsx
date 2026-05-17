import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Facebook, Linkedin, Twitter, Instagram, Send, CheckCircle, Map, PartyPopper } from 'lucide-react';
import { Reveal } from '../components/ui/index';
import { useTranslation } from '../hooks/useTranslation';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Université de M\'sila, BP 166, Route Ichbilia, 28000 M\'sila, Algérie', color: '#3B82F6' },
  { icon: Mail, label: 'Email', value: 'contact@bis.univ-msila.dz', color: '#8B5CF6' },
  { icon: Phone, label: 'Phone', value: '+213 35 00 00 00', color: '#10B981' },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100057652890846', color: '#1877F2' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: Twitter, label: 'Twitter/X', href: '#', color: '#1DA1F2' },
  { icon: Instagram, label: 'Instagram', href: '#', color: '#E4405F' },
];

const reasons = [
  'Apply for incubation program',
  'Partnership inquiry',
  'Media & press',
  'Mentorship offer',
  'Event collaboration',
  'General inquiry',
];

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', organization: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  return (
    <main style={{ paddingTop: 72 }}>
      <section style={{
        padding: '80px 0 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 60%), var(--navy-950)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-tag"><Mail size={14} /> Contact Us</div>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F0F4FF', lineHeight: 1.1, marginBottom: 20, maxWidth: 680 }}>
              Let's Build Something <span className="gradient-text">Amazing Together</span>
            </h1>
            <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.75 }}>
              Whether you're a founder ready to apply, a mentor wanting to give back, or a partner looking to collaborate — we'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '60px 0 100px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info sidebar */}
            <div className="flex flex-col gap-6">
              {/* Info cards */}
              {contactInfo.map((info, i) => (
                <Reveal key={info.label} delay={i * 100} direction="left">
                  <div className="glass-card" style={{ padding: '20px 24px' }}>
                    <div className="flex items-start gap-4">
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `${info.color}18`, border: `1px solid ${info.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <info.icon size={20} style={{ color: info.color }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.5)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                          {info.label}
                        </p>
                        <p style={{ fontFamily: 'Outfit', fontSize: '0.9rem', color: '#F0F4FF', lineHeight: 1.5 }}>{info.value}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Social links */}
              <Reveal delay={300} direction="left">
                <div className="glass-card" style={{ padding: '20px 24px' }}>
                  <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.5)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Follow Us
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map(({ icon: Icon, label, href, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg transition-all"
                        style={{
                          color: 'rgba(240,244,255,0.55)',
                          textDecoration: 'none',
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.03)',
                          transition: 'all 0.2s',
                          fontSize: '0.85rem',
                          fontFamily: 'Outfit',
                        }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.color = color; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(240,244,255,0.55)'; }}
                      >
                        <Icon size={15} />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Map placeholder */}
              <Reveal delay={400} direction="left">
                <div
                  className="glass-card"
                  style={{
                    padding: 0, overflow: 'hidden', minHeight: 180,
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.08))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: 12, cursor: 'pointer',
                  }}
                  onClick={() => window.open('https://maps.google.com/?q=Université+de+M\'sila', '_blank')}
                >
                  <Map size={48} style={{ opacity: 0.5 }} />
                  <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.88rem', color: '#60A5FA' }}>
                    View on Google Maps
                  </p>
                  <p style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'rgba(240,244,255,0.4)', textAlign: 'center', padding: '0 20px' }}>
                    Université de M'sila, M'sila, Algeria
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Reveal direction="right">
                <div className="glass-card" style={{ padding: 40 }}>
                  {submitted ? (
                    <div className="text-center py-12">
                      <div style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px', animation: 'pulseGlow 2s ease-in-out infinite',
                      }}>
                        <CheckCircle size={40} style={{ color: '#4ADE80' }} />
                      </div>
                      <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF', marginBottom: 12 }}>
                        Message Sent! <PartyPopper size={20} style={{ marginLeft: 8 }} />
                      </h3>
                      <p style={{ color: 'rgba(240,244,255,0.6)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
                        Thank you for reaching out to BIS Incubator. Our team will review your message and get back to you within 2 business days.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF', marginBottom: 8 }}>
                        Send Us a Message
                      </h2>
                      <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.9rem', marginBottom: 32 }}>
                        Fill out the form below and we'll get back to you shortly.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
                            Full Name *
                          </label>
                          <input
                            required
                            className="input-glass"
                            placeholder="Mohamed Amiri"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
                            Email Address *
                          </label>
                          <input
                            required
                            type="email"
                            className="input-glass"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
                          Organization / University
                        </label>
                        <input
                          className="input-glass"
                          placeholder="Université de M'sila / Startup name"
                          value={form.organization}
                          onChange={e => setForm({ ...form, organization: e.target.value })}
                        />
                      </div>

                      <div className="mb-5">
                        <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
                          Reason for Contact *
                        </label>
                        <select
                          required
                          className="input-glass"
                          value={form.reason}
                          onChange={e => setForm({ ...form, reason: e.target.value })}
                          style={{ cursor: 'pointer' }}
                        >
                          <option value="" disabled style={{ background: '#0A1245' }}>Select a reason...</option>
                          {reasons.map(r => (
                            <option key={r} value={r} style={{ background: '#0A1245' }}>{r}</option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-8">
                        <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
                          Your Message *
                        </label>
                        <textarea
                          required
                          rows={6}
                          className="input-glass"
                          style={{ resize: 'vertical', minHeight: 140 }}
                          placeholder="Tell us about your startup idea, partnership proposal, or question..."
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '15px 32px' }}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div style={{
                              width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                              borderTopColor: 'white', borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite',
                            }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
