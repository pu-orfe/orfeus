# ORFEUS — Operational Risk Financialization of Electricity Under Stochasticity

Static website for the [ORFEUS research group](https://pu-orfe.github.io/orfeus/) at Princeton University, led by Professors René Carmona and Ronnie Sircar.

## Site structure

```
index.html                  Home page
about.html                  About ORFEUS
people.html                 Team (PIs, partners)
people-pis.html             Principal Investigators
people-advisers.html        Advisory board
people-research-staff.html  Research staff
papers.html                 Publications
blogs.html                  Blog index
blog-data-centers-grid.html           Blog post
data-centers-will-strain-grid-even-demand-response.html  Blog post
data-visualization.html               Visualization landing
data-visualization-scenarios.html     Scenarios visualization (iframe)
data-visualization-reliability.html   Reliability Cost Index (iframe)
data-visualization-lmp.html           LMP Geographical Visualization (iframe)
data-download.html          Data downloads
arpa-e-poster-2024.html     ARPA-E poster
perform.html                Performance page
login.html                  Login placeholder
style.css                   Global stylesheet
reveal.js                   Scroll-reveal animation script
assets/                     Images, videos, PDFs, poster files
```

## How to update the site

### Editing content

1. Clone the repository:
   ```bash
   git clone https://github.com/pu-orfe/orfeus.git
   cd orfeus
   ```
2. Open any `.html` file in a text editor. Each page is self-contained HTML5 with shared CSS and navigation.
3. Edit the content between `<main class="page" id="main-content">` and `</main>`.
4. Commit and push to `main` — GitHub Pages will deploy automatically.

### Adding a new page

1. Copy an existing page (e.g. `about.html`) as a template.
2. Update the `<title>` and the content inside `<main>`.
3. Keep the navigation bar and footer unchanged to maintain consistency.
4. Add a link to the new page in the navigation section of every HTML file.

### Adding images or assets

1. Place files in the `assets/` directory, using descriptive filenames.
2. Reference them with relative paths, e.g. `src="assets/your-image.png"`.
3. Always include a descriptive `alt` attribute for accessibility.

### Updating the navigation

The navigation bar is duplicated in every HTML file. To add or remove a link, edit the `<nav class="main-nav">` section in **all** HTML files. The navigation includes:
- A primary links section (visible on wide screens)
- A "More ▾" dropdown (visible on narrow screens, collapses the primary links)

### Updating styles

All styles live in `style.css`. The site uses CSS custom properties defined in `:root` for colors, spacing, and radii. Key variables:
- `--accent`: Primary green (#2D6A4F)
- `--text`: Body text color (#000000)
- `--muted`: Secondary text color (#333333)
- `--border`: Border color (#e5e7eb)

### Data visualizations

The three visualization pages embed external apps via `<iframe>`. To update the iframe URLs, edit the `src` attribute in:
- `data-visualization-scenarios.html`
- `data-visualization-reliability.html`
- `data-visualization-lmp.html`

## Deployment

The site is deployed via **GitHub Pages** from the `main` branch. Pushes to `main` trigger an automatic deployment workflow (`.github/workflows/deploy.yml`). Changes to only `README.md` do not trigger a rebuild.

The site is served at: `https://pu-orfe.github.io/orfeus/`

## Accessibility

The site targets WCAG 2.1 AA compliance:
- Skip navigation links on all pages
- Semantic `<main>` landmark for content
- `aria-label` on navigation, video, and interactive elements
- Focus-visible indicators on all interactive elements
- Keyboard-accessible dropdown menus
- Sufficient color contrast (4.5:1 minimum for text)
- Descriptive `alt` text on all images
- `prefers-reduced-motion` support for animations

## License

Content &copy; The Trustees of Princeton University. All rights reserved.
