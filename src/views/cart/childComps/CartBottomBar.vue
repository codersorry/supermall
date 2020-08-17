<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">合计:{{totalPrice}}</div>

    <div class="calculate" @click="calcClick" >去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      //使用 filter 和 reduce 先筛选被选中的数组元素 再筛选被选中元素里面的数据
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength(){
        return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
        if (this.cartList.length === 0 ){
          return false
        }
        return  !this.cartList.find(item => !item.checked)
      // return !(this.cartList.filter(item => !item.checked).length)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll){ //全部选中
         this.cartList.forEach(item => item.checked = false)
      }else{
         this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.cartList.filter(item => item.checked).length){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
};
</script>
<style scoped>
.cart-bottom-bar {
  position: relative;
  display: flex;

  height: 44px;
  line-height: 44px;

  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 90px;
}

.check-button {
  width: 18px;
  height: 18px;
  line-height: 19px;
  margin-right: 5px;
}

.price{
    flex: 1;
}

.calculate{
    width: 90px;
    background-color:  var(--color-tint);
    text-align: center;
    color: #fff;
}
</style>