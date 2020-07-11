<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          @click="titleClick(index)"
          :class="{active:index===currentIndex}"
          class="title-item"
          v-for="(item,index) in titles"
          :key="index"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailBavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },

  components: {
    NavBar
  },

  computed: {},

  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.title {
  display: flex;
  font-size: 15px;
}

.title-item {
  flex: 1px;
}

.active {
  color: hotpink;
}

.back {
  margin-top: 8px;
}
</style>