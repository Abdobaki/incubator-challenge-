import React from 'react';
import { stats } from '../../data/index';
import { AnimatedCounter, Reveal } from '../ui/index';
import { TrendingUp } from 'lucide-react';

export default function Stats() {
  return (
    <section style={{ padding: '80px 0', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats grid */}
        <div
          className="glass-card"
          style={{
            padding: '60px 40px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(109,40,217,0.08) 100%)',
            border: '1px solid rgba(79,70,229,0.2)',
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 120} direction="up">
                <div className="text-center">
                  <div style={{ marginBottom: 8 }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} size="2xl" />
                  </div>
                  <p style={{
                    fontFamily: 'Outfit',
                    fontSize: '0.95rem',
                    color: 'rgba(240,244,255,0.55)',
                    marginTop: 8,
                  }}>
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp size={12} style={{ color: '#4ADE80' }} />
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#4ADE80' }}>+12% YoY</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
