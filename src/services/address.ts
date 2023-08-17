import { http } from '@/utils/http'
import { AddressDetail, AddressItem } from '@/types/address'

// 添加收获地址
export const addAddressAPI = (data: AddressDetail) => {
    return http({
        url: '/member/address',
        method: 'POST',
        data
    })
}

// 获取收获地址列表
export const getAddressListAPI = () => {
    return http<AddressItem[]>({
        url: '/member/address',
        method: 'GET'
    })
}

/**
 * 获取收获地址详情
 * @param id
 * @returns
 */
export const getAddressDetailByIdAPI = (id: string) => {
    return http<AddressItem>({
        url: `/member/address/${id}`,
        method: 'GET'
    })
}

/**
 * 修改收获地址
 * @param id
 * @param data
 * @returns
 */
export const postAddressAPI = (id: string, data: AddressDetail) => {
    return http({
        url: `/member/address/${id}`,
        method: 'PUT',
        data
    })
}

/**
 *
 * @param id 删除收获地址
 * @returns
 */
export const deleteAddressAPI = (id: string) => {
    return http({
        url: `/member/address/${id}`,
        method: 'DELETE'
    })
}
