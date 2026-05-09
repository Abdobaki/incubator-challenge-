# 🚀 BIS Incubator — Official Website

**Bureau d'Innovation & Startup | Université de M'sila**

A premium, award-winning university incubator website built with React, Vite, and Tailwind CSS.

---

## ✨ Features

### Design
- 🌙 **Dark glassmorphism** — deep navy with electric blue & violet accents
- 🎨 **Premium UI** — Apple-level polish, SaaS aesthetic
- 💫 **Scroll animations** — custom Intersection Observer reveals
- 🔢 **Animated counters** — smooth number animations
- 🌟 **Floating particles** — subtle hero particle effects
- 📱 **Fully responsive** — mobile-first design

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, programs, startups, testimonials, news |
| About | `/about` | Mission, vision, timeline, team, director message |
| Programs | `/programs` | All 6 programs with expandable details |
| Startups | `/startups` | Portfolio with category filter & search |
| Events | `/events` | Upcoming & past events with registration |
| News | `/news` | Blog with featured article, category filter |
| Gallery | `/gallery` | Grid gallery with lightbox |
| Contact | `/contact` | Contact form, social links, map |
| Admin | `/admin` | Login + full dashboard |

### Admin Dashboard (Demo)
- **Login:** `admin@bis.dz` / `admin123`
- Analytics overview with animated stats
- Manage startups, events, and news (CRUD UI)
- Activity feed

### Multilingual
- 🇬🇧 English
- 🇫🇷 French  
- 🇩🇿 Arabic (RTL supported)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| React Router 6 | Client-side routing |
| Tailwind CSS 3 | Utility styling |
| Framer Motion 11 | Advanced animations (optional) |
| Lucide React | Icons |
| Google Fonts | Sora + Outfit + JetBrains Mono |

---

## 🚀 Quick Start

```bash
# 1. Navigate to project
cd bis-incubator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
bis-incubator/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Glassmorphism navbar + mobile menu
│   │   │   ├── Footer.jsx       # Full footer with CTA banner
│   │   │   └── LoadingScreen.jsx # Animated loading screen
│   │   ├── home/
│   │   │   ├── Hero.jsx          # Typewriter hero + particle effects
│   │   │   ├── Stats.jsx         # Animated counter stats
│   │   │   ├── ProgramsOverview.jsx # Programs cards grid
│   │   │   ├── StartupTestimonials.jsx # Portfolio + testimonials
│   │   │   └── PartnersNews.jsx  # Partners marquee + news
│   │   └── ui/
│   │       └── index.jsx         # SectionHeader, AnimatedCounter, Reveal, Badge, GlassCard
│   ├── context/
│   │   └── LanguageContext.jsx   # EN/FR/AR language switcher
│   ├── data/
│   │   └── index.js              # All mock data (startups, events, news, team...)
│   ├── hooks/
│   │   └── useIntersectionObserver.js # Scroll reveal + counter hooks
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Programs.jsx
│   │   ├── Startups.jsx
│   │   ├── Events.jsx
│   │   ├── News.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       └── AdminDashboard.jsx
│   ├── App.jsx                   # Router + layout
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles, animations, design tokens
├── index.html                    # HTML entry with fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎨 Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Navy 950 | `#03061A` | Background |
| Navy 900 | `#050B2E` | Section backgrounds |
| Electric Blue | `#3B82F6` | Primary accent |
| Violet | `#8B5CF6` | Secondary accent |
| Cyan | `#00D4FF` | Highlights |
| Text Primary | `#F0F4FF` | Headings |
| Text Secondary | `rgba(240,244,255,0.65)` | Body text |

### Typography
- **Display:** Sora (headings, logos, CTAs)
- **Body:** Outfit (paragraphs, labels)
- **Mono:** JetBrains Mono (badges, tags, code)

### Glass Card
```css
.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
}
```

---

## 🔧 Customization

### Replace Logo
Place your logo at `public/logo.png` or `public/logo.svg` and update `Navbar.jsx` and `Footer.jsx`:
```jsx
<img src="/logo.png" alt="BIS Incubator" style={{ height: 42 }} />
```

### Update Colors
Edit `tailwind.config.js` to change the color palette, or update CSS variables in `src/index.css`.

### Add Content
All content is in `src/data/index.js`. Update the mock data arrays to reflect your real content.

### Connect Backend
Replace the mock data imports with API calls using `fetch` or `axios`. The component structure supports seamless backend integration.

---

## 📸 Adding Real Images

Replace placeholder emojis and colored divs with real images:

```jsx
// Instead of emoji placeholder
<img 
  src="/images/event-1.jpg" 
  alt="Demo Day 2024"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```

---

## 🌐 Multilingual Content

To add Arabic/French translations in a component:
```jsx
import { useLanguage } from '../context/LanguageContext';

const { lang } = useLanguage();

const title = {
  en: 'Our Programs',
  fr: 'Nos Programmes',
  ar: 'برامجنا',
}[lang];
```

---

## 🔗 Links to Update

- Facebook: Update `href` in Footer to your real Facebook page
- Google Maps: Update the URL in Contact page to your university's coordinates
- Email: Replace `contact@bis.univ-msila.dz` with your real email

---

## 📝 License

Built for the University of M'sila BIS Incubator competition. All rights reserved.

---

*Built with ❤️ for Algeria's innovation ecosystem.*
