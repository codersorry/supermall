<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from './CartListItem'

export default {
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  components:{
    CartListItem
  }
};
</script>
<style scoped>
</style>