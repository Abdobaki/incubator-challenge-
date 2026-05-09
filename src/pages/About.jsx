import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, History, ArrowRight, Linkedin, Mail, CheckCircle } from 'lucide-react';
import { team, milestones } from '../data/index';
import { SectionHeader, Reveal, AnimatedCounter } from '../components/ui/index';

const objectives = [
  'Support university students and graduates in transforming their innovative ideas into viable startups',
  'Provide a comprehensive support ecosystem including workspace, mentorship, and funding access',
  'Foster collaboration between academia, industry, and government for sustainable innovation',
  'Create a thriving entrepreneurship culture within the University of M\'sila and the Hauts Plateaux region',
  'Contribute to Algeria\'s digital transformation and economic diversification goals',
  'Build a network of successful Algerian entrepreneurs who reinvest in the ecosystem',
];

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main style={{ paddingTop: 72 }}>
      {/* Page Hero */}
      <section
        style={{
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 60%), var(--navy-950)',
        }}
      >
        <div className="orb orb-blue" style={{ width: 500, height: 500, top: '-200px', right: '-100px', opacity: 0.1 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-tag">🏛️ About BIS</div>
            <h1 style={{
              fontFamily: 'Sora',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#F0F4FF',
              lineHeight: 1.1,
              marginBottom: 20,
              maxWidth: 720,
            }}>
              Building Algeria's <span className="gradient-text">Innovation Future</span>
            </h1>
            <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '1.1rem', maxWidth: 640, lineHeight: 1.75 }}>
              Established within the University of M'sila, BIS Incubator is a pioneering institution dedicated to nurturing entrepreneurial talent and transforming research into market-ready solutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                color: '#3B82F6',
                tag: 'Our Mission',
                title: 'Empowering Entrepreneurs',
                text: 'To provide a world-class incubation environment that empowers university students, graduates, and researchers to build innovative, scalable, and impactful businesses that contribute to Algeria\'s socio-economic development.',
              },
              {
                icon: Eye,
                color: '#8B5CF6',
                tag: 'Our Vision',
                title: 'Algeria\'s Silicon Valley',
                text: 'To become the leading innovation hub in North Africa by 2030, having incubated 500+ startups, raised over 500M DZD in funding, and produced technology companies that compete on a global stage.',
              },
            ].map((item, i) => (
              <Reveal key={item.tag} delay={i * 150} direction={i === 0 ? 'left' : 'right'}>
                <div className="glass-card" style={{ height: '100%' }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                    <item.icon size={24} style={{ color: item.color }} />
                  </div>
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: item.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                    {item.tag}
                  </p>
                  <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF', marginBottom: 14 }}>
                    {item.title}
                  </h2>
                  <p style={{ color: 'rgba(240,244,255,0.6)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <div
                className="glass-card"
                style={{
                  padding: 48,
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(109,40,217,0.08))',
                  border: '1px solid rgba(79,70,229,0.25)',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  fontFamily: 'Sora',
                  fontSize: '8rem',
                  fontWeight: 800,
                  color: '#3B82F6',
                  opacity: 0.06,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  "
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: 'Sora', fontSize: '0.78rem', color: '#60A5FA', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                    Director's Message
                  </p>
                  <p style={{ color: 'rgba(240,244,255,0.75)', fontSize: '1rem', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 32 }}>
                    "When we founded BIS Incubator, we had one conviction: that the seeds of Algeria's next technological revolution were already in our classrooms. Our job is simply to give those seeds the light, water, and nutrients they need to grow into world-class companies. Every startup we launch, every founder we mentor, every investment we secure — it's all in service of one dream: an Algeria that innovates, builds, and leads."
                  </p>
                  <div className="flex items-center gap-4">
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3B82F6, #6D28D9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Sora',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: 'white',
                      flexShrink: 0,
                    }}>
                      MB
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Sora', fontWeight: 700, color: '#F0F4FF', fontSize: '0.95rem' }}>Prof. Mohamed Benali</p>
                      <p style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.82rem' }}>Director, BIS Incubator</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div>
                <div className="section-tag">🎯 Our Objectives</div>
                <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F0F4FF', marginBottom: 32, lineHeight: 1.2 }}>
                  What We Set Out<br />to <span className="gradient-text">Achieve</span>
                </h2>
                <ul className="flex flex-col gap-4">
                  {objectives.map((obj, i) => (
                    <Reveal key={i} delay={i * 80}>
                      <li className="flex items-start gap-3">
                        <CheckCircle size={18} style={{ color: '#4ADE80', marginTop: 2, flexShrink: 0 }} />
                        <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: '0.93rem', lineHeight: 1.65 }}>{obj}</p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="📅 Our History"
            title={<>Our <span className="gradient-text">Journey</span></>}
            subtitle="From a small university initiative to Algeria's #1 incubator."
          />

          <div style={{ position: 'relative', marginTop: 64 }}>
            {/* Center line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, transparent, #3B82F6 10%, #8B5CF6 90%, transparent)',
              transform: 'translateX(-50%)',
            }} />

            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 100}>
                <div
                  className="flex items-start gap-8 mb-12"
                  style={{
                    flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                    position: 'relative',
                  }}
                >
                  {/* Content */}
                  <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                    <div className="glass-card" style={{ display: 'inline-block', padding: '20px 24px', maxWidth: 360, textAlign: 'left' }}>
                      <p style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '0.78rem', color: '#60A5FA', marginBottom: 6, letterSpacing: '0.08em' }}>
                        {m.year}
                      </p>
                      <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: '#F0F4FF', marginBottom: 8 }}>
                        {m.title}
                      </h3>
                      <p style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                        {m.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: 24,
                    zIndex: 2,
                  }}>
                    <div className="timeline-dot" />
                  </div>

                  {/* Empty space */}
                  <div style={{ flex: 1 }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="👥 Our Team"
            title={<>Meet the <span className="gradient-text">Dream Team</span></>}
            subtitle="Experienced professionals dedicated to building the next generation of Algerian entrepreneurs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={i * 120} direction="up">
                <div className="glass-card text-center">
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Sora',
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    color: 'white',
                    margin: '0 auto 16px',
                    boxShadow: `0 8px 24px ${member.color}40`,
                  }}>
                    {member.initials}
                  </div>
                  <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.95rem', color: '#F0F4FF', marginBottom: 4 }}>
                    {member.name}
                  </h3>
                  <p style={{ color: member.color, fontSize: '0.82rem', fontFamily: 'Outfit', marginBottom: 12 }}>
                    {member.role}
                  </p>
                  <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.83rem', lineHeight: 1.6, marginBottom: 20 }}>
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                    <a href={member.linkedin} style={{ color: 'rgba(240,244,255,0.35)', transition: 'color 0.2s' }} className="hover:text-blue-400">
                      <Linkedin size={16} />
                    </a>
                    <a href={`mailto:${member.email}`} style={{ color: 'rgba(240,244,255,0.35)', transition: 'color 0.2s' }} className="hover:text-blue-400">
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
