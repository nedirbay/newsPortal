<template>
    <header class="app-header">
        <div class="header-container">
            <!-- Logo -->
            <div class="header-logo" @click="goHome">
                <el-icon class="logo-icon">
                    <Reading />
                </el-icon>
                <span class="logo-text">Tech<span class="logo-highlight">News</span></span>
            </div>

            <!-- Desktop Navigation -->
            <nav class="header-nav desktop-nav">
                <el-menu :default-active="activeRoute" mode="horizontal" :ellipsis="false"
                    background-color="transparent" text-color="#1f2937" active-text-color="#667eea" class="header-menu"
                    @select="handleMenuSelect">
                    <el-menu-item index="/">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>Home</span>
                    </el-menu-item>

                    <el-menu-item index="/categories">
                        <el-icon>
                            <Grid />
                        </el-icon>
                        <span>Categories</span>
                    </el-menu-item>

                    <el-menu-item index="/trending">
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>Trending</span>
                    </el-menu-item>

                    <el-menu-item index="/latest">
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <span>Latest</span>
                    </el-menu-item>
                </el-menu>
            </nav>

            <!-- Search Button -->
            <div class="header-actions">
                <el-button circle class="action-btn search-btn" @click="toggleSearch">
                    <el-icon>
                        <Search />
                    </el-icon>
                </el-button>

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

        <!-- Search Drawer -->
        <el-drawer v-model="searchDrawerVisible" title="Search News" direction="ttb" size="300px" :with-header="false"
            class="search-drawer">
            <div class="search-drawer-content">
                <h3 class="search-drawer-title">
                    <el-icon>
                        <Search />
                    </el-icon>
                    Search Technology News
                </h3>
                <el-input v-model="searchQuery" placeholder="Type to search..." size="large" clearable
                    @keyup.enter="handleSearch" autofocus>
                    <template #prefix>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
                <el-button type="primary" size="large" class="search-submit" @click="handleSearch">
                    Search
                </el-button>
            </div>
        </el-drawer>

        <!-- Mobile Menu Drawer -->
        <el-drawer v-model="mobileMenuVisible" title="Menu" direction="ltr" size="280px" class="mobile-drawer">
            <el-menu :default-active="activeRoute" class="mobile-menu" @select="handleMobileMenuSelect">
                <el-menu-item index="/">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>Home</span>
                </el-menu-item>

                <el-menu-item index="/categories">
                    <el-icon>
                        <Grid />
                    </el-icon>
                    <span>Categories</span>
                </el-menu-item>

                <el-menu-item index="/trending">
                    <el-icon>
                        <TrendCharts />
                    </el-icon>
                    <span>Trending</span>
                </el-menu-item>

                <el-menu-item index="/latest">
                    <el-icon>
                        <Clock />
                    </el-icon>
                    <span>Latest</span>
                </el-menu-item>
            </el-menu>
        </el-drawer>
    </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    Reading,
    House,
    Grid,
    TrendCharts,
    Clock,
    Search,
    Sunny,
    Moon,
    Menu,
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const searchDrawerVisible = ref(false)
const mobileMenuVisible = ref(false)
const searchQuery = ref('')
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

const toggleSearch = () => {
    searchDrawerVisible.value = !searchDrawerVisible.value
}

const toggleMobileMenu = () => {
    mobileMenuVisible.value = !mobileMenuVisible.value
}

const toggleTheme = () => {
    isDark.value = !isDark.value
    console.log('Theme toggled:', isDark.value ? 'dark' : 'light')
}

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push({ path: '/', query: { search: searchQuery.value } })
        searchDrawerVisible.value = false
        searchQuery.value = ''
    }
}
</script>

<style scoped>
.app-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
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

.logo-icon {
    font-size: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.logo-text {
    font-size: 24px;
    font-weight: 800;
    color: #1f2937;
    letter-spacing: -0.5px;
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
}

.header-menu :deep(.el-menu-item) {
    font-weight: 600;
    font-size: 15px;
    border: none !important;
    transition: all 0.3s;
    padding: 0 20px;
}

.header-menu :deep(.el-menu-item:hover) {
    background: rgba(102, 126, 234, 0.08) !important;
    color: #667eea !important;
}

.header-menu :deep(.el-menu-item.is-active) {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-radius: 8px;
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
    background: rgba(102, 126, 234, 0.1);
    border: none;
    color: #667eea;
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

.search-drawer-content {
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.search-drawer-title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.search-drawer-title .el-icon {
    font-size: 28px;
    color: #667eea;
}

.search-submit {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    font-weight: 600;
}

.mobile-menu {
    border: none;
}

.mobile-menu :deep(.el-menu-item) {
    font-weight: 600;
    transition: all 0.3s;
}

.mobile-menu :deep(.el-menu-item.is-active) {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    color: #667eea;
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

:deep(.search-drawer .el-drawer__body) {
    padding: 0;
}

:deep(.mobile-drawer .el-drawer__header) {
    margin-bottom: 0;
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

:deep(.mobile-drawer .el-drawer__title) {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
}
</style>