<template>
    <div class="admin-layout">
        <!-- Sidebar -->
        <aside class="admin-sidebar">
            <div class="sidebar-header">
                <el-icon class="sidebar-logo">
                    <Reading />
                </el-icon>
                <h2 class="sidebar-title">Admin Paneli</h2>
            </div>

            <el-menu :default-active="activeMenu" class="sidebar-menu" @select="handleMenuSelect">
                <el-menu-item index="/admin/dashboard">
                    <el-icon>
                        <Odometer />
                    </el-icon>
                    <span>Dolandyryş Paneli</span>
                </el-menu-item>

                <el-menu-item index="/admin/categories">
                    <el-icon>
                        <Grid />
                    </el-icon>
                    <span>Kategoriýalar</span>
                </el-menu-item>

                <el-menu-item index="/admin/tags">
                    <el-icon>
                        <PriceTag />
                    </el-icon>
                    <span>Tegler</span>
                </el-menu-item>

                <el-menu-item index="/admin/news">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>Habarlar</span>
                </el-menu-item>
            </el-menu>

            <div class="sidebar-footer">
                <el-button class="logout-btn" @click="handleLogout">
                    <el-icon>
                        <SwitchButton />
                    </el-icon>
                    <span>Çykmak</span>
                </el-button>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="admin-main">
            <!-- Header -->
            <header class="admin-header">
                <div class="header-left">
                    <h1 class="page-title">{{ pageTitle }}</h1>
                </div>
                <div class="header-right">
                    <el-button circle @click="goToHome">
                        <el-icon>
                            <House />
                        </el-icon>
                    </el-button>
                </div>
            </header>

            <!-- Content -->
            <main class="admin-content">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    Reading,
    Odometer,
    Grid,
    PriceTag,
    Document,
    SwitchButton,
    House,
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

const pageTitle = computed(() => {
    const titles: Record<string, string> = {
        '/admin/dashboard': 'Dolandyryş Paneli',
        '/admin/categories': 'Kategoriýalary Dolandyrmak',
        '/admin/tags': 'Tegleri Dolandyrmak',
        '/admin/news': 'Habarlary Dolandyrmak',
    }
    return titles[route.path] || 'Admin Paneli'
})

const handleMenuSelect = (index: string) => {
    router.push(index)
}

const goToHome = () => {
    router.push('/')
}

const handleLogout = async () => {
    try {
        await ElMessageBox.confirm(
            'Çykmak isleýändigiňize ynanýarsyňyzmy?',
            'Çykmagy Tassykla',
            {
                confirmButtonText: 'Çykmak',
                cancelButtonText: 'Ýatyr',
                type: 'warning',
            }
        )

        sessionStorage.removeItem('admin_logged_in')
        ElMessage.success('Üstünlikli çykyldy')
        router.push('/admin/login')
    } catch {
        // User cancelled
    }
}
</script>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    background: #f5f7fa;
}

.admin-sidebar {
    width: 260px;
    background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
}

.sidebar-header {
    padding: 32px 24px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logo {
    font-size: 48px;
    color: #667eea;
    margin-bottom: 12px;
}

.sidebar-title {
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin: 0;
}

.sidebar-menu {
    flex: 1;
    border: none;
    background: transparent;
    padding: 16px 0;
}

.sidebar-menu :deep(.el-menu-item) {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    margin: 4px 16px;
    border-radius: 8px;
    transition: all 0.3s;
}

.sidebar-menu :deep(.el-menu-item:hover) {
    background: rgba(102, 126, 234, 0.2);
    color: white;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.sidebar-menu :deep(.el-icon) {
    font-size: 20px;
    margin-right: 12px;
}

.sidebar-footer {
    padding: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
    width: 100%;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
    font-weight: 600;
}

.logout-btn:hover {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
}

.admin-main {
    flex: 1;
    margin-left: 260px;
    display: flex;
    flex-direction: column;
}

.admin-header {
    background: white;
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 100;
}

.page-title {
    font-size: 28px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
}

.admin-content {
    flex: 1;
    padding: 32px;
}

@media (max-width: 992px) {
    .admin-sidebar {
        transform: translateX(-100%);
    }

    .admin-main {
        margin-left: 0;
    }
}
</style>
