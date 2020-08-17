//导入常量
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    //mutations 唯一的目的就是修改state中的状态
    //mutations 里面的每个方法完成的事情应该尽可能单一 这样有利于事件的跟踪判断 
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.count = 1
        payload.checked = true
        state.cartList.push(payload)
    }
}