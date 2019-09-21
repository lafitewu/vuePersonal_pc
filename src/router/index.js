import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../pages/home.vue'], resolve)
    },
    {
      path: '/project',
      name: 'project',
      component: resolve => require(['../pages/project.vue'], resolve)
    },
    {
      path: '/project_details',
      name: 'project_details',
      component: resolve => require(['../pages/project_details.vue'], resolve)
    },
    {
      path: '/other',
      name: 'other',
      component: resolve => require(['../pages/other.vue'], resolve)
    },
    {
      path: '/file',
      name: 'file',
      component: resolve => require(['../pages/file.vue'], resolve)
    },
    {
      path: '/upload',
      name: 'upload',
      component: resolve => require(['../pages/upload.vue'], resolve)
    }
  ]
})
