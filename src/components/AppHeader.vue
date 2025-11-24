<template>
    <header class="app-header">
        <div class="header-container">
            <!-- Logo -->
            <div class="header-logo" @click="goHome">
                <img src="/logo.png" alt="TehnoHabar" class="logo-image" />
                <span class="logo-text">Tehno<span class="logo-highlight">Habar</span></span>
            </div>

            <!-- Desktop Navigation -->
            <nav class="header-nav desktop-nav">
                <el-menu :default-active="activeRoute" mode="horizontal" :ellipsis="false"
                    background-color="transparent" text-color="var(--el-text-color-primary)" active-text-color="#667eea"
                    class="header-menu" @select="handleMenuSelect">
                    <el-menu-item index="/">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>Baş Sahypa</span>
                    </el-menu-item>

                    <el-menu-item index="/categories">
                        <el-icon>
                            <Grid />
                        </el-icon>
                        <span>Kategoriýalar</span>
                    </el-menu-item>

                    <el-menu-item index="/about">
                        <el-icon>
                            <InfoFilled />
                        </el-icon>
                        <span>Biz Barada</span>
                    </el-menu-item>

                    <el-menu-item index="/contact">
                        <el-icon>
                            <Message />
                        </el-icon>
                        <span>Habarlaşmak</span>
                    </el-menu-item>
                </el-menu>
            </nav>

            <!-- Actions -->
            <div class="header-actions">
                <el-button circle class="action-btn theme-btn" @click="toggleTheme">
                    <el-icon>
                        <Sunny v-if="isDark" />
                        <Moon v-else />
                    </el-icon>
                </el-button>

                <!-- Mobile Menu Button -->
                <el-button circle class="action-btn mobile-menu-btn" @click="toggleMobileMenu">
                    <el-icon>
                        <Menu />
                    </el-icon>
                </el-button>
            </div>
        </div>

        <!-- Mobile Menu Drawer -->
        <el-drawer v-model="mobileMenuVisible" title="Menýu" direction="ltr" size="280px" class="mobile-drawer">
            <el-menu :default-active="activeRoute" class="mobile-menu" @select="handleMobileMenuSelect">
                <el-menu-item index="/">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>Baş Sahypa</span>
                </el-menu-item>

                <el-menu-item index="/categories">
                    <el-icon>
                        <Grid />
                    </el-icon>
                    <span>Kategoriýalar</span>
                </el-menu-item>

                <el-menu-item index="/about">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>Biz Barada</span>
                </el-menu-item>

                <el-menu-item index="/contact">
                    <el-icon>
                        <Message />
                    </el-icon>
                    <span>Habarlaşmak</span>
                </el-menu-item>
            </el-menu>
        </el-drawer>
    </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    House,
    Grid,
    InfoFilled,
    Message,
    Sunny,
    Moon,
    Menu,
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const mobileMenuVisible = ref(false)
const isDark = ref(false)

const activeRoute = computed(() => route.path)

const goHome = () => {
    router.push('/')
}

const handleMenuSelect = (index: string) => {
    router.push(index)
}

const handleMobileMenuSelect = (index: string) => {
    handleMenuSelect(index)
    mobileMenuVisible.value = false
}

const toggleMobileMenu = () => {
    mobileMenuVisible.value = !mobileMenuVisible.value
}

const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
    }
})
</script>

<style scoped>
.app-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--el-bg-color-overlay);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--el-border-color-light);
    box-shadow: var(--el-box-shadow-light);
    transition: background-color 0.3s, border-color 0.3s;
}

.header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
}

.header-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
}

.header-logo:hover {
    transform: translateY(-2px);
}

.logo-image {
    height: 40px;
    width: auto;
    border-radius: 8px;
}

.logo-text {
    font-size: 24px;
    font-weight: 800;
    color: var(--el-text-color-primary);
    letter-spacing: -0.5px;
    transition: color 0.3s;
}

.logo-highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.header-nav {
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0 40px;
}

.header-menu {
    border: none !important;
    background: transparent !important;
}

.header-menu :deep(.el-menu-item) {
    font-weight: 600;
    font-size: 15px;
    border: none !important;
    transition: all 0.3s;
    padding: 0 20px;
    color: var(--el-text-color-primary);
}

.header-menu :deep(.el-menu-item:hover) {
    background: var(--el-fill-color-light) !important;
    color: #667eea !important;
}

.header-menu :deep(.el-menu-item.is-active) {
    background: var(--el-color-primary-light-9) !important;
    border-radius: 8px;
    color: var(--el-color-primary) !important;
}

.header-menu :deep(.el-icon) {
    font-size: 18px;
    margin-right: 8px;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.action-btn {
    background: var(--el-fill-color-light);
    border: none;
    color: var(--el-text-color-regular);
    transition: all 0.3s;
    width: 40px;
    height: 40px;
}

.action-btn:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.mobile-menu-btn {
    display: none;
}

.mobile-menu {
    border: none;
    background: transparent;
}

.mobile-menu :deep(.el-menu-item) {
    font-weight: 600;
    transition: all 0.3s;
    color: var(--el-text-color-primary);
}

.mobile-menu :deep(.el-menu-item.is-active) {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

@media (max-width: 992px) {
    .desktop-nav {
        display: none;
    }

    .mobile-menu-btn {
        display: flex;
    }
}

@media (max-width: 768px) {
    .header-container {
        height: 60px;
        padding: 0 16px;
    }

    .logo-text {
        font-size: 20px;
    }

    .logo-icon {
        font-size: 28px;
    }

    .action-btn {
        width: 36px;
        height: 36px;
    }

    .header-actions {
        gap: 8px;
    }
}

:deep(.mobile-drawer .el-drawer__header) {
    margin-bottom: 0;
    padding: 20px;
    border-bottom: 1px solid var(--el-border-color-light);
}

:deep(.mobile-drawer .el-drawer__title) {
    font-size: 20px;
    font-weight: 700;
    color: var(--el-text-color-primary);
}
</style>