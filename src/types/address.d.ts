/**
 * 收获地址
 */

export type AddressDetail = {
    // 收获人姓名
    receiver: string
    // 联系方式
    contact: string
    // 省份
    provinceCode: string
    // 城市
    cityCode: string
    // 区/县
    countyCode: string
    // 详细地址
    address: string
    // 是否默认地址
    isDefault: number
}

/**
 * 收获地址列表
 */

export type AddressItem = AddressDetail & {
    /** 收获地址 id */
    id: string
    /** 省市区 */
    fullLocation: string
}
