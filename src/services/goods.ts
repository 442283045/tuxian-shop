import { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

export const getGoodsByIdAPI = (id: string) => {
    return http<GoodsResult>({
        method: 'GET',
        url: `/goods`,
        data: {
            id
        }
    })
}
/**
 * 加入购物车接口
 * @param goodsId
 * @param count
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
    return http({
        method: 'POST',
        url: `/member/cart`,
        data
    })
}
