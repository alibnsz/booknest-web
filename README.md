# BookNest Web

A modern, minimalist digital library and catalog management Single Page Application (SPA) built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Data persistence is abstracted behind an asynchronous `BookRepository` interface backed by browser `LocalStorage`, making backend API integration swap-ready.

## Features

- **Editorial 3D Showcase & Cover Engine:** Interactive 3D floating hero showcase and a 50-book initial catalog featuring a procedural cover generator (10 editorial layouts, 24 SVG motifs) plus custom image support.
- **Full CRUD & Lending Workflow:** Create, edit, lend, return, and delete books with inline field validation, borrower tracking rules, confirmation dialogs, and toast feedback.
- **Slide-Over Archive & Live Search:** Persistent quick-search drawer with real-time filtering by title, author, category, lending status, sorting, and JSON import/export backup.
- **Open Library Integration:** Optional catalog auto-fill in the book form using the public Open Library Search API.
- **Multi-View Navigation:** Dedicated views for Genres, Authors, Popular rankings, Collections, About/Stats, Book Details (`/books/:id`), and SPA fallback routing.

## Tech Stack

- **Core:** React 19, TypeScript (strict), React Router v7, Vite 6
- **UI & Motion:** Tailwind CSS v4, Framer Motion, Lucide React
- **State & Persistence:** React Context + `useReducer`, Repository Pattern (`LocalStorage`)
- **Testing & Quality:** Vitest, Testing Library, JSDOM, ESLint, Prettier

## Getting Started

```bash
git clone https://github.com/alibnsz/booknest-web.git
cd booknest-web
npm install
npm run dev
```

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Execute Vitest test suite |
| `npm run format` | Format source files with Prettier |

## Architecture

```text
src/
├── components/
│   ├── books/        # Domain UI: covers, cards, forms, lending modal, stats
│   ├── layout/       # Persistent app shell, centered header, footer, archive drawer
│   └── ui/           # Generic primitives: Button, Input, Select, Modal, Toast
├── constants/        # Storage keys and category constants
├── context/          # BooksContext, reducer state, and ToastContext
├── data/             # Seed catalog (50 books) and unique cover design presets
├── hooks/            # useBooks, useBookFilters, useLocalStorage, useTheme
├── interfaces/       # Book domain types and BookRepository interface
├── pages/            # Route-level containers (Library, Detail, Genres, Authors, Popular, Collections, About)
├── services/         # LocalStorageBookRepository, provider, Open Library API client
└── utils/            # Pure validation, filtering, sorting, and formatting helpers
```

All UI components consume domain state exclusively through `useBooks()` and `BookRepository` (`src/interfaces/repository.ts`), enabling straightforward replacement of `LocalStorageBookRepository` with an HTTP implementation in `src/services/bookRepository.provider.ts`.

## Deployment & License

- **Deployment:** Ready for static hosting on Netlify (`netlify.toml` and `public/_redirects` included for client-side routing).
- **Author:** Mehmet Ali Bunsuz
- **License:** MIT
