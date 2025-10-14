# 🌌 Atlan Demo Center

A modular, CMS-driven web project built with **Astro** and **Vue.js**, combining performance-first architecture with flexible component design,
well suited for Marketing pages reaching wide audience.

## Installation Steps:

```shell
# Install the Repo
git@github.com:KishanMandora/atlan-demo-center.git

# Install the packages
npm i

# Run the Project
npm run dev

# Build the Project
npm run build

# View the Build Version
npm run preview
```

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

- Frameworks: Astro (Framework optimized for static content) + Vue (framework with fine grained reactivity)
- Component Library: Shadcn Vue (Component Library built on top of reka-ui - a new updated version of radix-vue with tailwind CSS)
- CMS: Contentful (Easy, fast, widely used Headless CMS that can scale easily)
- CSS: Tailwind CSS (Faster development, easy customizations with good performance)
- State Management: Vue Ref's Custom Hooks (simple state management enough for small number of filters)
- TypeScript (maintainable code)
- LLM: OpenAI - GPT-5.nano (Provides fast response at less cost for basic tasks such as summarization - a core feature in the app)
- AI Framework - Langchain (Provides wide range of loaders to help in data extraction)
- CI/CD - Netlify (easy to use, free of cost ptalform to deploy FE applications)

## 👷 Architectural Decisions:

- Frontend Architecture: Islands architecture on Home page for faster performance and Demo pages served as Server Rendered Pages (SSR) using On Demand Dynamic Routes for most upto date content and no dependency on Deployment.
- Component Architecture: UI - Molecules - Organism structure provides hierarchy to the components
- API : Astro `/pages/api` for server on demand API requests
- CI/CD: Netlify for Automatic Deployments on commits pushed to `dev` branch

## 🚀 Features

- Searching through the CMS content
- Filtering based on Topic and Duration
- Sorting based on Popularity or Recency
- Grid and List View
- Infinite Scroll
- AI generated Demo Summary
- Accessible Keyboard Navigation
- Direct Navigation to Demo Tour
- Transitions for smooth page navigation

## 🏆 Small Wins

- **100% Lighthouse score**
  <img width="1509" height="915" alt="Screenshot 2025-10-13 at 6 06 16 PM" src="https://github.com/user-attachments/assets/d13f2198-e57d-45e7-aedb-96cac79a47f6" />

## 👨🏻‍💻 Scopes for improvemnet

- Add
- Streamlining components with a better component library, check [Volt]("https://volt.primevue.org/overview/")
- Precommit tool for better code qualiy.
- Storybook Integration for enhanced UI component development, documentation, and testing
- Virtualization on Cards for improved DOM performance
- Statically Generate the Demo pages in conjuction with trigger scheduled deployments for better performance
- Stricter TypeScript implementation for better code mantainance.
