<template>
  <div class="news-list-view">
    <!-- Hero Section with Search -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Technology News Portal</h1>
        <p class="hero-subtitle">Stay updated with the latest technology trends and innovations</p>

        <!-- Search Box -->
        <div class="hero-search">
          <el-input v-model="searchQuery" placeholder="Search news by title..." size="large" clearable
            class="search-input" @keyup.enter="handleQuickSearch">
            <template #prefix>
              <el-icon class="search-icon">
                <Search />
              </el-icon>
            </template>
          </el-input>
          <el-button type="primary" size="large" class="search-button" @click="handleQuickSearch">
            <el-icon>
              <Search />
            </el-icon>
            Search
          </el-button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Trending News -->
      <section v-if="trendingNews.length > 0" class="trending-section">
        <h2 class="section-title">
          <el-icon>
            <TrendCharts />
          </el-icon>
          Trending Now
        </h2>
        <div class="trending-grid">
          <div v-for="news in trendingNews" :key="news.id" class="trending-item" @click="goToDetail(news.id)">
            <img :src="getImageUrl(news.image || news.imageUrl)" :alt="news.title" class="trending-item__image" />
            <div class="trending-item__overlay">
              <span class="trending-item__category">{{ news.newsCategory?.name || news.category }}</span>
              <h3 class="trending-item__title">{{ news.title
              }}</h3>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TrendCharts, Document, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { NewsArticle, SearchParams } from '@/types'
import { newsService } from '@/services/api'
import { BASE_URL } from '@/config/baseUrl'

const router = useRouter()

const newsList = ref<NewsArticle[]>([])
const trendingNews = ref<NewsArticle[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(9)
const total = ref(0)
const searchQuery = ref('')
const searchParams = ref<SearchParams>({
  sortBy: 'date',
  sortOrder: 'desc',
})

onMounted(async () => {
  // await loadNews()
  await loadTrendingNews()
})

const loadNews = async () => {
  loading.value = true
  try {
    const params: SearchParams = {
      ...searchParams.value,
      page: currentPage.value,
      pageSize: pageSize.value,
    }

    const response = await newsService.getNews(params)
    if (response.success) {
      newsList.value = response.data
      total.value = response.total || 0
    }
  } catch (error) {
    console.error('Failed to load news:', error)
    ElMessage.error('Failed to load news articles')
  } finally {
    loading.value = false
  }
}

const loadTrendingNews = async () => {
  try {
    const response = await newsService.getTrendingNews(5)
    if (response.success) {
      trendingNews.value = response.data
    }
  } catch (error) {
    console.error('Failed to load trending news:', error)
  }
}

const handleQuickSearch = async () => {
  searchParams.value = {
    query: searchQuery.value,
    sortBy: 'date',
    sortOrder: 'desc',
  }
  currentPage.value = 1
  await loadNews()
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
.news-list-view {
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
  margin: 0 0 40px 0;
  font-weight: 400;
}

.hero-search {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  gap: 12px;
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-input {
  flex: 1;
}

.search-input :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 8px 20px;
  transition: all 0.3s;
}

.search-input :deep(.el-input__wrapper:hover) {
  background: white;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.search-input :deep(.el-input__wrapper.is-focus) {
  background: white;
  border-color: white;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
}

.search-input :deep(.el-input__inner) {
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;
}

.search-input :deep(.el-input__inner::placeholder) {
  color: #9ca3af;
}

.search-icon {
  font-size: 20px;
  color: #667eea;
}

.search-button {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
  border-radius: 16px;
  padding: 0 40px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 8px 24px rgba(245, 87, 108, 0.4);
  transition: all 0.3s;
  letter-spacing: 0.5px;
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(245, 87, 108, 0.5);
}

.search-button:active {
  transform: translateY(0);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 32px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title .el-icon {
  font-size: 36px;
  color: #667eea;
}

.trending-section {
  margin-bottom: 60px;
}

.trending-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.news-section__info {
  color: #6b7280;
  font-size: 15px;
  font-weight: 500;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
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

@media (max-width: 1200px) {
  .news-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
    margin-bottom: 32px;
  }

  .hero-search {
    flex-direction: column;
    gap: 12px;
  }

  .search-button {
    width: 100%;
    padding: 0 24px;
  }

  .trending-grid {
    grid-template-columns: 1fr;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-title {
    font-size: 24px;
  }
}
</style>
