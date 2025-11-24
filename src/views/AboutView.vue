<template>
  <div class="about-view">
    <div class="about-container">
      <div class="about-header">
        <h1 class="title">TechNews Barada</h1>
        <p class="subtitle">Iň soňky tehnologiýa habarlary we düşünjeleri üçin ynamdar çeşmäňiz.</p>
      </div>

      <div class="content-section">
        <div class="text-content">
          <h2>Biziň Maksadymyz</h2>
          <p>
            TechNews-de biz tehnologiýanyň adamzadyň geljegini şekillendirýändigine ynanýarys. Biziň maksadymyz
            dünýämizi üýtgedýän tehnologiki ösüşler barada takyk, öz wagtynda we çuňňur maglumat bermekdir. Emeli aňdan
            we blokçeýnden başlap, sarp ediş elektronikasy we programma üpjünçiligini ösdürmäge çenli ähli zady öz içine
            alýarys.
          </p>

          <h2>Biz Kim</h2>
          <p>
            Biz size ýokary hilli mazmun hödürlemäge bagyşlanan tehnologiýa höwesjeňleri, işläp düzüjiler we
            žurnalistler toparydyrys. Biz sözbaşylardan aňry geçip, tehnologiýanyň jemgyýete, işewürlige we medeniýete
            täsirini öwrenmäge çalyşýarys.
          </p>

          <h2>Näme Hödürleýäris</h2>
          <ul class="feature-list">
            <li>
              <el-icon>
                <Monitor />
              </el-icon>
              <span>Çuňňur tehniki synlar we seljermeler</span>
            </li>
            <li>
              <el-icon>
                <Cpu />
              </el-icon>
              <span>Iň soňky senagat trendleri we täzelikler</span>
            </li>
            <li>
              <el-icon>
                <Connection />
              </el-icon>
              <span>Işläp düzüjiler üçin gollanmalar we çeşmeler</span>
            </li>
          </ul>
        </div>

        <div class="image-content">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Topar işleýär" class="about-image" />
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
  background: var(--el-bg-color);
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
  color: var(--el-text-color-primary);
  margin-bottom: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 20px;
  color: var(--el-text-color-secondary);
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
  color: var(--el-text-color-primary);
  margin: 40px 0 20px;
}

.text-content h2:first-child {
  margin-top: 0;
}

.text-content p {
  font-size: 18px;
  line-height: 1.8;
  color: var(--el-text-color-regular);
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
  color: var(--el-text-color-regular);
  margin-bottom: 16px;
  padding: 16px;
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  box-shadow: var(--el-box-shadow-light);
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
  box-shadow: var(--el-box-shadow);
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
