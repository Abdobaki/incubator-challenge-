import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Users, GraduationCap, DollarSign, Network, Globe, ArrowRight, Target } from 'lucide-react';
import { programs } from '../../data/index';
import { SectionHeader, Reveal } from '../ui/index';
import { useTranslation } from '../../hooks/useTranslation';

const iconMap = { Rocket, Users, GraduationCap, DollarSign, Network, Globe };

export default function ProgramsOverview() {
  const { t, localeData } = useTranslation();
  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag={<><Target size={14} /> {t('section.programs')}</>}
          title={<><span className="gradient-text">{t('section.programs.title').split(' ').slice(0, 2).join(' ')}</span> {t('section.programs.title').split(' ').slice(2).join(' ')}</>}
          subtitle={t('section.programs.sub')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {programs.map((program, i) => {
            const Icon = iconMap[program.icon] || Rocket;
            return (
              <Reveal key={program.id} delay={i * 100} direction="up">
                <div
                  className="glass-card program-card"
                  style={{ height: '100%', cursor: 'pointer' }}
                >
                  {/* Icon and badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `${program.iconColor}18`,
                      border: `1px solid ${program.iconColor}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Icon size={24} style={{ color: program.iconColor }} />
                    </div>
                    <span className={`badge ${program.badgeColor}`} style={{ fontSize: '0.7rem' }}>
                      {program.badge}
                    </span>
                  </div>

                  {/* Background icon */}
                  <div
                    className="card-icon-bg"
                    style={{ background: `radial-gradient(circle, ${program.iconColor}, transparent)` }}
                  />

                  {/* Content */}
                  <h3 style={{
                    fontFamily: 'Sora',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#F0F4FF',
                    marginBottom: 10,
                  }}>
                    {localeData(program, 'title')}
                  </h3>
                  <p style={{
                    color: 'rgba(240,244,255,0.55)',
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}>
                    {localeData(program, 'description')}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-2 mb-6">
                    {program.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2" style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.85rem' }}>
                        <span style={{ color: program.iconColor, fontSize: '0.6rem' }}>◆</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Duration + CTA */}
                  <div className="flex items-center justify-between mt-auto">
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'rgba(240,244,255,0.35)' }}>
                      {program.duration}
                    </span>
                    <Link
                      to="/programs"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        color: program.iconColor,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontFamily: 'Sora',
                        transition: 'gap 0.2s',
                      }}
                      className="hover:gap-2"
                    >
                      {t('common.learnMore')} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/programs" className="btn-secondary" style={{ textDecoration: 'none' }}>
            {t('common.allPrograms')} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
