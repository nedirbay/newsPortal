<template>
  <div class="about-view">
    <div class="about-container">
      <div class="about-header">
        <h1 class="title">About TechNews</h1>
        <p class="subtitle">Your trusted source for the latest technology news and insights.</p>
      </div>

      <div class="content-section">
        <div class="text-content">
          <h2>Our Mission</h2>
          <p>
            At TechNews, we believe that technology is shaping the future of humanity. Our mission is to provide
            accurate, timely, and insightful coverage of the technological advancements that are changing our world.
            From artificial intelligence and blockchain to consumer electronics and software development, we cover it
            all.
          </p>

          <h2>Who We Are</h2>
          <p>
            We are a team of passionate tech enthusiasts, developers, and journalists dedicated to bringing you
            high-quality content. We strive to go beyond the headlines and explore the impact of technology on society,
            business, and culture.
          </p>

          <h2>What We Offer</h2>
          <ul class="feature-list">
            <li>
              <el-icon>
                <Monitor />
              </el-icon>
              <span>In-depth tech reviews and analysis</span>
            </li>
            <li>
              <el-icon>
                <Cpu />
              </el-icon>
              <span>Latest industry trends and updates</span>
            </li>
            <li>
              <el-icon>
                <Connection />
              </el-icon>
              <span>Developer tutorials and resources</span>
            </li>
          </ul>
        </div>

        <div class="image-content">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Team working" class="about-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Cpu, Connection } from '@element-plus/icons-vue'
</script>

<style scoped>
.about-view {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  padding: 60px 20px;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 80px;
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
  max-width: 600px;
  margin: 0 auto;
}

.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.text-content h2 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 40px 0 20px;
}

.text-content h2:first-child {
  margin-top: 0;
}

.text-content p {
  font-size: 18px;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 24px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-top: 32px;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  color: #374151;
  margin-bottom: 16px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.feature-list li:hover {
  transform: translateX(10px);
}

.feature-list .el-icon {
  font-size: 24px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 12px;
  border-radius: 50%;
  box-sizing: content-box;
}

.about-image {
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.about-image:hover {
  transform: scale(1.02);
}

@media (max-width: 992px) {
  .content-section {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .title {
    font-size: 36px;
  }
}
</style>
