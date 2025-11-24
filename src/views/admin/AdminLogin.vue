<template>
    <div class="admin-login">
        <div class="login-container">
            <div class="login-card">
                <div class="login-header">
                    <el-icon class="login-icon">
                        <Lock />
                    </el-icon>
                    <h1 class="login-title">Admin Paneli</h1>
                    <p class="login-subtitle">Mazmuny dolandyrmak üçin giriň</p>
                </div>

                <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form"
                    @submit.prevent="handleLogin">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="Ulanyjy ady" size="large"
                            :prefix-icon="User" />
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="Açar sözi" size="large"
                            :prefix-icon="Lock" show-password @keyup.enter="handleLogin" />
                    </el-form-item>

                    <el-button type="primary" size="large" class="login-button" :loading="loading" @click="handleLogin">
                        <span v-if="!loading">Içeri Gir</span>
                        <span v-else>Girilýär...</span>
                    </el-button>
                </el-form>

                <div class="login-footer">
                    <p class="hint-text">Bellenen maglumatlar: admin / admin</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { LoginRequest } from '@/types'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive<LoginRequest>({
    username: '',
    password: '',
})

const rules: FormRules = {
    username: [
        { required: true, message: 'Ulanyjy adyny giriziň', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Açar sözüni giriziň', trigger: 'blur' },
    ],
}

const handleLogin = async () => {
    if (!loginFormRef.value) return

    await loginFormRef.value.validate(async (valid) => {
        if (valid) {
            loading.value = true
            try {
                if (loginForm.username === 'admin' && loginForm.password === 'admin') {
                    sessionStorage.setItem('admin_logged_in', 'true')
                    ElMessage.success('Üstünlikli girildi!')
                    router.push('/admin/dashboard')
                } else {
                    ElMessage.error('Nädogry maglumatlar')
                }
            } catch (error) {
                ElMessage.error('Giriş wagtynda ýalňyşlyk ýüze çykdy')
            } finally {
                loading.value = false
            }
        }
    })
}
</script>

<style scoped>
.admin-login {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
}

.admin-login::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
    opacity: 0.3;
}

.login-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 450px;
    padding: 20px;
}

.login-card {
    background: white;
    border-radius: 24px;
    padding: 48px 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
}

.login-icon {
    font-size: 64px;
    color: #667eea;
    margin-bottom: 16px;
}

.login-title {
    font-size: 32px;
    font-weight: 800;
    color: #1f2937;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.login-subtitle {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
}

.login-form {
    margin-bottom: 24px;
}

.login-form :deep(.el-form-item) {
    margin-bottom: 24px;
}

.login-form :deep(.el-input__wrapper) {
    border-radius: 12px;
    padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.login-form :deep(.el-input__wrapper:hover),
.login-form :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.login-button {
    width: 100%;
    height: 50px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    transition: all 0.3s;
}

.login-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.login-footer {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.hint-text {
    font-size: 14px;
    color: #9ca3af;
    margin: 0;
}

@media (max-width: 768px) {
    .login-card {
        padding: 32px 24px;
    }

    .login-title {
        font-size: 28px;
    }

    .login-icon {
        font-size: 48px;
    }
}
</style>
