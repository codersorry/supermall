<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>

        <!-- 商品列表 -->
        <scroll class="content" ref="scroll">
            <cart-list/>
        </scroll>
        
        <!-- 底部汇总 -->
        <cart-bottom-bar/>
    </div>
</template>>

<script>

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
    name:'Cart',
    components:{
        NavBar,
        CartList,
        Scroll,
        CartBottomBar
    },
    computed: {
        // cartLength(){
        //     return this.$store.getters.cartLength
        // }
        ...mapGetters(['cartLength'])
    },
    activated() {
        console.log('-----')
        this.$refs.scroll.refresh()
    },
}
</script>

<style scoped>

.cart{
    height: 100vh;
}

.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
}

.content{
    height: calc(100% - 44px - 98px );
    overflow: hidden;
}
  
</style>>