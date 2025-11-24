import axios from 'axios'
import type {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    Category,
    CategoryDTO,
    Tag,
    TagDTO,
    NewsArticle,
    NewsDTO,
} from '@/types'
import BASE_URL from '@/config/baseUrl'
import API_ENDPOINTS from '@/config/apiEndpoints'
const API_BASE = BASE_URL.BASE_URL

// Admin Authentication
export const adminAuthService = {
    async login (credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await axios.post<LoginResponse>(
                `${API_BASE}${BASE_URL.ADMIN.LOGIN}`,
                credentials
            )
            if (response.data.token) {
                localStorage.setItem('admin_token', response.data.token)
            }
            return response.data
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, message: 'Login failed' }
        }
    },

    logout () {
        localStorage.removeItem('admin_token')
    },

    getToken (): string | null {
        return localStorage.getItem('admin_token')
    },

    isAuthenticated (): boolean {
        return !!this.getToken()
    },
}

// Get auth headers
const getAuthHeaders = () => {
    const token = adminAuthService.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}

// Admin Category Service
export const adminCategoryService = {
    async getAll (): Promise<ApiResponse<Category[]>> {
        try {
            const response = await axios.get<ApiResponse<Category[]>>(
                `${API_BASE}${BASE_URL.ADMIN.CATEGORIES.LIST}`,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Get categories error:', error)
            return { success: false, data: [], message: 'Failed to fetch categories' }
        }
    },

    async create (category: CategoryDTO): Promise<ApiResponse<Category>> {
        try {
            const response = await axios.post<ApiResponse<Category>>(
                `${API_BASE}${BASE_URL.ADMIN.CATEGORIES.CREATE}`,
                category,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Create category error:', error)
            return { success: false, data: {} as Category, message: 'Failed to create category' }
        }
    },

    async update (id: number, category: CategoryDTO): Promise<ApiResponse<Category>> {
        try {
            const response = await axios.put<ApiResponse<Category>>(
                `${API_BASE}${BASE_URL.ADMIN.CATEGORIES.UPDATE(id)}`,
                category,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Update category error:', error)
            return { success: false, data: {} as Category, message: 'Failed to update category' }
        }
    },

    async delete (id: number): Promise<ApiResponse<void>> {
        try {
            const response = await axios.delete<ApiResponse<void>>(
                `${API_BASE}${BASE_URL.ADMIN.CATEGORIES.DELETE(id)}`,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Delete category error:', error)
            return { success: false, data: undefined, message: 'Failed to delete category' }
        }
    },
}

// Admin Tag Service
export const adminTagService = {
    async getAll (): Promise<ApiResponse<Tag[]>> {
        try {
            const response = await axios.get<ApiResponse<Tag[]>>(
                `${API_BASE}${BASE_URL.ADMIN.TAGS.LIST}`,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Get tags error:', error)
            return { success: false, data: [], message: 'Failed to fetch tags' }
        }
    },

    async create (tag: TagDTO): Promise<ApiResponse<Tag>> {
        try {
            const response = await axios.post<ApiResponse<Tag>>(
                `${API_BASE}${BASE_URL.ADMIN.TAGS.CREATE}`,
                tag,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Create tag error:', error)
            return { success: false, data: {} as Tag, message: 'Failed to create tag' }
        }
    },

    async update (id: number, tag: TagDTO): Promise<ApiResponse<Tag>> {
        try {
            const response = await axios.put<ApiResponse<Tag>>(
                `${API_BASE}${BASE_URL.ADMIN.TAGS.UPDATE(id)}`,
                tag,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Update tag error:', error)
            return { success: false, data: {} as Tag, message: 'Failed to update tag' }
        }
    },

    async delete (id: number): Promise<ApiResponse<void>> {
        try {
            const response = await axios.delete<ApiResponse<void>>(
                `${API_BASE}${BASE_URL.ADMIN.TAGS.DELETE(id)}`,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Delete tag error:', error)
            return { success: false, data: undefined, message: 'Failed to delete tag' }
        }
    },
}

// Admin News Service
export const adminNewsService = {
    async getAll (): Promise<ApiResponse<NewsArticle[]>> {
        try {
            const response = await axios.get<ApiResponse<NewsArticle[]>>(
                `${API_BASE}${BASE_URL.ADMIN.NEWS.LIST}`,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Get news error:', error)
            return { success: false, data: [], message: 'Failed to fetch news' }
        }
    },

    async create (news: NewsDTO): Promise<ApiResponse<NewsArticle>> {
        try {
            const response = await axios.post<ApiResponse<NewsArticle>>(
                `${API_BASE}${BASE_URL.ADMIN.NEWS.CREATE}`,
                news,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Create news error:', error)
            return { success: false, data: {} as NewsArticle, message: 'Failed to create news' }
        }
    },

    async update (id: number, news: NewsDTO): Promise<ApiResponse<NewsArticle>> {
        try {
            const response = await axios.put<ApiResponse<NewsArticle>>(
                `${API_BASE}${BASE_URL.ADMIN.NEWS.UPDATE(id)}`,
                news,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Update news error:', error)
            return { success: false, data: {} as NewsArticle, message: 'Failed to update news' }
        }
    },

    async delete (id: number): Promise<ApiResponse<void>> {
        try {
            const response = await axios.delete<ApiResponse<void>>(
                `${API_BASE}${BASE_URL.ADMIN.NEWS.DELETE(id)}`,
                { headers: getAuthHeaders() }
            )
            return response.data
        } catch (error) {
            console.error('Delete news error:', error)
            return { success: false, data: undefined, message: 'Failed to delete news' }
        }
    },
}
