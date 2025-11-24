<template>
    <div class="admin-dashboard">
        <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="stat-card stat-primary">
                    <div class="stat-content">
                        <el-icon class="stat-icon">
                            <Document />
                        </el-icon>
                        <div class="stat-info">
                            <div class="stat-value">{{ stats.totalNews }}</div>
                            <div class="stat-label">Jemi Habarlar</div>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="stat-card stat-success">
                    <div class="stat-content">
                        <el-icon class="stat-icon">
                            <Grid />
                        </el-icon>
                        <div class="stat-info">
                            <div class="stat-value">{{ stats.totalCategories }}</div>
                            <div class="stat-label">Kategoriýalar</div>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="stat-card stat-warning">
                    <div class="stat-content">
                        <el-icon class="stat-icon">
                            <PriceTag />
                        </el-icon>
                        <div class="stat-info">
                            <div class="stat-value">{{ stats.totalTags }}</div>
                            <div class="stat-label">Tegler</div>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="6">
                <el-card class="stat-card stat-info">
                    <div class="stat-content">
                        <el-icon class="stat-icon">
                            <View />
                        </el-icon>
                        <div class="stat-info">
                            <div class="stat-value">{{ stats.totalViews }}</div>
                            <div class="stat-label">Jemi Görlüş</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="24" style="margin-top: 24px">
            <el-col :span="24">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>Çalt Hereketler</span>
                        </div>
                    </template>
                    <div class="quick-actions">
                        <el-button type="primary" @click="goTo('/admin/news')">
                            <el-icon>
                                <Document />
                            </el-icon>
                            Habarlary Dolandyr
                        </el-button>
                        <el-button type="success" @click="goTo('/admin/categories')">
                            <el-icon>
                                <Grid />
                            </el-icon>
                            Kategoriýalary Dolandyr
                        </el-button>
                        <el-button type="warning" @click="goTo('/admin/tags')">
                            <el-icon>
                                <PriceTag />
                            </el-icon>
                            Tegleri Dolandyr
                        </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Document, Grid, PriceTag, View } from '@element-plus/icons-vue'
import { adminNewsService, adminCategoryService, adminTagService } from '@/services/adminService'

const router = useRouter()

const stats = ref({
    totalNews: 0,
    totalCategories: 0,
    totalTags: 0,
    totalViews: 0,
})

onMounted(async () => {
    await loadStats()
})

const loadStats = async () => {
    try {
        const [newsRes, categoriesRes, tagsRes] = await Promise.all([
            adminNewsService.getAll(),
            adminCategoryService.getAll(),
            adminTagService.getAll(),
        ])

        if (newsRes.success) {
            stats.value.totalNews = newsRes.data.length
            stats.value.totalViews = newsRes.data.reduce((sum, news) => sum + (news.views || 0), 0)
        }

        if (categoriesRes.success) {
            stats.value.totalCategories = categoriesRes.data.length
        }

        if (tagsRes.success) {
            stats.value.totalTags = tagsRes.data.length
        }
    } catch (error) {
        console.error('Failed to load stats:', error)
    }
}

const goTo = (path: string) => {
    router.push(path)
}
</script>

<style scoped>
.admin-dashboard {
    max-width: 1400px;
}

.stat-card {
    border-radius: 12px;
    margin-bottom: 24px;
    transition: all 0.3s;
    border: none;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-card.stat-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.stat-card.stat-success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.stat-card.stat-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
}

.stat-card.stat-info {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
}

.stat-card :deep(.el-card__body) {
    padding: 24px;
}

.stat-content {
    display: flex;
    align-items: center;
    gap: 20px;
}

.stat-icon {
    font-size: 48px;
    opacity: 0.9;
}

.stat-info {
    flex: 1;
}

.stat-value {
    font-size: 36px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 8px;
}

.stat-label {
    font-size: 14px;
    opacity: 0.9;
    font-weight: 500;
}

.card-header {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
}

.quick-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.quick-actions .el-button {
    flex: 1;
    min-width: 200px;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
}

@media (max-width: 768px) {
    .quick-actions .el-button {
        min-width: 100%;
    }
}
</style>
