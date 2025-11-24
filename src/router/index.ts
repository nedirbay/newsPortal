import { createRouter, createWebHistory } from 'vue-router'
import NewsListView from '../views/NewsListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'news-list',
      component: NewsListView,
      meta: {
        title: 'Technology News Portal',
      },
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: () => import('../views/NewsDetailView.vue'),
      meta: {
        title: 'News Article',
      },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue'),
      meta: {
        title: 'Browse Categories',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About Us',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact Us',
      },
    },
    // Admin routes
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/AdminLogin.vue'),
      meta: {
        title: 'Admin Login',
      },
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../views/admin/AdminDashboard.vue'),
          meta: {
            title: 'Admin Dashboard',
            requiresAuth: true,
          },
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('../views/admin/CategoriesManagement.vue'),
          meta: {
            title: 'Manage Categories',
            requiresAuth: true,
          },
        },
        {
          path: 'tags',
          name: 'admin-tags',
          component: () => import('../views/admin/TagsManagement.vue'),
          meta: {
            title: 'Manage Tags',
            requiresAuth: true,
          },
        },
        {
          path: 'news',
          name: 'admin-news',
          component: () => import('../views/admin/NewsManagement.vue'),
          meta: {
            title: 'Manage News',
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})

// Navigation guard for page titles and authentication
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Technology News Portal'

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in')
    if (!isLoggedIn) {
      next('/admin/login')
      return
    }
  }

  next()
})

export default router
