# Technology News Portal

A modern, feature-rich news portal built with Vue 3, TypeScript, and Element Plus for technology news.

## 🚀 Features

### Core Functionality
- **News List Page** - Browse all technology news with pagination
- **Advanced Search** - Search news by keywords, category, date range, and sorting options
- **News Detail Page** - Read full articles with rich content display
- **Comment System** - Full CRUD functionality for comments with nested replies
- **Trending News** - Showcase popular and trending articles
- **Related Articles** - Display related news based on category

### UI/UX Features
- **Modern Design** - Premium gradient-based design with smooth animations
- **Responsive Layout** - Fully responsive across all devices
- **Dark Mode Ready** - Prepared for dark mode implementation
- **Micro-interactions** - Hover effects and smooth transitions
- **Custom Scrollbar** - Styled scrollbar matching the theme
- **Loading States** - Skeleton screens for better UX

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Element Plus** - Premium Vue 3 UI library
- **Vue Router** - Official router for Vue.js
- **Axios** - HTTP client for API requests
- **Pinia** - State management (ready for use)
- **Vite** - Next-generation frontend tooling

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── NewsCard.vue    # News article card component
│   ├── SearchBar.vue   # Advanced search component
│   └── CommentSection.vue # Comment functionality
├── views/              # Page components
│   ├── NewsListView.vue   # News listing page
│   └── NewsDetailView.vue # Article detail page
├── services/           # API service layer
│   └── api.ts         # API client and service methods
├── config/            # Configuration files
│   └── baseUrl.ts     # API base URL and endpoints
├── types/             # TypeScript type definitions
│   └── index.ts       # Interface definitions
├── router/            # Vue Router configuration
│   └── index.ts       # Route definitions
├── App.vue            # Root component
└── main.ts            # Application entry point
```

## 🔌 API Integration

The application connects to a backend API at `https://localhost:5050`. All API endpoints are configured in `src/config/baseUrl.ts`.

### Available Endpoints

#### News Endpoints
- `GET /api/news` - Get all news (with filters)
- `GET /api/news/:id` - Get news by ID
- `GET /api/news/search` - Search news
- `GET /api/news/latest` - Get latest news
- `GET /api/news/trending` - Get trending news

#### Comment Endpoints
- `GET /api/news/:newsId/comments` - Get comments for a news article
- `POST /api/news/:newsId/comments` - Create a new comment
- `PUT /api/news/:newsId/comments/:commentId` - Update a comment
- `DELETE /api/news/:newsId/comments/:commentId` - Delete a comment

#### Category Endpoints
- `GET /api/categories` - Get all categories

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.0 or v22.12.0+)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd d:\aspCore\news\front\newsPortal
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#667eea` → `#764ba2`
- **Secondary Gradient**: `#f093fb` → `#f5576c`
- **Background**: `#f8f9fa` → `#ffffff`
- **Text Primary**: `#1f2937`
- **Text Secondary**: `#6b7280`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Border Radius
- **Small**: 8px
- **Base**: 12px
- **Large**: 16px
- **XL**: 20px
- **2XL**: 24px

## 📝 Component Usage

### NewsCard
```vue
<NewsCard :article="newsArticle" />
```

### SearchBar
```vue
<SearchBar @search="handleSearch" />
```

### CommentSection
```vue
<CommentSection :news-id="articleId" />
```

## 🔧 Configuration

### API Base URL
Update the base URL in `src/config/baseUrl.ts`:
```typescript
export const BASE_URL = 'https://localhost:5050'
```

### Element Plus Theme
Customize the theme in `src/App.vue`:
```css
:root {
  --el-color-primary: #667eea;
  --el-border-radius-base: 12px;
}
```

## 🌟 Key Features Explained

### Search Functionality
- Full-text search across news articles
- Filter by category
- Date range filtering
- Sort by date, views, or likes
- Real-time search results

### Comment System
- Create, read, update, delete comments
- Nested replies support
- Like functionality
- Author attribution
- Timestamp display

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 1200px
- Flexible grid layouts
- Touch-friendly interactions

## 🔒 Security Features

- HTTPS connection to backend
- JWT token support (in interceptors)
- XSS protection through Vue's template system
- CSRF token ready

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a custom project. For modifications:
1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📄 License

Private project - All rights reserved

## 👥 Contact

For questions or support, contact the development team.

---

**Built with ❤️ using Vue 3 and Element Plus**
