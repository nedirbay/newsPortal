<template>
  <div class="comment-section">
    <div class="comment-section__header">
      <h3 class="comment-section__title">
        <el-icon>
          <ChatDotRound />
        </el-icon>
        Teswirler ({{ comments.length }})
      </h3>
    </div>

    <!-- Comment Form -->
    <div class="comment-form">
      <el-input v-model="newComment.author" placeholder="Adyňyz" class="comment-form__input" size="large">
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>

      <el-input v-model="newComment.content" type="textarea" :rows="4" placeholder="Pikirleriňizi paýlaşyň..."
        class="comment-form__textarea" maxlength="500" show-word-limit />

      <el-button type="primary" size="large" class="comment-form__submit" :loading="submitting" @click="handleSubmit">
        <el-icon>
          <Position />
        </el-icon>
        Teswir goý
      </el-button>
    </div>

    <!-- Comments List -->
    <div class="comments-list">
      <el-empty v-if="comments.length === 0" description="Heniz teswir ýok. Ilkinji teswir ýazan boluň!"
        :image-size="120" />

      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-item__avatar">
          <el-avatar :size="48">
            {{ comment.author.charAt(0).toUpperCase() }}
          </el-avatar>
        </div>

        <div class="comment-item__content">
          <div class="comment-item__header">
            <span class="comment-item__author">{{ comment.author }}</span>
            <span class="comment-item__date">{{ formatDate(comment.createdDate) }}</span>
          </div>

          <p class="comment-item__text">{{ comment.content }}</p>

          <div class="comment-item__actions">
            <el-button text size="small" @click="handleLike(comment.id)">
              <el-icon>
                <ChatDotRound />
              </el-icon>
              {{ comment.likes }} Halanlar
            </el-button>

            <el-button text size="small" @click="handleReply(comment.id)">
              <el-icon>
                <ChatLineRound />
              </el-icon>
              Jogap ber
            </el-button>

            <el-button text size="small" type="danger" @click="handleDelete(comment.id)">
              <el-icon>
                <Delete />
              </el-icon>
              Poz
            </el-button>
          </div>

          <!-- Replies -->
          <div v-if="comment.replies && comment.replies.length > 0" class="comment-replies">
            <div v-for="reply in comment.replies" :key="reply.id" class="comment-item comment-item--reply">
              <div class="comment-item__avatar">
                <el-avatar :size="36">
                  {{ reply.author.charAt(0).toUpperCase() }}
                </el-avatar>
              </div>

              <div class="comment-item__content">
                <div class="comment-item__header">
                  <span class="comment-item__author">{{ reply.author }}</span>
                  <span class="comment-item__date">{{ formatDate(reply.createdDate) }}</span>
                </div>

                <p class="comment-item__text">{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ChatDotRound,
  User,
  Position,
  ChatLineRound,
  Delete
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Comment, CommentDTO } from '@/types'
import { commentService } from '@/services/api'

interface Props {
  newsId: number | string
}

const props = defineProps<Props>()

const comments = ref<Comment[]>([])
const submitting = ref(false)
const newComment = ref<CommentDTO>({
  author: '',
  content: '',
})

onMounted(async () => {
  await loadComments()
})

const loadComments = async () => {
  try {
    const response = await commentService.getComments(props.newsId)
    if (response.success) {
      comments.value = response.data
    }
  } catch (error) {
    console.error('Failed to load comments:', error)
    ElMessage.error('Teswirleri ýükläp bolmady')
  }
}

const handleSubmit = async () => {
  if (!newComment.value.author || !newComment.value.content) {
    ElMessage.warning('Ähli meýdançalary dolduryň')
    return
  }

  submitting.value = true
  try {
    const response = await commentService.createComment(props.newsId, newComment.value)
    if (response.success) {
      ElMessage.success('Teswir üstünlikli goýuldy!')
      newComment.value = { author: '', content: '' }
      await loadComments()
    }
  } catch (error) {
    console.error('Failed to post comment:', error)
    ElMessage.error('Teswir goýup bolmady')
  } finally {
    submitting.value = false
  }
}

const handleLike = (commentId: number) => {
  // Implement like functionality
  ElMessage.info('Halamak funksiýasy ýakynda goşular')
}

const handleReply = (commentId: number) => {
  // Implement reply functionality
  ElMessage.info('Jogap bermek funksiýasy ýakynda goşular')
}

const handleDelete = async (commentId: number) => {
  try {
    await ElMessageBox.confirm(
      'Bu teswiri pozmak isleýärsiňizmi?',
      'Duýduryş',
      {
        confirmButtonText: 'Poz',
        cancelButtonText: 'Ýatyr',
        type: 'warning',
      }
    )

    const response = await commentService.deleteComment(props.newsId, commentId)
    if (response.success) {
      ElMessage.success('Teswir üstünlikli pozuldy')
      await loadComments()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete comment:', error)
      ElMessage.error('Teswiri pozup bolmady')
    }
  }
}

const formatDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'Şu wagt'
  if (minutes < 60) return `${minutes} minut öň`
  if (hours < 24) return `${hours} sagat öň`
  if (days < 7) return `${days} gün öň`

  return d.toLocaleDateString('tk-TM', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<style scoped>
.comment-section {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.comment-section__header {
  margin-bottom: 32px;
}

.comment-section__title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.comment-section__title .el-icon {
  font-size: 28px;
  color: #667eea;
}

.comment-form {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.comment-form__input {
  margin-bottom: 16px;
}

.comment-form__input :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.comment-form__textarea {
  margin-bottom: 16px;
}

.comment-form__textarea :deep(.el-textarea__inner) {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-size: 15px;
  line-height: 1.6;
}

.comment-form__submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s;
}

.comment-form__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 16px;
  transition: all 0.3s;
}

.comment-item:hover {
  background: #f3f4f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.comment-item--reply {
  background: white;
  border: 1px solid #e5e7eb;
}

.comment-item__avatar {
  flex-shrink: 0;
}

.comment-item__content {
  flex: 1;
}

.comment-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comment-item__author {
  font-weight: 600;
  color: #1f2937;
  font-size: 15px;
}

.comment-item__date {
  font-size: 13px;
  color: #9ca3af;
}

.comment-item__text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 12px 0;
  font-size: 15px;
}

.comment-item__actions {
  display: flex;
  gap: 8px;
}

.comment-replies {
  margin-top: 16px;
  padding-left: 16px;
  border-left: 3px solid #667eea;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 768px) {
  .comment-section {
    padding: 20px;
  }

  .comment-form {
    padding: 16px;
  }

  .comment-item {
    padding: 16px;
  }
}
</style>
