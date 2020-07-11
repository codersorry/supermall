<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick1" class="tab-control" v-show="isTabFixed"/>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingup="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick1" />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 组件不可以直接进行监听 需要添加native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

//导入网络请求的的home.js模块
import { getHomeMultidata, getHomeGoods } from "network/home.js";

//导入防抖函数
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    };
  },
  //组件创建完毕后会发送网络请求 请求相关数据
  created() {
    //一般created里面只写主要逻辑 具体函数逻辑可以封装methods里面
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //3.监听item中的图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      this.$refs.scroll && refresh();
    });

  },
  destroyed() {
    console.log('home destroyed')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 100)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /*
        网络请求相关方法
    */

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // console.log(res);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //push(...)的形式相当于是对 res.data.list这个数组的解构，
        //因为push()里面是不可以直接传入数组的 需要拿到数组里面的元素，
        //然后一个一个进行push()，如下遍历依次传入：
        // for (let n of res.data.list){
        //  this.goods[type].list.push(n)
        // }
        this.goods[type].list.push(...res.data.data.list);
        //每次push()一组数据 page 也要相应的 +1
        this.goods[type].page += 1;
        //完成该次下拉加载更多 以便进行下次的下拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    /*
        事件监听相关方法
    */
    tabClick1(index) {
      //根据index动态的决定展示 pop new sell 三者的不同请求内容
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log('return top');
      this.$refs.scroll.scrollTo(0, 0,500);
    },
    contentScroll(position) {
      //1.判断显示和隐藏 backTop 组件
      this.isShowBackTop = -position.y > 1000;

      //2.决定tabControl是否吸顶 (position :fixed)
      this.isTabFixed = -(position.y)> this.tabOffsetTop;
    },
    loadMore() {
      // console.log("加载更多");
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
.home-nav {
  color: #ffffff;
  background-color: hotpink;

  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9; */
}

#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.content {
  /* height: 500px;
  overflow: hidden;
  height: calc(100% - 54px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position: relative;
  z-index: 9;
}
</style>