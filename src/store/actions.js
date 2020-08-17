//导入常量
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    //因为这里 需要判断count +1 还是添加一个新的产品信息
    //所以 count +1 和添加的操作应该 分别用两个方法放在mutations中
    //再在actions中 去调用 mutations里面的方法 实现不同操作的 跟踪
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //判断同样的商品只添加一次
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //判断oldProduct 
            if (oldProduct) {
                //调用mutations里面的 addCounter
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量+1')
            } else { 
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }
}