# Torfin Website

**Software that builds your future.**

A complete, multi-page static website for **Torfin** — a software company that builds custom apps for clients and ships its own proprietary products. Fully deployable to GitHub Pages with zero build tools.

---

## 📁 File Structure

```
torfin-website/
├── index.html          → Home page
├── services.html       → Client services
├── products.html       → Our products (StudyHive, Revise Buddy, Vanaraksha)
├── about.html          → About us, story, team, values
├── contact.html        → Contact form + info panel
├── css/
│   ├── styles.css      → Global design system & components
│   └── animations.css  → Scroll animations & keyframes
├── js/
│   ├── main.js         → Navbar, mobile menu, accordion, form validation
│   └── animations.js   → Scroll reveal (IntersectionObserver), count-up
└── README.md           → This file
```

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### Step 2 — Create a new repository
- Click **"New repository"**
- Name it: `torfin-website` *(or `yourusername.github.io` for a root domain)*
- Set visibility to **Public**
- Click **"Create repository"**

### Step 3 — Upload the files
**Option A — GitHub web interface (easiest):**
1. Open your new repository
2. Click **"Add file" → "Upload files"**
3. Drag and drop **all files and folders** (`index.html`, `css/`, `js/`, etc.)
4. Keep the folder structure exactly as shown above
5. Click **"Commit changes"**

**Option B — Git CLI:**
```bash
git init
git add .
git commit -m "Initial commit: Torfin website"
git branch -M main
git remote add origin https://github.com/yourusername/torfin-website.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repository → **Settings** → **Pages** (left sidebar)
2. Under **"Source"**, select **"Deploy from a branch"**
3. Set **Branch** to `main`, folder to `/ (root)`
4. Click **Save**

### Step 5 — Access your live site
After 1–2 minutes, your site will be live at:
```
https://yourusername.github.io/torfin-website/
```
*(Replace `yourusername` with your actual GitHub username)*

---

## 🌐 Custom Domain (Optional)

### Buy a domain
Purchase your domain (e.g. `torfin.com`) from Namecheap, GoDaddy, or Google Domains.

### Add a CNAME file
In your repository root, create a file called `CNAME` (no extension) containing just your domain:
```
torfin.com
```

### Configure DNS A records
Add these four A records in your domain registrar's DNS settings:

| Type | Name | Value          |
|------|------|----------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

### Add CNAME record (for www)
| Type  | Name | Value                          |
|-------|------|--------------------------------|
| CNAME | www  | yourusername.github.io         |

### Enable HTTPS
Back in **Settings → Pages**, once your custom domain is verified, check **"Enforce HTTPS"**.

DNS propagation can take up to 48 hours.

---

## ✨ Features

- ✅ 5 fully-built HTML pages (Home, Services, Products, About, Contact)
- ✅ Responsive: mobile (375px), tablet (768px), desktop (1280px+)
- ✅ Sticky navbar with scroll-aware styling & hamburger menu
- ✅ Animated hero with floating orbs and grid background
- ✅ Count-up statistics (IntersectionObserver)
- ✅ Scroll-reveal animations on all sections
- ✅ Service cards with hover lift + animated top border
- ✅ FAQ accordion (no libraries)
- ✅ Contact form with JS validation + success state
- ✅ Google Fonts (Syne + DM Sans) via CDN
- ✅ Font Awesome 6 icons via CDN
- ✅ Zero dependencies, zero build tools
- ✅ Accessible: semantic HTML5, aria-labels, roles

---

## 🎨 Brand Colors

| Name    | Hex       | Usage                  |
|---------|-----------|------------------------|
| Navy    | `#0A2463` | Primary brand, headers |
| Sky     | `#3E92CC` | Accent, CTAs, links    |
| Neutral | `#F4F6F9` | Section backgrounds    |
| Text    | `#1C1C1E` | Body text              |

---

## 📞 Contact

**Torfin** — Andhra Pradesh, India  
Email: torfin@myyahoo.com  
&copy; 2024 Torfin.
