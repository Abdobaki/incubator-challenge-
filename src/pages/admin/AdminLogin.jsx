import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

export function AdminLogin() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (form.email === 'admin@bis.dz' && form.password === 'admin123') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Try admin@bis.dz / admin123');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#03061A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: '-150px', left: '-100px', opacity: 0.1 }} />
      <div className="orb orb-violet" style={{ width: 400, height: 400, bottom: '-150px', right: '-100px', opacity: 0.1 }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src="/images/gallery/logo.png"
            alt="BIS Incubator"
            style={{
              width: 64, height: 64, borderRadius: 18, objectFit: 'contain',
              boxShadow: '0 0 40px rgba(59,130,246,0.4)', margin: '0 auto 16px',
            }}
          />
          <h1 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.3rem', color: '#F0F4FF', marginBottom: 6 }}>
            {t('admin.login.title')}
          </h1>
          <p style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,244,255,0.45)' }}>
            {t('admin.login.subtitle')}
          </p>
        </div>

        <div className="glass-card" style={{ padding: 36 }}>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
                  {t('admin.login.email')}
                </label>
                <input
                  type="email"
                  required
                  className="input-glass"
                  placeholder="admin@bis.dz"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
                  {t('admin.login.password')}
                </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  className="input-glass"
                  style={{ paddingRight: 48 }}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,244,255,0.4)',
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                fontFamily: 'Outfit', fontSize: '0.85rem', color: '#FCA5A5',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '13px 24px' }}
              disabled={loading}
            >
                {loading ? (
                <div style={{
                  width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                }} />
              ) : (
                <>
                  <Lock size={16} /> {t('admin.login.signIn')}
                </>
              )}
            </button>
          </form>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'rgba(240,244,255,0.3)', textAlign: 'center', marginTop: 20 }}>
            {t('admin.login.demo')}
          </p>
        </div>
      </div>
    </div>
  );
}
