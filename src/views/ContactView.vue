<template>
    <div class="contact-view">
        <div class="contact-container">
            <div class="contact-header">
                <h1 class="title">Get in Touch</h1>
                <p class="subtitle">Have questions or suggestions? We'd love to hear from you.</p>
            </div>

            <div class="contact-grid">
                <!-- Contact Info -->
                <div class="contact-info">
                    <div class="info-card">
                        <div class="icon-wrapper">
                            <el-icon>
                                <Location />
                            </el-icon>
                        </div>
                        <h3>Visit Us</h3>
                        <p>123 Tech Avenue<br />Silicon Valley, CA 94025</p>
                    </div>

                    <div class="info-card">
                        <div class="icon-wrapper">
                            <el-icon>
                                <Message />
                            </el-icon>
                        </div>
                        <h3>Email Us</h3>
                        <p>contact@technews.com<br />support@technews.com</p>
                    </div>

                    <div class="info-card">
                        <div class="icon-wrapper">
                            <el-icon>
                                <Phone />
                            </el-icon>
                        </div>
                        <h3>Call Us</h3>
                        <p>+1 (555) 123-4567<br />Mon-Fri, 9am-6pm PST</p>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="contact-form-wrapper">
                    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="contact-form">
                        <el-form-item label="Name" prop="name">
                            <el-input v-model="form.name" placeholder="Your name" size="large" />
                        </el-form-item>

                        <el-form-item label="Email" prop="email">
                            <el-input v-model="form.email" placeholder="Your email" size="large" />
                        </el-form-item>

                        <el-form-item label="Subject" prop="subject">
                            <el-input v-model="form.subject" placeholder="Subject" size="large" />
                        </el-form-item>

                        <el-form-item label="Message" prop="message">
                            <el-input v-model="form.message" type="textarea" :rows="5" placeholder="Your message"
                                size="large" />
                        </el-form-item>

                        <el-button type="primary" size="large" class="submit-btn" @click="submitForm"
                            :loading="loading">
                            Send Message
                        </el-button>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Location, Message, Phone } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: 'Please input your name', trigger: 'blur' },
        { min: 3, message: 'Length should be at least 3 characters', trigger: 'blur' }
    ],
    email: [
        { required: true, message: 'Please input your email', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
    ],
    subject: [
        { required: true, message: 'Please input subject', trigger: 'blur' }
    ],
    message: [
        { required: true, message: 'Please input message', trigger: 'blur' }
    ]
})

const submitForm = async () => {
    if (!formRef.value) return

    await formRef.value.validate((valid) => {
        if (valid) {
            loading.value = true
            // Simulate API call
            setTimeout(() => {
                loading.value = false
                ElMessage.success('Message sent successfully! We will get back to you soon.')
                formRef.value?.resetFields()
            }, 1500)
        }
    })
}
</script>

<style scoped>
.contact-view {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
    padding: 60px 20px;
}

.contact-container {
    max-width: 1200px;
    margin: 0 auto;
}

.contact-header {
    text-align: center;
    margin-bottom: 60px;
}

.title {
    font-size: 48px;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    font-size: 20px;
    color: #6b7280;
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 40px;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.info-card {
    background: white;
    padding: 32px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.3s;
}

.info-card:hover {
    transform: translateY(-5px);
}

.icon-wrapper {
    width: 60px;
    height: 60px;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.icon-wrapper .el-icon {
    font-size: 28px;
    color: #667eea;
}

.info-card h3 {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
}

.info-card p {
    color: #6b7280;
    line-height: 1.6;
}

.contact-form-wrapper {
    background: white;
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    font-weight: 600;
    margin-top: 20px;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (max-width: 992px) {
    .contact-grid {
        grid-template-columns: 1fr;
    }

    .contact-info {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .info-card {
        flex: 1;
        min-width: 250px;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 36px;
    }

    .contact-form-wrapper {
        padding: 24px;
    }
}
</style>
