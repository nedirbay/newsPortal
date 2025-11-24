<template>
    <div class="categories-management">
        <div class="page-actions">
            <el-button type="primary" @click="showCreateDialog">
                <el-icon>
                    <Plus />
                </el-icon>
                Kategoriýa Goş
            </el-button>
        </div>

        <el-card class="data-card">
            <el-table :data="categories" v-loading="loading" stripe>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="name" label="Ady" />
                <el-table-column prop="slug" label="Slug" />
                <el-table-column prop="description" label="Düşündiriş" />
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
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
            <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
                <el-form-item label="Ady" prop="name">
                    <el-input v-model="formData.name" placeholder="Kategoriýa adyny giriziň" />
                </el-form-item>

                <el-form-item label="Slug" prop="slug">
                    <el-input v-model="formData.slug" placeholder="Slug giriziň" />
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
import { adminCategoryService } from '@/services/adminService'
import type { Category, CategoryDTO } from '@/types'

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref<number>(0)
const categories = ref<Category[]>([])
const formRef = ref<FormInstance>()

const formData = reactive<CategoryDTO>({
    name: '',
    slug: '',
    description: '',
})

const rules: FormRules = {
    name: [{ required: true, message: 'Kategoriýa adyny giriziň', trigger: 'blur' }],
    slug: [{ required: true, message: 'Slug giriziň', trigger: 'blur' }],
}

const dialogTitle = computed(() => isEdit.value ? 'Kategoriýany Üýtget' : 'Kategoriýa Goş')

onMounted(() => {
    loadCategories()
})

const loadCategories = async () => {
    loading.value = true
    try {
        const response = await adminCategoryService.getAll()
        if (response.success) {
            categories.value = response.data
        } else {
            ElMessage.error(response.message || 'Kategoriýalary ýükläp bolmady')
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

const showEditDialog = (category: Category) => {
    isEdit.value = true
    editId.value = category.id
    formData.name = category.name
    formData.slug = category.slug
    formData.description = category.description || ''
    dialogVisible.value = true
}

const resetForm = () => {
    formData.name = ''
    formData.slug = ''
    formData.description = ''
    formRef.value?.clearValidate()
}

const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                const response = isEdit.value
                    ? await adminCategoryService.update(editId.value, formData)
                    : await adminCategoryService.create(formData)

                if (response.success) {
                    ElMessage.success(isEdit.value ? 'Kategoriýa üstünlikli täzelendi' : 'Kategoriýa üstünlikli döredildi')
                    dialogVisible.value = false
                    loadCategories()
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
            'Bu kategoriýany pozmak isleýändigiňize ynanýarsyňyzmy?',
            'Pozmagy Tassykla',
            {
                confirmButtonText: 'Poz',
                cancelButtonText: 'Ýatyr',
                type: 'warning',
            }
        )

        const response = await adminCategoryService.delete(id)
        if (response.success) {
            ElMessage.success('Kategoriýa üstünlikli pozuldy')
            loadCategories()
        } else {
            ElMessage.error(response.message || 'Pozup bolmady')
        }
    } catch {
        // User cancelled
    }
}
</script>

<style scoped>
.categories-management {
    max-width: 1200px;
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
