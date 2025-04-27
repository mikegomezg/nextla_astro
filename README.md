# Nextla: A System for Managing Creative Attention

This site presents the landing page for **Nextla**, a fictional platform designed to manage creative attention in the future. Built as part of a speculative design and narrative project, it introduces a near-future vision where human and AI creativity is measured, valued, and defended.

The story behind Nextla explores systems of tribute, scarcity, and balance—drawing parallels between ancient power structures and modern digital labor. The landing page provides a conceptual entry point into that world.

> © All rights reserved. This project is not open source or for reuse.

---

## 🛠️ Built With

- [**Astro**](https://astro.build) — static site generator for fast, content-driven sites
- [**Tailwind CSS**](https://tailwindcss.com) — utility-first styling with a custom palette
- [**TypeScript**](https://www.typescriptlang.org/)
- [**MDX / Markdown**](https://docs.astro.build/en/guides/markdown-content/) — for modular, editable content sections
- Optional: [**React**](https://reactjs.org) — used for interactive/animated components as needed

---

## 📁 Project Structure

```plaintext
.
├── content/landing/         # Markdown content for each section
├── public/assets/          # Images (e.g., cosmic, feather, characters)
├── src/
│   ├── components/         # Astro and optional React components per section
│   ├── layouts/            # Page layout with global nav/footer
│   ├── pages/index.astro   # Renders modular sections in order
│   └── styles/             # Tailwind and color token CSS
├── tailwind.config.mjs     # Custom color palette based on visual assets
├── astro.config.mjs
└── tsconfig.json
```

This setup allows the site to scale organically—sections are easy to replace, extend, or restyle using semantic tokens and Markdown-defined content.

---

## 🧪 Development Workflow

```bash
pnpm install       # Install dependencies
pnpm dev           # Start local dev server at http://localhost:4321
pnpm build         # Build site for production
pnpm preview       # Preview built site locally
```

---

## ℹ️ About This Project

Nextla is a worldbuilding and interface-design exercise. It imagines what it would mean to manage creativity as an asset, with systems that resemble software asset management and digital labor compliance tools.

If you'd like to follow the development of Nextla or the underlying story world, stay tuned for future narrative updates and visual experiments.

---

## 🔒 License

This project is **not open source** and is released under **All Rights Reserved**. Please contact the creator for collaboration or use inquiries.
```
