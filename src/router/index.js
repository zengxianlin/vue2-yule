import Vue from 'vue'
import Router from 'vue-router'
import Home from './../component/home.vue'
import Briefed from './../component/briefed.vue'

import My from './../component/my.vue'
import Personal from './../component/my/personal.vue'
import Revisions from './../component/my/revisions.vue'

import Leisure from './../component/leisure.vue'
import Recreation from './../component/leisure/recreation.vue'
import Musiclist from './../component/leisure/musiclist.vue'
import movieDetails from './../component/leisure/movieDetails.vue'
import filmDetails from './../component/leisure/filmDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/briefed',
      name: 'briefed',
      component: Briefed
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      children: [
          {
              path: '/',
              name: 'personal',
              component:Personal
          },
          {
              path: '/my/revisions',
              name: 'revisions',
              component:Revisions
          }
      ]
    },
    {
      path: '/leisure',
      name: 'leisure',
      component: Leisure,
      children: [
          {
              path: '/leisure',
              name: 'recreation',
              component:Recreation
          },
          {
              path: '/leisure/:id',
              name: 'recreation',
              component:Recreation
          },
          {
              path: '/leisure/musiclist/:id',
              name: 'musiclist',
              component:Musiclist
          },
          {
              path: '/leisure/movieDetails/:id',
              name: 'movieDetails',
              component:movieDetails
          },
          {
              path: '/leisure/filmDetails/:id',
              name: 'filmDetails',
              component:filmDetails
          }
          // {
          //     path: '/sureMusic',
          //     name: '/sureMusic',
          //     component:Music
          // },
          // {
          //     path: '/sureVideo',
          //     name: 'sureVideo',
          //     component:Video
          // }
      ]
    },
    {
      path: '*',
      redirect: 'home'
    }
  ]
})