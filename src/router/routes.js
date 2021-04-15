
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('pages/Index.vue'),
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
