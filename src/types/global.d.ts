// src/types/category.d.ts
export type GoodsItem = {
    id: string
    name: string
    price: string
    picture: string
    desc: string
}
/** 通用分页参数类型 */
export type PageParams = {
    /** 页码：默认值为 1 */
    page?: number
    /** 页大小：默认值为 10 */
    pageSize?: number
}
