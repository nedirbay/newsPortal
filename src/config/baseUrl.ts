/**
 * API Base URL Configuration
 * This file contains the base URL for all backend API endpoints
 */

export const BASE_URL = 'https://localhost:5050'

// API Endpoints
export const API_ENDPOINTS = {
  // News endpoints
  NEWS: {
    LIST: '/api/news',
    DETAIL: (id: number | string) => `/api/news/${id}`,
    SEARCH: '/api/news/search',
    LATEST: '/api/news/latest',
    TRENDING: '/api/news/latestfive',
  },
  // Comment endpoints
  COMMENTS: {
    LIST: (newsId: number | string) => `/api/news/${newsId}/comments`,
    CREATE: (newsId: number | string) => `/api/news/${newsId}/comments`,
    DELETE: (newsId: number | string, commentId: number | string) =>
      `/api/news/${newsId}/comments/${commentId}`,
    UPDATE: (newsId: number | string, commentId: number | string) =>
      `/api/news/${newsId}/comments/${commentId}`,
  },
  // Category endpoints
  CATEGORIES: {
    LIST: '/api/NewsCategories',
  },
  // Admin endpoints
  ADMIN: {
    LOGIN: '/api/admin/login',
    // Category management
    CATEGORIES: {
      LIST: '/api/admin/NewsCategories',
      CREATE: '/api/admin/NewsCategories',
      UPDATE: (id: number | string) => `/api/admin/NewsCategories/${id}`,
      DELETE: (id: number | string) => `/api/admin/NewsCategories/${id}`,
    },
    // Tag management
    TAGS: {
      LIST: '/api/admin/tags',
      CREATE: '/api/admin/tags',
      UPDATE: (id: number | string) => `/api/admin/tags/${id}`,
      DELETE: (id: number | string) => `/api/admin/tags/${id}`,
    },
    // News management
    NEWS: {
      LIST: '/api/admin/news',
      CREATE: '/api/admin/news',
      UPDATE: (id: number | string) => `/api/admin/news/${id}`,
      DELETE: (id: number | string) => `/api/admin/news/${id}`,
    },
  },
}

export default BASE_URL
