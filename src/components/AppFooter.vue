<template>
    <footer class="app-footer">
        <div class="footer-container">
            <!-- Footer Top -->
            <div class="footer-top">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <el-icon class="logo-icon">
                            <Reading />
                        </el-icon>
                        <span class="logo-text">Tech<span class="logo-highlight">News</span></span>
                    </div>
                    <p class="footer-description">
                        Your trusted source for the latest technology news, trends, and innovations.
                        Stay informed, stay ahead.
                    </p>
                    <div class="footer-social">
                        <el-button circle class="social-btn">
                            <el-icon>
                                <Share />
                            </el-icon>
                        </el-button>
                        <el-button circle class="social-btn">
                            <el-icon>
                                <Share />
                            </el-icon>
                        </el-button>
                        <el-button circle class="social-btn">
                            <el-icon>
                                <Share />
                            </el-icon>
                        </el-button>
                        <el-button circle class="social-btn">
                            <el-icon>
                                <Share />
                            </el-icon>
                        </el-button>
                    </div>
                </div>

                <div class="footer-links">
                    <div class="footer-column">
                        <h4 class="footer-title">Categories</h4>
                        <ul class="footer-list">
                            <li><a href="#" class="footer-link">Artificial Intelligence</a></li>
                            <li><a href="#" class="footer-link">Web Development</a></li>
                            <li><a href="#" class="footer-link">Mobile</a></li>
                            <li><a href="#" class="footer-link">Cloud Computing</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4 class="footer-title">Quick Links</h4>
                        <ul class="footer-list">
                            <li><a href="#" class="footer-link">About Us</a></li>
                            <li><a href="#" class="footer-link">Contact</a></li>
                            <li><a href="#" class="footer-link">Privacy Policy</a></li>
                            <li><a href="#" class="footer-link">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4 class="footer-title">Newsletter</h4>
                        <p class="newsletter-text">Subscribe to get the latest tech news delivered to your inbox.</p>
                        <div class="newsletter-form">
                            <el-input v-model="email" placeholder="Enter your email" class="newsletter-input">
                                <template #suffix>
                                    <el-button type="primary" :icon="Position" circle @click="handleSubscribe" />
                                </template>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p class="copyright">
                    © {{ currentYear }} TechNews. All rights reserved. Built with ❤️ using Vue 3 & Element Plus
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Reading, Share, Position } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const email = ref('')
const currentYear = computed(() => new Date().getFullYear())

const handleSubscribe = () => {
    if (!email.value) {
        ElMessage.warning('Please enter your email')
        return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        ElMessage.error('Please enter a valid email address')
        return
    }

    ElMessage.success('Successfully subscribed to newsletter!')
    email.value = ''
}
</script>

<style scoped>
.app-footer {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    color: rgba(255, 255, 255, 0.8);
    margin-top: auto;
}

.footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 60px 20px 20px;
}

.footer-top {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: 60px;
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 12px;
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
    color: white;
    letter-spacing: -0.5px;
}

.logo-highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.footer-description {
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
}

.footer-social {
    display: flex;
    gap: 12px;
}

.social-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    transition: all 0.3s;
}

.social-btn:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: transparent;
    transform: translateY(-2px);
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}

.footer-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer-title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s;
    display: inline-block;
}

.footer-link:hover {
    color: #667eea;
    transform: translateX(4px);
}

.newsletter-text {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0;
}

.newsletter-form {
    margin-top: 8px;
}

.newsletter-input :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: none;
}

.newsletter-input :deep(.el-input__inner) {
    color: white;
}

.newsletter-input :deep(.el-input__inner::placeholder) {
    color: rgba(255, 255, 255, 0.5);
}

.newsletter-input :deep(.el-button) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
}

.copyright {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
}

@media (max-width: 992px) {
    .footer-top {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .footer-links {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .footer-container {
        padding: 40px 16px 16px;
    }

    .footer-links {
        grid-template-columns: 1fr;
        gap: 32px;
    }

    .footer-social {
        flex-wrap: wrap;
    }
}
</style>
