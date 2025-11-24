<template>
  <div class="news-detail-view">
    <el-skeleton v-if="loading" :rows="10" animated class="detail-skeleton" />

    <div v-else-if="article" class="detail-container">
      <!-- Back Button -->
      <div class="back-button-wrapper">
        <el-button @click="goBack" class="back-button">
          <el-icon>
            <ArrowLeft />
          </el-icon>
          Back to News
        </el-button>
      </div>

      <!-- Article Header -->
      <article class="article">
        <div class="article-header">
          <div class="article-meta">
            <el-tag :type="getCategoryType(article.newsCategory?.name || article.category)" size="large" effect="dark">
              {{ article.newsCategory?.name || article.category }}
            </el-tag>
            <span class="article-date">
              <el-icon>
                <Clock />
              </el-icon>
              {{ formatDate(article.publishedDate) }}
            </span>
          </div>

          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-author-info">
            <el-avatar :size="48" class="author-avatar">
              {{ (article.author || 'Anonymous').charAt(0).toUpperCase() }}
            </el-avatar>
            <div class="author-details">
              <span class="author-name">{{ article.author || 'Anonymous' }}</span>
              <div class="article-stats">
                <span class="stat-item">
                  <el-icon>
                    <View />
                  </el-icon>
                  {{ formatNumber(article.views || 0) }} views
                </span>
                <span class="stat-item">
                  <el-icon>
                    <ChatDotRound />
                  </el-icon>
                  {{ formatNumber(article.likes || 0) }} likes
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="article-image-wrapper">
          <img :src="getImageUrl(article.image || article.imageUrl)" :alt="article.title" class="article-image" />
        </div>

        <!-- Article Content -->
        <div class="article-content">
          <div v-if="article.summary" class="article-summary">
            {{ article.summary }}
          </div>

          <div class="article-body" v-html="formatContent(article.content)"></div>

          <!-- Tags -->
          <div v-if="article.tags && article.tags.length > 0" class="article-tags">
            <el-icon>
              <PriceTag />
            </el-icon>
            <el-tag v-for="tag in article.tags" :key="tag" size="large" effect="plain" round>
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </article>

      <!-- Related News -->
      <section v-if="relatedNews.length > 0" class="related-section">
        <h2 class="section-title">
          <el-icon>
            <Reading />
          </el-icon>
          Related Articles
        </h2>
        <div class="related-grid">
          <NewsCard v-for="news in relatedNews" :key="news.id" :article="news" />
        </div>
      </section>

      <!-- Comments Section -->
      <CommentSection :news-id="article.id" />
    </div>

    <el-empty v-else description="Article not found" :image-size="200" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  Clock,
  View,
  ChatDotRound,
  PriceTag,
  Reading
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import NewsCard from '@/components/NewsCard.vue'
import CommentSection from '@/components/CommentSection.vue'
import type { NewsArticle } from '@/types'
import { newsService } from '@/services/api'
import { BASE_URL } from '@/config/baseUrl'

const route = useRoute()
const router = useRouter()

const article = ref<NewsArticle | null>(null)
const relatedNews = ref<NewsArticle[]>([])
const loading = ref(false)

onMounted(async () => {
  await loadArticle()
  await loadRelatedNews()
})

const loadArticle = async () => {
  loading.value = true
  try {
    const id = route.params.id as string
    console.log('Loading article with ID:', id);
    const response = await newsService.getNewsById(id)
    console.log('Article response:', response);
    if (response.success) {
      article.value = response.data
    }
  } catch (error) {
    console.error('Failed to load article:', error)
    ElMessage.error('Failed to load article')
  } finally {
    loading.value = false
  }
}

const loadRelatedNews = async () => {
  try {
    if (!article.value) return

    const categoryName = article.value.newsCategory?.name || article.value.category
    const response = await newsService.getNews({
      category: categoryName,
      pageSize: 4,
    })

    if (response.success) {
      relatedNews.value = response.data.filter(news => news.id !== article.value?.id).slice(0, 3)
    }
  } catch (error) {
    console.error('Failed to load related news:', error)
  }
}

const goBack = () => {
  router.push('/')
}

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

const formatContent = (content: string) => {
  // Convert line breaks to paragraphs
  return content.split('\n\n').map(p => `<p>${p}</p>`).join('')
}

const getCategoryType = (category?: string) => {
  if (!category) return 'info'
  const types: Record<string, any> = {
    'AI': 'primary',
    'Artifial Intelligance': 'primary',
    'Web Development': 'success',
    'Mobile': 'warning',
    'Cloud': 'info',
    'Security': 'danger',
  }
  return types[category] || 'info'
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
.news-detail-view {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  padding: 40px 20px;
}

.detail-container {
  max-width: 900px;
  margin: 0 auto;
}

.detail-skeleton {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 20px;
}

.back-button-wrapper {
  margin-bottom: 32px;
}

.back-button {
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s;
}

.back-button:hover {
  transform: translateX(-4px);
}

.article {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 48px;
}

.article-header {
  padding: 48px 48px 32px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.article-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

.article-title {
  font-size: 48px;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
  margin: 0 0 32px 0;
  letter-spacing: -1px;
}

.article-author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  font-size: 20px;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.article-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
}

.article-image-wrapper {
  width: 100%;
  height: 500px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 48px;
}

.article-summary {
  font-size: 20px;
  font-weight: 500;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-left: 4px solid #667eea;
  border-radius: 12px;
}

.article-body {
  font-size: 18px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 40px;
}

.article-body :deep(p) {
  margin-bottom: 24px;
}

.article-tags {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 24px 0;
  border-top: 2px solid #f3f4f6;
  border-bottom: 2px solid #f3f4f6;
  margin-bottom: 32px;
}

.article-tags .el-icon {
  font-size: 20px;
  color: #667eea;
}

.related-section {
  margin-bottom: 48px;
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

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .article-header {
    padding: 32px 24px 24px;
  }

  .article-title {
    font-size: 32px;
  }

  .article-image-wrapper {
    height: 300px;
  }

  .article-content {
    padding: 32px 24px;
  }

  .article-summary {
    font-size: 16px;
  }

  .article-body {
    font-size: 16px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
