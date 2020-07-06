<template>
    <div id="hone">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners='banners' />
        <recommend-view :recommends='recommends' />
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
//导入网络请求的的home.js模块
import {getHomeMultidata} from 'network/home.js'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        RecommendView
    },
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    //组件创建完毕后会发送网络请求 请求相关数据
    created(){
        //1.请求多个数据
        getHomeMultidata().then(res => {
            this.banners=res.data.data.banner.list;
            this.recommends=res.data.data.recommend.list;
            console.log(res);
            
        })
    }
}
</script>

<style scoped>

.home-nav {
    color: #ffffff;
    background-color: hotpink;
}

</style>