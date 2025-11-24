<template>
    <div class="news-management">
        <div class="page-actions">
            <el-button type="primary" @click="showCreateDialog">
                <el-icon>
                    <Plus />
                </el-icon>
                Add News
            </el-button>
        </div>

        <el-card class="data-card">
            <el-table :data="newsList" v-loading="loading" stripe>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="title" label="Title" min-width="200" />
                <el-table-column prop="author" label="Author" width="120" />
                <el-table-column prop="category" label="Category" width="120" />
                <el-table-column prop="publishedDate" label="Published" width="120" />
                <el-table-column label="Featured" width="100" align="center">
                    <template #default="{ row }">
                        <el-tag :type="row.featured ? 'success' : 'info'" size="small">
                            {{ row.featured ? 'Yes' : 'No' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Actions" width="200" align="center">
                    <template #default="{ row }">
                        <el-button size="small" @click="showEditDialog(row)">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(row.id)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- Create/Edit Dialog -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="800px" top="5vh">
            <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="formData.title" placeholder="Enter news title" />
                </el-form-item>

                <el-form-item label="Summary" prop="summary">
                    <el-input v-model="formData.summary" type="textarea" :rows="2" placeholder="Enter summary" />
                </el-form-item>

                <el-form-item label="Content" prop="content">
                    <el-input v-model="formData.content" type="textarea" :rows="6" placeholder="Enter content" />
                </el-form-item>

                <el-form-item label="Author" prop="author">
                    <el-input v-model="formData.author" placeholder="Enter author name" />
                </el-form-item>

                <el-form-item label="Category" prop="category">
                    <el-input v-model="formData.category" placeholder="Enter category" />
                </el-form-item>

                <el-form-item label="Image URL" prop="imageUrl">
                    <el-input v-model="formData.imageUrl" placeholder="Enter image URL" />
                </el-form-item>

                <el-form-item label="Tags">
                    <el-select v-model="formData.tags" multiple filterable allow-create
                        placeholder="Select or create tags" style="width: 100%">
                        <el-option v-for="tag in availableTags" :key="tag" :label="tag" :value="tag" />
                    </el-select>
                </el-form-item>

                <el-form-item label="Featured">
                    <el-switch v-model="formData.featured" />
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleSubmit" :loading="submitting">
                    {{ isEdit ? 'Update' : 'Create' }}
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { adminNewsService } from '@/services/adminService'
import type { NewsArticle, NewsDTO } from '@/types'

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref<number>(0)
const newsList = ref<NewsArticle[]>([])
const formRef = ref<FormInstance>()

const availableTags = ref<string[]>([
    'AI', 'Machine Learning', 'Web Development', 'Mobile', 'Cloud',
    'Security', 'DevOps', 'Frontend', 'Backend', 'Database'
])

const formData = reactive<NewsDTO>({
    title: '',
    content: '',
    summary: '',
    author: '',
    category: '',
    imageUrl: '',
    tags: [],
    featured: false,
})

const rules: FormRules = {
    title: [{ required: true, message: 'Please enter title', trigger: 'blur' }],
    content: [{ required: true, message: 'Please enter content', trigger: 'blur' }],
    summary: [{ required: true, message: 'Please enter summary', trigger: 'blur' }],
    author: [{ required: true, message: 'Please enter author', trigger: 'blur' }],
    category: [{ required: true, message: 'Please enter category', trigger: 'blur' }],
    imageUrl: [{ required: true, message: 'Please enter image URL', trigger: 'blur' }],
}

const dialogTitle = computed(() => isEdit.value ? 'Edit News' : 'Add News')

onMounted(() => {
    loadNews()
})

const loadNews = async () => {
    loading.value = true
    try {
        const response = await adminNewsService.getAll()
        if (response.success) {
            newsList.value = response.data
        } else {
            ElMessage.error(response.message || 'Failed to load news')
        }
    } finally {
        loading.value = false
    }
}

const showCreateDialog = () => {
    isEdit.value = false
    resetForm()
    dialogVisible.value = true
}

const showEditDialog = (news: NewsArticle) => {
    isEdit.value = true
    editId.value = news.id
    formData.title = news.title
    formData.content = news.content
    formData.summary = news.summary
    formData.author = news.author
    formData.category = news.category
    formData.imageUrl = news.imageUrl
    formData.tags = [...news.tags]
    formData.featured = news.featured || false
    dialogVisible.value = true
}

const resetForm = () => {
    formData.title = ''
    formData.content = ''
    formData.summary = ''
    formData.author = ''
    formData.category = ''
    formData.imageUrl = ''
    formData.tags = []
    formData.featured = false
    formRef.value?.clearValidate()
}

const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                const response = isEdit.value
                    ? await adminNewsService.update(editId.value, formData)
                    : await adminNewsService.create(formData)

                if (response.success) {
                    ElMessage.success(isEdit.value ? 'News updated successfully' : 'News created successfully')
                    dialogVisible.value = false
                    loadNews()
                } else {
                    ElMessage.error(response.message || 'Operation failed')
                }
            } finally {
                submitting.value = false
            }
        }
    })
}

const handleDelete = async (id: number) => {
    try {
        await ElMessageBox.confirm(
            'Are you sure you want to delete this news?',
            'Confirm Delete',
            {
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )

        const response = await adminNewsService.delete(id)
        if (response.success) {
            ElMessage.success('News deleted successfully')
            loadNews()
        } else {
            ElMessage.error(response.message || 'Delete failed')
        }
    } catch {
        // User cancelled
    }
}
</script>

<style scoped>
.news-management {
    max-width: 1400px;
}

.page-actions {
    margin-bottom: 24px;
}

.data-card {
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.data-card :deep(.el-card__body) {
    padding: 0;
}

.data-card :deep(.el-table) {
    border-radius: 12px;
}
</style>
