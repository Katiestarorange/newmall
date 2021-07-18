import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/ShopCart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const MyCollection = () => import('views/profile/childComps/MyCollection')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/my-collection',
    component: MyCollection
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/supermall/',
  routes
})

export default router
