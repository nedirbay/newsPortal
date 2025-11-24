<template>
    <div class="news-management">
        <div class="page-actions">
            <el-button type="primary" @click="showCreateDialog">
                <el-icon>
                    <Plus />
                </el-icon>
                Habar Goş
            </el-button>
        </div>

        <el-card class="data-card">
            <el-table :data="newsList" v-loading="loading" stripe>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="title" label="Sözbaşy" min-width="200" />
                <el-table-column prop="author" label="Awtor" width="120" />
                <el-table-column prop="category" label="Kategoriýa" width="120" />
                <el-table-column prop="publishedDate" label="Çap Edilen" width="120" />
                <el-table-column label="Saýlanan" width="100" align="center">
                    <template #default="{ row }">
                        <el-tag :type="row.featured ? 'success' : 'info'" size="small">
                            {{ row.featured ? 'Hawa' : 'Ýok' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Hereketler" width="200" align="center">
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
                <el-form-item label="Sözbaşy" prop="title">
                    <el-input v-model="formData.title" placeholder="Habar sözbaşysyny giriziň" />
                </el-form-item>

                <el-form-item label="Gysgaça Mazmun" prop="summary">
                    <el-input v-model="formData.summary" type="textarea" :rows="2"
                        placeholder="Gysgaça mazmuny giriziň" />
                </el-form-item>

                <el-form-item label="Mazmun" prop="content">
                    <el-input v-model="formData.content" type="textarea" :rows="6" placeholder="Mazmuny giriziň" />
                </el-form-item>

                <el-form-item label="Awtor" prop="author">
                    <el-input v-model="formData.author" placeholder="Awtor adyny giriziň" />
                </el-form-item>

                <el-form-item label="Kategoriýa" prop="category">
                    <el-input v-model="formData.category" placeholder="Kategoriýany giriziň" />
                </el-form-item>

                <el-form-item label="Surat URL" prop="imageUrl">
                    <el-input v-model="formData.imageUrl" placeholder="Surat URL-ni giriziň" />
                </el-form-item>

                <el-form-item label="Tegler">
                    <el-select v-model="formData.tags" multiple filterable allow-create
                        placeholder="Tegleri saýlaň ýa-da dörediň" style="width: 100%">
                        <el-option v-for="tag in availableTags" :key="tag" :label="tag" :value="tag" />
                    </el-select>
                </el-form-item>

                <el-form-item label="Saýlanan">
                    <el-switch v-model="formData.featured" />
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button @click="dialogVisible = false">Ýatyr</el-button>
                <el-button type="primary" @click="handleSubmit" :loading="submitting">
                    {{ isEdit ? 'Täzele' : 'Döret' }}
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
    'Emeli Aň', 'Maşyn Öwreniş', 'Web Ösüşi', 'Mobil', 'Bulut Tehnologiýalary',
    'Howpsuzlyk', 'DevOps', 'Frontend', 'Backend', 'Maglumatlar Bazasy'
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
    title: [{ required: true, message: 'Sözbaşyny giriziň', trigger: 'blur' }],
    content: [{ required: true, message: 'Mazmuny giriziň', trigger: 'blur' }],
    summary: [{ required: true, message: 'Gysgaça mazmuny giriziň', trigger: 'blur' }],
    author: [{ required: true, message: 'Awtory giriziň', trigger: 'blur' }],
    category: [{ required: true, message: 'Kategoriýany giriziň', trigger: 'blur' }],
    imageUrl: [{ required: true, message: 'Surat URL-ni giriziň', trigger: 'blur' }],
}

const dialogTitle = computed(() => isEdit.value ? 'Habary Üýtget' : 'Habar Goş')

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
            ElMessage.error(response.message || 'Habarlary ýükläp bolmady')
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
    formData.summary = news.summary || ''
    formData.author = news.author || ''
    formData.category = news.category || ''
    formData.imageUrl = news.imageUrl || ''
    formData.tags = news.tags ? [...news.tags] : []
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
                    ElMessage.success(isEdit.value ? 'Habar üstünlikli täzelendi' : 'Habar üstünlikli döredildi')
                    dialogVisible.value = false
                    loadNews()
                } else {
                    ElMessage.error(response.message || 'Amal şowsuz boldy')
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
            'Bu habary pozmak isleýändigiňize ynanýarsyňyzmy?',
            'Pozmagy Tassykla',
            {
                confirmButtonText: 'Poz',
                cancelButtonText: 'Ýatyr',
                type: 'warning',
            }
        )

        const response = await adminNewsService.delete(id)
        if (response.success) {
            ElMessage.success('Habar üstünlikli pozuldy')
            loadNews()
        } else {
            ElMessage.error(response.message || 'Pozup bolmady')
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
