<template>
    <div class="categories-view">
        <!-- Hero Section -->
        <div class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">Browse by Category</h1>
                <p class="hero-subtitle">Explore technology news organized by topics</p>
            </div>
        </div>

        <div class="container">
            <!-- Categories Grid -->
            <section class="categories-section">
                <el-skeleton v-if="loadingCategories" :rows="3" animated :count="6" />

                <div v-else class="categories-grid">
                    <div v-for="category in categories" :key="category.id" class="category-card"
                        :class="{ 'active': selectedCategory === category.slug }"
                        @click="selectCategory(category.slug)">
                        <div class="category-icon">
                            <el-icon>
                                <component :is="getCategoryIcon(category.icon)" />
                            </el-icon>
                        </div>
                        <h3 class="category-name">{{ category.name }}</h3>
                        <p class="category-description">{{ category.name }}</p>
                        <div class="category-arrow">
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Filtered News Section -->
            <section v-if="selectedCategory" class="filtered-news-section">
                <div class="section-header">
                    <h2 class="section-title">
                        <el-icon>
                            <Document />
                        </el-icon>
                        {{ getCategoryName(selectedCategory) }} News
                    </h2>
                    <el-button @click="clearFilter" text>
                        <el-icon>
                            <Close />
                        </el-icon>
                        Clear Filter
                    </el-button>
                </div>

                <el-skeleton v-if="loadingNews" :rows="5" animated :count="6" class="news-skeleton" />

                <el-empty v-else-if="newsList.length === 0" description="No news found in this category"
                    :image-size="200" />

                <div v-else class="trending-grid">
                    <div v-for="article in newsList" :key="article.id" class="trending-item"
                        @click="goToDetail(article.id)">
                        <img :src="getImageUrl(article.image || article.imageUrl)" :alt="article.title"
                            class="trending-item__image" />
                        <div class="trending-item__overlay">
                            <span class="trending-item__category">{{ article.newsCategory?.name || article.category
                            }}</span>
                            <h3 class="trending-item__title">{{ article.title }}</h3>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="total > pageSize" class="pagination-wrapper">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        :page-sizes="[9, 18, 36]" :total="total" layout="total, sizes, prev, pager, next" background
                        @size-change="handleSizeChange" @current-change="handlePageChange" />
                </div>
            </section>

            <!-- Latest News when no category selected -->
            <section v-else class="latest-news-section">
                <div class="section-header">
                    <h2 class="section-title">
                        <el-icon>
                            <Document />
                        </el-icon>
                        Latest News
                    </h2>
                </div>

                <el-skeleton v-if="loadingLatestNews" :rows="5" animated :count="6" class="news-skeleton" />

                <el-empty v-else-if="latestNews.length === 0" description="No news available" :image-size="200" />

                <div v-else class="trending-grid">
                    <div v-for="article in latestNews" :key="article.id" class="trending-item"
                        @click="goToDetail(article.id)">
                        <img :src="getImageUrl(article.image || article.imageUrl)" :alt="article.title"
                            class="trending-item__image" />
                        <div class="trending-item__overlay">
                            <span class="trending-item__category">{{ article.newsCategory?.name || article.category
                            }}</span>
                            <h3 class="trending-item__title">{{ article.title }}</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
    Grid,
    Document,
    ArrowRight,
    Close,
    Cpu,
    Monitor,
    Iphone,
    Cloudy,
    Lock,
    Setting,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { NewsArticle, Category, SearchParams } from '@/types'
import { newsService, categoryService } from '@/services/api'
import { BASE_URL } from '@/config/baseUrl'

const route = useRoute()
const router = useRouter()

const categories = ref<Category[]>([])
const newsList = ref<NewsArticle[]>([])
const latestNews = ref<NewsArticle[]>([])
const loadingCategories = ref(false)
const loadingNews = ref(false)
const loadingLatestNews = ref(false)
const selectedCategory = ref('')
const currentPage = ref(1)
const pageSize = ref(9)
const total = ref(0)

// Category icon mapping - matches API response icon field
const categoryIcons: Record<string, any> = {
    'Cpu': Cpu,
    'Monitor': Monitor,
    'Iphone': Iphone,
    'Cloudy': Cloudy,
    'Lock': Lock,
    'Setting': Setting,
}

onMounted(async () => {
    await loadCategories()

    const categoryFromQuery = route.query.category as string
    if (categoryFromQuery) {
        selectedCategory.value = categoryFromQuery
        await loadNews()
    } else {
        // Load latest 12 news when no category is selected
        await loadLatestNews()
    }
})

// Watch for route changes
watch(() => route.query.category, (newCategory) => {
    if (newCategory) {
        selectedCategory.value = newCategory as string
        loadNews()
    }
})

const loadCategories = async () => {
    loadingCategories.value = true
    try {
        const response = await categoryService.getCategories()
        if (response.success) {
            console.log('Categories Response:', response.data);
            categories.value = response.data
        }
    } catch (error) {
        console.error('Failed to load categories:', error)
        ElMessage.error('Failed to load categories')
    } finally {
        loadingCategories.value = false
    }
}

const loadNews = async () => {
    if (!selectedCategory.value) return

    loadingNews.value = true
    try {
        const params: SearchParams = {
            category: getCategoryName(selectedCategory.value),
            page: currentPage.value,
            pageSize: pageSize.value,
            sortBy: 'date',
            sortOrder: 'desc',
        }

        console.log('Loading news with params:', params);
        const response = await newsService.getNews(params)
        console.log('News response:', response);
        if (response.success) {
            newsList.value = response.data
            total.value = response.total || 0
        }
    } catch (error) {
        console.error('Failed to load news:', error)
        ElMessage.error('Failed to load news')
    } finally {
        loadingNews.value = false
    }
}

const loadLatestNews = async () => {
    loadingLatestNews.value = true
    try {
        const params: SearchParams = {
            page: 1,
            pageSize: 12,
            sortBy: 'date',
            sortOrder: 'desc',
        }

        console.log('Loading latest news with params:', params);
        const response = await newsService.getNews(params)
        console.log('Latest news response:', response);
        if (response.success) {
            latestNews.value = response.data
        }
    } catch (error) {
        console.error('Failed to load latest news:', error)
        ElMessage.error('Failed to load latest news')
    } finally {
        loadingLatestNews.value = false
    }
}

const selectCategory = (slug: string) => {
    selectedCategory.value = slug
    currentPage.value = 1
    router.push({ query: { category: slug } })
    loadNews()

    // Scroll to news section
    setTimeout(() => {
        const newsSection = document.querySelector('.filtered-news-section')
        if (newsSection) {
            newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, 100)
}

const clearFilter = () => {
    selectedCategory.value = ''
    newsList.value = []
    router.push({ query: {} })
    // Reload latest news when filter is cleared
    loadLatestNews()
}

const getCategoryName = (slug: string) => {
    const category = categories.value.find(c => c.slug === slug)
    return category?.name || slug
}

const getCategoryIcon = (slug: string) => {
    return categoryIcons[slug] || Grid
}

const handlePageChange = async (page: number) => {
    currentPage.value = page
    await loadNews()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSizeChange = async (size: number) => {
    pageSize.value = size
    currentPage.value = 1
    await loadNews()
}

const goToDetail = (id: number) => {
    router.push(`/news/${id}`)
}

const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return ''
    // If it's already a full URL, return it
    if (imagePath.startsWith('http')) return imagePath
    // Otherwise, combine with BASE_URL
    return `${BASE_URL}/${imagePath}`
}
</script>

<style scoped>
.categories-view {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 80px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
    opacity: 0.3;
}

.hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
}

.hero-title {
    font-size: 56px;
    font-weight: 800;
    color: white;
    margin: 0 0 16px 0;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    letter-spacing: -1px;
}

.hero-subtitle {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.95);
    margin: 0;
    font-weight: 400;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 60px 20px;
}

.categories-section {
    margin-bottom: 60px;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}

.category-card {
    background: white;
    border-radius: 20px;
    padding: 32px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
}

.category-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s;
}

.category-card:hover::before,
.category-card.active::before {
    transform: scaleX(1);
}

.category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    border-color: rgba(102, 126, 234, 0.3);
}

.category-card.active {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    border-color: #667eea;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.category-icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: all 0.3s;
}

.category-card:hover .category-icon {
    transform: scale(1.1) rotate(5deg);
}

.category-icon .el-icon {
    font-size: 32px;
    color: white;
}

.category-name {
    font-size: 22px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 12px 0;
}

.category-description {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
}

.category-arrow {
    position: absolute;
    bottom: 24px;
    right: 24px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(102, 126, 234, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s;
}

.category-card:hover .category-arrow,
.category-card.active .category-arrow {
    opacity: 1;
    transform: translateX(0);
}

.category-arrow .el-icon {
    font-size: 20px;
    color: #667eea;
}

.filtered-news-section,
.latest-news-section {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.section-title {
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-title .el-icon {
    font-size: 36px;
    color: #667eea;
}

.trending-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
}

.trending-item {
    position: relative;
    height: 280px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.trending-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.trending-item__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.trending-item:hover .trending-item__image {
    transform: scale(1.1);
}

.trending-item__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
}

.trending-item__category {
    display: inline-block;
    background: rgba(102, 126, 234, 0.9);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
}

.trending-item__title {
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.news-skeleton {
    margin-bottom: 24px;
}

.pagination-wrapper {
    display: flex;
    justify-content: center;
    padding: 40px 0;
}

.pagination-wrapper :deep(.el-pagination) {
    gap: 8px;
}

.pagination-wrapper :deep(.el-pager li) {
    border-radius: 8px;
    font-weight: 600;
}

.pagination-wrapper :deep(.el-pager li.is-active) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.empty-state {
    padding: 80px 20px;
    text-align: center;
}

@media (max-width: 1200px) {
    .trending-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 36px;
    }

    .hero-subtitle {
        font-size: 16px;
    }

    .categories-grid {
        grid-template-columns: 1fr;
    }

    .trending-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .section-title {
        font-size: 24px;
    }
}
</style>
