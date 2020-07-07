<template>
  <div class="wrapper">
    <ul class="content">
      <li>
        <button @click="btnClick">按钮</button>
      </li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
      <li>111111</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  created() {
    //created里面不能拿DOM对象 因为DOM组件还未被加载
  },
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true
    });

    this.scroll.on("scroll", position => {
      console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
  methods: {
    btnClick() {
      console.log("======");
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: pink;
  height: 150px;

  overflow: hidden;
}
</style>