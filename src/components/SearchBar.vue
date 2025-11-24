<template>
  <div class="search-bar">
    <div class="search-bar__main">
      <el-input v-model="searchQuery" placeholder="Tehnologiýa habarlaryny gözle..." class="search-bar__input"
        size="large" clearable @keyup.enter="handleSearch">
        <template #prefix>
          <el-icon class="search-icon">
            <Search />
          </el-icon>
        </template>
      </el-input>

      <el-button type="primary" size="large" class="search-bar__button" @click="handleSearch">
        <el-icon>
          <Search />
        </el-icon>
        Gözle
      </el-button>
    </div>

    <div class="search-bar__filters">
      <el-select v-model="selectedCategory" placeholder="Kategoriýa" clearable size="default" class="search-bar__select"
        @change="handleFilterChange">
        <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.slug" />
      </el-select>

      <el-select v-model="sortBy" placeholder="Tertiple" size="default" class="search-bar__select"
        @change="handleFilterChange">
        <el-option label="Iň soňky" value="date" />
        <el-option label="Köp görülen" value="views" />
        <el-option label="Köp halanan" value="likes" />
      </el-select>

      <el-date-picker v-model="dateRange" type="daterange" range-separator="-" start-placeholder="Başlanýan senesi"
        end-placeholder="Gutarýan senesi" size="default" class="search-bar__date" @change="handleFilterChange" />

      <el-button size="default" @click="handleReset" class="search-bar__reset">
        <el-icon>
          <RefreshRight />
        </el-icon>
        Arassala
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import type { Category, SearchParams } from '@/types'
import { categoryService } from '@/services/api'

interface Emits {
  (e: 'search', params: SearchParams): void
}

const emit = defineEmits<Emits>()

const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('date')
const dateRange = ref<[Date, Date] | null>(null)
const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    const response = await categoryService.getCategories()
    if (response.success) {
      categories.value = response.data
    }
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
})

const handleSearch = () => {
  const params: SearchParams = {
    query: searchQuery.value,
    category: selectedCategory.value,
    sortBy: sortBy.value as 'date' | 'views' | 'likes',
    sortOrder: 'desc',
  }

  if (dateRange.value) {
    params.dateFrom = dateRange.value[0].toISOString()
    params.dateTo = dateRange.value[1].toISOString()
  }

  emit('search', params)
}

const handleFilterChange = () => {
  handleSearch()
}

const handleReset = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'date'
  dateRange.value = null
  emit('search', { sortBy: 'date', sortOrder: 'desc' })
}
</script>

<style scoped>
.search-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  margin-bottom: 40px;
}

.search-bar__main {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-bar__input {
  flex: 1;
}

.search-bar__input :deep(.el-input__wrapper) {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  border: none;
}

.search-bar__input :deep(.el-input__inner) {
  font-size: 16px;
  color: #1f2937;
}

.search-icon {
  font-size: 20px;
  color: #667eea;
}

.search-bar__button {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
  border-radius: 12px;
  padding: 0 32px;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 20px rgba(245, 87, 108, 0.4);
  transition: all 0.3s;
}

.search-bar__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(245, 87, 108, 0.5);
}

.search-bar__filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.search-bar__select,
.search-bar__date {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  overflow: hidden;
}

.search-bar__select :deep(.el-input__wrapper),
.search-bar__date :deep(.el-input__wrapper) {
  background: transparent;
  box-shadow: none;
  border: none;
}

.search-bar__reset {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.search-bar__reset:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .search-bar {
    padding: 24px;
  }

  .search-bar__main {
    flex-direction: column;
  }

  .search-bar__filters {
    flex-direction: column;
  }

  .search-bar__select,
  .search-bar__date {
    width: 100%;
  }
}
</style>
