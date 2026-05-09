import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Rocket, Calendar, Newspaper, Image, LogOut, TrendingUp,
  Users, DollarSign, Eye, Plus, Edit, Trash2, Search, Bell, Settings, BarChart3
} from 'lucide-react';
import { startups, events, newsArticles } from '../../data/index';
import { AnimatedCounter } from '../../components/ui/index';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: Rocket, label: 'Startups', key: 'startups' },
  { icon: Calendar, label: 'Events', key: 'events' },
  { icon: Newspaper, label: 'News', key: 'news' },
  { icon: Image, label: 'Gallery', key: 'gallery' },
  { icon: Users, label: 'Users', key: 'users' },
  { icon: Settings, label: 'Settings', key: 'settings' },
];

const dashboardStats = [
  { label: 'Total Startups', value: 120, icon: Rocket, color: '#3B82F6', change: '+8 this month' },
  { label: 'Active Mentors', value: 45, icon: Users, color: '#8B5CF6', change: '+3 this month' },
  { label: 'DZD Raised', value: 50, suffix: 'M', icon: DollarSign, color: '#10B981', change: '+5M this quarter' },
  { label: 'Site Visitors', value: 12400, icon: Eye, color: '#F59E0B', change: '+24% vs last month' },
];

function DashboardHome() {
  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 800, fontSize: '1.8rem', color: '#F0F4FF', marginBottom: 6 }}>
          Good morning, Admin 👋
        </h2>
        <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.95rem' }}>Here's what's happening at BIS Incubator today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat, i) => (
          <div key={stat.label} className="glass-card" style={{ padding: 20 }}>
            <div className="flex items-start justify-between mb-3">
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${stat.color}18`, border: `1px solid ${stat.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <TrendingUp size={14} style={{ color: '#4ADE80' }} />
            </div>
            <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} size="md" />
            <p style={{ fontFamily: 'Outfit', fontSize: '0.8rem', color: 'rgba(240,244,255,0.5)', marginTop: 4 }}>{stat.label}</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.67rem', color: '#4ADE80', marginTop: 6 }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity chart placeholder */}
        <div className="lg:col-span-2 glass-card" style={{ padding: 24 }}>
          <div className="flex items-center justify-between mb-6">
            <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: '#F0F4FF' }}>Startup Registrations</h3>
            <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>Last 6 months</span>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-3" style={{ height: 140 }}>
            {[65, 80, 55, 90, 75, 110].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: '100%',
                  height: `${(v / 110) * 100}%`,
                  background: i === 5 ? 'linear-gradient(to top, #3B82F6, #8B5CF6)' : 'rgba(59,130,246,0.25)',
                  borderRadius: '6px 6px 0 0',
                  border: i === 5 ? 'none' : '1px solid rgba(59,130,246,0.2)',
                  transition: 'all 0.3s',
                  boxShadow: i === 5 ? '0 0 15px rgba(59,130,246,0.4)' : 'none',
                  minHeight: 20,
                }} />
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: 'rgba(240,244,255,0.3)' }}>
                  {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution donut */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: '#F0F4FF', marginBottom: 20 }}>Startup Categories</h3>
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

      {/* Recent activity */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: '#F0F4FF', marginBottom: 16 }}>Recent Activity</h3>
        <div className="flex flex-col gap-3">
          {[
            { action: 'New startup application received', detail: 'AquaPure — CleanTech', time: '2 min ago', icon: '🚀', color: '#3B82F6' },
            { action: 'Event registration complete', detail: 'AI Bootcamp — 60/60 spots filled', time: '15 min ago', icon: '📅', color: '#10B981' },
            { action: 'News article published', detail: 'BIS ranked #1 in Algeria', time: '1 hour ago', icon: '📰', color: '#8B5CF6' },
            { action: 'New mentor onboarded', detail: 'Dr. Walid Hamza — Tech Strategy', time: '3 hours ago', icon: '👤', color: '#F59E0B' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, border: `1px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                {item.icon}
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

function ManageSection({ title, items, columns }) {
  const [search, setSearch] = useState('');
  const filtered = items.filter(i =>
    Object.values(i).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.4rem', color: '#F0F4FF' }}>Manage {title}</h2>
        <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
          <Plus size={16} /> Add New
        </button>
      </div>
      <div style={{ position: 'relative', maxWidth: 320, marginBottom: 20 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,244,255,0.3)' }} />
        <input className="input-glass" style={{ paddingLeft: 38 }} placeholder={`Search ${title.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} />
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
              <th style={{ textAlign: 'right', padding: '14px 20px', fontFamily: 'Sora', fontWeight: 600, fontSize: '0.78rem', color: 'rgba(240,244,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 6).map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                {columns.map(col => (
                  <td key={col} style={{ padding: '14px 20px', fontFamily: 'Outfit', fontSize: '0.88rem', color: 'rgba(240,244,255,0.7)' }}>
                    {item[col.toLowerCase()] || item[Object.keys(item)[columns.indexOf(col)]] || '—'}
                  </td>
                ))}
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

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const renderContent = () => {
    if (activeSection === 'dashboard') return <DashboardHome />;
    if (activeSection === 'startups') return (
      <ManageSection title="Startups" items={startups} columns={['Name', 'Category', 'Stage', 'Founded']} />
    );
    if (activeSection === 'events') return (
      <ManageSection title="Events" items={events} columns={['Title', 'Type', 'Date', 'Status']} />
    );
    if (activeSection === 'news') return (
      <ManageSection title="News" items={newsArticles} columns={['Title', 'Category', 'Date', 'Author']} />
    );
    return (
      <div className="text-center py-20">
        <p style={{ fontSize: '3rem', marginBottom: 16 }}>🚧</p>
        <p style={{ fontFamily: 'Sora', fontWeight: 600, color: 'rgba(240,244,255,0.5)', fontSize: '1.1rem' }}>
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} — Coming Soon
        </p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#03061A' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: 240, flexShrink: 0, padding: '24px 0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #3B82F6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 800, fontSize: '0.8rem', color: 'white' }}>
            BIS
          </div>
          <div>
            <p style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '0.9rem', color: '#F0F4FF' }}>Admin Panel</p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'rgba(240,244,255,0.3)' }}>v1.0.0</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                background: activeSection === key ? 'rgba(59,130,246,0.15)' : 'transparent',
                color: activeSection === key ? '#60A5FA' : 'rgba(240,244,255,0.5)',
                fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.9rem',
                transition: 'all 0.2s',
                borderLeft: activeSection === key ? '3px solid #3B82F6' : '3px solid transparent',
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '0 12px' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
              background: 'transparent', color: 'rgba(240,244,255,0.35)', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div />
          <div className="flex items-center gap-3">
            <button style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(240,244,255,0.5)' }}>
              <Bell size={16} />
            </button>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: 700, fontSize: '0.8rem', color: 'white', cursor: 'pointer' }}>
              A
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}
