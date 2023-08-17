// src/types/member.d.ts

type BaseProfile = {
    /** 用户ID */
    id: number
    /** 头像  */
    avatar: string
    /** 账户名  */
    account: string
    /** 昵称 */
    nickname?: string
    /** 手机号 */
    mobile: string
}
/** 小程序登录 登录用户信息 */
export type LoginResult = BaseProfile & {
    mobile: string
    /** 登录凭证 */
    token: string
}

export type ProfileDetail = BaseProfile & {
    /** 性别 */
    gender?: Gender
    /** 生日 */
    birthday?: string
    /** 省份 */
    fullLocation?: string
    /** 职业 */
    profession?: string
}

type Gender = '男' | '女'

// the params on update profile
export type ProfileParams = Pick<
    ProfileDetail,
    'gender' | 'nickname' | 'birthday' | 'profession'
> & {
    /** 省份编码 */
    provinceCode?: string
    /** 城市编码 */
    cityCode?: string
    /** 区/县编码 */
    countyCode?: string
}
