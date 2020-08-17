<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <!-- 组件不可以直接进行监听 需要添加native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"
// import BackTop from "components/content/backTop/BackTop";

import GoodsList from "components/content/goods/GoodsList";


import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

//引用better scroll
import Scroll from "components/common/scroll/Scroll";

//引入防抖函数
import { debounce } from "common/utils";
//导入混用
import { itemListenerMixin ,backTopMixin} from "common/mixin";

export default {
  name: "Detail",
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  created() {
    //1.保存传入的 iid
    this.iid = this.$route.params.iid;

    //2.根据 iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.data.result;
      //将数据分离
      //2.1获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      //2.2获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //2.3获取商铺信息
      this.shop = new Shop(data.shopInfo);
      //2.4保存商品详细信息
      this.detailInfo = data.detailInfo;

      //2.5获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //2.6获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.$nextTick(() => {
        //根据最新数据DOM已经被渲染  但是图片依然没有加载完
        //offsetTop的值不对 一般都是因为图片问题
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop - 45);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 45);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 45);
        // console.log(this.themeTopYs);
      });
    });

    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.data.list;
    });

    //4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 45);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 45);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 45);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  // updated() {
  //   //每次更新都把原来的值设为空
  //   this.themeTopYs = []
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //   console.log(this.themeTopYs)
  // },
  methods: {
    imageLoad() {
      // console.log("------");
      // this.$refs.scroll && debounce(this.$refs.scroll.refresh,50)()
      // this.$refs.scroll.refresh();
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position)
      //1.获取 y 值
      const positionY = -position.y;
      //2.positionY和主题中值进行对比 如:[0, 1111, 2222, 3333]
      //positionY在 0-1111之间 index = 0
      //positionY在 1111-2222之间 index = 1
      //positionY在 2222-3333之间 index = 2
      //positionY在 3333之后 index = 3
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex != i &&
          ((i < this.themeTopYs.length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === this.themeTopYs.length - 1 &&
              positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //3.是否显示回到顶部
      //判断显示和隐藏 backTop 组件
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart(){
      //1.获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid
      // product.count = 0
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      //将商品信息加入购物车 不要直接在 Vuex 的state中 push() 添加信息  如: 
      // this.$store.cartList.push(product)  
      //不要直接添加 需要使用Vuex中的 mutations 里面的方法添加
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res,1500)
      })
      
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 54px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>