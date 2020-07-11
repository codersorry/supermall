<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll" >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailVavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"

import GoodsList from "components/content/goods/GoodsList"

import { getDetail, Goods, Shop,GoodsParam, getRecommend} from "network/detail";

//引用better scroll
import Scroll from "components/common/scroll/Scroll";

//引入防抖函数
import {debounce} from "common/utils"

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[]
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
    GoodsList
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
      this.detailInfo = data.detailInfo

      //2.5获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //2.6获取评论信息
      if(data.rate.cRate !== 0 ){
        this.commentInfo = data.rate.list[0]
      }

    });

    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.data.list
      
    })
  },
  methods: {
    imageLoad(){
      this.$refs.scroll && debounce(this.$refs.scroll.refresh,50)()
    }
  },
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
  height: calc(100% - 44px);
}

.detail-nav{
  position: relative;
  z-index: 9; 
  background-color: #fff;
}

</style>