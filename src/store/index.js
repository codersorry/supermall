import Vue from 'vue'
import Vuex from 'vuex'

//引入 mutations 模块
import mutations from './mutations'
//引入actions 模块
import actions from './actions'

import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建 store 对象

//state 也可以在外面定义
const state = {
    cartList: []

}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

//3. 挂载到Vue 实例上
export default store