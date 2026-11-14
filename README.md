# 📚 BookNest Web

**BookNest Web** is a modern, responsive Single Page Application (SPA) designed as a digital library and editorial book catalog. Built with **React 19**, **TypeScript (strict)**, **Tailwind CSS**, and **Framer Motion**, all library data is persisted safely in **LocalStorage** behind a clean `BookRepository` abstraction.

---

## ✨ Key Features

- **Editorial Bookstore & 3D Book Showcase:**
  - Interactive 3D floating hero books with smooth entrance and mouse-parallax physics.
  - Curated showcase sections (*Yeni Çıkanlar*, *Kültür, Felsefe ve Klasikler*) and dedicated pages for **Türler** (`/turler`), **Yazarlar** (`/yazarlar`), **Popüler** (`/populer`), **Koleksiyonlar** (`/koleksiyonlar`), and **Hakkımızda** (`/hakkimizda`).
- **Sliding Archive & Search Drawer:**
  - Clicking the bottom-right **Arşiv & Arama** button opens a slide-over drawer with live search, status/genre filters, sorting options, and JSON backup tools.
- **Book Detail View (`/books/:id`):**
  - 3D book cover preview, quick-switch edition thumbnails, connected **Kitap Özeti** & **Notlar & Ödünç** tabs, reading session metrics, and previous/next book navigation.
- **Full CRUD & Lending Workflow:**
  - **Create:** Add books manually or use **Open Library API** auto-fill to fetch book covers, authors, publication years, and summaries.
  - **Read:** Browse across category views, search in real time, or inspect individual book details.
  - **Update & Lending:** Edit book details, lend books to readers with borrower tracking, and mark borrowed books as returned.
  - **Delete:** Safe deletion guarded by an accessible confirmation dialog.
- **Backup & Restore:**
  - Export and import the entire library catalog as a `.json` file.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **UI Library** | React 19 (Functional Components & Hooks) |
| **Language** | TypeScript 5.7 (`strict` mode) |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Routing** | React Router v7 |
| **Icons** | `lucide-react` |
| **Persistence** | Browser `LocalStorage` via `BookRepository` |
| **External Book Lookup** | Open Library Search API |
| **Testing** | Vitest + JSDOM |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20.x`
- **npm** `>= 10.x`

### Installation

```bash
git clone https://github.com/alibnsz/booknest-web.git
cd booknest-web
npm install
npm run dev
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build production bundle into `dist/` |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across all TypeScript files |
| `npm run format` | Format source files with Prettier |
| `npm run test` | Run automated unit & repository tests via Vitest |

---

## 🏗️ Project Structure

```
booknest-web/
├── public/
│   ├── _redirects                    # Netlify SPA routing fallback
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                       # Reusable UI primitives (Button, Input, Modal, Toast...)
│   │   ├── layout/                   # AppLayout, Header, Footer, ArchiveDrawer
│   │   └── books/                    # BookCard, BookList, BookForm, BorrowForm, StatsCards...
│   ├── pages/
│   │   ├── LibraryPage.tsx           # Main editorial showcase & hero
│   │   ├── GenresPage.tsx            # Category filtering view
│   │   ├── AuthorsPage.tsx           # Alphabetical authors index
│   │   ├── PopularPage.tsx           # Most read books ranking
│   │   ├── CollectionsPage.tsx       # Curated reading collections
│   │   ├── AboutPage.tsx             # Architecture & live library stats
│   │   ├── BookDetailPage.tsx        # Book showcase, tabs, and lending actions
│   │   └── NotFoundPage.tsx          # Friendly 404 screen
│   ├── interfaces/
│   │   ├── book.ts                   # Book, BookInput, BookFilters types
│   │   └── repository.ts             # Async BookRepository contract
│   ├── services/
│   │   ├── localStorageBook.repository.ts
│   │   ├── bookRepository.provider.ts
│   │   └── openLibrary.service.ts    # Open Library API search helper
│   ├── context/                      # BooksContext, booksReducer, ToastContext
│   ├── hooks/                        # useBooks, useBookFilters, useTheme, useLocalStorage
│   ├── utils/                        # validators, filterAndSort, formatters
│   ├── constants/                    # Storage keys and default categories
│   └── data/                         # Initial seed catalog
└── tests/                            # Vitest unit & repository test suites
```

---

## 👤 Author & License

- **Author:** Mehmet Ali Bunsuz ([@alibnsz](https://github.com/alibnsz))
- **License:** MIT
