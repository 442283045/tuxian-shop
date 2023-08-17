import { http } from '@/utils/http'
import { CartItem } from '@/types/cart'

/**
 * 获取购物车列表
 */
export const getCartListAPI = () => {
    return http<CartItem[]>({
        url: '/member/cart'
    })
}

/**
 * 删除购物车单品
 * @param data 请求体参数 ids SKU id 集合
 */
export const deleteCartItemAPI = (data: { ids: string[] }) => {
    return http({
        url: '/member/cart',
        method: 'DELETE',
        data
    })
}

/**
 * 修改购物车单品数量
 * @param data data.id: 商品的SKU, data.count: 数量
 */
export const putCartItemCountAPI = (
    skuId: string,
    data: { selected?: boolean; count: number }
) => {
    return http({
        url: `/member/cart/${skuId}`,
        method: 'PUT',
        data
    })
}

/**
 * 修改购物车单品选中状态
 * @param data data.selected: 是否选中
 */

export const putItemSelectedAPI = (
    skuId: string,
    data: { selected: boolean }
) => {
    return http({
        url: `/member/cart/selected?id=${skuId}`,
        method: 'PUT',
        data
    })
}

/**
 * 修改购物车全选状态
 * @param data data.selected: 是否选中
 */
export const putAllSelectedAPI = (data: { selected: boolean }) => {
    return http({
        url: `/member/cart/selected`,
        method: 'PUT',
        data
    })
}
