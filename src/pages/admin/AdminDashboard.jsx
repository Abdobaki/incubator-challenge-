import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Rocket, Calendar, Newspaper, Image, LogOut, TrendingUp,
  Users, DollarSign, Eye, Plus, Edit, Trash2, Search, Bell, Settings, BarChart3,
  Hand, User, X, Upload, Check, Globe, Mail, Phone, MapPin, Save,
  ChevronDown, Clock, Filter, LogIn, Moon, Sun,
} from 'lucide-react';
import { startups, events, newsArticles, galleryItems } from '../../data/index';
import { users, notifications as notifData } from '../../data/adminData';
import { AnimatedCounter } from '../../components/ui/index';
import { useTranslation } from '../../hooks/useTranslation';

const navItems = [
  { icon: LayoutDashboard, labelKey: 'admin.sidebar.dashboard', key: 'dashboard' },
  { icon: Rocket, labelKey: 'admin.sidebar.startups', key: 'startups' },
  { icon: Calendar, labelKey: 'admin.sidebar.events', key: 'events' },
  { icon: Newspaper, labelKey: 'admin.sidebar.news', key: 'news' },
  { icon: Image, labelKey: 'admin.sidebar.gallery', key: 'gallery' },
  { icon: Users, labelKey: 'admin.sidebar.users', key: 'users' },
  { icon: Settings, labelKey: 'admin.sidebar.settings', key: 'settings' },
];

const dashboardStats = [
  { labelKey: 'admin.totalStartups', value: 120, icon: Rocket, color: '#3B82F6', changeKey: null, change: '+8 this month' },
  { labelKey: 'admin.activeMentors', value: 45, icon: Users, color: '#8B5CF6', changeKey: null, change: '+3 this month' },
  { labelKey: 'admin.dzdRaised', value: 50, suffix: 'M', icon: DollarSign, color: '#10B981', changeKey: null, change: '+5M this quarter' },
  { labelKey: 'admin.siteVisitors', value: 12400, icon: Eye, color: '#F59E0B', changeKey: null, change: '+24% vs last month' },
];

function DashboardHome({ t }) {
  return (
    <div>
      <div className="mb-8">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.8rem', color: '#F0F4FF', marginBottom: 6 }}>
          {t('admin.welcome')} <Hand size={24} style={{ marginLeft: 8 }} />
        </h2>
        <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.95rem' }}>{t('admin.welcome.sub')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat) => (
          <div key={stat.labelKey} className="glass-card" style={{ padding: 20 }}>
            <div className="flex items-start justify-between mb-3">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${stat.color}18`, border: `1px solid ${stat.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <TrendingUp size={14} style={{ color: '#4ADE80' }} />
            </div>
            <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} size="md" />
            <p style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'rgba(240,244,255,0.5)', marginTop: 4 }}>{t(stat.labelKey)}</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.67rem', color: '#4ADE80', marginTop: 6 }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card" style={{ padding: 24 }}>
          <div className="flex items-center justify-between mb-6">
            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: '#F0F4FF' }}>{t('admin.chartTitle')}</h3>
            <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>{t('admin.chartPeriod')}</span>
          </div>
          <div className="flex items-end gap-3" style={{ height: 140 }}>
            {[65, 80, 55, 90, 75, 110].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', height: `${(v / 110) * 100}%`, background: i === 5 ? 'linear-gradient(to top, #3B82F6, #8B5CF6)' : 'rgba(59,130,246,0.25)', borderRadius: '6px 6px 0 0', border: i === 5 ? 'none' : '1px solid rgba(59,130,246,0.2)', transition: 'all 0.3s', boxShadow: i === 5 ? '0 0 15px rgba(59,130,246,0.4)' : 'none', minHeight: 20 }} />
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'rgba(240,244,255,0.3)' }}>{['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: '#F0F4FF', marginBottom: 20 }}>{t('admin.categories')}</h3>
          <div className="flex flex-col gap-3">
            {[
              { label: 'FinTech', pct: 28, color: '#10B981' },
              { label: 'EdTech', pct: 22, color: '#8B5CF6' },
              { label: 'AgriTech', pct: 18, color: '#3B82F6' },
              { label: 'HealthTech', pct: 16, color: '#EF4444' },
              { label: 'Other', pct: 16, color: '#F59E0B' },
            ].map(cat => (
              <div key={cat.label}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'rgba(240,244,255,0.6)' }}>{cat.label}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: cat.color }}>{cat.pct}%</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                  <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: 3, opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: '#F0F4FF', marginBottom: 16 }}>{t('admin.recentActivity')}</h3>
        <div className="flex flex-col gap-3">
          {[
            { action: 'New startup application received', detail: 'AquaPure — CleanTech', time: '2 min ago', icon: Rocket, color: '#3B82F6' },
            { action: 'Event registration complete', detail: 'AI Bootcamp — 60/60 spots filled', time: '15 min ago', icon: Calendar, color: '#10B981' },
            { action: 'News article published', detail: 'BIS ranked #1 in Algeria', time: '1 hour ago', icon: Newspaper, color: '#8B5CF6' },
            { action: 'New mentor onboarded', detail: 'Dr. Walid Hamza — Tech Strategy', time: '3 hours ago', icon: User, color: '#F59E0B' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, border: `1px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,244,255,0.8)' }}>{item.action}</p>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'rgba(240,244,255,0.4)' }}>{item.detail}</p>
              </div>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(240,244,255,0.3)', flexShrink: 0 }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManageSection({ title, items, columns, t }) {
  const [search, setSearch] = useState('');
  const filtered = items.filter(i =>
    Object.values(i).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF' }}>{t('admin.manage')} {title}</h2>
        <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
          <Plus size={16} /> {t('admin.addNew')}
        </button>
      </div>
      <div style={{ position: 'relative', maxWidth: 320, marginBottom: 20 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,244,255,0.3)' }} />
        <input className="input-glass" style={{ paddingLeft: 38 }} placeholder={`${t('admin.search')} ${title.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {columns.map(col => (
                <th key={col} style={{ textAlign: 'left', padding: '14px 20px', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'rgba(240,244,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {col}
                </th>
              ))}
              <th style={{ textAlign: 'right', padding: '14px 20px', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'rgba(240,244,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 6).map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                {columns.map(col => {
                  const colKey = col.toLowerCase();
                  const val = item[colKey] !== undefined ? item[colKey] : item[Object.keys(item)[columns.indexOf(col)]];
                  return (
                    <td key={col} style={{ padding: '14px 20px', fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,244,255,0.7)' }}>
                      {col === 'Status' ? (
                        <span className={`badge ${val === 'Active' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.68rem' }}>{val}</span>
                      ) : val || '—'}
                    </td>
                  );
                })}
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <div className="flex justify-end gap-2">
                    <button style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA' }}>
                      <Edit size={13} />
                    </button>
                    <button style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FCA5A5' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GalleryManager({ t }) {
  const [items, setItems] = useState(galleryItems);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [localImages, setLocalImages] = useState([]);

  const types = ['all', ...new Set(galleryItems.map(i => i.type))];
  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((f, i) => ({
      id: Date.now() + i,
      title: f.name.replace(/\.[^/.]+$/, ''),
      type: 'other',
      image: URL.createObjectURL(f),
      span: 'col-span-1 row-span-1',
    }));
    setLocalImages(prev => [...prev, ...newImages]);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setLocalImages(prev => prev.filter(i => i.id !== id));
  };

  const allItems = [...items, ...localImages];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF' }}>{t('admin.manage')} Gallery</h2>
        <label className="btn-primary" style={{ cursor: 'pointer', fontSize: '0.85rem', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Upload size={16} /> {t('admin.gallery.upload')}
          <input type="file" multiple accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {allItems.length === 0 ? (
        <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
          <Image size={48} style={{ color: 'rgba(240,244,255,0.15)', marginBottom: 12 }} />
          <p style={{ color: 'rgba(240,244,255,0.4)', fontFamily: 'Outfit' }}>{t('admin.gallery.noImages')}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {types.map(type => (
              <button key={type} onClick={() => setFilter(type)}
                className={`badge ${filter === type ? 'badge-blue' : ''}`}
                style={{ cursor: 'pointer', opacity: filter === type ? 1 : 0.5, textTransform: 'capitalize' }}>
                {t(type === 'all' ? 'common.all' : `common.${type}`)}
              </button>
            ))}
          </div>

          <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {filtered.map(item => (
              <div key={item.id}
                className="group"
                style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', aspectRatio: item.span?.includes('row-span-2') ? '1' : '4/3' }}
                onClick={() => setSelected(item)}>
                <img src={item.image} alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  className="group-hover:scale-105" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '12px 14px' }}>
                  <p style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'white', fontWeight: 500 }}>{item.title}</p>
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>{item.type}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 8, background: 'rgba(239,68,68,0.8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', opacity: 0, transition: 'opacity 0.2s' }}
                  className="group-hover:opacity-100">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setSelected(null)}>
          <div style={{ position: 'relative', maxWidth: 800, width: '100%', borderRadius: 16, overflow: 'hidden' }}>
            <img src={selected.image} alt={selected.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: 16 }}>
              <p style={{ fontFamily: 'Sora', fontWeight: 600, color: 'white', fontSize: '1rem' }}>{selected.title}</p>
            </div>
            <button onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsPage({ t }) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    siteName: 'BIS Incubator',
    siteDesc: 'University of M\'sila Business Incubator Startup',
    contactEmail: 'contact@bis.univ-msila.dz',
    contactPhone: '+213 555 123 456',
    address: 'University of M\'sila, BP 166, M\'sila 28000, Algeria',
    defaultLang: 'en',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF', marginBottom: 24 }}>{t('admin.settings.title')}</h2>

      <div className="glass-card" style={{ padding: 32, maxWidth: 640 }}>
        <form onSubmit={handleSave}>
          <div className="mb-5">
            <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
              <Globe size={14} style={{ marginRight: 6 }} /> {t('admin.settings.siteName')}
            </label>
            <input className="input-glass" value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })} />
          </div>
          <div className="mb-5">
            <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
              {t('admin.settings.siteDesc')}
            </label>
            <textarea className="input-glass" rows={3} value={form.siteDesc} onChange={e => setForm({ ...form, siteDesc: e.target.value })} />
          </div>
          <div className="mb-5">
            <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
              <Mail size={14} style={{ marginRight: 6 }} /> {t('admin.settings.contactEmail')}
            </label>
            <input className="input-glass" type="email" value={form.contactEmail} onChange={e => setForm({ ...form, contactEmail: e.target.value })} />
          </div>
          <div className="mb-5">
            <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
              <Phone size={14} style={{ marginRight: 6 }} /> {t('admin.settings.contactPhone')}
            </label>
            <input className="input-glass" value={form.contactPhone} onChange={e => setForm({ ...form, contactPhone: e.target.value })} />
          </div>
          <div className="mb-5">
            <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
              <MapPin size={14} style={{ marginRight: 6 }} /> {t('admin.settings.address')}
            </label>
            <input className="input-glass" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="mb-6">
            <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)', display: 'block', marginBottom: 8 }}>
              {t('admin.settings.defaultLang')}
            </label>
            <select className="input-glass" value={form.defaultLang} onChange={e => setForm({ ...form, defaultLang: e.target.value })}
              style={{ appearance: 'auto', cursor: 'pointer' }}>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ fontSize: '0.9rem', padding: '12px 28px' }}>
            <Save size={16} /> {t('admin.settings.save')}
          </button>
          {saved && (
            <span style={{ marginLeft: 16, fontFamily: 'Outfit', fontSize: '0.85rem', color: '#4ADE80' }}>
              <Check size={14} style={{ marginRight: 4 }} /> {t('admin.settings.saved')}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

function NotificationsDropdown({ t, onClose }) {
  const [notes, setNotes] = useState(notifData);

  const markAllRead = () => {
    setNotes(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 340, borderRadius: 14, background: '#0B0E28', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 100 }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.88rem', color: '#F0F4FF' }}>
          <Bell size={14} style={{ marginRight: 6 }} /> Notifications
        </span>
        <button onClick={markAllRead} style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: '#60A5FA', background: 'none', border: 'none', cursor: 'pointer' }}>
          {t('admin.notifications.markRead')}
        </button>
      </div>
      <div style={{ maxHeight: 340, overflowY: 'auto' }}>
        {notes.length === 0 ? (
          <div className="text-center py-10">
            <p style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'rgba(240,244,255,0.3)' }}>{t('admin.notifications.empty')}</p>
          </div>
        ) : notes.map((n) => (
          <div key={n.id} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)', background: n.read ? 'transparent' : 'rgba(59,130,246,0.05)', cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${n.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bell size={13} style={{ color: n.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: '#F0F4FF', fontWeight: n.read ? 400 : 600 }}>{n.title}</p>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: 'rgba(240,244,255,0.4)', marginTop: 2 }}>{n.detail}</p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'rgba(240,244,255,0.25)', marginTop: 4 }}>
                <Clock size={10} style={{ marginRight: 4 }} />{n.time}
              </p>
            </div>
            {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3B82F6', flexShrink: 0, marginTop: 3 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileDropdown({ t, onClose, navigate }) {
  return (
    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 220, borderRadius: 14, background: '#0B0E28', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 100 }}>
      <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.88rem', color: '#F0F4FF' }}>{t('admin.profile.name')}</p>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(240,244,255,0.35)', marginTop: 2 }}>{t('admin.profile.email')}</p>
      </div>
      <div style={{ padding: 4 }}>
        {[
          { icon: User, label: 'admin.profile.title' },
          { icon: Settings, label: 'admin.sidebar.settings' },
          { icon: LogIn, label: 'admin.sidebar.signOut' },
        ].map(({ icon: Icon, label }) => (
          <button key={label} onClick={() => { if (label === 'admin.sidebar.signOut') navigate('/admin'); onClose(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: 'transparent', color: 'rgba(240,244,255,0.6)', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.85rem', transition: 'all 0.15s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <Icon size={15} /> {t(label)}
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageSwitcher() {
  const { lang, switchLang, languages } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const options = [languages.en, languages.fr, languages.ar].filter(l => l.code !== lang);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,244,255,0.5)', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.7rem' }}>
        {lang.toUpperCase()}
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: '#0B0E28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden', zIndex: 100, minWidth: 120 }}>
          {options.map(l => (
            <button key={l.code} onClick={() => { switchLang(l.code); setOpen(false); }}
              style={{ display: 'block', width: '100%', padding: '8px 14px', border: 'none', cursor: 'pointer', textAlign: 'left', background: 'transparent', color: 'rgba(240,244,255,0.6)', fontFamily: 'Outfit', fontSize: '0.82rem', transition: 'all 0.15s' }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              {l.label} — {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const renderContent = () => {
    if (activeSection === 'dashboard') return <DashboardHome t={t} />;
    if (activeSection === 'startups') return <ManageSection title="Startups" items={startups} columns={['Name', 'Category', 'Stage', 'Founded']} t={t} />;
    if (activeSection === 'events') return <ManageSection title="Events" items={events} columns={['Title', 'Type', 'Date', 'Status']} t={t} />;
    if (activeSection === 'news') return <ManageSection title="News" items={newsArticles} columns={['Title', 'Category', 'Date', 'Author']} t={t} />;
    if (activeSection === 'gallery') return <GalleryManager t={t} />;
    if (activeSection === 'users') return <ManageSection title="Users" items={users} columns={['Name', 'Email', 'Role', 'Status', 'Joined']} t={t} />;
    if (activeSection === 'settings') return <SettingsPage t={t} />;
    return null;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#03061A' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: 240, flexShrink: 0, padding: '24px 0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div className="flex items-center gap-3 px-6 mb-8">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3B82F6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: '0.8rem', color: 'white' }}>
            BIS
          </div>
          <div>
            <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem', color: '#F0F4FF' }}>Admin Panel</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,244,255,0.3)' }}>v1.0.0</p>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ icon: Icon, labelKey, key }) => (
            <button key={key} onClick={() => setActiveSection(key)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: activeSection === key ? 'rgba(59,130,246,0.15)' : 'transparent', color: activeSection === key ? '#60A5FA' : 'rgba(240,244,255,0.5)', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.2s', borderLeft: activeSection === key ? '3px solid #3B82F6' : '3px solid transparent' }}>
              <Icon size={17} />
              {t(labelKey)}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 12px' }}>
          <button onClick={() => navigate('/admin')}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: 'transparent', color: 'rgba(240,244,255,0.35)', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.2s' }}>
            <LogOut size={17} />
            {t('admin.sidebar.signOut')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <div className="flex items-center justify-between mb-8">
          <div />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <div ref={notifRef} style={{ position: 'relative' }}>
              <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(240,244,255,0.5)', position: 'relative' }}>
                <Bell size={16} />
                <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#EF4444' }} />
              </button>
              {notifOpen && <NotificationsDropdown t={t} onClose={() => setNotifOpen(false)} />}
            </div>

            <div ref={profileRef} style={{ position: 'relative' }}>
              <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.8rem', color: 'white', cursor: 'pointer', border: 'none' }}>
                A
              </button>
              {profileOpen && <ProfileDropdown t={t} onClose={() => setProfileOpen(false)} navigate={navigate} />}
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}
