# Vite + React + TypeScript + shadcn/ui

This project is bootstrapped with Vite, using React and TypeScript, with shadcn/ui components.

## Features

- ⚡️ Vite - Fast bundling and HMR
- ⚛️ React 18 with hooks
- 📘 TypeScript for type safety
- 🎨 Tailwind CSS with shadcn/ui components
- 📦 Radix UI primitives
- 🌙 Dark mode support
- 🧰 ESLint and Prettier configured

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # React components
│   └── ui/           # shadcn/ui components
├── lib/              # Utility functions
└── App.tsx           # Main app component
```

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `build:dev` - Build for development
- `lint` - Run ESLint
- `preview` - Preview production build

## Adding Components

To add new shadcn/ui components, run:

```bash
npx shadcn-ui@latest add [component-name]
```

For example:
```bash
npx shadcn-ui@latest add button
```