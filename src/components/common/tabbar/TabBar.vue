<template>
    <div id="nav">
      <div id="tab-bar">
          <slot></slot>
      </div>
    </div>
</template>>

<script>
export default {
    name:'TabBar'
}
</script>

<style scoped>
 #tab-bar{
    display: flex;
    background-color: #f2f2f2;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;

    box-shadow: 0px -3px 1px rgba(99, 99, 99, .3);
  }

  
</style>>