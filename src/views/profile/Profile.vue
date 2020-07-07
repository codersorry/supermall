<template>
    <div class="wrapper">
        <scroll class="content" :probe-type="3">
            <ul>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
            <li>222222</li>
        </ul>
        </scroll>
    </div>
</template>

<script>

import Scroll from "components/common/scroll/Scroll"

export default {
    name:'Profile',
    components:{
        Scroll
    }
}
</script>

<style scoped>

.content{
    height: 300px;
    overflow: hidden;
    background-color: pink;
}

</style>