import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function LoadingScreen({ onComplete }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 600);
    }, 2000);

    const interval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 15, 100));
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className="loading-screen"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-blue" style={{ width: 400, height: 400, top: '10%', left: '-10%', opacity: 0.15 }} />
      <div className="orb orb-violet" style={{ width: 300, height: 300, bottom: '10%', right: '-5%', opacity: 0.15 }} />

      {/* Logo */}
      <div className="flex flex-col items-center gap-6">
        <div style={{ position: 'relative' }}>
          {/* Glow ring */}
          <div style={{
            position: 'absolute',
            inset: -12,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.4) 0%, transparent 70%)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }} />
          {/* Logo mark */}
          <img
            src="/images/gallery/logo.png"
            alt="BIS Incubator"
            style={{
              width: 80, height: 80, borderRadius: 20, objectFit: 'contain',
              position: 'relative', zIndex: 1,
              boxShadow: '0 0 40px rgba(59,130,246,0.5)',
            }}
          />
        </div>

        <div className="text-center">
          <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.1rem', color: 'rgba(240,244,255,0.9)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Bureau d'Innovation & Startup
          </p>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'rgba(240,244,255,0.4)', letterSpacing: '0.15em', marginTop: 4 }}>
            UNIVERSITY OF M'SILA
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 200 }}>
          <div className="loading-bar">
            <div
              className="loading-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%`, transition: 'width 0.15s ease' }}
            />
          </div>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'rgba(240,244,255,0.3)', textAlign: 'center', marginTop: 8 }}>
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>
      </div>
    </div>
  );
}
