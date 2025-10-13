# 🌌 Atlan Demo Center

A modular, CMS-driven web project built with **Astro** and **Vue.js**, combining performance-first architecture with flexible component design.  
Well suited for Marketing pages that need more reach.

## 🏗️ Project Structure

Your project is organized for scalability and clarity.  
(_You can add a project structure screenshot below this section._)

```text
├── public/
├── src/
|   |── assests
|   |   |──fonts
│   ├── components/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── ui/
|   |── constants/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   │   ├── api/
│   │   └── index.astro
│   ├── store/
│   ├── styles/
└── package.json
```

## ⚡ Tech Choices:

- Frameworks: Astro (for static data), Vue (for interactivity)
- Component Library: ShadCn Vue (built on top of reka-ui with tailwind CSS)
- CMS: Contentful (easy, fast and maintainable content )
- CSS: Tailwind CSS
- State Management: Vue Ref's and Custom Hooks
- TypeScript (for maintainable code)

## 🚀 Features

- Searching through the CMS content
- Filtering based on Topic and Duration
- Sorting based on Popularity or Recency
- Grid and List View
- Infinite Scroll
- AI generated Demo Summary
- Direct Navigation to Demo Tour

## 👨🏻‍💻 Scopes for improvemnet

- Streamlining components with a better component library, check [Volt]("https://volt.primevue.org/overview/")
- Precommit tool for better code qualiy.
- Virtualization on Card
- Statically Generate the Demo pages and trigger scheduled deployments
- TypeScript implementation can be stricter
