/**
 * TypeScript interfaces and types for the News Portal
 */

// News Article Interface
export interface NewsArticle {
    id: number
    title: string
    content: string
    summary?: string
    author?: string
    category?: string
    categoryId?: number
    newsCategory?: {
        id: number
        name: string
    }
    image?: string
    imageUrl?: string
    publishedDate: string
    views?: number
    likes?: number
    tags?: string[]
    featured?: boolean
}

// Comment Interface
export interface Comment {
    id: number
    newsId: number
    author: string
    content: string
    createdDate: string
    likes: number
    replies?: Comment[]
}

// Category Interface
export interface Category {
    id: number
    name: string
    slug: string
    icon: string
}

// Tag Interface
export interface Tag {
    id: number
    name: string
    slug: string
}

// Search Parameters
export interface SearchParams {
    query?: string
    category?: string
    tags?: string[]
    dateFrom?: string
    dateTo?: string
    page?: number
    pageSize?: number
    sortBy?: 'date' | 'views' | 'likes'
    sortOrder?: 'asc' | 'desc'
}

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
    total?: number
    page?: number
    pageSize?: number
}

// Pagination
export interface PaginationParams {
    page: number
    pageSize: number
    total: number
}

// Comment Create/Update DTO
export interface CommentDTO {
    author: string
    content: string
    parentId?: number
}

// Admin Login
export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    success: boolean
    token?: string
    message?: string
}

// Admin DTOs
export interface CategoryDTO {
    name: string
    slug: string
    description?: string
}

export interface TagDTO {
    name: string
    slug: string
}

export interface NewsDTO {
    title: string
    content: string
    summary: string
    author: string
    category: string
    imageUrl: string
    tags: string[]
    featured?: boolean
}
