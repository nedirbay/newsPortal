/**
 * API Service Layer
 * Handles all HTTP requests to the backend
 */

import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, API_ENDPOINTS } from '@/config/baseUrl'
import type {
    NewsArticle,
    Comment,
    Category,
    SearchParams,
    ApiResponse,
    CommentDTO,
} from '@/types'
import { mockApi } from './mockData'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        console.warn('API Error - Falling back to mock data:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

// News API Service
export const newsService = {
    // Get all news with optional filters
    async getNews (params?: SearchParams): Promise<ApiResponse<NewsArticle[]>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.NEWS.LIST,
                { params })
            console.log('API Response Data:', response.data);
            console.log('Is Array?', Array.isArray(response.data));
            console.log('Data length:', response.data?.length);

            // Backend returns array directly, wrap it in ApiResponse format
            return {
                success: true,
                data: response.data,
                message: 'News fetched successfully'
            };
        } catch (error) {
            console.log('Using mock data for news list')
            return mockApi.getNews(params)
        }
    },

    // Get news by ID
    async getNewsById (id: number | string): Promise<ApiResponse<NewsArticle>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.NEWS.DETAIL(id))
            console.log('News detail response:', response.data);

            // Backend returns object directly, wrap it in ApiResponse format
            return {
                success: true,
                data: response.data,
                message: 'News detail fetched successfully'
            };
        } catch (error) {
            console.log('Using mock data for news detail')
            return mockApi.getNewsById(id)
        }
    },

    // Search news
    async searchNews (params: SearchParams): Promise<ApiResponse<NewsArticle[]>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.NEWS.SEARCH, { params })
            return response.data
        } catch (error) {
            console.log('Using mock data for news search')
            return mockApi.getNews(params)
        }
    },

    // Get latest news
    async getLatestNews (limit: number = 10): Promise<ApiResponse<NewsArticle[]>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.NEWS.LATEST, {
                params: { limit },
            })
            return response.data
        } catch (error) {
            console.log('Using mock data for latest news')
            return mockApi.getNews({ pageSize: limit, sortBy: 'date' })
        }
    },

    // Get trending news
    async getTrendingNews (limit: number = 5): Promise<ApiResponse<any[]>> {
        console.log('Trending endpoint:', API_ENDPOINTS.NEWS.TRENDING)
        try {
            const response = await apiClient.get(API_ENDPOINTS.NEWS.TRENDING, {
                params: { limit },
            })
            console.log('Raw Trending Response:', response);
            console.log('Response Data:', response.data);

            // Backend returns array directly, not wrapped in ApiResponse
            // So we need to wrap it ourselves
            return {
                success: true,
                data: response.data,
                message: 'Trending news fetched successfully'
            };
        } catch (error) {
            console.log('Using mock data for trending news')
            return mockApi.getTrendingNews(limit)
        }
    },
}

// Comment API Service
export const commentService = {
    // Get comments for a news article
    async getComments (newsId: number | string): Promise<ApiResponse<Comment[]>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.COMMENTS.LIST(newsId))
            return response.data
        } catch (error) {
            console.log('Using mock data for comments')
            return mockApi.getComments(newsId)
        }
    },

    // Create a new comment
    async createComment (
        newsId: number | string,
        comment: CommentDTO
    ): Promise<ApiResponse<Comment>> {
        try {
            const response = await apiClient.post(API_ENDPOINTS.COMMENTS.CREATE(newsId), comment)
            return response.data
        } catch (error) {
            console.log('Using mock data for create comment')
            return mockApi.createComment(newsId, comment)
        }
    },

    // Update a comment
    async updateComment (
        newsId: number | string,
        commentId: number | string,
        comment: CommentDTO
    ): Promise<ApiResponse<Comment>> {
        try {
            const response = await apiClient.put(
                API_ENDPOINTS.COMMENTS.UPDATE(newsId, commentId),
                comment
            )
            return response.data
        } catch (error) {
            console.log('Using mock data for update comment')
            throw error
        }
    },

    // Delete a comment
    async deleteComment (
        newsId: number | string,
        commentId: number | string
    ): Promise<ApiResponse<void>> {
        try {
            const response = await apiClient.delete(API_ENDPOINTS.COMMENTS.DELETE(newsId, commentId))
            return response.data
        } catch (error) {
            console.log('Using mock data for delete comment')
            return mockApi.deleteComment(newsId, commentId)
        }
    },
}

// Category API Service
export const categoryService = {
    // Get all categories
    async getCategories (): Promise<ApiResponse<Category[]>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.CATEGORIES.LIST)
            console.log('Raw Category Response:', response.data);

            // Backend returns array directly, wrap it in ApiResponse format
            return {
                success: true,
                data: response.data,
                message: 'Categories fetched successfully'
            };
        } catch (error) {
            console.log('Using mock data for categories')
            return mockApi.getCategories()
        }
    },
}

export default apiClient
