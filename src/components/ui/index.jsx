import React from 'react';
import { useIntersectionObserver, useCounter } from '../../hooks/useIntersectionObserver';

// ═══════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════
export function SectionHeader({ tag, title, subtitle, align = 'center', className = '' }) {
  const [ref, visible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`${align === 'center' ? 'text-center' : ''} ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {tag && (
        <div className="section-tag" style={{ justifyContent: align === 'center' ? 'center' : 'flex-start', display: 'inline-flex' }}>
          {tag}
        </div>
      )}
      <h2 style={{
        fontFamily: 'Sora',
        fontWeight: 800,
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        color: '#F0F4FF',
        marginBottom: subtitle ? 16 : 0,
        lineHeight: 1.15,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          color: 'rgba(240,244,255,0.6)',
          fontSize: '1.05rem',
          maxWidth: align === 'center' ? 620 : '100%',
          margin: align === 'center' ? '0 auto' : 0,
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════
export function AnimatedCounter({ value, suffix = '', prefix = '', size = 'xl' }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.5 });
  const count = useCounter(value, 2000, visible);

  const fontSize = {
    sm: 'clamp(1.5rem, 3vw, 2rem)',
    md: 'clamp(2rem, 4vw, 2.8rem)',
    xl: 'clamp(2.5rem, 5vw, 3.5rem)',
    '2xl': 'clamp(3rem, 6vw, 4.5rem)',
  }[size] || 'clamp(2.5rem, 5vw, 3.5rem)';

  return (
    <span ref={ref} className="counter-value" style={{ fontSize, letterSpacing: '-0.03em' }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════
// BADGE
// ═══════════════════════════════════════════════
export function Badge({ children, color = 'blue', className = '' }) {
  const colorMap = {
    blue: 'badge-blue',
    violet: 'badge-violet',
    green: 'badge-green',
    amber: 'badge-amber',
    red: 'badge-red',
  };

  return (
    <span className={`badge ${colorMap[color] || 'badge-blue'} ${className}`}>
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════
// REVEAL WRAPPER
// ═══════════════════════════════════════════════
export function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useIntersectionObserver();

  const transforms = {
    up: { from: 'translateY(40px)', to: 'translateY(0)' },
    left: { from: 'translateX(-40px)', to: 'translateX(0)' },
    right: { from: 'translateX(40px)', to: 'translateX(0)' },
    scale: { from: 'scale(0.9)', to: 'scale(1)' },
  };

  const t = transforms[direction] || transforms.up;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? t.to : t.from,
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════
export function GlassCard({ children, className = '', style = {}, hover = true }) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-hover' : ''} ${className}`}
      style={{ padding: 28, ...style }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════
// ICON BUTTON
// ═══════════════════════════════════════════════
export function IconBox({ icon: Icon, color, size = 48 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: size * 0.3,
      background: `${color}20`,
      border: `1px solid ${color}40`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon size={size * 0.45} style={{ color }} />
    </div>
  );
}
