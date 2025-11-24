<template>
  <el-card class="news-card" :body-style="{ padding: '0px' }" shadow="hover" @click="handleClick">
    <div class="news-card__image-wrapper">
      <img :src="article.imageUrl" :alt="article.title" class="news-card__image" />
      <div class="news-card__category">{{ article.category }}</div>
      <div v-if="article.featured" class="news-card__featured">
        <el-icon>
          <Star />
        </el-icon>
      </div>
    </div>

    <div class="news-card__content">
      <div class="news-card__meta">
        <span class="news-card__author">
          <el-icon>
            <User />
          </el-icon>
          {{ article.author }}
        </span>
        <span class="news-card__date">
          <el-icon>
            <Clock />
          </el-icon>
          {{ formatDate(article.publishedDate) }}
        </span>
      </div>

      <h3 class="news-card__title">{{ article.title }}</h3>
      <p class="news-card__summary">{{ article.summary }}</p>

      <div class="news-card__tags">
        <el-tag v-for="tag in (article.tags || []).slice(0, 3)" :key="tag" size="small" effect="plain">
          {{ tag }}
        </el-tag>
      </div>

      <div class="news-card__footer">
        <div class="news-card__stats">
          <span class="news-card__stat">
            <el-icon>
              <View />
            </el-icon>
            {{ formatNumber(article.views || 0) }}
          </span>
          <span class="news-card__stat">
            <el-icon>
              <ChatDotRound />
            </el-icon>
            {{ formatNumber(article.likes || 0) }}
          </span>
        </div>
        <el-button type="primary" link>
          Giňişleýin
          <el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon>
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Star, User, Clock, View, ChatDotRound, ArrowRight } from '@element-plus/icons-vue'
import type { NewsArticle } from '@/types'
import { useRouter } from 'vue-router'

interface Props {
  article: NewsArticle
}

const props = defineProps<Props>()
const router = useRouter()

const handleClick = () => {
  router.push(`/news/${props.article.id}`)
}

const formatDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Şu gün'
  if (days === 1) return 'Düýn'
  if (days < 7) return `${days} gün öň`

  return d.toLocaleDateString('tk-TM', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
</script>

<style scoped>
.news-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
}

.news-card__image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover .news-card__image {
  transform: scale(1.1);
}

.news-card__category {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.news-card__featured {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
}

.news-card__content {
  padding: 24px;
}

.news-card__meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6b7280;
}

.news-card__author,
.news-card__date {
  display: flex;
  align-items: center;
  gap: 6px;
}

.news-card__title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s;
}

.news-card:hover .news-card__title {
  color: #667eea;
}

.news-card__summary {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  min-height: 24px;
}

.news-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.news-card__stats {
  display: flex;
  gap: 16px;
}

.news-card__stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.news-card__stat .el-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .news-card__image-wrapper {
    height: 180px;
  }

  .news-card__content {
    padding: 16px;
  }

  .news-card__title {
    font-size: 18px;
  }
}
</style>
