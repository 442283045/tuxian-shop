import { http } from '@/utils/http'
import type {
    OrderPreResult,
    OrderCreateParams,
    OrderCreateResult,
    OrderResult,
    OrderLogisticResult,
    OrderListResult,
    OrderListParams
} from '@/types/order'
/**
 * 填写订单-获取预付订单
 */
export const getMemberOrder = () => {
    return http<OrderPreResult>({
        method: 'GET',
        url: '/member/order/pre'
    })
}

/**
 * 填写订单-获取立即购买订单
 */
export const getMemberOrderPreNowAPI = (data: {
    skuId: string
    count: string
    addressId?: string
}) => {
    return http<OrderPreResult>({
        method: 'GET',
        url: '/member/order/pre/now',
        data
    })
}
/**
 * 提交订单
 * @param data 请求参数
 */
export const postOrderAPI = (data: OrderCreateParams) => {
    return http<OrderCreateResult>({
        method: 'POST',
        url: '/member/order',
        data
    })
}

/**
 * 获取订单详情
 */
export const getOrderDetailAPI = (id: string) => {
    return http<OrderResult>({
        method: 'GET',
        url: `/member/order/${id}`
    })
}

/**
 * 模拟发货
 * 仅在 DEV 环境下可用
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
    return http({
        method: 'GET',
        url: `/member/order/consignment/${id}`
    })
}
/**
 * 获取订单物流
 * @description 仅在订单状态为待收货，待评价，已完成时，可获取物流信息。
 * @param id 订单id
 */
export const getMemberOrderLogisticsByIdAPI = (id: string) => {
    return http<OrderLogisticResult>({
        method: 'GET',
        url: `/member/order/${id}/logistics`
    })
}
/**
 * 删除订单
 * @description 仅在订单状态为待评价，已完成，已取消时，可删除订单。
 * @param data ids 订单集合
 */
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
    return http({
        method: 'DELETE',
        url: `/member/order`,
        data
    })
}
/**
 * 取消订单
 * @description 仅在订单状态为待付款时，可取消订单。
 * @param id 订单id
 * @param data cancelReason 取消理由
 */
export const getMemberOrderCancelByIdAPI = (
    id: string,
    data: { cancelReason: string }
) => {
    return http<OrderResult>({
        method: 'PUT',
        url: `/member/order/${id}/cancel`,
        data
    })
}
/**
 * 获取订单列表
 * @param data orderState 订单状态
 */
export const getMemberOrderAPI = (data: OrderListParams) => {
    return http<OrderListResult>({
        method: 'GET',
        url: `/member/order`,
        data
    })
}
