<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.check-button {
  border-radius: 50%;
  border: 1px solid #aaa;
}

.check {
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}

.check-button img{
  padding: 2px;
  width: 14px;
  height: 14px;
}
</style>