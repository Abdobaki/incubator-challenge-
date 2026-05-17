import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Users, GraduationCap, DollarSign, Network, Globe, CheckCircle, ArrowRight, Clock, ChevronDown, Target, ClipboardList } from 'lucide-react';
import { programs } from '../data/index';
import { SectionHeader, Reveal } from '../components/ui/index';
import { useTranslation } from '../hooks/useTranslation';

const iconMap = { Rocket, Users, GraduationCap, DollarSign, Network, Globe };

const process = [
  { step: '01', title: 'Application', desc: 'Submit your startup idea through our online portal. We review all applications within 2 weeks.' },
  { step: '02', title: 'Screening', desc: 'Shortlisted teams present a 5-minute pitch to our selection committee of mentors and investors.' },
  { step: '03', title: 'Onboarding', desc: 'Accepted startups join our 2-week onboarding program to set goals and meet the BIS team.' },
  { step: '04', title: 'Incubation', desc: 'Dive into the full program — workspace, mentorship, workshops, and milestone-based support.' },
  { step: '05', title: 'Demo Day', desc: 'Pitch to investors and the public at our bi-annual Demo Day. Graduate with funding and connections.' },
];

export default function Programs() {
  const { t, localeData } = useTranslation();
  const [activeProgram, setActiveProgram] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{
        padding: '80px 0 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(109,40,217,0.12) 0%, transparent 60%), var(--navy-950)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="orb orb-violet" style={{ width: 500, height: 500, top: '-200px', left: '-100px', opacity: 0.1 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-tag"><Target size={14} /> Programs & Services</div>
            <h1 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#F0F4FF', lineHeight: 1.1, marginBottom: 20, maxWidth: 680 }}>
              Everything You Need to <span className="gradient-text">Build & Scale</span>
            </h1>
            <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '1.1rem', maxWidth: 600, lineHeight: 1.75 }}>
              Our comprehensive suite of programs is designed to meet founders wherever they are — from raw idea to funded startup. No matter your stage, we have a program for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programs Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, i) => {
              const Icon = iconMap[program.icon] || Rocket;
              const isOpen = activeProgram === program.id;
              return (
                <Reveal key={program.id} delay={i * 100} direction="up">
                  <div
                    className="glass-card"
                    style={{
                      cursor: 'pointer',
                      border: isOpen ? `1px solid ${program.iconColor}40` : undefined,
                      boxShadow: isOpen ? `0 0 30px ${program.iconColor}15` : undefined,
                    }}
                    onClick={() => setActiveProgram(isOpen ? null : program.id)}
                  >
                    <div className="flex items-start gap-5">
                      <div style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        background: `${program.iconColor}15`,
                        border: `1px solid ${program.iconColor}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={28} style={{ color: program.iconColor }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.15rem', color: '#F0F4FF' }}>
                            {localeData(program, 'title')}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`badge ${program.badgeColor}`} style={{ fontSize: '0.68rem' }}>{program.badge}</span>
                            <ChevronDown
                              size={18}
                              style={{ color: 'rgba(240,244,255,0.4)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={13} style={{ color: 'rgba(240,244,255,0.3)' }} />
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'rgba(240,244,255,0.35)' }}>{program.duration}</span>
                        </div>
                        <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                          {localeData(program, 'description')}
                        </p>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <div style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                      <div style={{ paddingTop: 24, borderTop: `1px solid rgba(255,255,255,0.06)`, marginTop: 24 }}>
                        <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
                          Program Includes
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {program.features.map((f) => (
                            <div key={f} className="flex items-center gap-2">
                              <CheckCircle size={14} style={{ color: program.iconColor, flexShrink: 0 }} />
                              <span style={{ color: 'rgba(240,244,255,0.65)', fontSize: '0.88rem' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5">
                          <Link
                            to="/contact"
                            className="btn-primary"
                            style={{ textDecoration: 'none', fontSize: '0.88rem', padding: '11px 24px' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Apply for this Program <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={<><ClipboardList size={14} /> How It Works</>}
            title={<>Our <span className="gradient-text">Application Process</span></>}
            subtitle="Simple, transparent, and designed to identify the most promising founders."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-16 relative">
            {/* Connector line */}
            <div className="hidden md:block" style={{
              position: 'absolute',
              top: 28,
              left: '10%',
              right: '10%',
              height: 2,
              background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
              opacity: 0.3,
              zIndex: 0,
            }} />

            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 100} direction="up">
                <div className="text-center" style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #6D28D9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontFamily: 'JetBrains Mono',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(59,130,246,0.4)',
                  }}>
                    {step.step}
                  </div>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.95rem', color: '#F0F4FF', marginBottom: 8 }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.83rem', lineHeight: 1.65 }}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '15px 40px' }}>
              Start Your Application <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
