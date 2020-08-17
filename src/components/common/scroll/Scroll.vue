<!-- ref定义在组件中拿到的是组件对象 定义在单个元素中拿到的是单个元素对线  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    //用于判断是否要实时监听滚动
    probeType: {
      type: Number,
      default: 0
    },
    //用于判断是否要启用上拉事件
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //控制类似于div这些元素的点击事件
      click: true,
      //根据传入的值决定要不要滚动监听 0,1不监听 2监听但不监听惯性滚动 3监听所有滚动
      probeType: this.probeType,
      //动态决定要不要启用上拉事件
      pullUpLoad: this.pullUpLoad
    });

    //2.监听滚动区域
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        //发出一个自定义事件 将position的信息传出到父组件
        this.$emit("scroll", position);
      });
    }

    //3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉加载更多');
        this.$emit("pullingup");
      });
    }
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //继续进行下一次上拉加载更多的函数
    finishPullUp() {
      this.scroll&& this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log('Refresh被调用');
      
    },
    //完成下拉操作 以便下一次下拉操作
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>
<style scoped>
</style>