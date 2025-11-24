<template>
    <div class="tags-management">
        <div class="page-actions">
            <el-button type="primary" @click="showCreateDialog">
                <el-icon>
                    <Plus />
                </el-icon>
                Add Tag
            </el-button>
        </div>

        <el-card class="data-card">
            <el-table :data="tags" v-loading="loading" stripe>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="name" label="Name" />
                <el-table-column prop="slug" label="Slug" />
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
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
            <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
                <el-form-item label="Name" prop="name">
                    <el-input v-model="formData.name" placeholder="Enter tag name" />
                </el-form-item>

                <el-form-item label="Slug" prop="slug">
                    <el-input v-model="formData.slug" placeholder="Enter slug" />
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
import { adminTagService } from '@/services/adminService'
import type { Tag, TagDTO } from '@/types'

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref<number>(0)
const tags = ref<Tag[]>([])
const formRef = ref<FormInstance>()

const formData = reactive<TagDTO>({
    name: '',
    slug: '',
})

const rules: FormRules = {
    name: [{ required: true, message: 'Please enter tag name', trigger: 'blur' }],
    slug: [{ required: true, message: 'Please enter slug', trigger: 'blur' }],
}

const dialogTitle = computed(() => isEdit.value ? 'Edit Tag' : 'Add Tag')

onMounted(() => {
    loadTags()
})

const loadTags = async () => {
    loading.value = true
    try {
        const response = await adminTagService.getAll()
        if (response.success) {
            tags.value = response.data
        } else {
            ElMessage.error(response.message || 'Failed to load tags')
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

const showEditDialog = (tag: Tag) => {
    isEdit.value = true
    editId.value = tag.id
    formData.name = tag.name
    formData.slug = tag.slug
    dialogVisible.value = true
}

const resetForm = () => {
    formData.name = ''
    formData.slug = ''
    formRef.value?.clearValidate()
}

const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                const response = isEdit.value
                    ? await adminTagService.update(editId.value, formData)
                    : await adminTagService.create(formData)

                if (response.success) {
                    ElMessage.success(isEdit.value ? 'Tag updated successfully' : 'Tag created successfully')
                    dialogVisible.value = false
                    loadTags()
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
            'Are you sure you want to delete this tag?',
            'Confirm Delete',
            {
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )

        const response = await adminTagService.delete(id)
        if (response.success) {
            ElMessage.success('Tag deleted successfully')
            loadTags()
        } else {
            ElMessage.error(response.message || 'Delete failed')
        }
    } catch {
        // User cancelled
    }
}
</script>

<style scoped>
.tags-management {
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
