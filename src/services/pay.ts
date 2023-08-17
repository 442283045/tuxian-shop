import { OrderResult } from '@/types/order'
import { http } from '@/utils/http'

/**
 * 获取微信支付参数
 * @param data orderId 订单id
 */
export const getPayWxPayMinPayAPI = (data: { orderId: string }) => {
    return http<WechatMiniprogram.RequestPaymentOption>({
        method: 'GET',
        url: '/pay/wxPay/MiniPay',
        data
    })
}

/**
 * 模拟支付-内测版
 */
export const getPayMockAPI = (data: { orderId: string }) => {
    return http({
        method: 'GET',
        url: '/pay/mock',
        data
    })
}

/**
 * 确认收货
 * @description 仅在订单状态为待收货时，可确认收货。
 * @param id 订单id
 */
export const putMemberOrderReceiptByIdAPI = (id: string) => {
    return http<OrderResult>({
        method: 'PUT',
        url: `/member/order/${id}/receipt`
    })
}
