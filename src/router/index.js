import Vue from 'vue'
import VueRouter from 'vue-router'

//对相关组件设置懒加载

const Home = () => import ('views/home/Home.vue')
const Category = () => import ('views/category/Category.vue')
const Cart = () => import ('views/cart/Cart.vue')
const Profile = () => import ('views/profile/Profile.vue')
const Detail = () => import ('views/detail/Detail.vue')

//1.安装插件
Vue.use(VueRouter)


//2.创建路由对象
const routes = [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail/:iid',
      component:Detail
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
  })

//3.导出
export default router