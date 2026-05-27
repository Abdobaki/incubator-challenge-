import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Rocket, Calendar, Newspaper, Image, LogOut, TrendingUp,
  Users, DollarSign, Eye, Plus, Edit, Trash2, Search, Bell, Settings, BarChart3,
  Hand, User,   Menu, X, Upload, Check, Globe, Mail, Phone, MapPin, Save,
  ChevronDown, Clock, Filter, LogIn, Moon, Sun, Palette,
} from 'lucide-react';
import { startups, events, newsArticles, galleryItems } from '../../data/index';
import { users as defaultUsers, notifications as notifData } from '../../data/adminData';
import { AnimatedCounter } from '../../components/ui/index';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { icon: LayoutDashboard, labelKey: 'admin.sidebar.dashboard', key: 'dashboard' },
  { icon: Rocket, labelKey: 'admin.sidebar.startups', key: 'startups' },
  { icon: Calendar, labelKey: 'admin.sidebar.events', key: 'events' },
  { icon: Newspaper, labelKey: 'admin.sidebar.news', key: 'news' },
  { icon: Image, labelKey: 'admin.sidebar.gallery', key: 'gallery' },
  { icon: Users, labelKey: 'admin.sidebar.users', key: 'users' },
  { icon: Settings, labelKey: 'admin.sidebar.settings', key: 'settings' },
];

const STORAGE_PREFIX = 'bis-admin-';

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) {
      const d = JSON.parse(raw);
      if (Array.isArray(d) && d.length > 0) return d;
    }
  } catch {}
  return fallback;
}

function saveData(key, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    // If quota exceeded, try to free space by stripping base64 images from gallery
    if (key !== 'gallery') {
      try {
        localStorage.removeItem(STORAGE_PREFIX + 'gallery');
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
        return;
      } catch {}
    }
    console.error('Failed to save to localStorage:', e);
    alert('Storage is full. Try removing some gallery images to free space.');
  }
}

function CrudModal({ fields, item, onSave, onClose, t }) {
  const [form, setForm] = useState(item ? { ...item } : {});
  const isNew = !item;

  const handleChange = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleFile = (key, file) => {
    if (!file) { handleChange(key, ''); return; }
    const reader = new FileReader();
    reader.onload = () => handleChange(key, reader.result);
    reader.readAsDataURL(file);
  };

  const handleTags = (key, val) => {
    handleChange(key, val.split(',').map(s => s.trim()).filter(Boolean));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}>
      <div className="glass-card" style={{ maxWidth: 520, width: '100%', padding: 28, maxHeight: '80vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            {isNew ? 'Add' : 'Edit'} {t('admin.manage').replace('Manage ', '')}
          </h3>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: 'rgba(240,244,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {fields.map(({ key, label, type, options }) => (
            <div key={key}>
              <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                {label}
              </label>
              {type === 'textarea' ? (
                <textarea className="input-glass" rows={3} value={form[key] || ''} onChange={e => handleChange(key, e.target.value)} />
              ) : type === 'select' ? (
                <select className="input-glass" value={form[key] || ''} onChange={e => handleChange(key, e.target.value)}
                  style={{ appearance: 'auto', cursor: 'pointer' }}>
                  {(options || []).map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : type === 'number' ? (
                <input className="input-glass" type="number" value={form[key] ?? ''} onChange={e => handleChange(key, e.target.valueAsNumber || 0)} />
              ) : type === 'date' ? (
                <input className="input-glass" type="date" value={form[key] || ''} onChange={e => handleChange(key, e.target.value)} />
              ) : type === 'file' ? (
                <div>
                  <input type="file" accept="image/*,video/*" style={{ width: '100%', padding: '6px 0', color: 'rgba(240,244,255,0.6)', fontFamily: 'Outfit', fontSize: '0.85rem' }}
                    onChange={e => handleFile(key, e.target.files?.[0])} />
                  {form[key] && form[key].startsWith('data:') && (
                    <img src={form[key]} alt="Preview" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} />
                  )}
                </div>
              ) : type === 'tags' ? (
                <input className="input-glass" value={Array.isArray(form[key]) ? form[key].join(', ') : form[key] || ''}
                  onChange={e => handleTags(key, e.target.value)} placeholder="tag1, tag2, tag3" />
              ) : type === 'checkbox' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'rgba(240,244,255,0.7)', fontFamily: 'Outfit', fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={!!form[key]} onChange={e => handleChange(key, e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#3B82F6', cursor: 'pointer' }} />
                  {label}
                </label>
              ) : (
                <input className="input-glass" type={type || 'text'} value={form[key] || ''} onChange={e => handleChange(key, e.target.value)} />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-8">
          <button onClick={onClose} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
            <Check size={15} style={{ marginRight: 6 }} /> {isNew ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel, t }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onCancel}>
      <div className="glass-card" style={{ maxWidth: 400, width: '100%', padding: 28, textAlign: 'center' }}
        onClick={e => e.stopPropagation()}>
        <Trash2 size={36} style={{ color: '#F87171', marginBottom: 12 }} />
        <p style={{ fontFamily: 'Sora', fontWeight: 600, color: '#F0F4FF', fontSize: '1rem', marginBottom: 6 }}>{t('admin.confirmDelete')}</p>
        <p style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'rgba(240,244,255,0.5)', marginBottom: 24 }}>{message}</p>
        <div className="flex justify-center gap-3">
          <button onClick={onCancel} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>Cancel</button>
          <button onClick={onConfirm} style={{ fontSize: '0.85rem', padding: '10px 22px', borderRadius: 10, border: 'none', fontFamily: 'Outfit', fontWeight: 600, cursor: 'pointer', background: '#EF4444', color: 'white' }}>
            <Trash2 size={14} style={{ marginRight: 6 }} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

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
        {[
          { labelKey: 'admin.totalStartups', value: 120, icon: Rocket, color: '#3B82F6', change: '+8 this month' },
          { labelKey: 'admin.activeMentors', value: 45, icon: Users, color: '#8B5CF6', change: '+3 this month' },
          { labelKey: 'admin.dzdRaised', value: 50, suffix: 'M', icon: DollarSign, color: '#10B981', change: '+5M this quarter' },
          { labelKey: 'admin.siteVisitors', value: 12400, icon: Eye, color: '#F59E0B', change: '+24% vs last month' },
        ].map((stat) => (
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
                <div style={{ width: '100%', height: `${(v / 110) * 100}%`, background: i === 5 ? 'linear-gradient(to top, #3B82F6, #8B5CF6)' : 'rgba(59,130,246,0.25)', borderRadius: '6px 6px 0 0', border: i === 5 ? 'none' : '1px solid rgba(59,130,246,0.2)', minHeight: 20, boxShadow: i === 5 ? '0 0 15px rgba(59,130,246,0.4)' : 'none' }} />
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
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'rgba(240,244,255,0.3)' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManageSection({ title, storageKey, items: fallback, columns, fields, t }) {
  const [items, setItems] = useState(() => loadData(storageKey, fallback));
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => { saveData(storageKey, items); }, [items, storageKey]);

  const filtered = items.filter(i =>
    Object.values(i).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  const getCategoryColor = (cat) => {
    const map = { Event: 'badge-amber', Achievement: 'badge-violet', Technology: 'badge-green', Hackathon: 'badge-red' };
    return map[cat] || 'badge-blue';
  };

  const handleSave = (form) => {
    const today = new Date().toISOString().split('T')[0];
    const enriched = { ...form };
    if (!enriched.date) enriched.date = today;
    if (enriched.category) enriched.categoryColor = getCategoryColor(enriched.category);
    if (modal.mode === 'add') {
      setItems(prev => [{ id: Date.now(), ...enriched }, ...prev]);
    } else {
      setItems(prev => prev.map(i => i.id === modal.item.id ? { ...i, ...enriched } : i));
    }
    setModal(null);
  };

  const handleDelete = () => {
    setItems(prev => prev.filter(i => i.id !== confirm.id));
    setConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF' }}>{t('admin.manage')} {title}</h2>
        <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}
          onClick={() => setModal({ mode: 'add', item: null })}>
          <Plus size={16} /> {t('admin.addNew')}
        </button>
      </div>

      <div style={{ position: 'relative', maxWidth: 320, marginBottom: 20 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,244,255,0.3)' }} />
        <input className="input-glass" style={{ paddingLeft: 38 }} placeholder={`${t('admin.search')} ${title.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="glass-card" style={{ padding: 0, overflowX: 'auto' }}>
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
            {filtered.slice(0, 20).map((item, i) => (
              <tr key={item.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                {columns.map(col => {
                  const colKey = col.toLowerCase();
                  const val = item[colKey] !== undefined ? item[colKey] : item[Object.keys(item)[columns.indexOf(col)]];
                  return (
                    <td key={col} style={{ padding: '14px 20px', fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,244,255,0.7)' }}>
                      {col === 'Status' ? (
                        <span className={`badge ${val === 'Active' || val === 'upcoming' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.68rem' }}>{val}</span>
                      ) : val || '—'}
                    </td>
                  );
                })}
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setModal({ mode: 'edit', item })}
                      style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA' }}>
                      <Edit size={13} />
                    </button>
                    <button onClick={() => setConfirm(item)}
                      style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FCA5A5' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgba(240,244,255,0.3)', fontFamily: 'Outfit' }}>
            No {title.toLowerCase()} found.
          </div>
        )}
      </div>

      {modal && (
        <CrudModal
          fields={fields}
          item={modal.mode === 'edit' ? modal.item : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
          t={t}
        />
      )}

      {confirm && (
        <ConfirmDialog
          message={`Delete this ${title.toLowerCase()}?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirm(null)}
          t={t}
        />
      )}
    </div>
  );
}

function GalleryManager({ t }) {
  const [items, setItems] = useState(() => loadData('gallery', galleryItems));
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => { saveData('gallery', items); }, [items]);

  const types = ['all', ...new Set(items.map(i => i.type))];
  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);

  const compressImage = (file) => new Promise(resolve => {
    if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const MAX = 800;
        let w = img.width, h = img.height;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else { w = Math.round(w * MAX / h); h = MAX; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newItems = await Promise.all(files.map(async (f, i) => {
      const dataUrl = await compressImage(f);
      return {
        id: Date.now() + i,
        title: f.name.replace(/\.[^/.]+$/, ''),
        type: f.type.startsWith('video/') ? 'video' : 'other',
        image: dataUrl,
        description: '',
        span: 'col-span-1 row-span-1',
      };
    }));
    setItems(prev => [...newItems, ...prev]);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleEditSave = (form) => {
    setItems(prev => prev.map(i => i.id === form.id ? { ...i, ...form } : i));
    setEditing(null);
  };

  const galleryTypes = ['symposium', 'seminar', 'event', 'workshop', 'team', 'facility', 'mentorship', 'video', 'other'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-primary)' }}>{t('admin.manage')} Gallery</h2>
        <label className="btn-primary" style={{ cursor: 'pointer', fontSize: '0.85rem', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Upload size={16} /> Add Images
          <input type="file" multiple accept="image/*,video/*" onChange={handleUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {items.length === 0 ? (
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
                {type === 'all' ? t('common.all') : type}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {filtered.map(item => (
              <div key={item.id} className="group" style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', aspectRatio: '4/3' }}
                onClick={() => setSelected(item)}>
                {item.image.endsWith('.mp4') || item.type === 'video' ? (
                  <video src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    className="group-hover:scale-105" />
                )}
                <div className="gallery-img-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '12px 14px' }}>
                  <p style={{ fontFamily: 'Outfit', fontSize: '0.78rem', color: 'white', fontWeight: 500 }}>{item.title}</p>
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>{item.type}</p>
                </div>
                  <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
                    <button onClick={(e) => { e.stopPropagation(); setEditing(item); }}
                      style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(59,130,246,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                      <Edit size={13} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                      style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(239,68,68,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Lightbox preview */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setSelected(null)}>
          <div style={{ position: 'relative', maxWidth: 800, width: '100%', borderRadius: 16, overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}>
            {selected.image.endsWith('.mp4') || selected.type === 'video' ? (
              <video src={selected.image} controls style={{ width: '100%', maxHeight: '80vh' }} />
            ) : (
              <img src={selected.image} alt={selected.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
            )}
            <div className="gallery-img-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: 16 }}>
              <p style={{ fontFamily: 'Sora', fontWeight: 600, color: 'white', fontSize: '1rem' }}>{selected.title}</p>
              {selected.description && (
                <p style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{selected.description}</p>
              )}
            </div>
            <button onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 24, overflowY: 'auto' }}
          onClick={() => setEditing(null)}>
          <div className="glass-card" style={{ maxWidth: 480, width: '100%', padding: 28, marginTop: 'auto', marginBottom: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Edit Image</h3>
              <button onClick={() => setEditing(null)} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: 'rgba(240,244,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} />
              </button>
            </div>

            {editing.image && !editing.image.startsWith('data:') && (
              <div style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden', maxHeight: 160 }}>
                <img src={editing.image} alt="" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Replace Image</label>
                <input type="file" accept="image/*,video/*" style={{ width: '100%', padding: '6px 0', color: 'var(--text-secondary)', fontFamily: 'Outfit', fontSize: '0.85rem' }}
                  onChange={async e => {
                    const f = e.target.files?.[0];
                    if (f) {
                      const dataUrl = await compressImage(f);
                      setEditing(p => ({ ...p, image: dataUrl }));
                    }
                  }} />
              </div>
              <div>
                <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Title</label>
                <input className="input-glass" value={editing.title || ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Type</label>
                <select className="input-glass" value={editing.type || 'other'} onChange={e => setEditing(p => ({ ...p, type: e.target.value }))} style={{ appearance: 'auto', cursor: 'pointer' }}>
                  {galleryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea className="input-glass" rows={3} value={editing.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Grid Span</label>
                <select className="input-glass" value={editing.span || 'col-span-1 row-span-1'} onChange={e => setEditing(p => ({ ...p, span: e.target.value }))} style={{ appearance: 'auto', cursor: 'pointer' }}>
                  <option value="col-span-1 row-span-1">Small (1x1)</option>
                  <option value="col-span-2">Wide (2x1)</option>
                  <option value="col-span-2 row-span-2">Large (2x2)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <button onClick={() => setEditing(null)} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>Cancel</button>
              <button onClick={() => handleEditSave(editing)} className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
                <Check size={15} style={{ marginRight: 6 }} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsPage({ t }) {
  const { colors, updateThemeConfig, resetThemeConfig, defaultColors, theme, toggleTheme, bgImages, setSectionBg, removeSectionBg } = useTheme();
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState('general');
  const [form, setForm] = useState({
    siteName: 'BIS Incubator',
    siteDesc: 'University of M\'sila Business Incubator Startup',
    contactEmail: 'contact@bis.univ-msila.dz',
    contactPhone: '+213 555 123 456',
    address: 'University of M\'sila, BP 166, M\'sila 28000, Algeria',
    defaultLang: 'en',
  });
  const [bgInputs, setBgInputs] = useState({
    hero: bgImages.hero || '',
    about: bgImages.about || '',
    contact: bgImages.contact || '',
    footer: bgImages.footer || '',
  });

  const colorSwatches = [
    { label: t('admin.theme.primary'), key: 'primary' },
    { label: t('admin.theme.accent'), key: 'accent' },
    { label: t('admin.theme.violet'), key: 'violet' },
    { label: t('admin.theme.glow'), key: 'glow' },
    { label: 'Background', key: 'background' },
    { label: 'Panel', key: 'panel' },
    { label: 'Nav', key: 'nav' },
    { label: 'Surface', key: 'surface' },
  ];

  const sections = [
    { key: 'hero', label: 'Home Page' },
    { key: 'about', label: 'About Page' },
    { key: 'contact', label: 'Contact Page' },
    { key: 'programs', label: 'Programs Page' },
    { key: 'startups', label: 'Startups Page' },
    { key: 'news', label: 'News Page' },
    { key: 'events', label: 'Events Page' },
    { key: 'gallery', label: 'Gallery Page' },
    { key: 'footer', label: 'Footer' },
  ];

  const showSaved = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, []);

  const handleGeneralSave = (e) => {
    e.preventDefault();
    showSaved();
  };

  const handleBgSave = () => {
    Object.entries(bgInputs).forEach(([section, url]) => {
      if (url) setSectionBg(section, url);
      else removeSectionBg(section);
    });
    showSaved();
  };

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'colors', label: 'Colors' },
    { key: 'backgrounds', label: 'Backgrounds' },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF', marginBottom: 24 }}>
        <Settings size={20} style={{ marginRight: 10, verticalAlign: 'middle' }} />
        {t('admin.settings.title')}
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 4, display: 'inline-flex' }}>
        {tabs.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            style={{
              fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', padding: '8px 20px', borderRadius: 10, border: 'none',
              background: tab === key ? 'linear-gradient(135deg, #3B82F6, #6D28D9)' : 'transparent',
              color: tab === key ? 'white' : 'rgba(240,244,255,0.5)', cursor: 'pointer', transition: 'all 0.3s',
              boxShadow: tab === key ? '0 4px 20px rgba(59,130,246,0.3)' : 'none',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {tab === 'general' && (
        <div className="glass-card" style={{ padding: 32, maxWidth: 640 }}>
          <form onSubmit={handleGeneralSave}>
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
      )}

      {/* Colors Tab */}
      {tab === 'colors' && (
        <div style={{ maxWidth: 640 }}>
          {/* Mode toggle */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.95rem', color: '#F0F4FF', marginBottom: 4 }}>
                  {t('admin.theme.mode')}
                </p>
                <p style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'rgba(240,244,255,0.45)' }}>
                  {theme === 'dark' ? t('admin.theme.darkMode') : t('admin.theme.lightMode')}
                </p>
              </div>
              <button onClick={toggleTheme}
                style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Color pickers */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
            <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.95rem', color: '#F0F4FF', marginBottom: 18 }}>
              {t('admin.theme.customColors')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {colorSwatches.map(({ label, key }) => (
                <div key={key} className="flex items-center justify-between"
                  style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-3">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: colors[key] || defaultColors[key], border: '2px solid rgba(255,255,255,0.1)' }} />
                    <span style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.88rem', color: 'rgba(240,244,255,0.75)' }}>{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'rgba(240,244,255,0.35)' }}>
                      {colors[key] || defaultColors[key]}
                    </span>
                    <input type="color" value={colors[key] || defaultColors[key]}
                      onChange={e => updateThemeConfig({ [key]: e.target.value })}
                      style={{ width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'none', padding: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
            <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.95rem', color: '#F0F4FF', marginBottom: 14 }}>
              {t('admin.theme.preview')}
            </p>
            <div className="flex flex-wrap gap-2">
              {['primary', 'accent', 'violet', 'glow', 'background', 'panel', 'nav', 'surface'].map(k => (
                <div key={k} style={{ width: 36, height: 36, borderRadius: 8, background: colors[k] || defaultColors[k], border: '1px solid rgba(255,255,255,0.1)' }} title={k} />
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button style={{ padding: '8px 20px', borderRadius: 10, border: 'none', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.82rem', color: 'white', background: `linear-gradient(135deg, ${colors.primary || defaultColors.primary}, ${colors.violet || defaultColors.violet})`, cursor: 'pointer' }}>
                {t('admin.theme.previewBtn')}
              </button>
              <button style={{ padding: '8px 20px', borderRadius: 10, border: `1px solid ${colors.primary || defaultColors.primary}`, fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.82rem', color: colors.primary || defaultColors.primary, background: 'transparent', cursor: 'pointer' }}>
                {t('admin.theme.previewOutline')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => { resetThemeConfig(); showSaved(); }} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
              {t('admin.theme.reset')}
            </button>
            <button onClick={showSaved} className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
              <Check size={15} style={{ marginRight: 6 }} /> {t('admin.theme.apply')}
            </button>
            {saved && (
              <span style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: '#4ADE80' }}>
                {t('admin.settings.saved')}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Backgrounds Tab */}
      {tab === 'backgrounds' && (
        <div className="glass-card" style={{ padding: 32, maxWidth: 640 }}>
          <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.95rem', color: '#F0F4FF', marginBottom: 18 }}>
            <Image size={16} style={{ marginRight: 8 }} />
            Section Background Images
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sections.map(({ key, label }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <label style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.82rem', color: 'rgba(240,244,255,0.6)' }}>
                    {label}
                  </label>
                  {bgInputs[key] && (
                    <button onClick={() => setBgInputs(p => ({ ...p, [key]: '' }))}
                      style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: '#F87171', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Remove
                    </button>
                  )}
                </div>
                {bgInputs[key] ? (
                  <div style={{ position: 'relative', width: '100%', height: 120, borderRadius: 10, overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
                    <img src={bgInputs[key]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                ) : (
                  <label className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 100, borderRadius: 10, cursor: 'pointer', border: '2px dashed rgba(255,255,255,0.1)' }}>
                    <Upload size={22} style={{ color: 'rgba(240,244,255,0.3)', marginBottom: 6 }} />
                    <span style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'rgba(240,244,255,0.4)' }}>Click to upload image</span>
                    <input type="file" accept="image/*" style={{ display: 'none' }}
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) {
                          const reader = new FileReader();
                          reader.onload = () => setBgInputs(p => ({ ...p, [key]: reader.result }));
                          reader.readAsDataURL(f);
                        }
                      }} />
                  </label>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button onClick={handleBgSave} className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
              <Save size={15} style={{ marginRight: 6 }} /> Save Backgrounds
            </button>
            {saved && (
              <span style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: '#4ADE80' }}>
                <Check size={14} style={{ marginRight: 4 }} /> {t('admin.settings.saved')}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationsDropdown({ t, onClose }) {
  const [notes, setNotes] = useState(notifData);
  const markAllRead = () => setNotes(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 340, maxWidth: 'calc(100vw - 32px)', borderRadius: 14, background: 'var(--navy-900)', border: '1px solid var(--glass-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.35)', overflow: 'hidden', zIndex: 100 }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
          <Bell size={14} style={{ marginRight: 6 }} /> Notifications
        </span>
        <button onClick={markAllRead} style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: 'var(--electric)', background: 'none', border: 'none', cursor: 'pointer' }}>
          {t('admin.notifications.markRead')}
        </button>
      </div>
      <div style={{ maxHeight: 340, overflowY: 'auto' }}>
        {notes.length === 0 ? (
          <div className="text-center py-10">
            <p style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('admin.notifications.empty')}</p>
          </div>
        ) : notes.map((n) => (
          <div key={n.id} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--glass-border)', background: n.read ? 'transparent' : 'rgba(59,130,246,0.07)', cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${n.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bell size={13} style={{ color: n.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: n.read ? 400 : 600 }}>{n.title}</p>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{n.detail}</p>
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 4 }}>
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
    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 220, borderRadius: 14, background: 'var(--navy-900)', border: '1px solid var(--glass-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.35)', overflow: 'hidden', zIndex: 100 }}>
      <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <p style={{ fontFamily: 'Sora', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{t('admin.profile.name')}</p>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>{t('admin.profile.email')}</p>
      </div>
      <div style={{ padding: 4 }}>
        {[
          { icon: User, label: 'admin.profile.title' },
          { icon: Settings, label: 'admin.sidebar.settings' },
          { icon: LogIn, label: 'admin.sidebar.signOut' },
        ].map(({ icon: Icon, label }) => (
          <button key={label} onClick={() => { if (label === 'admin.sidebar.signOut') navigate('/admin'); onClose(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--text-secondary)', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.85rem' }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--glass-bg)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            <Icon size={15} /> {t(label)}
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  return (
    <button
      onClick={toggleTheme}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{
        width: 38, height: 38, borderRadius: 10,
        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: 'var(--text-secondary)',
        transition: 'all 0.2s',
      }}
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
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
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: '#131929', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden', zIndex: 100, minWidth: 120 }}>
          {options.map(l => (
            <button key={l.code} onClick={() => { switchLang(l.code); setOpen(false); }}
              style={{ display: 'block', width: '100%', padding: '8px 14px', border: 'none', cursor: 'pointer', textAlign: 'left', background: 'transparent', color: 'rgba(240,244,255,0.6)', fontFamily: 'Outfit', fontSize: '0.82rem' }}
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

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
    if (activeSection === 'startups') return <ManageSection title="Startups" storageKey="startups" items={startups} columns={['Name', 'Category', 'Stage', 'Founded']} fields={[
      { key: 'name', label: 'Name' }, { key: 'category', label: 'Category' }, { key: 'stage', label: 'Stage', type: 'select', options: ['Idea', 'MVP', 'Growth', 'Scale'] }, { key: 'founded', label: 'Founded' },
    ]} t={t} />;
    if (activeSection === 'events') return <ManageSection title="Events" storageKey="events" items={events} columns={['Title', 'Type', 'Date', 'Capacity']} fields={[
      { key: 'title', label: 'Title' },
      { key: 'titleAr', label: 'Title (Arabic)' },
      { key: 'titleFr', label: 'Title (French)' },
      { key: 'type', label: 'Type', type: 'select', options: ['Demo Day', 'Bootcamp', 'Competition', 'Forum', 'Summit'] },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'time', label: 'Time' },
      { key: 'location', label: 'Location' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'capacity', label: 'Max Participants', type: 'number' },
      { key: 'registered', label: 'Registered', type: 'number' },
      { key: 'image', label: 'Image', type: 'file' },
      { key: 'status', label: 'Status', type: 'select', options: ['upcoming', 'past'] },
      { key: 'tags', label: 'Tags', type: 'tags' },
    ]} t={t} />;
    if (activeSection === 'news') return <ManageSection title="News" storageKey="news" items={newsArticles} columns={['Title', 'Category', 'Date', 'Author']} fields={[
      { key: 'title', label: 'Title' },
      { key: 'titleAr', label: 'Title (Arabic)' },
      { key: 'titleFr', label: 'Title (French)' },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'image', label: 'Image', type: 'file' },
      { key: 'category', label: 'Category', type: 'select', options: ['Event', 'Achievement', 'Technology', 'Hackathon'] },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'author', label: 'Author' },
      { key: 'readTime', label: 'Read Time' },
      { key: 'tags', label: 'Tags', type: 'tags' },
      { key: 'featured', label: 'Featured Article', type: 'checkbox' },
    ]} t={t} />;
    if (activeSection === 'gallery') return <GalleryManager t={t} />;
    if (activeSection === 'users') return <ManageSection title="Users" storageKey="users" items={defaultUsers} columns={['Name', 'Email', 'Role', 'Status', 'Joined']} fields={[
      { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role', type: 'select', options: ['Admin', 'Editor', 'Viewer'] }, { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }, { key: 'joined', label: 'Joined' },
    ]} t={t} />;
    if (activeSection === 'settings') return <SettingsPage t={t} />;
    return null;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--navy-950)' }}>
      {/* Backdrop for mobile */}
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49 }} />
      )}

      <aside className="admin-sidebar" style={{
        width: 240, flexShrink: 0, padding: '24px 0', display: 'flex', flexDirection: 'column',
        position: isMobile ? 'fixed' : 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50, overflowY: 'auto',
        transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        transition: 'transform 0.3s ease',
      }}>
        <div className="flex items-center gap-3 px-6 mb-8">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3B82F6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: '0.8rem', color: 'white', flexShrink: 0 }}>
            BIS
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Admin Panel</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--text-muted)' }}>v1.0.0</p>
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ icon: Icon, labelKey, key }) => (
            <button key={key} onClick={() => { setActiveSection(key); if (isMobile) setSidebarOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: activeSection === key ? 'rgba(59,130,246,0.15)' : 'transparent', color: activeSection === key ? 'var(--electric)' : 'var(--text-secondary)', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.2s', borderLeft: activeSection === key ? '3px solid var(--electric)' : '3px solid transparent' }}>
              <Icon size={17} />
              {t(labelKey)}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 12px' }}>
          <button onClick={() => navigate('/admin')}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--text-muted)', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.9rem' }}>
            <LogOut size={17} />
            {t('admin.sidebar.signOut')}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: isMobile ? 16 : 32, overflowY: 'auto', marginLeft: isMobile ? 0 : 240 }}>
        <div className="flex items-center justify-between mb-8">
          {isMobile && (
            <button onClick={() => setSidebarOpen(true)}
              style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <Menu size={18} />
            </button>
          )}
          <div className="flex items-center gap-3" style={{ marginLeft: 'auto' }}>
            <ThemeToggle />
            <LanguageSwitcher />
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', position: 'relative' }}>
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
