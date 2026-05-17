import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, History, ArrowRight, Linkedin, Mail, CheckCircle, Landmark, BookOpen, ClipboardList, BarChart3, MapPin, Trophy, Medal, Users, Calendar, Phone } from 'lucide-react';
import { team, milestones } from '../data/index';
import { SectionHeader, Reveal, AnimatedCounter } from '../components/ui/index';
import { useTranslation } from '../hooks/useTranslation';

const objectives = [
  'Support university students and graduates in transforming their innovative ideas into viable startups',
  'Provide a comprehensive support ecosystem including workspace, mentorship, and funding access',
  'Foster collaboration between academia, industry, and government for sustainable innovation',
  'Create a thriving entrepreneurship culture within the University of M\'sila and the Hauts Plateaux region',
  'Contribute to Algeria\'s digital transformation and economic diversification goals',
  'Build a network of successful Algerian entrepreneurs who reinvest in the ecosystem',
];

export default function About() {
  const { t, localeData } = useTranslation();
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
            <div className="section-tag"><Landmark size={14} /> About BIS</div>
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
                <div className="section-tag"><Target size={14} /> Our Objectives</div>
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
            tag={<><Calendar size={14} /> Our History</>}
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

      {/* Business Incubator Information */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={<><ClipboardList size={14} /> Incubator Profile</>}
            title={<>About the <span className="gradient-text">Business Incubator</span></>}
            subtitle="University of M'Sila — First university business incubator in Algeria."
          />

          {/* Director & Contact */}
          <Reveal>
            <div className="glass-card" style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(109,40,217,0.08))',
              border: '1px solid rgba(79,70,229,0.25)',
              marginTop: 48, marginBottom: 32,
            }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div style={{
                    width: 120, height: 120, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #6D28D9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Sora', fontWeight: 700, fontSize: '1.8rem', color: 'white',
                    boxShadow: '0 8px 32px rgba(59,130,246,0.3)',
                    overflow: 'hidden',
                  }}>
                    <img src="/images/gallery/Director of Business Incubator Professor BENTOUMI Sarra.jpeg" alt="Prof. BENTOUMI Sarra" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="text-center md:text-left">
                    <p style={{ fontFamily: 'Sora', fontWeight: 700, color: '#F0F4FF', fontSize: '1rem' }}>Prof. BENTOUMI Sarra</p>
                    <p style={{ color: '#60A5FA', fontSize: '0.82rem' }}>Director of Business Incubator</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={16} style={{ color: '#60A5FA' }} />
                    </div>
                    <span style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.88rem' }}>M'Sila University MailBox 166 Ichbellia - M'Sila</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={16} style={{ color: '#60A5FA' }} />
                    </div>
                    <a href="mailto:sarra.bentoumi@univ-msila.dz" style={{ color: '#60A5FA', fontSize: '0.88rem', textDecoration: 'none' }}>sarra.bentoumi@univ-msila.dz</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={16} style={{ color: '#60A5FA' }} />
                    </div>
                    <span style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.88rem' }}>(+213) 35 13 38 49</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p style={{ fontFamily: 'Sora', fontWeight: 600, color: '#A78BFA', fontSize: '0.85rem', marginBottom: 4 }}>Achievements</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} style={{ color: '#4ADE80', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.82rem' }}>First business incubator nationally to get a Label of Business Incubator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} style={{ color: '#4ADE80', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.82rem' }}>Honored by Minister of Higher Education — 16 April 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} style={{ color: '#4ADE80', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.82rem' }}>#1 nationally in number of StartUps established and patents deposited</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Overview & Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Reveal direction="left">
              <div className="glass-card" style={{ height: '100%' }}>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.15rem', color: '#F0F4FF', marginBottom: 16 }}>
                  <BookOpen size={20} style={{ marginRight: 8, verticalAlign: 'middle', color: '#60A5FA' }} /> Overview
                </h3>
                <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 12 }}>
                  The idea of establishing the incubator at the level of the University of M'Sila dates back to the Fall University event on December 12-13, 2018, where the rector of Mohammed Boudiaf University gave preliminary approval for the incubator as a project with economic and social dimensions of the university, and appointed Dr. Mir Ahmed as its director. It was approved by the University's Board of Directors, where its members approved by an overwhelming majority its draft establishment.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="glass-card" style={{ height: '100%' }}>
                <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.15rem', color: '#F0F4FF', marginBottom: 16 }}>
                  <Landmark size={20} style={{ marginRight: 8, verticalAlign: 'middle', color: '#8B5CF6' }} /> Profile
                </h3>
                <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 12 }}>
                  The Business Incubator of the University of M'Sila was established by Ministerial Decree No. 182 of 27 May 2019, making it the first business incubator within the university at the national level. It was followed by some Algerian universities such as Blida University, Ouargla… etc.
                </p>
                <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                  Managed by the Research Directorate of the Ministry of Higher Education and Scientific Research (DGRSDT), the incubator is administered by a director appointed by the university administration. The incubator manager has the authority to form a project selection committee with a group of professors who select and accompany various projects and ideas among young entrepreneurs.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Programs */}
          <Reveal>
            <div className="glass-card" style={{ marginBottom: 32 }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.15rem', color: '#F0F4FF', marginBottom: 20 }}>
                <ClipboardList size={20} style={{ marginRight: 8, verticalAlign: 'middle', color: '#A78BFA' }} /> Business Incubator Programs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { num: '1', title: 'Pre-incubation Program', desc: 'Includes 27 scientific meetings and symposiums from 2019 to June 2022 for students and researchers with innovative ideas.' },
                  { num: '2', title: 'Incubation Program', desc: 'Annual program of more than 85 hours covering AI, biology, digital marketing, BMC, funding mechanisms, legal affairs...' },
                  { num: '3', title: 'Post-incubation Program', desc: 'Field visits to graduated institutions providing expertise, guidance, financial and technical examination.' },
                  { num: '4', title: 'Patent Program', desc: 'In coordination with INAPI, the incubator registers and protects innovative ideas in the form of patents.' },
                  { num: '5', title: 'Label Tagging Program', desc: 'Encourages students to register on startup.dz platform to obtain Label tagging for funding from ASF.' },
                  { num: '6', title: 'StartUp Graduation Certificate', desc: 'Training programs to transform Bachelor/Master/PhD projects into StartUps under resolution 1275.' },
                ].map((p, i) => (
                  <div key={i} style={{
                    padding: 16, borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'linear-gradient(135deg, #3B82F6, #6D28D9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Sora', fontWeight: 700, fontSize: '0.8rem', color: 'white',
                      marginBottom: 10,
                    }}>{p.num}</div>
                    <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.9rem', color: '#F0F4FF', marginBottom: 6 }}>{p.title}</p>
                    <p style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Statistics Table */}
          <Reveal>
            <div className="glass-card" style={{ marginBottom: 32 }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.15rem', color: '#F0F4FF', marginBottom: 20 }}>
                <BarChart3 size={20} style={{ marginRight: 8, verticalAlign: 'middle', color: '#F59E0B' }} /> Statistics on Incubator Activities
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      {['Year', 'Patent files deposited with INAPI', 'Number of StartUps graduating', 'Number of innovative projects tagged with "Label"', 'Label Business Incubator'].map(h => (
                        <th key={h} style={{ padding: '12px 10px', textAlign: 'left', color: '#A78BFA', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { year: '2019', patents: '02', startups: '0', labeled: '0', labelNote: '' },
                      { year: '2020', patents: '13', startups: '01', labeled: '0', labelNote: '' },
                      { year: '2021', patents: '29', startups: '04', labeled: '28', labelNote: '01' },
                      { year: '2022', patents: '65', startups: '06', labeled: '12', labelNote: '' },
                      { year: '2023', patents: '93', startups: '03', labeled: '—', labelNote: 'First business incubator nationally to get a Label Of Business Incubator' },
                      { year: 'Total', patents: '202 (10 handed over)', startups: '17', labeled: '52', labelNote: '' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                        <td style={{ padding: '10px', color: '#60A5FA', fontFamily: 'Sora', fontWeight: 600 }}>{row.year}</td>
                        <td style={{ padding: '10px', color: 'rgba(240,244,255,0.65)' }}>{row.patents}</td>
                        <td style={{ padding: '10px', color: 'rgba(240,244,255,0.65)' }}>{row.startups}</td>
                        <td style={{ padding: '10px', color: 'rgba(240,244,255,0.65)' }}>{row.labeled}</td>
                        <td style={{ padding: '10px', color: 'rgba(240,244,255,0.5)', fontSize: '0.78rem' }}>{row.labelNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Resolution 1275 Statistics */}
          <Reveal>
            <div className="glass-card" style={{ marginBottom: 32 }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.15rem', color: '#F0F4FF', marginBottom: 20 }}>
                <BarChart3 size={20} style={{ marginRight: 8, verticalAlign: 'middle', color: '#F59E0B' }} /> Statistics on Resolution 1275 — By Faculty
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      {['#', 'Faculty / Institute', 'Projects Registered', 'Students Enrolled', 'Projects Discussed', 'Students Discussed'].map(h => (
                        <th key={h} style={{ padding: '10px 8px', textAlign: 'left', color: '#A78BFA', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['01', 'Science', '76', '133', '33', '56'],
                      ['02', 'Technology', '109', '222', '43', '81'],
                      ['03', 'Humanities and Social Sciences', '34', '64', '20', '30'],
                      ['04', 'Economics, Business and Management Sciences', '30', '50', '20', '28'],
                      ['05', 'Mathematics And Informatics', '27', '55', '20', '45'],
                      ['06', 'Institute Of G.T.U', '06', '12', '06', '12'],
                      ['07', 'Institute of Science and Techniques of Physical and Sporting Activities', '03', '06', '03', '06'],
                      ['08', 'Law And Political Science', '02', '06', '06', '06'],
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: '8px', color: j === 0 ? '#60A5FA' : 'rgba(240,244,255,0.65)', fontFamily: j === 0 ? 'Sora' : 'Outfit', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                    <tr style={{ background: 'rgba(59,130,246,0.08)', borderTop: '2px solid rgba(59,130,246,0.3)' }}>
                      <td style={{ padding: '10px 8px', color: '#60A5FA', fontFamily: 'Sora', fontWeight: 700 }}>Total</td>
                      <td style={{ padding: '10px 8px', color: '#F0F4FF', fontFamily: 'Sora', fontWeight: 600 }}>—</td>
                      <td style={{ padding: '10px 8px', color: '#F0F4FF', fontFamily: 'Sora', fontWeight: 600 }}>287</td>
                      <td style={{ padding: '10px 8px', color: '#F0F4FF', fontFamily: 'Sora', fontWeight: 600 }}>548</td>
                      <td style={{ padding: '10px 8px', color: '#F0F4FF', fontFamily: 'Sora', fontWeight: 600 }}>151</td>
                      <td style={{ padding: '10px 8px', color: '#F0F4FF', fontFamily: 'Sora', fontWeight: 600 }}>264</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <p style={{ color: '#FCD34D', fontSize: '0.88rem', fontFamily: 'Sora', fontWeight: 600, marginBottom: 4 }}><MapPin size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Outside Resolution 1275</p>
                <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.85rem' }}>124 projects registered at the University of M'Sila Business Incubator outside resolution 1275 in all faculties and university institutes.</p>
              </div>
            </div>
          </Reveal>

          {/* Crowning */}
          <Reveal>
            <div className="glass-card" style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(234,179,8,0.05))',
              border: '1px solid rgba(245,158,11,0.2)',
            }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.15rem', color: '#FCD34D', marginBottom: 16 }}>
                <Trophy size={22} style={{ marginRight: 8, verticalAlign: 'middle' }} /> Crowning
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Medal size={22} style={{ color: '#FCD34D', flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    The incubator of the University of M'Sila was honored by the Minister of Higher Education and Scientific Research on the occasion of the day of science coinciding with the date of 16 April 2023, as the first business Incubator nationally in terms of the number of StartUps established at the university, as well as in terms of the number of patents deposited.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Medal size={22} style={{ color: '#FCD34D', flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    Tribute to the Business incubator on the occasion of the results achieved at the national level on the occasion of Science Day: 16 April 2023 By The governor of M'sila City.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag={<><Users size={14} /> Our Team</>}
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
                    {localeData(member, 'name')}
                    </h3>
                    <p style={{ color: member.color, fontSize: '0.82rem', fontFamily: 'Outfit', marginBottom: 12 }}>
                      {localeData(member, 'role')}
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
