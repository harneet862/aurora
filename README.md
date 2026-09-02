# Aurora – Personal Portfolio

A beautifully designed, interactive portfolio website showcasing skills, work experience, and projects with smooth scroll-based animations and a force-directed skills visualization.

## 🎯 Features

- **Smooth Scroll Animations** – Scroll-triggered transitions between sections (Home → About cover effect)
- **Interactive Skills Diagram** – Force-directed graph visualization powered by D3, showing skills organized by category
- **Responsive Design** – Adapts gracefully to mobile with fallback skill lists
- **Scroll Reveal** – Elements fade and slide in as they enter the viewport
- **Progress Bar** – Visual indicator of scroll position at the top of the page
- **Sticky Navigation** – Header tracks active section as you scroll

## 🛠️ Tech Stack

### Framework
- **Astro 5.16.16** – Static site generator for component-based web pages

### Libraries
- **D3 7.9.0** – Force-directed graph layout for skills visualization (force simulation, hierarchy, SVG rendering)

### Languages
- **HTML** – Semantic markup and page structure
- **CSS** – Responsive layouts, animations, and styling
- **JavaScript** – Scroll event handling, DOM manipulation, D3 scripting, and interactivity

## 📊 Why Astro? Analysis

| Design Consideration | How Astro Helps | Where Astro Does **Not** Help Much | Decision for My Portfolio |
| --- | --- | --- | --- |
| **Static website** | Generates optimized static HTML at build time. | My portfolio was already written as static HTML, so Astro does not fundamentally make it static. | ⚠️ Small benefit |
| **Performance** | Static Astro components ship as HTML with **no JavaScript required by default**. | Since I was already using minimal vanilla JavaScript, the performance improvement may be limited. | ✅ Helpful |
| **Reusable components** | Allows reusable components such as `Header`, `Footer`, and `ProjectCard` without duplicating markup across pages. | Plain HTML alone does not provide convenient build-time component imports. | ✅ Major benefit |
| **Avoiding client-side JS** | Static components are rendered during the build rather than constructed in the browser. | Web Components would require JavaScript to load and register components in the browser. | ✅ Major benefit |
| **Interactivity** | Supports interactive components when needed and allows JavaScript/framework components to be isolated. | My site already uses vanilla JS only where interaction is required, so Islands Architecture is not a major advantage for me. | ⚠️ Small benefit |
| **Islands Architecture** | Prevents unnecessary JavaScript from being shipped for non-interactive components. | I already follow this principle manually by only writing JS for interactive features. | ❌ Not a major reason |
| **Project organization** | Provides a clear structure for pages, layouts, and reusable components. | A small HTML/CSS project can also be organized well without Astro. | ✅ Helpful as the site grows |
| **Routing** | Automatically maps files in the `pages` directory to URLs. | With a small static website, manually managing HTML pages is also straightforward. | ⚠️ Convenience benefit |
| **Learning curve** | Introduces modern concepts such as components, layouts, and build-time rendering. | Adds another tool and syntax to learn compared with pure HTML/CSS/JS. | ⚠️ Tradeoff |
| **Templates** | Provides optional starter templates and integrations. | I don't need templates because I am designing and building the portfolio myself. | ❌ Not a reason for choosing Astro |

## 📁 Project Structure

```
src/
├── pages/
│   ├── index.astro              Home page with all sections
│   └── contact.astro            Contact page (empty)
├── layouts/
│   └── Layout.astro             Base HTML shell, global animations, CSS variables
├── components/
│   ├── Headerfile.astro         Navigation bar with scroll-aware highlighting
│   ├── ForceTree.astro          D3 force-directed skills diagram
│   ├── Timeline.astro           Work experience timeline
│   ├── Flower.astro             Animated flower icon
│   └── Footerfile.astro         Footer with links
├── data/
│   └── skills-tree.js           Nested data structure for skills diagram
└── assets/
    └── astro.svg                Static logo

public/                           Static assets
├── favicon.svg, favicon.ico
├── flower.png
├── me.jpeg                      Profile photo
└── [logos]                      Organization/project logos

package.json                      Dependencies & scripts
astro.config.mjs                  Astro configuration
tsconfig.json                     TypeScript settings
```

## 🏗️ How It Works

### Data Flow
1. `index.astro` defines sections and imports components
2. **Skill Groups** come from hardcoded arrays and feed into both:
   - `ForceTree.astro` – D3 visualization of nested `skills-tree.js` data
   - `.skills-fallback` – Responsive fallback grid (shown on screens < 700px)
3. **Timeline** component renders work experience
4. **Layout wrapper** manages global scroll reveal observer and progress bar

### Key Animations

#### Scroll Reveal
- `Layout.astro` defines a global `.reveal` class with opacity/transform transitions
- An IntersectionObserver watches for `.reveal` elements entering the viewport (with a 10% bottom margin)
- Once visible, the element gets `.is-visible` class, triggering the entrance animation
- Elements at page bottom are force-revealed when scrolling reaches the end

#### Home → About Cover Transition
- `index.astro` script monitors scroll position through `.scroll-stack` (200vh height)
- At ~30% progress, the About section (with higher z-index) transitions from `translateY(100%)` to `translateY(0%)`
- Home blurs underneath using a `filter: blur()` while About slides over it
- Cubic-bezier easing (0.16, 1, 0.3, 1) creates a smooth "overtake" feel

#### Skills Diagram (D3 Force Simulation)
- `ForceTree.astro` imports nested data from `skills-tree.js`
- D3 converts it to a hierarchy (root → categories → skills)
- Force simulation applied with:
   - **Link force** – keeps parent-child connections (distance: 170px for root, 70px for others)
   - **Charge force** – repels nodes from each other (-260 strength)
   - **Collision** – prevents overlap based on node radius
   - **Center** – pulls toward viewport center
- Simulation runs **headlessly** for 300 ticks, then renders as static SVG once (no drag/hover)
- Leaf nodes (skills) fetch icons from [skillicons.dev](https://skillicons.dev)

### Responsive Breakpoints
- **< 700px** – ForceTree hidden, skills-fallback grid shown (2-column → 1-column on < 480px)
- **< 800px** – Profile photo hidden in hero section
- Sticky header height dynamically measured on load/resize via `--header-h` CSS variable

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (npm or yarn)

### Installation & Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- --help
```

### Environment
No environment variables or secrets required. All content is static.

## 📝 Customization

### Update Skills
Edit `src/data/skills-tree.js`:
```javascript
export default {
  name: 'Me',
  children: [
    {
      name: 'Category Name',
      children: [
        { name: 'Skill Name', icon: 'skillicon' },
        // ...
      ]
    }
  ]
};
```

Icon slugs come from [skillicons.dev](https://skillicons.dev) (e.g., `py`, `react`, `nodejs`).

### Update Work Experience
Edit the `Timeline` component in `src/components/Timeline.astro` to add/remove timeline entries.

### Customize Styling
Global styles and CSS variables in `src/layouts/Layout.astro`:
- `--content-max: 850px` – Section content width
- `--header-h` – Header height (measured dynamically)
- `--footer-h` – Footer height (measured dynamically)
- Colors defined inline (e.g., `#1E1E2E` dark background, `#EEDEDB` cream text)

## 🎨 Design Highlights

- **Color Scheme**: Dark mode (charcoal `#1E1E2E`, cream `#EEDEDB`, soft blue `#CFD6EE`)
- **Typography**: Georgia/Times New Roman for headings, Lucida Sans for body
- **Animations**: GPU-accelerated using `transform` and `opacity` for smooth 60fps performance
- **Accessibility**: ARIA labels on sections and diagrams, noscript fallbacks, respects `prefers-reduced-motion`

## 🔗 Links

- [Astro Docs](https://docs.astro.build)
- [D3 Documentation](https://d3js.org)
- [Skill Icons](https://skillicons.dev)

## 📄 License

This project is open source. Feel free to use it as a template for your own portfolio!

---

**Built with ❤️ using Astro, HTML, CSS, and JavaScript**
